'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import { Button } from '@default/ui/primitives/button';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { cn } from '@/shared/lib/utils';

interface SiteHeaderDesktopNavProps {
  authHref: string;
  authLabel: string;
  isTransparent: boolean;
}

export function SiteHeaderDesktopNav({
  authHref,
  authLabel,
  isTransparent,
}: SiteHeaderDesktopNavProps) {
  return (
    <div className="hidden items-center gap-2 lg:ml-auto lg:flex">
      <ThemeToggle
        className={cn(
          isTransparent && 'text-white hover:bg-white/10 hover:text-white',
        )}
      />
      <Link
        href={authHref}
        className={cn(
          'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          isTransparent
            ? 'text-white/90 hover:bg-white/10 hover:text-white'
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        )}
      >
        {authLabel}
      </Link>
      <LocaleSwitcher
        variant="flags"
        className={cn(isTransparent && 'text-white hover:bg-white/10')}
      />
    </div>
  );
}

interface SiteHeaderMobileToggleProps {
  mobileOpen: boolean;
  isTransparent: boolean;
  onToggle: () => void;
}

export function SiteHeaderMobileToggle({
  mobileOpen,
  isTransparent,
  onToggle,
}: SiteHeaderMobileToggleProps) {
  const t = useTranslations('marketing.nav');

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
      onClick={onToggle}
      className={cn(
        'ml-auto lg:hidden',
        isTransparent && 'text-white hover:bg-white/10',
      )}
    >
      {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
    </Button>
  );
}

interface SiteHeaderMobileMenuProps {
  authHref: string;
  authLabel: string;
  onNavigate: () => void;
}

export function SiteHeaderMobileMenu({
  authHref,
  authLabel,
  onNavigate,
}: SiteHeaderMobileMenuProps) {
  return (
    <div className="border-border/60 bg-background/95 border-t px-4 py-4 lg:hidden">
      <div className="flex flex-col gap-3">
        <Link
          href={authHref}
          className="text-sm font-medium"
          onClick={onNavigate}
        >
          {authLabel}
        </Link>
        <LocaleSwitcher variant="flags" />
      </div>
    </div>
  );
}
