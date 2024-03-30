import { CUBE_STATE } from "../constants";
import { Debugger } from "../debugger";
import { rotateHorizontalAntiClockwise, rotateHorizontalClockwise } from "./helpers";

function updateAdjacentFacesForBottomClockwise() {
    const leftRow = CUBE_STATE.Left.map(row => row[0]);
    const rightRow = CUBE_STATE.Right.map(row => row[0]);
    const frontRow = CUBE_STATE.Front[0];
    const backRow = CUBE_STATE.Back[0];

    CUBE_STATE.Left.forEach((row, index) => row[0] = backRow[index]);
    CUBE_STATE.Right.forEach((row, index) => row[0] = frontRow[index]);
    CUBE_STATE.Front[0] = leftRow.reverse();
    CUBE_STATE.Back[0] = rightRow.reverse();

    Debugger.log('Bottom / Clockwise');
}

export function rotateBottomFaceClockwise() {
    CUBE_STATE.Bottom = rotateHorizontalClockwise(CUBE_STATE.Bottom);
    updateAdjacentFacesForBottomClockwise();
}

function updateAdjacentFacesForBottomAntiClockwise() {
    const leftRow = CUBE_STATE.Left.map(row => row[0]);
    const rightRow = CUBE_STATE.Right.map(row => row[0]);
    const frontRow = CUBE_STATE.Front[0];
    const backRow = CUBE_STATE.Back[0];

    CUBE_STATE.Left.forEach((row, index) => row[0] = frontRow[2 - index]);
    CUBE_STATE.Right.forEach((row, index) => row[0] = backRow[2 - index]);
    CUBE_STATE.Front[0] = rightRow;
    CUBE_STATE.Back[0] = leftRow;

    Debugger.log('Bottom / Anti-Clockwise');
}

export function rotateBottomFaceAntiClockwise() {
    CUBE_STATE.Bottom = rotateHorizontalAntiClockwise(CUBE_STATE.Bottom);
    updateAdjacentFacesForBottomAntiClockwise();
}
