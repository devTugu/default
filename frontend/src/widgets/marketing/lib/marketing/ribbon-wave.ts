export interface Point2D {
  x: number;
  y: number;
}

export interface RibbonCurve {
  p0: Point2D;
  p1: Point2D;
  p2: Point2D;
  p3: Point2D;
}

export interface RibbonWavePalette {
  warm: readonly string[];
  cool: readonly string[];
}

export interface RibbonWaveOptions {
  width: number;
  height: number;
  time?: number;
  lineCount?: number;
  palette?: RibbonWavePalette;
}

const DEFAULT_PALETTE: RibbonWavePalette = {
  warm: ['#ffb199', '#ff7eb3', '#d896ff', '#c4a5ff'],
  cool: ['#4a3f8c', '#7b5ea7', '#b565d8', '#f065c3'],
};

const WARM_CURVE: RibbonCurve = {
  p0: { x: -0.15, y: 0.62 },
  p1: { x: 0.2, y: 0.12 },
  p2: { x: 0.55, y: 0.88 },
  p3: { x: 1.15, y: 0.38 },
};

const COOL_CURVE: RibbonCurve = {
  p0: { x: -0.15, y: 0.34 },
  p1: { x: 0.2, y: 0.82 },
  p2: { x: 0.55, y: 0.14 },
  p3: { x: 1.15, y: 0.58 },
};

const RIBBON_THICKNESS_RATIO = 0.32;
const SAMPLE_STEPS = 180;

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function cubicPoint(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function cubicTangent(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const u = 1 - t;
  return 3 * u * u * (p1 - p0) + 6 * u * t * (p2 - p1) + 3 * t * t * (p3 - p2);
}

function sampleCurve(t: number, curve: RibbonCurve, width: number, height: number): Point2D {
  return {
    x: cubicPoint(t, curve.p0.x, curve.p1.x, curve.p2.x, curve.p3.x) * width,
    y: cubicPoint(t, curve.p0.y, curve.p1.y, curve.p2.y, curve.p3.y) * height,
  };
}

function lerpColor(stops: readonly string[], t: number): string {
  const clamped = clamp01(t);
  if (stops.length === 1) return stops[0];
  const segment = clamped * (stops.length - 1);
  const index = Math.floor(segment);
  const next = Math.min(index + 1, stops.length - 1);
  const localT = segment - index;
  return mixHex(stops[index], stops[next], localT);
}

function mixHex(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace('#', '');
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ] as const;
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)}, ${Math.round(g1 + (g2 - g1) * t)}, ${Math.round(b1 + (b2 - b1) * t)})`;
}

function buildStrandPoints(
  curve: RibbonCurve,
  strandIndex: number,
  lineCount: number,
  width: number,
  height: number,
  time: number,
): Point2D[] {
  const center = (lineCount - 1) / 2;
  const normalizedIndex = (strandIndex - center) / center;
  const maxSpread = height * RIBBON_THICKNESS_RATIO * 0.5;
  const points: Point2D[] = [];

  for (let i = 0; i <= SAMPLE_STEPS; i += 1) {
    const t = i / SAMPLE_STEPS;
    const flow = time * 0.14 + strandIndex * 0.0035;
    const sampleT = clamp01(t + Math.sin(flow + t * 2) * 0.012);
    const base = sampleCurve(sampleT, curve, width, height);
    const tx = cubicTangent(sampleT, curve.p0.x, curve.p1.x, curve.p2.x, curve.p3.x);
    const ty = cubicTangent(sampleT, curve.p0.y, curve.p1.y, curve.p2.y, curve.p3.y);
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;
    const fan = 1 + Math.pow(t, 1.5) * 4.2;
    const weave =
      Math.sin(t * Math.PI * 12 + time * 2.2 + strandIndex * 0.28) * maxSpread * 0.07;
    const spread = normalizedIndex * maxSpread * fan + weave;

    points.push({
      x: base.x + nx * spread,
      y: base.y + ny * spread,
    });
  }

  return points;
}

/** Horizontal gradient along each strand (peach left → purple right). */
function strokeStrandWithGradient(
  ctx: CanvasRenderingContext2D,
  points: Point2D[],
  colors: readonly string[],
  canvasWidth: number,
  style: {
    alpha: number;
    width: number;
    dash?: readonly [number, number];
    dashOffset?: number;
  },
): void {
  ctx.lineWidth = style.width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (style.dash) {
    ctx.setLineDash([...style.dash]);
    ctx.lineDashOffset = style.dashOffset ?? 0;
  } else {
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
  }

  for (let i = 1; i < points.length; i += 1) {
    const start = points[i - 1];
    const end = points[i];
    const t = clamp01(((start.x + end.x) * 0.5) / canvasWidth);
    ctx.strokeStyle = lerpColor(colors, t);
    ctx.globalAlpha = style.alpha;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }
}

function drawRibbonStrand(
  ctx: CanvasRenderingContext2D,
  curve: RibbonCurve,
  strandIndex: number,
  lineCount: number,
  width: number,
  height: number,
  colors: readonly string[],
  time: number,
): void {
  const center = (lineCount - 1) / 2;
  const normalizedIndex = (strandIndex - center) / center;
  const edgeFade = 1 - Math.abs(normalizedIndex) * 0.55;
  const points = buildStrandPoints(curve, strandIndex, lineCount, width, height, time);
  const dashOffset = -time * 62 - strandIndex * 2.4;

  strokeStrandWithGradient(ctx, points, colors, width, {
    alpha: 0.05 + edgeFade * 0.04,
    width: 2.2,
  });

  strokeStrandWithGradient(ctx, points, colors, width, {
    alpha: 0.12 + edgeFade * 0.28,
    width: 0.55,
    dash: [2, 7],
    dashOffset,
  });
}

function drawRibbon(
  ctx: CanvasRenderingContext2D,
  curve: RibbonCurve,
  colors: readonly string[],
  options: Required<Pick<RibbonWaveOptions, 'width' | 'height' | 'time' | 'lineCount'>>,
): void {
  for (let i = 0; i < options.lineCount; i += 1) {
    drawRibbonStrand(
      ctx,
      curve,
      i,
      options.lineCount,
      options.width,
      options.height,
      colors,
      options.time,
    );
  }
}

export function resolveRibbonLineCount(width: number): number {
  if (width < 480) return 72;
  if (width < 768) return 96;
  if (width < 1200) return 120;
  return 140;
}

/** Stripe-style parallel-line ribbon waves on a dark canvas. */
export function drawRibbonWaves(
  ctx: CanvasRenderingContext2D,
  options: RibbonWaveOptions,
): void {
  const width = options.width;
  const height = options.height;
  const time = options.time ?? 0;
  const lineCount = options.lineCount ?? resolveRibbonLineCount(width);
  const palette = options.palette ?? DEFAULT_PALETTE;

  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'lighter';

  const shared = { width, height, time, lineCount };
  drawRibbon(ctx, WARM_CURVE, palette.warm, shared);
  drawRibbon(ctx, COOL_CURVE, palette.cool, { ...shared, time: time * 1.06 + 0.4 });
}
