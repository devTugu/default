const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export const DEFAULT_BRAND_COLOR = "#635BFF";

export function normalizeHexColor(
  value: string | null | undefined,
): string | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  if (HEX_PATTERN.test(trimmed)) return trimmed.toUpperCase();
  if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) return `#${trimmed.toUpperCase()}`;
  return null;
}

export function toColorInputValue(value: string | null | undefined): string {
  return normalizeHexColor(value) ?? DEFAULT_BRAND_COLOR;
}

function hexToRgbChannels(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

/** WCAG relative luminance for sRGB hex (0–1). */
export function relativeLuminance(hex: string): number {
  const channels = hexToRgbChannels(hex).map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

export function brandPrimaryForeground(hex: string): string {
  return relativeLuminance(hex) > 0.45 ? "#0A0A0A" : "#FAFAFA";
}

export const BRAND_THEME_CSS_KEYS = [
  "--color-primary",
  "--color-primary-foreground",
  "--color-sidebar-primary",
  "--color-sidebar-primary-foreground",
  "--color-ring",
] as const;

export function buildBrandThemeCssVars(
  brandColor: string | null | undefined,
): Partial<Record<(typeof BRAND_THEME_CSS_KEYS)[number], string>> {
  const brand = normalizeHexColor(brandColor);
  if (!brand) {
    return {};
  }

  const foreground = brandPrimaryForeground(brand);
  return {
    "--color-primary": brand,
    "--color-primary-foreground": foreground,
    "--color-sidebar-primary": brand,
    "--color-sidebar-primary-foreground": foreground,
    "--color-ring": brand,
  };
}

type BrandThemeStyleTarget = {
  style: {
    setProperty: (name: string, value: string) => void;
    removeProperty: (name: string) => string;
  };
};

export function applyBrandThemeCssVars(
  target: BrandThemeStyleTarget,
  brandColor: string | null | undefined,
): void {
  const vars = buildBrandThemeCssVars(brandColor);
  for (const key of BRAND_THEME_CSS_KEYS) {
    const value = vars[key];
    if (value) {
      target.style.setProperty(key, value);
      continue;
    }
    target.style.removeProperty(key);
  }
}
