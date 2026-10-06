import { cn } from '@/shared/lib/utils';
import {
  MarketingLayoutCell as LayoutCell,
  MarketingLayoutGrid as LayoutGrid,
} from './layout';

/** @deprecated Use `MarketingLayoutGrid` from `@/widgets/marketing/ui/layout`. */
export function MarketingGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
  /** @deprecated Dividers are handled by MarketingColumnGrid overlay. */
  showDividers?: boolean;
}) {
  return <LayoutGrid className={className}>{children}</LayoutGrid>;
}

/** @deprecated Use `MarketingLayoutCell` from `@/widgets/marketing/ui/layout`. */
export function MarketingGridCell({
  className,
  children,
  span = 1,
}: {
  className?: string;
  children: React.ReactNode;
  span?: 1 | 2 | 3 | 4;
}) {
  return (
    <LayoutCell colSpan={span} className={cn('px-4 py-8 md:px-6 lg:px-4', className)}>
      {children}
    </LayoutCell>
  );
}
