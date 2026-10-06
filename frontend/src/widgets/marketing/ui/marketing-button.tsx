import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

type MarketingButtonVariant = 'primary' | 'secondary' | 'ghost' | 'signIn';

interface MarketingButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: MarketingButtonVariant;
  className?: string;
  external?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
}

const variantClasses: Record<MarketingButtonVariant, string> = {
  primary:
    'bg-[var(--marketing-indigo)] text-white hover:bg-[oklch(0.4_0.2_264)] shadow-sm',
  secondary:
    'bg-background text-foreground border border-border hover:bg-muted/50',
  ghost: 'text-[var(--marketing-indigo)] hover:text-[oklch(0.4_0.2_264)]',
  signIn:
    'bg-[var(--marketing-navy)] text-white hover:bg-[oklch(0.18_0.04_264)] shadow-sm',
};

export function MarketingButton({
  href,
  children,
  variant = 'primary',
  className,
  external,
  showArrow = variant !== 'ghost' && variant !== 'signIn',
  onClick,
}: MarketingButtonProps) {
  const classes = cn(
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
    variantClasses[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
      {showArrow ? <ArrowIcon /> : null}
    </Link>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M1 5h7M5 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
