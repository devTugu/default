import { SiteSettings } from '@domain/site-setting/entities/site-settings.entity';

export interface SiteSettingsOutput {
  id: number;
  hero: SiteSettings['hero'];
  header: SiteSettings['header'];
  footer: SiteSettings['footer'];
  seo: SiteSettings['seo'];
  contactInfo: SiteSettings['contactInfo'];
  theme: SiteSettings['theme'];
  about: SiteSettings['about'];
  security: SiteSettings['security'];
  updatedAt: string;
}

export type PublicSiteSettingsOutput = Omit<SiteSettingsOutput, 'security'>;

export function toSiteSettingsOutput(
  settings: SiteSettings,
): SiteSettingsOutput {
  return {
    id: settings.id,
    hero: settings.hero,
    header: settings.header,
    footer: settings.footer,
    seo: settings.seo,
    contactInfo: settings.contactInfo,
    theme: settings.theme,
    about: settings.about,
    security: settings.security,
    updatedAt: settings.updatedAt.toISOString(),
  };
}

export function toPublicSiteSettingsOutput(
  settings: SiteSettings,
): PublicSiteSettingsOutput {
  const full = toSiteSettingsOutput(settings);
  const { security: _security, ...rest } = full;
  return rest;
}
