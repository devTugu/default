'use client';

import { usePathname } from 'next/navigation';
import { PUBLIC_ROUTES } from '@/shared/config/routes';
import { SiteHeader } from '@/widgets/marketing/site-header';

interface MarketingSiteHeaderProps {
  siteName: string;
  logoUrl?: string | null;
  logoDarkUrl?: string | null;
  hasSession: boolean;
}

export function MarketingSiteHeader(props: MarketingSiteHeaderProps) {
  const pathname = usePathname();
  const hasHero = pathname === PUBLIC_ROUTES.HOME;

  return <SiteHeader {...props} hasHero={hasHero} />;
}
