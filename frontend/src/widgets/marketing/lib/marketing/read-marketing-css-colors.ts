import type { RibbonWavePalette } from './ribbon-wave';

const MESH_FALLBACK = ['#a960ee', '#ff6b9d', '#90e0ff', '#ff9a8b'] as const;

const WAVE_WARM_FALLBACK = ['#ff9a8b', '#ff6b9d', '#d896ff', '#a872ff'] as const;
const WAVE_COOL_FALLBACK = ['#764ba2', '#6b7fd7', '#667eea'] as const;

function readCssVar(element: HTMLElement, name: string): string {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

/** Reads layout-injected mesh colors (brand-aware via marketing layout). */
export function readMeshColorsFromElement(element: HTMLElement): string[] {
  return [1, 2, 3, 4].map((index, i) => {
    const value = readCssVar(element, `--marketing-mesh-color-${index}`);
    return value || MESH_FALLBACK[i];
  });
}

/** Reads warm/cool ribbon stops from CSS variables set by site brand color. */
export function readRibbonPaletteFromElement(element: HTMLElement): RibbonWavePalette {
  const warmMid = readCssVar(element, '--marketing-wave-warm-mid');
  return {
    warm: [
      readCssVar(element, '--marketing-wave-warm-start') || WAVE_WARM_FALLBACK[0],
      warmMid || WAVE_WARM_FALLBACK[1],
      warmMid || WAVE_WARM_FALLBACK[2],
      readCssVar(element, '--marketing-wave-warm-end') || WAVE_WARM_FALLBACK[3],
    ],
    cool: [
      readCssVar(element, '--marketing-wave-cool-start') || WAVE_COOL_FALLBACK[0],
      readCssVar(element, '--marketing-wave-cool-mid') || WAVE_COOL_FALLBACK[1],
      readCssVar(element, '--marketing-wave-cool-end') || WAVE_COOL_FALLBACK[2],
    ],
  };
}
