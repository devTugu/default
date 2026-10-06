/** Converts 0xRRGGBB hex integer to normalized RGB vec3. */
export function normalizeColor(hexCode: number): [number, number, number] {
  return [
    ((hexCode >> 16) & 255) / 255,
    ((hexCode >> 8) & 255) / 255,
    (hexCode & 255) / 255,
  ];
}

/** Parses #RGB or #RRGGBB to 0xRRGGBB integer. */
export function hexToColorInt(hex: string): number {
  let normalized = hex.trim();
  if (normalized.length === 4) {
    const body = normalized.slice(1).split('').map((c) => c + c).join('');
    normalized = `#${body}`;
  }
  return Number.parseInt(normalized.slice(1), 16);
}

export function parseGradientColors(colors: string[]): [number, number, number][] {
  return colors
    .map((hex) => {
      try {
        return normalizeColor(hexToColorInt(hex));
      } catch {
        return null;
      }
    })
    .filter((value): value is [number, number, number] => value !== null);
}
