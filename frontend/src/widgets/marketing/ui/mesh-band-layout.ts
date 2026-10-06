/**
 * Stripe hero mesh band — Figma "New Stripe Website" stripeLanding (node 1:4).
 * Straight diagonal bottom edge (no curve control point).
 *
 * Percentages are relative to the hero section height:
 * - left: where the cut meets the left edge (lower = more gradient on the left)
 * - right: where the cut meets the right edge (lower = more gradient on the right)
 *
 * @see https://www.figma.com/design/X409qhMoOIFjTDnGRihd7i/New-Stripe-Website--Community-?node-id=1-4
 */
export const MESH_CLIP_LEFT_PERCENT = 60;
export const MESH_CLIP_RIGHT_PERCENT = 20;

/** Straight line: (0, left%) → (100%, right%) */
export const MESH_CLIP_PATH = `polygon(0 0, 100% 0, 100% ${MESH_CLIP_RIGHT_PERCENT}%, 0 ${MESH_CLIP_LEFT_PERCENT}%)`;

export const meshBandShellClassName =
  'pointer-events-none absolute inset-x-0 -top-16 bottom-0 overflow-hidden';

export const meshBandClipStyle = {
  clipPath: MESH_CLIP_PATH,
  WebkitClipPath: MESH_CLIP_PATH,
} as const;
