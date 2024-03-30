import { CLOCKWISE } from "../constants";
import { rotateBackFaceAntiClockwise, rotateBackFaceClockwise } from "./back-side";
import { rotateBottomFaceAntiClockwise, rotateBottomFaceClockwise } from "./bottom-side";
import { rotateFrontFaceAntiClockwise, rotateFrontFaceClockwise } from "./front-side";
import { rotateLeftFaceAntiClockwise, rotateLeftFaceClockwise } from "./left-side";
import { rotateRightFaceAntiClockwise, rotateRightFaceClockwise } from "./right-side";
import { rotateTopFaceAntiClockwise, rotateTopFaceClockwise } from "./top-side";

export function updateCubeState(direction, FaceInMotion) {
    switch (FaceInMotion) {
        case "Front":
            if (direction === CLOCKWISE) rotateFrontFaceAntiClockwise();
            else rotateFrontFaceClockwise();
            break;
        case "Back":
            if (direction === CLOCKWISE) rotateBackFaceClockwise();
            else rotateBackFaceAntiClockwise();
            break;
        case "Top":
            if (direction === CLOCKWISE) rotateTopFaceAntiClockwise();
            else rotateTopFaceClockwise();
            break;
        case "Bottom":
            if (direction === CLOCKWISE) rotateBottomFaceClockwise();
            else rotateBottomFaceAntiClockwise();
            break;
        case "Left":
            if (direction === CLOCKWISE) rotateLeftFaceClockwise();
            else rotateLeftFaceAntiClockwise();
            break;
        case "Right":
            if (direction === CLOCKWISE) rotateRightFaceAntiClockwise();
            else rotateRightFaceClockwise();
            break;
        default:
            break;
    }
}