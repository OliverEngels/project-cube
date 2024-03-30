import { CUBE_STATE } from "../constants";
import { Debugger } from "../debugger";
import { rotateHorizontalAntiClockwise, rotateHorizontalClockwise } from "./helpers";

function updateAdjacentFacesForFrontClockwise() {
    const topRow = CUBE_STATE.Top[2];
    const bottomRow = CUBE_STATE.Bottom[2];
    const leftColumn = CUBE_STATE.Left[2];
    const rightColumn = CUBE_STATE.Right[2];

    CUBE_STATE.Top[2] = leftColumn.reverse();
    CUBE_STATE.Bottom[2] = rightColumn.reverse();
    CUBE_STATE.Left[2] = bottomRow;
    CUBE_STATE.Right[2] = topRow;

    Debugger.log('Front / Clockwise')
}

export function rotateFrontFaceClockwise() {
    CUBE_STATE.Front = rotateHorizontalClockwise(CUBE_STATE.Front);
    updateAdjacentFacesForFrontClockwise();
}

function updateAdjacentFacesForFrontAntiClockwise() {
    const topRow = CUBE_STATE.Top[2];
    const bottomRow = CUBE_STATE.Bottom[2];
    const leftColumn = CUBE_STATE.Left[2];
    const rightColumn = CUBE_STATE.Right[2];

    CUBE_STATE.Top[2] = rightColumn;
    CUBE_STATE.Bottom[2] = leftColumn;
    CUBE_STATE.Left[2] = topRow.reverse();
    CUBE_STATE.Right[2] = bottomRow.reverse();

    Debugger.log('Front / Anti-Clockwise')
}

export function rotateFrontFaceAntiClockwise() {
    CUBE_STATE.Front = rotateHorizontalAntiClockwise(CUBE_STATE.Front);
    updateAdjacentFacesForFrontAntiClockwise();
}
