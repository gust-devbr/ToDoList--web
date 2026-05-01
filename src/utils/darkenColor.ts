export function darkenColor(hex: string, amount = 0.4) {
    const num = parseInt(hex.replace("#", ""), 16);

    let r = (num >> 16) * (1 - amount);
    let g = ((num >> 8) & 0x00ff) * (1 - amount);
    let b = (num & 0x0000ff) * (1 - amount);

    return `rgb(${r}, ${g}, ${b})`;
}
