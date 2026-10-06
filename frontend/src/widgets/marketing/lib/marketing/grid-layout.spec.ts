import { describe, expect, it } from 'vitest';
import {
  columnLineStyle,
  marketingLayoutGridStyle,
  resolveBleedClasses,
  resolveLayoutCellClasses,
  resolveLayerClasses,
} from './grid-layout';

describe('grid-layout', () => {
  describe('columnLineStyle', () => {
    it('positions outer lines at edge inset', () => {
      expect(columnLineStyle(0)).toEqual({ left: 'var(--marketing-grid-edge-inset)' });
      expect(columnLineStyle(100)).toEqual({ right: 'var(--marketing-grid-edge-inset)' });
    });

    it('positions inner lines with calc track', () => {
      expect(columnLineStyle(25)).toEqual({
        left:
          'calc(var(--marketing-grid-edge-inset) + calc(100% - 2 * var(--marketing-grid-edge-inset)) * 0.25)',
      });
      expect(columnLineStyle(50)).toEqual({
        left:
          'calc(var(--marketing-grid-edge-inset) + calc(100% - 2 * var(--marketing-grid-edge-inset)) * 0.5)',
      });
    });
  });

  describe('marketingLayoutGridStyle', () => {
    it('applies inline edge inset padding', () => {
      expect(marketingLayoutGridStyle()).toEqual({
        paddingInline: 'var(--marketing-grid-edge-inset)',
      });
    });
  });

  describe('resolveLayoutCellClasses', () => {
    it('defaults to single mobile column', () => {
      expect(resolveLayoutCellClasses({})).toBe('col-span-1 lg:col-span-1');
    });

    it('maps start and span for split layouts', () => {
      expect(resolveLayoutCellClasses({ colStart: 3, colSpan: 2 })).toBe(
        'col-span-1 lg:col-span-2 lg:col-start-3',
      );
    });
  });

  describe('resolveBleedClasses', () => {
    it('maps bleed directions', () => {
      expect(resolveBleedClasses('right')).toBe('-mr-px');
      expect(resolveBleedClasses('none')).toBe('');
    });
  });

  describe('resolveLayerClasses', () => {
    it('maps z-index layers', () => {
      expect(resolveLayerClasses('media')).toBe('relative z-[3]');
      expect(resolveLayerClasses('content')).toBe('relative z-[2]');
    });
  });
});
