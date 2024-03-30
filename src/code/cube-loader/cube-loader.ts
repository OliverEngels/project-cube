import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Debugger } from '../debugger';
import { COLORS, CUBE_STATE } from '../constants';
import { addRandomnessToColor } from './helper';

const CubeSides = {
    Front: [],
    Left: [],
    Top: [],
    Right: [],
    Bottom: [],
    Back: []
};

const ResetCube = () => {
    for (const [key] of Object.entries(CubeSides)) {
        CubeSides[key] = [];
    }

    for (const [key] of Object.entries(CUBE_STATE)) {
        CUBE_STATE[key] = [];
    }
}

export var centerSphere = null;
export function setupCubeLoader(scene, manager) {
    ResetCube();
    const cubeGroups = [];
    const loader = new GLTFLoader(manager);
    loader.load('models/cube.glb', function (gltf) {
        arrangeCubesInGrid(gltf.scene, scene, cubeGroups);
    }, undefined, function (error) {
        Debugger.error('An error happened', error);
    });
}

function arrangeCubesInGrid(model, scene, cubeGroups) {
    const spacing = 2.05;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                if (x === 1 && y === 1 && z === 1) {
                    createCenterSphere(scene);
                } else {
                    const modelClone = model.clone();
                    modelClone.position.set((x - 1) * spacing, (y - 1) * spacing, (z - 1) * spacing);

                    updateCubeColorsAndState(x, y, z, modelClone);

                    scene.add(modelClone);
                    cubeGroups.push(modelClone);
                }
            }
        }
    }

    updateCurrentState();
}

function updateCubeColorsAndState(x, y, z, modelClone) {
    const colorMapping = {
        Left: { condition: z === 2, color: 'w' },
        Right: { condition: z === 0, color: 'o' },
        Top: { condition: y === 2, color: 'b' },
        Bottom: { condition: y === 0, color: 'g' },
        Front: { condition: x === 2, color: 'r' },
        Back: { condition: x === 0, color: 'y' }
    };
    let cubeColors = {};
    Object.keys(colorMapping).forEach(side => {
        const { condition, color } = colorMapping[side];
        if (condition) {
            const hexColor = COLORS.find(c => c.color === color)?.hex;
            cubeColors[side.toLowerCase()] = hexColor;
            modelClone.children[0].name += `_${color}`;
        }
    });
    applyColorsToModel(modelClone, cubeColors);
}

function createCenterSphere(scene) {
    const geometry = new THREE.SphereGeometry(.5, 6, 6);
    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    centerSphere = new THREE.Mesh(geometry, material);
    scene.add(centerSphere);
}

interface CubeColor {
    front?: number;
    back?: number;
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

function applyColorsToModel(model: THREE.Object3D, colors: CubeColor) {
    const DEFAULT_DARK_COLOR = 0x333333;
    const colorMap: { [key: number]: number } = {
        1: colors.front ?? DEFAULT_DARK_COLOR,
        2: colors.left ?? DEFAULT_DARK_COLOR,
        3: colors.top ?? DEFAULT_DARK_COLOR,
        4: colors.right ?? DEFAULT_DARK_COLOR,
        5: colors.bottom ?? DEFAULT_DARK_COLOR,
        6: colors.back ?? DEFAULT_DARK_COLOR,
    };

    model.children[0].children.forEach((child, index) => {
        const sideColor = colorMap[index];
        if (colorMap[index] !== undefined) {
            applyColorToChild(child, colorMap[index]);
            if (colorMap[index] !== DEFAULT_DARK_COLOR) {
                const side = getSideNameByIndex(index);
                trackCubeSide(child, sideColor, side);
            }
        }
    });
}

function applyColorToChild(child: THREE.Object3D, colorValue: number): void {
    child.material = child.material.clone();
    const modifiedColor = addRandomnessToColor(colorValue, 1.5);
    child.material.color.set(modifiedColor);
}

function trackCubeSide(child: THREE.Object3D, colorValue: number, sideName: string): void {
    CubeSides[sideName].push({
        model: child,
        color: colorValue,
        colorName: child.material.name,
        uuid: child.uuid
    });
}

function getSideNameByIndex(index: number): string {
    return { 1: 'Front', 2: 'Left', 3: 'Top', 4: 'Right', 5: 'Bottom', 6: 'Back' }[index];
}

function updateCurrentState() {
    Object.keys(CubeSides).forEach(side => {
        CUBE_STATE[side] = SetInitialState(CubeSides[side]);
    });
}

function SetInitialState(state) {
    let config = [];
    for (let i = 0; i < 3; i++) {
        config.push(state.slice(i * 3, i * 3 + 3));
    }

    return config;
}