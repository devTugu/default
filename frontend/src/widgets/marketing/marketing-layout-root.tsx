'use client';

import type { CSSProperties, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { PUBLIC_ROUTES } from '@/shared/config/routes';
import { CookieConsentBanner } from './cookie-consent-banner';
import { MarketingSiteHeader } from './marketing-site-header';

type MarketingLayoutRootProps = {
  children: ReactNode;
  siteName: string;
  logoUrl?: string | null;
  logoDarkUrl?: string | null;
  hasSession: boolean;
  meshStyle: CSSProperties;
  footer: ReactNode;
};

/** Home uses Shadcn Space blocks full-bleed (same shell as docs previews). */
export function MarketingLayoutRoot({
  children,
  siteName,
  logoUrl,
  logoDarkUrl,
  hasSession,
  meshStyle,
  footer,
}: MarketingLayoutRootProps) {
  const isHome = usePathname() === PUBLIC_ROUTES.HOME;

  if (isHome) {
    return (
      <div className="relative isolate min-h-svh w-full min-w-0 overflow-x-hidden bg-background">
        {children}
        <CookieConsentBanner />
      </div>
    );
  }

  return (
    <div
      data-marketing-theme-root
      className="relative flex min-h-svh flex-col"
      style={meshStyle}
    >
      <MarketingSiteHeader
        siteName={siteName}
        logoUrl={logoUrl}
        logoDarkUrl={logoDarkUrl}
        hasSession={hasSession}
      />
      <main className="relative z-[2] flex-1">{children}</main>
      {footer}
      <CookieConsentBanner />
    </div>
  );
}
