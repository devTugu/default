import type { CSSProperties } from 'react';

/** Stripe landing — four equal columns framed by five vertical guides. */
export const MARKETING_COLUMN_COUNT = 4;

/** Five vertical lines at 0 / 25 / 50 / 75 / 100 % of the inset grid track. */
export const MARKETING_COLUMN_LINE_PERCENTAGES = [0, 25, 50, 75, 100] as const;

export type MarketingColumnLinePercent =
  (typeof MARKETING_COLUMN_LINE_PERCENTAGES)[number];

export type MarketingColumnIndex = 1 | 2 | 3 | 4;
export type MarketingColumnSpan = 1 | 2 | 3 | 4;

export const MARKETING_GRID_EDGE_INSET_VAR = '--marketing-grid-edge-inset';

const GRID_EDGE_INSET = `var(${MARKETING_GRID_EDGE_INSET_VAR})`;
const GRID_INNER_TRACK = `calc(100% - 2 * ${GRID_EDGE_INSET})`;

export interface LayoutCellClassInput {
  colStart?: MarketingColumnIndex;
  colSpan?: MarketingColumnSpan;
}

const COL_START_CLASSES: Record<MarketingColumnIndex, string> = {
  1: 'lg:col-start-1',
  2: 'lg:col-start-2',
  3: 'lg:col-start-3',
  4: 'lg:col-start-4',
};

const COL_SPAN_CLASSES: Record<MarketingColumnSpan, string> = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
};

/** CSS position for a decorative column guide line. */
export function columnLineStyle(percent: MarketingColumnLinePercent): CSSProperties {
  if (percent === 0) {
    return { left: GRID_EDGE_INSET };
  }

  if (percent === 100) {
    return { right: GRID_EDGE_INSET };
  }

  return {
    left: `calc(${GRID_EDGE_INSET} + ${GRID_INNER_TRACK} * ${percent / 100})`,
  };
}

/** Inline style for grid-aligned content tracks (matches column overlay inset). */
export function marketingLayoutGridStyle(): CSSProperties {
  return { paddingInline: GRID_EDGE_INSET };
}

/** Tailwind classes for desktop column placement within MarketingLayoutGrid. */
export function resolveLayoutCellClasses({
  colStart,
  colSpan = 1,
}: LayoutCellClassInput): string {
  const classes = ['col-span-1'];

  if (colSpan) {
    classes.push(COL_SPAN_CLASSES[colSpan]);
  }

  if (colStart) {
    classes.push(COL_START_CLASSES[colStart]);
  }

  return classes.join(' ');
}

export type LayoutBleed = 'left' | 'right' | 'both' | 'none';

const BLEED_CLASSES: Record<LayoutBleed, string> = {
  left: '-ml-px',
  right: '-mr-px',
  both: '-mx-px',
  none: '',
};

export function resolveBleedClasses(bleed: LayoutBleed = 'none'): string {
  return BLEED_CLASSES[bleed];
}

export type LayoutLayer = 'content' | 'media';

const LAYER_CLASSES: Record<LayoutLayer, string> = {
  content: 'relative z-[2]',
  media: 'relative z-[3]',
};

export function resolveLayerClasses(layer: LayoutLayer = 'content'): string {
  return LAYER_CLASSES[layer];
}
