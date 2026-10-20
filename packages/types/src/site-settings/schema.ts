import { z } from "zod";
import {
  LocalizedStringListSchema,
  LocalizedTextOptionalSchema,
} from "../common/schema";

export const SocialLinkSchema = z.object({
  platform: z.string(),
  url: z.string(),
});

export const SiteSettingsHeroSchema = z.object({
  title: LocalizedTextOptionalSchema,
  subtitle: LocalizedTextOptionalSchema,
  description: LocalizedTextOptionalSchema,
  ctaLabel: LocalizedTextOptionalSchema,
  ctaUrl: z.string(),
  secondaryCtaLabel: LocalizedTextOptionalSchema,
  secondaryCtaUrl: z.string(),
  imageUrl: z.string().nullable(),
});

export const SiteSettingsHeaderSchema = z.object({
  logoUrl: z.string().nullable(),
  logoDarkUrl: z.string().nullable(),
  adminLogoUrl: z.string().nullable(),
  faviconUrl: z.string().nullable(),
  siteName: LocalizedTextOptionalSchema,
});

export const SiteSettingsFooterSchema = z.object({
  copyright: LocalizedTextOptionalSchema,
  tagline: LocalizedTextOptionalSchema,
  socialLinks: z.array(SocialLinkSchema),
});

export const SiteSettingsSeoSchema = z.object({
  title: LocalizedTextOptionalSchema,
  description: LocalizedTextOptionalSchema,
  ogImageUrl: z.string().nullable(),
  keywords: LocalizedStringListSchema,
});

export const SiteSettingsContactInfoSchema = z.object({
  email: z.string(),
  phone: z.string().nullable(),
  location: LocalizedTextOptionalSchema.nullable(),
  address: LocalizedTextOptionalSchema.nullable(),
  workHours: LocalizedTextOptionalSchema.nullable(),
  showForm: z.boolean(),
});

export const SiteSettingsThemeSchema = z.object({
  brandColor: z.string().nullable(),
});

export const SiteSettingsAboutValueSchema = z.object({
  icon: z.string(),
  label: LocalizedTextOptionalSchema,
});

export const SiteSettingsAboutStatSchema = z.object({
  label: LocalizedTextOptionalSchema,
  value: z.string(),
});

export const SiteSettingsSecuritySchema = z.object({
  /** When true, privileged roles (default SUPER_ADMIN) must enroll MFA to sign in. */
  enforcePrivilegedMfa: z.boolean(),
});

export const SiteSettingsAboutSchema = z.object({
  brief: LocalizedTextOptionalSchema,
  mission: LocalizedTextOptionalSchema,
  vision: LocalizedTextOptionalSchema,
  imageUrl: z.string().nullable(),
  values: z.array(SiteSettingsAboutValueSchema),
  stats: z.array(SiteSettingsAboutStatSchema),
});

export const SiteSettingsOutputSchema = z.object({
  id: z.number(),
  hero: SiteSettingsHeroSchema,
  header: SiteSettingsHeaderSchema,
  footer: SiteSettingsFooterSchema,
  seo: SiteSettingsSeoSchema,
  contactInfo: SiteSettingsContactInfoSchema,
  theme: SiteSettingsThemeSchema,
  about: SiteSettingsAboutSchema,
  security: SiteSettingsSecuritySchema,
  updatedAt: z.string(),
});

/** Public marketing API — no admin security policy fields. */
export const PublicSiteSettingsOutputSchema = SiteSettingsOutputSchema.omit({
  security: true,
});

export const UpdateSiteSettingsInputSchema = z.object({
  hero: SiteSettingsHeroSchema.partial().optional(),
  header: SiteSettingsHeaderSchema.partial().optional(),
  footer: SiteSettingsFooterSchema.partial().optional(),
  seo: SiteSettingsSeoSchema.partial().optional(),
  contactInfo: SiteSettingsContactInfoSchema.partial().optional(),
  theme: SiteSettingsThemeSchema.partial().optional(),
  about: SiteSettingsAboutSchema.partial().optional(),
  security: SiteSettingsSecuritySchema.partial().optional(),
});

export type SocialLink = z.infer<typeof SocialLinkSchema>;
export type SiteSettingsHero = z.infer<typeof SiteSettingsHeroSchema>;
export type SiteSettingsHeader = z.infer<typeof SiteSettingsHeaderSchema>;
export type SiteSettingsFooter = z.infer<typeof SiteSettingsFooterSchema>;
export type SiteSettingsSeo = z.infer<typeof SiteSettingsSeoSchema>;
export type SiteSettingsContactInfo = z.infer<
  typeof SiteSettingsContactInfoSchema
>;
export type SiteSettingsTheme = z.infer<typeof SiteSettingsThemeSchema>;
export type SiteSettingsAboutValue = z.infer<
  typeof SiteSettingsAboutValueSchema
>;
export type SiteSettingsAboutStat = z.infer<typeof SiteSettingsAboutStatSchema>;
export type SiteSettingsAbout = z.infer<typeof SiteSettingsAboutSchema>;
export type SiteSettingsSecurity = z.infer<typeof SiteSettingsSecuritySchema>;
export type SiteSettingsOutput = z.infer<typeof SiteSettingsOutputSchema>;
export type PublicSiteSettingsOutput = z.infer<
  typeof PublicSiteSettingsOutputSchema
>;
export type UpdateSiteSettingsInput = z.infer<
  typeof UpdateSiteSettingsInputSchema
>;
