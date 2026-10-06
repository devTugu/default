import {
  SiteSettings,
  SiteSettingsAbout,
  SiteSettingsContactInfo,
  SiteSettingsFooter,
  SiteSettingsHeader,
  SiteSettingsHero,
  SiteSettingsSeo,
  SiteSettingsTheme,
} from '../entities/site-settings.entity';

export interface UpdateSiteSettingsData {
  hero?: Partial<SiteSettingsHero>;
  header?: Partial<SiteSettingsHeader>;
  footer?: Partial<SiteSettingsFooter>;
  seo?: Partial<SiteSettingsSeo>;
  contactInfo?: Partial<SiteSettingsContactInfo>;
  theme?: Partial<SiteSettingsTheme>;
  about?: Partial<SiteSettingsAbout>;
}

export interface ISiteSettingRepository {
  get(): Promise<SiteSettings | null>;
  upsert(data: UpdateSiteSettingsData): Promise<SiteSettings>;
}
