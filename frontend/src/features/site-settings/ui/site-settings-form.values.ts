import {
  emptyLocalizedText,
  type LocalizedText,
} from '@/shared/i18n/localized-content';

export type SiteSettingsFormValues = {
  header: {
    siteName: LocalizedText;
  };
  theme: {
    brandColor: string | null;
  };
};

export const emptySiteSettingsFormValues: SiteSettingsFormValues = {
  header: {
    siteName: emptyLocalizedText(),
  },
  theme: {
    brandColor: '',
  },
};
