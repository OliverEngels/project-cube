import { CUBE_STATE } from "../constants";
import { Debugger } from "../debugger";
import { rotateHorizontalAntiClockwise, rotateHorizontalClockwise } from "./helpers";

function updateAdjacentFacesForLeftClockwise() {
    const topColumn = CUBE_STATE.Top.map(row => row[2]);
    const bottomColumn = CUBE_STATE.Bottom.map(row => row[2]);
    const frontColumn = CUBE_STATE.Front.map(row => row[2]);
    const backColumn = CUBE_STATE.Back.map(row => row[2]);

    CUBE_STATE.Top.forEach((row, index) => row[2] = frontColumn[2 - index]);
    CUBE_STATE.Front.forEach((row, index) => row[2] = bottomColumn[index]);
    CUBE_STATE.Bottom.forEach((row, index) => row[2] = backColumn[2 - index]);
    CUBE_STATE.Back.forEach((row, index) => row[2] = topColumn[index]);

    Debugger.log("Left / Clockwise")
}

export function rotateLeftFaceClockwise() {
    CUBE_STATE.Left = rotateHorizontalAntiClockwise(CUBE_STATE.Left);
    updateAdjacentFacesForLeftClockwise();
}

function updateAdjacentFacesForLeftAntiClockwise() {
    const topColumn = CUBE_STATE.Top.map(row => row[2]);
    const bottomColumn = CUBE_STATE.Bottom.map(row => row[2]);
    const frontColumn = CUBE_STATE.Front.map(row => row[2]);
    const backColumn = CUBE_STATE.Back.map(row => row[2]);

    CUBE_STATE.Top.forEach((row, index) => row[2] = backColumn[index]);
    CUBE_STATE.Front.forEach((row, index) => row[2] = topColumn[2 - index]);
    CUBE_STATE.Bottom.forEach((row, index) => row[2] = frontColumn[index]);
    CUBE_STATE.Back.forEach((row, index) => row[2] = bottomColumn[2 - index]);

    Debugger.log("Left / Anti-Clockwise");
}

export function rotateLeftFaceAntiClockwise() {
    CUBE_STATE.Left = rotateHorizontalClockwise(CUBE_STATE.Left);
    updateAdjacentFacesForLeftAntiClockwise();
}