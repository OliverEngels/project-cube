import { Vector3, Quaternion, Euler, MathUtils } from 'three';
import { centerSphere } from '../cube-loader/cube-loader';

export function snapToNearest90Degrees(angleRadians) {
    const degrees = MathUtils.radToDeg(angleRadians);
    const snappedDegrees = Math.round(degrees / 90) * 90;
    return MathUtils.degToRad(snappedDegrees);
}

let lastRotationY = 0;
let cumulativeRotation = 0;
export function getNearest90DegreesSnap(centerSphere, axisComponent) {
    let currentRotationY = centerSphere.rotation[axisComponent];
    let deltaRotation = currentRotationY - lastRotationY;

    if (deltaRotation > Math.PI) {
        deltaRotation -= 2 * Math.PI;
    } else if (deltaRotation < -Math.PI) {
        deltaRotation += 2 * Math.PI;
    }

    lastRotationY = currentRotationY;
    cumulativeRotation += deltaRotation;

    const degrees = MathUtils.radToDeg(cumulativeRotation);

    const snappedDegrees = Math.round(degrees / 90) * 90;

    return snappedDegrees === -0 ? 0 : snappedDegrees;
}

export function getAxisComponent(rotationAxis) {
    if (rotationAxis.x === 1) return 'x';
    if (rotationAxis.y === 1) return 'y';
    if (rotationAxis.z === 1) return 'z';
    console.warn('Invalid rotation axis');
}

export function resetAndAlignGroupElements(group, rotationAxis, cubesToRotate, scene) {
    const axisComponent = getAxisComponent(rotationAxis);
    const newRotation = snapToNearest90Degrees(group.rotation[axisComponent]);
    group.rotation[axisComponent] = newRotation;

    let groupRotation = new Euler(
        axisComponent === 'y' ? group.rotation.x : 0,
        axisComponent === 'z' ? group.rotation.y : 0,
        axisComponent === 'x' ? group.rotation.z : 0
    );
    const groupQuaternion = new Quaternion().setFromEuler(groupRotation);

    cubesToRotate.forEach(cube => {
        const cubeWorldQuaternion = new Quaternion();
        cube.getWorldQuaternion(cubeWorldQuaternion);

        cubeWorldQuaternion.multiply(groupQuaternion);
        cube.quaternion.copy(cubeWorldQuaternion);

        let worldPosition = new Vector3();
        cube.getWorldPosition(worldPosition);

        worldPosition.sub(group.position).applyQuaternion(groupQuaternion).add(group.position);

        group.remove(cube);
        scene.add(cube);
        cube.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
    });

    group.rotation.set(0, 0, 0);
    centerSphere.rotation.set(0, 0, 0);
}

export function getRotationAxisByFace(face) {
    switch (face) {
        case 'Left':
        case 'Right':
            return new Vector3(0, 0, 1);
        case 'Top':
        case 'Bottom':
            return new Vector3(0, 1, 0);
        case 'Front':
        case 'Back':
            return new Vector3(1, 0, 0);
        default:
            console.warn(`Unexpected face in motion: ${face}`);
            return new Vector3(0, 0, 1); // Default case or handle error
    }
}