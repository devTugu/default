import { describe, expect, it } from 'vitest';
import { hexToColorInt, normalizeColor, parseGradientColors } from './normalize-color';

describe('normalizeColor', () => {
  it('converts 0xRRGGBB to normalized RGB', () => {
    expect(normalizeColor(0xff333d)).toEqual([
      1,
      51 / 255,
      61 / 255,
    ]);
  });

  it('parses short and full hex strings', () => {
    expect(hexToColorInt('#f00')).toBe(0xff0000);
    expect(hexToColorInt('#a960ee')).toBe(0xa960ee);
  });

  it('maps stripe default palette to vec3 colors', () => {
    const colors = parseGradientColors(['#a960ee', '#ff333d', '#90e0ff', '#ffcb57']);
    expect(colors).toHaveLength(4);
    expect(colors[0]?.[0]).toBeCloseTo(0.6627, 2);
  });
});
