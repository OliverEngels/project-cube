import { CUBE_STATE } from "../constants";

export function findSideByValue(value: any): string {
    for (const [side, arrays] of Object.entries(CUBE_STATE)) {
        const containsValue = arrays.flat().find(e => e.uuid === value.uuid);
        if (containsValue) {
            return side;
        }
    }
    return undefined;
}

export function getCubeOnFace(face: string): any {
    if (!face) return;

    var FaceCubes = CUBE_STATE[face].flat().map(cube => {
        return cube.model.parent;
    });

    return FaceCubes;
}