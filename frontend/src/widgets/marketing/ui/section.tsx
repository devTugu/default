import { cn } from '@/shared/lib/utils';
import { MarketingColumnGrid } from './marketing-column-grid';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /** Four-column vertical guides for this section. */
  showGridPattern?: boolean;
  columnGridClassName?: string;
  /** Allow media to bleed onto grid lines (uses overflow-visible). */
  allowBleed?: boolean;
}

export function Section({
  id,
  className,
  children,
  showGridPattern = true,
  columnGridClassName,
  allowBleed = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24',
        showGridPattern && 'relative',
        showGridPattern && (allowBleed ? 'overflow-visible' : 'overflow-hidden'),
        className,
      )}
    >
      {showGridPattern ? (
        <MarketingColumnGrid className={cn('z-[1]', columnGridClassName)} />
      ) : null}
      {showGridPattern ? (
        <div className="relative z-[2]">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
