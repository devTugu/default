import { describe, expect, it } from 'vitest';
import {
  DEFAULT_BRAND_COLOR,
  normalizeHexColor,
  toColorInputValue,
} from './normalize-hex-color';

describe('normalizeHexColor', () => {
  it('normalizes 6-digit hex with hash', () => {
    expect(normalizeHexColor('#635bff')).toBe('#635BFF');
  });

  it('adds hash to bare hex', () => {
    expect(normalizeHexColor('635BFF')).toBe('#635BFF');
  });

  it('returns null for empty or invalid values', () => {
    expect(normalizeHexColor('')).toBeNull();
    expect(normalizeHexColor('red')).toBeNull();
  });
});

describe('toColorInputValue', () => {
  it('falls back to default when value is empty', () => {
    expect(toColorInputValue('')).toBe(DEFAULT_BRAND_COLOR);
  });
});
