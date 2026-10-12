import { toast } from 'sonner';
import type { UseFormReturn } from 'react-hook-form';
import type { UpdateSiteSettingsInput } from '@/entities/site-settings';
import { getErrorMessage } from '@/shared/api';
import { normalizeHexColor } from '@/shared/lib/normalize-hex-color';
import { emptyLocalizedText } from '@/shared/i18n/localized-content';
import type { SiteSettingsFormValues } from './site-settings-form.values';

interface MutationLike {
  mutateAsync: (values: UpdateSiteSettingsInput) => Promise<unknown>;
}

function hasText(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

function normalizeUrl(value: string | null | undefined): string | null {
  return hasText(value) ? value!.trim() : null;
}

function normalizeContactInfo(values: SiteSettingsFormValues['contactInfo']) {
  const location = values.location ?? emptyLocalizedText();
  const address = values.address ?? emptyLocalizedText();
  const workHours = values.workHours ?? emptyLocalizedText();

  return {
    ...values,
    location:
      hasText(location.en) || hasText(location.mn) ? location : null,
    address: hasText(address.en) || hasText(address.mn) ? address : null,
    workHours:
      hasText(workHours.en) || hasText(workHours.mn) ? workHours : null,
  };
}

export function buildSiteSettingsPayload(
  values: SiteSettingsFormValues,
): SiteSettingsFormValues {
  return {
    ...values,
    header: {
      ...values.header,
      logoUrl: normalizeUrl(values.header.logoUrl),
      logoDarkUrl: normalizeUrl(values.header.logoDarkUrl),
      adminLogoUrl: normalizeUrl(values.header.adminLogoUrl),
      faviconUrl: normalizeUrl(values.header.faviconUrl),
    },
    footer: {
      ...values.footer,
      socialLinks: values.footer.socialLinks.filter(
        (link) => hasText(link.platform) && hasText(link.url),
      ),
    },
    theme: {
      brandColor: normalizeHexColor(values.theme.brandColor),
    },
    contactInfo: normalizeContactInfo(values.contactInfo),
    about: {
      ...values.about,
      imageUrl: normalizeUrl(values.about.imageUrl),
    },
  };
}

export function createSiteSettingsSubmit(params: {
  form: UseFormReturn<SiteSettingsFormValues>;
  updateSettings: MutationLike;
  successMessage: string;
}) {
  const { form, updateSettings, successMessage } = params;

  return form.handleSubmit(async (values) => {
    try {
      await updateSettings.mutateAsync(buildSiteSettingsPayload(values));
      toast.success(successMessage);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });
}
