import type { SiteSettingsOutput } from '@/entities/site-settings';
import { locKeywords, locText, locTextOrEmpty } from './site-settings-form.localized';
import type { SiteSettingsFormValues } from './site-settings-form.values';

function mapHero(
  hero: SiteSettingsOutput['hero'],
): SiteSettingsFormValues['hero'] {
  return {
    ...hero,
    title: locText(hero.title),
    subtitle: locText(hero.subtitle),
    description: locText(hero.description),
    ctaLabel: locText(hero.ctaLabel),
    ctaUrl: hero.ctaUrl ?? '',
    secondaryCtaLabel: locText(hero.secondaryCtaLabel),
    secondaryCtaUrl: hero.secondaryCtaUrl ?? '',
    imageUrl: hero.imageUrl ?? '',
  };
}

function mapHeader(
  header: SiteSettingsOutput['header'],
): SiteSettingsFormValues['header'] {
  return {
    ...header,
    logoUrl: header.logoUrl ?? '',
    logoDarkUrl: header.logoDarkUrl ?? '',
    adminLogoUrl: header.adminLogoUrl ?? '',
    faviconUrl: header.faviconUrl ?? '',
    siteName: locText(header.siteName),
  };
}

function mapFooter(
  footer: SiteSettingsOutput['footer'],
): SiteSettingsFormValues['footer'] {
  return {
    ...footer,
    copyright: locText(footer.copyright),
    tagline: locText(footer.tagline),
    socialLinks: (footer.socialLinks ?? []).map((link) => ({
      platform: link.platform ?? '',
      url: link.url ?? '',
    })),
  };
}

function mapSeo(
  seo: SiteSettingsOutput['seo'],
): SiteSettingsFormValues['seo'] {
  return {
    ...seo,
    title: locText(seo.title),
    description: locText(seo.description),
    ogImageUrl: seo.ogImageUrl ?? '',
    keywords: locKeywords(seo.keywords),
  };
}

function mapContact(
  contactInfo: SiteSettingsOutput['contactInfo'],
): SiteSettingsFormValues['contactInfo'] {
  return {
    ...contactInfo,
    email: contactInfo.email ?? '',
    phone: contactInfo.phone ?? '',
    location: locTextOrEmpty(contactInfo.location),
    address: locTextOrEmpty(contactInfo.address),
    workHours: locTextOrEmpty(contactInfo.workHours),
    showForm: contactInfo.showForm ?? true,
  };
}

function mapAbout(
  about: SiteSettingsOutput['about'],
): SiteSettingsFormValues['about'] {
  return {
    brief: locText(about?.brief),
    mission: locText(about?.mission),
    vision: locText(about?.vision),
    imageUrl: about?.imageUrl ?? '',
    values: about?.values ?? [],
    stats: about?.stats ?? [],
  };
}

export function toSiteSettingsFormValues(
  data: SiteSettingsOutput,
): SiteSettingsFormValues {
  return {
    hero: mapHero(data.hero),
    header: mapHeader(data.header),
    footer: mapFooter(data.footer),
    seo: mapSeo(data.seo),
    contactInfo: mapContact(data.contactInfo),
    theme: { brandColor: data.theme?.brandColor ?? '' },
    about: mapAbout(data.about),
  };
}
