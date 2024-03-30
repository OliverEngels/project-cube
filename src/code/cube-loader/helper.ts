export function addRandomnessToColor(hexColor, percentage) {
    let r = (hexColor >> 16) & 255;
    let g = (hexColor >> 8) & 255;
    let b = hexColor & 255;

    let maxChange = 255 * (percentage / 100);
    r = Math.min(255, Math.max(0, r + (Math.random() - 0.5) * 2 * maxChange));
    g = Math.min(255, Math.max(0, g + (Math.random() - 0.5) * 2 * maxChange));
    b = Math.min(255, Math.max(0, b + (Math.random() - 0.5) * 2 * maxChange));

    let newHex = (r << 16) | (g << 8) | b;
    return `#${newHex.toString(16).padStart(6, '0')}`;
}