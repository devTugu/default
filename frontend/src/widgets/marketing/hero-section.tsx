import { getLocale, getTranslations } from 'next-intl/server';
import type { SiteSettingsHero } from '@/entities/site-settings';
import { ROUTES } from '@/shared/config/routes';
import { resolveEnvBrandName } from '@/shared/config/brand';
import type { Locale } from '@/shared/i18n/config';
import { buildBrandHeroPalette } from '@/widgets/marketing/lib/marketing/brand-hero-palette';
import { normalizeHexColor } from '@/shared/lib/normalize-hex-color';
import { pickLocalized } from '@/shared/lib/pick-localized';
import {
  AnimatedMesh,
  MarketingButton,
  MarketingColumnGrid,
  MarketingLayoutCell,
  MarketingLayoutGrid,
  MarketingLayoutMedia,
  Section,
} from '@/widgets/marketing/ui';

interface HeroSectionProps {
  hero: SiteSettingsHero;
  brandColor?: string | null;
}

export async function HeroSection({ hero, brandColor }: HeroSectionProps) {
  const t = await getTranslations('marketing.hero');
  const locale = (await getLocale()) as Locale;
  const brandName = resolveEnvBrandName();
  const heroPalette = buildBrandHeroPalette(normalizeHexColor(brandColor));

  const title =
    pickLocalized(hero.title, locale) ||
    t('fallbackTitle', { brandName });
  const description =
    pickLocalized(hero.description, locale) ||
    t('fallbackDescription', { brandName });
  const bannerText = pickLocalized(hero.subtitle, locale) || t('bannerLabel');
  const primaryLabel = pickLocalized(hero.ctaLabel, locale) || t('primaryCta');
  const primaryHref = hero.ctaUrl || ROUTES.DASHBOARD;
  const secondaryLabel =
    pickLocalized(hero.secondaryCtaLabel, locale) || t('secondaryCta');
  const secondaryHref = hero.secondaryCtaUrl || ROUTES.SITE_SETTINGS;

  const heroContent = (
    <div className="space-y-6">
      <div className="bg-[var(--marketing-pill-bg)] inline-flex items-center gap-2 rounded-full border border-border/40 px-4 py-2 text-sm">
        <span>{bannerText}</span>
      </div>
      <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-6xl md:leading-[1.05]">
        {title}
      </h1>
      <p className="text-muted-foreground max-w-xl text-xl">{description}</p>
      <div className="flex flex-wrap gap-4 pt-2">
        <MarketingButton href={primaryHref} variant="primary">
          {primaryLabel}
        </MarketingButton>
        <MarketingButton href={secondaryHref} variant="secondary">
          {secondaryLabel}
        </MarketingButton>
      </div>
    </div>
  );

  return (
    <Section
      showGridPattern={false}
      className="relative -mt-16 min-h-svh pt-16 pb-0"
    >
      <MarketingColumnGrid className="z-[1]" />
      <AnimatedMesh className="z-[2]" gradientColors={heroPalette.stripeColors} />

      <div className="relative z-[3] flex min-h-[calc(100svh-4rem)] flex-col justify-center py-12 md:py-16">
        {hero.imageUrl ? (
          <MarketingLayoutGrid>
            <MarketingLayoutCell colStart={1} colSpan={2} layer="content">
              {heroContent}
            </MarketingLayoutCell>
            <MarketingLayoutCell colStart={3} colSpan={2} layer="media">
              <MarketingLayoutMedia
                src={hero.imageUrl}
                alt={title}
                bleed="right"
                priority
              />
            </MarketingLayoutCell>
          </MarketingLayoutGrid>
        ) : (
          <MarketingLayoutGrid>
            <MarketingLayoutCell colStart={1} colSpan={2} layer="content">
              {heroContent}
            </MarketingLayoutCell>
          </MarketingLayoutGrid>
        )}
      </div>
    </Section>
  );
}
