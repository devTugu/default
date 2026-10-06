'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';
import {
  readMeshColorsFromElement,
  readRibbonPaletteFromElement,
} from '@/widgets/marketing/lib/marketing/read-marketing-css-colors';
import {
  drawRibbonWaves,
  resolveRibbonLineCount,
} from '@/widgets/marketing/lib/marketing/ribbon-wave';
import { cn } from '@/shared/lib/utils';
import { AnimatedMesh } from './animated-mesh';

interface RibbonWaveFieldProps {
  className?: string;
}

function resolveThemeRoot(element: HTMLElement): HTMLElement {
  return element.closest('[data-marketing-theme-root]') ?? document.documentElement;
}

/** Animated ribbon strands + WebGL mesh — colors from site brand via layout CSS vars. */
export function RibbonWaveField({ className }: RibbonWaveFieldProps) {
  const mounted = useIsMounted();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = mounted && !prefersReducedMotion;
  const [meshColors, setMeshColors] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    setMeshColors(readMeshColorsFromElement(resolveThemeRoot(container)));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const themeRoot = resolveThemeRoot(container);

    let frameId = 0;
    const start = performance.now();

    const render = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width <= 0 || height <= 0) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const elapsed = (now - start) / 1000;
      const palette = readRibbonPaletteFromElement(themeRoot);

      drawRibbonWaves(ctx, {
        width,
        height,
        time: animate ? elapsed : 0,
        lineCount: resolveRibbonLineCount(width),
        palette,
      });
    };

    const loop = (now: number) => {
      render(now);
      if (animate) frameId = requestAnimationFrame(loop);
    };

    render(performance.now());
    if (animate) frameId = requestAnimationFrame(loop);

    const resizeObserver = new ResizeObserver(() => render(performance.now()));
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [animate]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <AnimatedMesh
        variant="fill"
        className="z-0 opacity-[0.38]"
        gradientColors={meshColors}
      />
      <div className="absolute inset-0 z-[1] bg-[var(--marketing-wave-section-bg)]/45" />
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] h-full w-full" />
    </div>
  );
}
