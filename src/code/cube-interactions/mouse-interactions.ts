import { Group, Raycaster, Vector3, MathUtils } from 'three';
import { centerSphere } from '../cube-loader/cube-loader';
import { resetAndAlignGroupElements, getAxisComponent, getNearest90DegreesSnap, getRotationAxisByFace } from './utilities';
import { updateCubeState } from '../cube-state/update-cube-state';
import { ANTICLOCKWISE, CLOCKWISE, DEGREES_IN_CIRCLE, DEGREES_PER_QUARTER, PIVOT, ROTATION_SPEED, THRESHOLD } from '../constants';
import { findSideByValue, getCubeOnFace } from './helpers';

export function setupMouseInteractions(camera, scene, renderer, controls, containerRef) {
    const group = new Group();
    const raycaster = new Raycaster();
    let rotationAxis = new Vector3(0, 0, 0);

    let previousRotationDegrees = 0;
    let lastReportedRotation = 0;

    let faceInMotion = '';
    let nearest90Degrees = 0;

    renderer.domElement.addEventListener('mousedown', beginDragInteraction, false);
    renderer.domElement.addEventListener('mousemove', handleDragRotation, false);
    renderer.domElement.addEventListener('mouseup', handleDragRotationEnd, false);

    // renderer.domElement.addEventListener('touchstart', onMouseDown, false);
    // renderer.domElement.addEventListener('touchmove', onMouseMove, false);
    // renderer.domElement.addEventListener('touchend', onMouseUp, false);

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    let cubesToRotate = [];

    function addObjectToGroup(object: any) {
        const objectGlobalPosition = new Vector3();
        object.getWorldPosition(objectGlobalPosition);

        const groupGlobalPosition = new Vector3();
        group.getWorldPosition(groupGlobalPosition);

        const relativePosition = objectGlobalPosition.sub(groupGlobalPosition);
        object.position.set(relativePosition.x, relativePosition.y, relativePosition.z);

        group.add(object);
    }

    function beginDragInteraction(event) {
        event.preventDefault()

        const rect = containerRef.current.getBoundingClientRect();

        const mouse = {
            x: ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1,
            y: -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1
        };

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;

            faceInMotion = findSideByValue(clickedObject);
            if (!faceInMotion)
                return;

            cubesToRotate = getCubeOnFace(faceInMotion);

            cubesToRotate.forEach(cube => addObjectToGroup(cube));
            scene.add(group);

            previousMousePosition = { x: event.clientX, y: event.clientY };

            isDragging = true;
            controls.enabled = false;
        }
    }

    function handleDragRotation(event) {
        if (!isDragging) return;

        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        rotationAxis = getRotationAxisByFace(faceInMotion);

        const deltaRotation = -deltaMove.y * ROTATION_SPEED;
        if (previousRotationDegrees === lastReportedRotation ||
            (previousRotationDegrees === 360 && lastReportedRotation === 0)) {
            updateGroupRotation(deltaRotation);
        }

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    let oldNearest90Degrees = 0;
    let rotationDirection = null;
    function updateGroupRotation(rotationAngle) {
        centerSphere.position.add(PIVOT);
        centerSphere.rotateOnAxis(rotationAxis, rotationAngle);
        centerSphere.position.sub(PIVOT);

        const axisComponent = getAxisComponent(rotationAxis);
        nearest90Degrees = getNearest90DegreesSnap(centerSphere, axisComponent);
        if (oldNearest90Degrees !== nearest90Degrees) {
            rotationDirection = oldNearest90Degrees < nearest90Degrees ? CLOCKWISE : ANTICLOCKWISE;
        }

        const rawGuideRotation = MathUtils.radToDeg(centerSphere.rotation[axisComponent]);
        let guideRotationDegrees = rawGuideRotation % DEGREES_IN_CIRCLE;
        if (guideRotationDegrees < 0) {
            guideRotationDegrees += DEGREES_IN_CIRCLE;
        }

        const nearest90 = Math.round(guideRotationDegrees / DEGREES_PER_QUARTER) * DEGREES_PER_QUARTER;
        const difference = Math.abs(nearest90 - guideRotationDegrees);
        if (difference <= THRESHOLD || difference >= (DEGREES_PER_QUARTER - THRESHOLD)) {
            const snappedRotationRadians = MathUtils.degToRad(nearest90);
            group.rotation[axisComponent] = snappedRotationRadians;

            if (nearest90Degrees !== oldNearest90Degrees) {
                updateCubeState(rotationDirection, faceInMotion);
                oldNearest90Degrees = nearest90Degrees;
            }
        } else {
            group.rotation[axisComponent] = centerSphere.rotation[axisComponent];
        }
    }

    function handleDragRotationEnd() {
        if (isDragging) {
            controls.enabled = true;
        }

        resetAndAlignGroupElements(group, rotationAxis, cubesToRotate, scene);
        if (nearest90Degrees !== oldNearest90Degrees) {
            updateCubeState(rotationDirection, faceInMotion);
        }

        faceInMotion = '';

        lastReportedRotation = 0;
        previousRotationDegrees = 0;

        nearest90Degrees = 0;
        oldNearest90Degrees = 0;

        isDragging = false;

        rotationAxis.set(0, 0, 0);
    }
}
