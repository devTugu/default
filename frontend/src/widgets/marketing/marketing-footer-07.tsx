'use client';

import { useTranslations } from 'next-intl';
import Footer07 from '@default/ui/composed/footer/footer-07';
import { env } from '@/shared/config/env';
import { ROUTES } from '@/shared/config/routes';

export function MarketingFooter07() {
  const t = useTranslations('marketing.footer');
  const year = new Date().getFullYear();

  return (
    <Footer07
      homeHref={ROUTES.HOME}
      termsHref={ROUTES.TERMS}
      privacyHref={ROUTES.PRIVACY}
      termsLabel={t('termsLink')}
      privacyLabel={t('privacyLink')}
      copyrightLabel={t('copyright', { year, siteName: env.APP_NAME })}
    />
  );
}
