import {
  SiteSettings,
  DEFAULT_SITE_SETTINGS,
  type SiteSettingsAbout,
  type SiteSettingsContactInfo,
  type SiteSettingsHeader,
  type SiteSettingsHero,
  type SiteSettingsTheme,
} from '@domain/site-setting/entities/site-settings.entity';
import type { siteSettings } from '../schema';

type SiteSettingRow = typeof siteSettings.$inferSelect;

function normalizeHeader(header: SiteSettingsHeader): SiteSettingsHeader {
  return {
    logoUrl: header.logoUrl ?? null,
    logoDarkUrl: header.logoDarkUrl ?? null,
    adminLogoUrl: header.adminLogoUrl ?? null,
    faviconUrl: header.faviconUrl ?? null,
    siteName: header.siteName,
  };
}

function normalizeHero(hero: SiteSettingsHero): SiteSettingsHero {
  return {
    ...hero,
    secondaryCtaLabel:
      hero.secondaryCtaLabel ?? DEFAULT_SITE_SETTINGS.hero.secondaryCtaLabel,
    secondaryCtaUrl:
      hero.secondaryCtaUrl ?? DEFAULT_SITE_SETTINGS.hero.secondaryCtaUrl,
  };
}

function normalizeContactInfo(
  contactInfo: SiteSettingsContactInfo,
): SiteSettingsContactInfo {
  return {
    ...contactInfo,
    address: contactInfo.address ?? null,
    workHours: contactInfo.workHours ?? null,
  };
}

function normalizeTheme(theme: SiteSettingsTheme): SiteSettingsTheme {
  return {
    brandColor: theme?.brandColor ?? null,
  };
}

function normalizeAbout(about: SiteSettingsAbout): SiteSettingsAbout {
  return {
    brief: about?.brief ?? DEFAULT_SITE_SETTINGS.about.brief,
    mission: about?.mission ?? DEFAULT_SITE_SETTINGS.about.mission,
    vision: about?.vision ?? DEFAULT_SITE_SETTINGS.about.vision,
    imageUrl: about?.imageUrl ?? null,
    values: about?.values ?? [],
    stats: about?.stats ?? [],
  };
}

export class SiteSettingMapper {
  static toDomain(entity: SiteSettingRow): SiteSettings {
    return new SiteSettings(
      entity.id,
      normalizeHero(entity.hero),
      normalizeHeader(entity.header),
      entity.footer,
      entity.seo,
      normalizeContactInfo(entity.contactInfo),
      normalizeTheme(entity.theme),
      normalizeAbout(entity.about),
      entity.updatedAt,
    );
  }
}
