import {
  type LayoutBleed,
  type LayoutLayer,
  type MarketingColumnIndex,
  type MarketingColumnSpan,
  resolveBleedClasses,
  resolveLayerClasses,
  resolveLayoutCellClasses,
} from '@/widgets/marketing/lib/marketing/grid-layout';
import { cn } from '@/shared/lib/utils';

interface MarketingLayoutCellProps {
  className?: string;
  children: React.ReactNode;
  colStart?: MarketingColumnIndex;
  colSpan?: MarketingColumnSpan;
  bleed?: LayoutBleed;
  layer?: LayoutLayer;
  mobileOrder?: number;
}

export function MarketingLayoutCell({
  className,
  children,
  colStart,
  colSpan,
  bleed = 'none',
  layer = 'content',
  mobileOrder,
}: MarketingLayoutCellProps) {
  return (
    <div
      className={cn(
        resolveLayoutCellClasses({ colStart, colSpan }),
        resolveLayerClasses(layer),
        resolveBleedClasses(bleed),
        className,
      )}
      style={mobileOrder !== undefined ? { order: mobileOrder } : undefined}
    >
      {children}
    </div>
  );
}
