import { CUBE_STATE } from "../constants";
import { Debugger } from "../debugger";
import { rotateHorizontalAntiClockwise, rotateHorizontalClockwise } from "./helpers";

function updateAdjacentFacesForBackClockwise() {
    const topRow = CUBE_STATE.Top[0];
    const bottomRow = CUBE_STATE.Bottom[0];
    const leftColumn = CUBE_STATE.Left[0];
    const rightColumn = CUBE_STATE.Right[0];

    CUBE_STATE.Top[0] = rightColumn;
    CUBE_STATE.Bottom[0] = leftColumn;
    CUBE_STATE.Left[0] = topRow.reverse();
    CUBE_STATE.Right[0] = bottomRow.reverse();

    Debugger.log('Back / Clockwise');
}

export function rotateBackFaceClockwise() {
    CUBE_STATE.Back = rotateHorizontalAntiClockwise(CUBE_STATE.Back);
    updateAdjacentFacesForBackClockwise();
}

function updateAdjacentFacesForBackAntiClockwise() {
    const topRow = CUBE_STATE.Top[0];
    const bottomRow = CUBE_STATE.Bottom[0];
    const leftColumn = CUBE_STATE.Left[0];
    const rightColumn = CUBE_STATE.Right[0];

    CUBE_STATE.Top[0] = leftColumn.reverse();
    CUBE_STATE.Bottom[0] = rightColumn.reverse();
    CUBE_STATE.Left[0] = bottomRow;
    CUBE_STATE.Right[0] = topRow;

    Debugger.log('Back / Anti-Clockwise');
}

export function rotateBackFaceAntiClockwise() {
    CUBE_STATE.Back = rotateHorizontalClockwise(CUBE_STATE.Back);
    updateAdjacentFacesForBackAntiClockwise();
}
