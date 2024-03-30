export function rotateHorizontalClockwise(matrix: number[][]): number[][] {
    const size = matrix.length;
    let rotated = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            rotated[j][size - i - 1] = matrix[i][j];
        }
    }
    return rotated;
}

export function rotateVerticalClockwise(matrix: number[][]): number[][] {
    return rotateHorizontalClockwise(matrix).map(row => row.reverse());
}

export function rotateHorizontalAntiClockwise(matrix: number[][]): number[][] {
    const size = matrix.length;
    let rotated = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            rotated[size - j - 1][i] = matrix[i][j];
        }
    }
    return rotated;
}

export function rotateVerticalAntiClockwise(matrix: number[][]): number[][] {
    return rotateHorizontalAntiClockwise(matrix).map(row => row.reverse());
}
