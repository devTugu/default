const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export const DEFAULT_BRAND_COLOR = '#635BFF';

export function normalizeHexColor(value: string | null | undefined): string | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  if (HEX_PATTERN.test(trimmed)) return trimmed.toUpperCase();
  if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) return `#${trimmed.toUpperCase()}`;
  return null;
}

export function toColorInputValue(value: string | null | undefined): string {
  return normalizeHexColor(value) ?? DEFAULT_BRAND_COLOR;
}
