import { CUBE_STATE } from "../constants";
import { Debugger } from "../debugger";
import { rotateHorizontalClockwise, rotateHorizontalAntiClockwise } from "./helpers";

function updateAdjacentFacesForRightClockwise() {
    const topColumn = CUBE_STATE.Top.map(row => row[0]);
    const bottomColumn = CUBE_STATE.Bottom.map(row => row[0]);
    const frontColumn = CUBE_STATE.Front.map(row => row[0]);
    const backColumn = CUBE_STATE.Back.map(row => row[0]);

    CUBE_STATE.Top.forEach((row, index) => row[0] = backColumn[index]);
    CUBE_STATE.Back.forEach((row, index) => row[0] = bottomColumn[2 - index]);
    CUBE_STATE.Bottom.forEach((row, index) => row[0] = frontColumn[index]);
    CUBE_STATE.Front.forEach((row, index) => row[0] = topColumn[2 - index]);

    Debugger.log("Right / Clockwise");
}

export function rotateRightFaceClockwise() {
    CUBE_STATE.Right = rotateHorizontalClockwise(CUBE_STATE.Right);
    updateAdjacentFacesForRightClockwise();
}

function updateAdjacentFacesForRightAntiClockwise() {
    const topColumn = CUBE_STATE.Top.map(row => row[0]);
    const bottomColumn = CUBE_STATE.Bottom.map(row => row[0]);
    const frontColumn = CUBE_STATE.Front.map(row => row[0]);
    const backColumn = CUBE_STATE.Back.map(row => row[0]);

    CUBE_STATE.Top.forEach((row, index) => row[0] = frontColumn[2 - index]);
    CUBE_STATE.Front.forEach((row, index) => row[0] = bottomColumn[index]);
    CUBE_STATE.Bottom.forEach((row, index) => row[0] = backColumn[2 - index]);
    CUBE_STATE.Back.forEach((row, index) => row[0] = topColumn[index]);


    Debugger.log("Right / Anti-Clockwise");
}

export function rotateRightFaceAntiClockwise() {
    CUBE_STATE.Right = rotateHorizontalAntiClockwise(CUBE_STATE.Right);
    updateAdjacentFacesForRightAntiClockwise();
}