import { toast } from 'sonner';
import type { UseFormReturn } from 'react-hook-form';
import type { UpdateSiteSettingsInput } from '@/entities/site-settings';
import { getErrorMessage } from '@/shared/api';
import { normalizeHexColor } from '@/shared/lib/normalize-hex-color';
import type { SiteSettingsFormValues } from './site-settings-form.values';

interface MutationLike {
  mutateAsync: (values: UpdateSiteSettingsInput) => Promise<unknown>;
}

export function buildSiteSettingsPayload(
  values: SiteSettingsFormValues,
): UpdateSiteSettingsInput {
  return {
    header: {
      siteName: values.header.siteName,
    },
    theme: {
      brandColor: normalizeHexColor(values.theme.brandColor),
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
