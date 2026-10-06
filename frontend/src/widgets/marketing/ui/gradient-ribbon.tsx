import { cn } from '@/shared/lib/utils';

interface GradientRibbonProps {
  className?: string;
}

/** Flowing mesh ribbon — Stripe contact / pre-footer visual */
export function GradientRibbon({ className }: GradientRibbonProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-x-0 overflow-hidden', className)}
    >
      <div
        className="absolute left-1/2 h-[280px] w-[140%] -translate-x-1/2 rotate-[-3deg] blur-2xl md:h-[360px]"
        style={{ background: 'var(--marketing-ribbon-gradient)' }}
      />
    </div>
  );
}
