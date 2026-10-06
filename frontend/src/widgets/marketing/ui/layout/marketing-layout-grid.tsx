import { cn } from '@/shared/lib/utils';
import { marketingLayoutGridStyle } from '@/widgets/marketing/lib/marketing/grid-layout';

interface MarketingLayoutGridProps {
  className?: string;
  children: React.ReactNode;
}

/** Four-column content grid aligned to marketing column overlay lines. */
export function MarketingLayoutGrid({ className, children }: MarketingLayoutGridProps) {
  return (
    <div
      className={cn(
        'mx-auto grid w-full max-w-[var(--marketing-max-width)] grid-cols-1 gap-0 lg:grid-cols-4',
        className,
      )}
      style={marketingLayoutGridStyle()}
    >
      {children}
    </div>
  );
}
