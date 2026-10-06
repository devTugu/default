'use client';

import { cn } from '@/shared/lib/utils';
import { RibbonWaveField } from './ribbon-wave-field';

interface FlowingWavesProps {
  className?: string;
}

/** Thin ribbon band — prefer WaveStatsSection for full Stripe-style block. */
export function FlowingWaves({ className }: FlowingWavesProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative h-56 w-full overflow-hidden sm:h-72 md:h-80',
        'bg-[var(--marketing-wave-section-bg)]',
        className,
      )}
    >
      <RibbonWaveField />
    </div>
  );
}
