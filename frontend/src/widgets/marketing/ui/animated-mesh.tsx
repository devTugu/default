'use client';

import { useEffect, useRef } from 'react';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';
import { StripeGradientEngine } from '@/widgets/marketing/lib/stripe-gradient';
import { STRIPE_GRADIENT_DEFAULT_COLORS } from '@/widgets/marketing/lib/stripe-gradient/stripe-gradient-config';
import { cn } from '@/shared/lib/utils';
import { GradientMeshBlobs } from './gradient-mesh-blobs';
import { meshBandClipStyle, meshBandShellClassName } from './mesh-band-layout';

interface AnimatedMeshProps {
  className?: string;
  gradientColors?: readonly string[];
  /** `hero-band` clips like the landing hero; `fill` covers the parent box. */
  variant?: 'hero-band' | 'fill';
}

export function AnimatedMesh({
  className,
  gradientColors,
  variant = 'hero-band',
}: AnimatedMeshProps) {
  const mounted = useIsMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const showCanvas = mounted && !prefersReducedMotion;
  const stripeColors = gradientColors?.length
    ? [...gradientColors]
    : [...STRIPE_GRADIENT_DEFAULT_COLORS];
  const colorsKey = stripeColors.join(',');

  useEffect(() => {
    if (!showCanvas) return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    let engine: StripeGradientEngine | null = null;

    const ensureEngine = (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;

      if (!engine) {
        try {
          engine = new StripeGradientEngine({
            canvas,
            width,
            height,
            colors: stripeColors,
          });
          engine.play();
        } catch {
          return;
        }
      }

      engine.resize(width, height);
    };

    ensureEngine(container.clientWidth, container.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      ensureEngine(width, height);
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        engine?.setVisible(entry?.isIntersecting ?? true);
      },
      { threshold: 0, rootMargin: '100px 0px' },
    );
    intersectionObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      engine?.disconnect();
    };
  }, [showCanvas, colorsKey]);

  const shellClassName =
    variant === 'fill'
      ? 'pointer-events-none absolute inset-0 overflow-hidden'
      : meshBandShellClassName;

  return (
    <div aria-hidden className={cn(shellClassName, className)}>
      <div
        className="absolute inset-0"
        style={variant === 'fill' ? undefined : meshBandClipStyle}
      >
        <GradientMeshBlobs />
        {showCanvas ? (
          <div ref={containerRef} className="absolute inset-0">
            <canvas ref={canvasRef} className="block h-full w-full" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
