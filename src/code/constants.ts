import { Vector3 } from 'three';

export const THRESHOLD = 10;
export const ROTATION_SPEED = 0.005;

export const CLOCKWISE = "Clockwise";
export const ANTICLOCKWISE = "AntiClockwise";

export const DEGREES_IN_CIRCLE = 360;
export const DEGREES_PER_QUARTER = 90;

export const PIVOT = new Vector3(0, -2, 0);

export const AUTO_ROTATE = true;
export const START_ROTATE = true;

export const DEBUGGER = false;

export const COLORS = [
    { color: 'b', hex: 0x634fc2 },
    { color: 'w', hex: 0xbbbbbb },
    { color: 'r', hex: 0xd1585b },
    { color: 'y', hex: 0xc9bd3c },
    { color: 'o', hex: 0xd17a3b },
    { color: 'g', hex: 0x51bd54 },
]

export const CUBE_STATE = {
    Front: [],
    Left: [],
    Top: [],
    Right: [],
    Bottom: [],
    Back: []
}