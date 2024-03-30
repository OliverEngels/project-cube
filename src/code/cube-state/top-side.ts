import { CUBE_STATE } from "../constants";
import { Debugger } from "../debugger";
import { rotateHorizontalAntiClockwise, rotateHorizontalClockwise, } from "./helpers";

function updateAdjacentFacesForTopClockwise() {
    const leftRow = CUBE_STATE.Left.map(row => row[2]);
    const rightRow = CUBE_STATE.Right.map(row => row[2]);
    const frontColumn = CUBE_STATE.Front[2];
    const backColumn = CUBE_STATE.Back[2];

    CUBE_STATE.Left.forEach((row, index) => row[2] = frontColumn[2 - index]);
    CUBE_STATE.Right.forEach((row, index) => row[2] = backColumn[2 - index]);
    CUBE_STATE.Front[2] = rightRow;
    CUBE_STATE.Back[2] = leftRow;

    Debugger.log('Top / Clockwise')
}

export function rotateTopFaceClockwise() {
    CUBE_STATE.Top = rotateHorizontalAntiClockwise(CUBE_STATE.Top);
    updateAdjacentFacesForTopClockwise();
}

function updateAdjacentFacesForTopAntiClockwise() {
    const leftRow = CUBE_STATE.Left.map(row => row[2]);
    const rightRow = CUBE_STATE.Right.map(row => row[2]);
    const frontColumn = CUBE_STATE.Front[2];
    const backColumn = CUBE_STATE.Back[2];

    CUBE_STATE.Left.forEach((row, index) => row[2] = backColumn[index]);
    CUBE_STATE.Right.forEach((row, index) => row[2] = frontColumn[index]);
    CUBE_STATE.Front[2] = leftRow.reverse();
    CUBE_STATE.Back[2] = rightRow.reverse();

    Debugger.log('Top / Anti-Clockwise')
}

export function rotateTopFaceAntiClockwise() {
    CUBE_STATE.Top = rotateHorizontalClockwise(CUBE_STATE.Top);
    updateAdjacentFacesForTopAntiClockwise();
}
