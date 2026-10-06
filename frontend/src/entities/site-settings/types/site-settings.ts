import type {
  LocalizedStringList,
  LocalizedText,
} from '@/shared/i18n/localized-content';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettingsHero {
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  ctaLabel: LocalizedText;
  ctaUrl: string;
  secondaryCtaLabel: LocalizedText;
  secondaryCtaUrl: string;
  imageUrl: string | null;
}

export interface SiteSettingsHeader {
  logoUrl: string | null;
  logoDarkUrl: string | null;
  adminLogoUrl: string | null;
  faviconUrl: string | null;
  siteName: LocalizedText;
}

export interface SiteSettingsFooter {
  copyright: LocalizedText;
  tagline: LocalizedText;
  socialLinks: SocialLink[];
}

export interface SiteSettingsSeo {
  title: LocalizedText;
  description: LocalizedText;
  ogImageUrl: string | null;
  keywords: LocalizedStringList;
}

export interface SiteSettingsContactInfo {
  email: string;
  phone: string | null;
  location: LocalizedText | null;
  address: LocalizedText | null;
  workHours: LocalizedText | null;
  showForm: boolean;
}

export interface SiteSettingsTheme {
  brandColor: string | null;
}

export interface SiteSettingsAboutValue {
  icon: string;
  label: LocalizedText;
}

export interface SiteSettingsAboutStat {
  label: LocalizedText;
  value: string;
}

export interface SiteSettingsAbout {
  brief: LocalizedText;
  mission: LocalizedText;
  vision: LocalizedText;
  imageUrl: string | null;
  values: SiteSettingsAboutValue[];
  stats: SiteSettingsAboutStat[];
}

export interface SiteSettingsOutput {
  id: number;
  hero: SiteSettingsHero;
  header: SiteSettingsHeader;
  footer: SiteSettingsFooter;
  seo: SiteSettingsSeo;
  contactInfo: SiteSettingsContactInfo;
  theme: SiteSettingsTheme;
  about: SiteSettingsAbout;
  updatedAt: string;
}

export interface UpdateSiteSettingsInput {
  hero?: Partial<SiteSettingsHero>;
  header?: Partial<SiteSettingsHeader>;
  footer?: Partial<SiteSettingsFooter>;
  seo?: Partial<SiteSettingsSeo>;
  contactInfo?: Partial<SiteSettingsContactInfo>;
  theme?: Partial<SiteSettingsTheme>;
  about?: Partial<SiteSettingsAbout>;
}
