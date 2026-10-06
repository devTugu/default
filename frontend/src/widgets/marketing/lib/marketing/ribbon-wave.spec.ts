import { describe, expect, it } from 'vitest';
import { drawRibbonWaves, resolveRibbonLineCount } from './ribbon-wave';

describe('drawRibbonWaves', () => {
  it('renders without throwing on a mock canvas', () => {
    const calls: string[] = [];
    const ctx = {
      clearRect: () => undefined,
      beginPath: () => undefined,
      moveTo: () => undefined,
      lineTo: () => undefined,
      stroke: () => undefined,
      set globalCompositeOperation(value: string) {
        calls.push(value);
      },
      set globalAlpha(_value: number) {
        /* noop */
      },
      set strokeStyle(_value: string) {
        /* noop */
      },
      set lineWidth(_value: number) {
        /* noop */
      },
      setLineDash: () => undefined,
      set lineDashOffset(_value: number) {
        /* noop */
      },
    } as unknown as CanvasRenderingContext2D;

    expect(() =>
      drawRibbonWaves(ctx, {
        width: 800,
        height: 400,
        time: 0,
        lineCount: resolveRibbonLineCount(800),
      }),
    ).not.toThrow();
    expect(calls).toContain('lighter');
  });
});
