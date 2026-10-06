import { cn } from '@/shared/lib/utils';
import {
  columnLineStyle,
  MARKETING_COLUMN_COUNT,
  MARKETING_COLUMN_LINE_PERCENTAGES,
} from '@/widgets/marketing/lib/marketing/grid-layout';

export { MARKETING_COLUMN_COUNT, MARKETING_COLUMN_LINE_PERCENTAGES };

interface MarketingColumnGridProps {
  className?: string;
}

/**
 * Full-page vertical column guides aligned to `--marketing-max-width`.
 * Outer lines sit 10px inside the max-width box — not inside Container padding.
 */
export function MarketingColumnGrid({ className }: MarketingColumnGridProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)}
    >
      <div className="relative mx-auto h-full w-full max-w-[var(--marketing-max-width)]">
        {MARKETING_COLUMN_LINE_PERCENTAGES.map((percent) => (
          <div
            key={percent}
            className="absolute top-0 bottom-0 w-px bg-[var(--marketing-grid-line)]"
            style={columnLineStyle(percent)}
          />
        ))}
      </div>
    </div>
  );
}
