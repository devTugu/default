import { DEFAULT_BRAND_COLOR, normalizeHexColor } from '@/shared/lib/normalize-hex-color';

export interface BrandHeroPalette {
  /** Four WebGL stripe-gradient colors — brand is dominant (index 0). */
  stripeColors: [string, string, string, string];
  heroGradient: string;
  ribbonGradient: string;
  violet: string;
  /** Canvas ribbon warm strand stops (left → right). */
  waveWarmStops: readonly [string, string, string, string];
  /** Canvas ribbon cool strand stops (left → right). */
  waveCoolStops: readonly [string, string, string];
}

interface Rgb {
  r: number;
  g: number;
  b: number;
}

interface Hsl {
  h: number;
  s: number;
  l: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string): Rgb {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const toByte = (channel: number) =>
    Math.round(clamp(channel, 0, 255)).toString(16).padStart(2, '0').toUpperCase();
  return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const lightness = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l: lightness * 100 };
  }

  const saturation =
    delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;

  if (max === rn) {
    hue = ((gn - bn) / delta) % 6;
  } else if (max === gn) {
    hue = (bn - rn) / delta + 2;
  } else {
    hue = (rn - gn) / delta + 4;
  }

  return { h: (hue * 60 + 360) % 360, s: saturation * 100, l: lightness * 100 };
}

function hslToRgb({ h, s, l }: Hsl): Rgb {
  const sn = s / 100;
  const ln = l / 100;
  const chroma = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - chroma / 2;

  let rn = 0;
  let gn = 0;
  let bn = 0;

  if (h < 60) {
    rn = chroma;
    gn = x;
  } else if (h < 120) {
    rn = x;
    gn = chroma;
  } else if (h < 180) {
    gn = chroma;
    bn = x;
  } else if (h < 240) {
    gn = x;
    bn = chroma;
  } else if (h < 300) {
    rn = x;
    bn = chroma;
  } else {
    rn = chroma;
    bn = x;
  }

  return {
    r: (rn + m) * 255,
    g: (gn + m) * 255,
    b: (bn + m) * 255,
  };
}

function shiftBrandColor(
  hex: string,
  hueShift: number,
  saturationMultiplier: number,
  lightnessDelta: number,
): string {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(
    hslToRgb({
      h: (hsl.h + hueShift + 360) % 360,
      s: clamp(hsl.s * saturationMultiplier, 18, 100),
      l: clamp(hsl.l + lightnessDelta, 8, 92),
    }),
  );
}

function hexWithAlpha(hex: string, alpha: number): string {
  const channel = Math.round(clamp(alpha, 0, 1) * 255)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase();
  return `${hex}${channel}`;
}

/** Builds hero mesh colors with the CMS brand color as the dominant accent. */
export function buildBrandHeroPalette(
  brandColor: string | null | undefined,
): BrandHeroPalette {
  const brand = normalizeHexColor(brandColor) ?? DEFAULT_BRAND_COLOR;

  const stripeColors: [string, string, string, string] = [
    brand,
    shiftBrandColor(brand, 28, 1.05, 12),
    shiftBrandColor(brand, -32, 0.95, 18),
    shiftBrandColor(brand, 52, 1.1, 8),
  ];

  const heroGradient = `linear-gradient(135deg, ${hexWithAlpha(brand, 0.42)} 0%, ${hexWithAlpha(
    shiftBrandColor(brand, 22, 1, 14),
    0.28,
  )} 50%, ${hexWithAlpha(shiftBrandColor(brand, -18, 0.9, 22), 0.16)} 100%)`;

  const ribbonGradient = `linear-gradient(90deg, ${hexWithAlpha(
    shiftBrandColor(brand, -8, 0.75, 28),
    0.55,
  )} 0%, ${hexWithAlpha(brand, 0.72)} 28%, ${hexWithAlpha(
    shiftBrandColor(brand, 24, 1.05, 10),
    0.68,
  )} 52%, ${hexWithAlpha(shiftBrandColor(brand, 44, 1, 6), 0.62)} 78%, ${hexWithAlpha(
    shiftBrandColor(brand, -36, 0.9, -4),
    0.58,
  )} 100%)`;

  const waveWarmStops: [string, string, string, string] = [
    shiftBrandColor(brand, -22, 0.82, 32),
    shiftBrandColor(brand, -6, 0.95, 18),
    shiftBrandColor(brand, 18, 1.05, 8),
    shiftBrandColor(brand, 44, 1, 2),
  ];

  const waveCoolStops: [string, string, string] = [
    shiftBrandColor(brand, -38, 0.88, -8),
    shiftBrandColor(brand, -10, 0.92, 6),
    shiftBrandColor(brand, 32, 0.95, 14),
  ];

  return {
    stripeColors,
    heroGradient,
    ribbonGradient,
    violet: shiftBrandColor(brand, 18, 1.05, 10),
    waveWarmStops,
    waveCoolStops,
  };
}

export function toMarketingMeshCssVars(
  palette: BrandHeroPalette,
  brandColor: string | null,
): Record<string, string> {
  const [c1, c2, c3, c4] = palette.stripeColors;
  const vars: Record<string, string> = {
    '--marketing-mesh-color-1': c1,
    '--marketing-mesh-color-2': c2,
    '--marketing-mesh-color-3': c3,
    '--marketing-mesh-color-4': c4,
    '--marketing-violet': palette.violet,
    '--marketing-hero-gradient': palette.heroGradient,
    '--marketing-ribbon-gradient': palette.ribbonGradient,
    '--marketing-wave-warm-start': palette.waveWarmStops[0],
    '--marketing-wave-warm-mid': palette.waveWarmStops[1],
    '--marketing-wave-warm-end': palette.waveWarmStops[3],
    '--marketing-wave-cool-start': palette.waveCoolStops[0],
    '--marketing-wave-cool-mid': palette.waveCoolStops[1],
    '--marketing-wave-cool-end': palette.waveCoolStops[2],
  };

  if (brandColor) {
    vars['--marketing-indigo'] = brandColor;
  }

  return vars;
}
