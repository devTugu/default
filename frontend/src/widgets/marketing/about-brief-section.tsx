import { getLocale, getTranslations } from 'next-intl/server';
import type { SiteSettingsAbout } from '@/entities/site-settings';
import { ROUTES } from '@/shared/config/routes';
import type { Locale } from '@/shared/i18n/config';
import { pickLocalized } from '@/shared/lib/pick-localized';
import { cn } from '@/shared/lib/utils';
import {
  MarketingButton,
  MarketingLayoutCell,
  MarketingLayoutGrid,
  MarketingLayoutMedia,
  Section,
  SectionHeader,
} from '@/widgets/marketing/ui';

interface AboutBriefSectionProps {
  about: SiteSettingsAbout;
  className?: string;
}

export async function AboutBriefSection({
  about,
  className,
}: AboutBriefSectionProps) {
  const t = await getTranslations('marketing.about');
  const locale = (await getLocale()) as Locale;
  const brief = pickLocalized(about.brief, locale);

  if (!brief) {
    return null;
  }

  const title = t('briefTitle');
  const imageAlt = title;

  return (
    <Section id="about" allowBleed className={cn(className)}>
      <MarketingLayoutGrid>
        <MarketingLayoutCell colStart={1} colSpan={2} layer="content">
          <SectionHeader align="left" className="mb-0" title={title} description={brief} />
          <div className="mt-8 flex flex-wrap gap-4">
            <MarketingButton href={ROUTES.SITE_SETTINGS} variant="secondary">
              {t('learnMore')}
            </MarketingButton>
          </div>
        </MarketingLayoutCell>
        {about.imageUrl ? (
          <MarketingLayoutCell colStart={3} colSpan={2} layer="media">
            <MarketingLayoutMedia src={about.imageUrl} alt={imageAlt} bleed="right" />
          </MarketingLayoutCell>
        ) : null}
      </MarketingLayoutGrid>
    </Section>
  );
}
