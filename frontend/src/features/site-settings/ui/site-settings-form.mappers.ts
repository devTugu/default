import type { SiteSettingsOutput } from '@/entities/site-settings';
import { locTextOrEmpty } from './site-settings-form.localized';
import type { SiteSettingsFormValues } from './site-settings-form.values';

export function toSiteSettingsFormValues(
  data: SiteSettingsOutput,
): SiteSettingsFormValues {
  return {
    header: {
      siteName: locTextOrEmpty(data.header.siteName),
    },
    theme: {
      brandColor: data.theme.brandColor ?? '',
    },
  };
}
