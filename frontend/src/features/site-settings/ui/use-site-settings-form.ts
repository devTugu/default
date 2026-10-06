'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useSiteSettings, useUpdateSiteSettings } from '@/entities/site-settings';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { getErrorMessage } from '@/shared/api';
import { normalizeHexColor } from '@/shared/lib/normalize-hex-color';
import { emptyLocalizedText } from '@/shared/i18n/localized-content';
import {
  emptySiteSettingsFormValues,
  toSiteSettingsFormValues,
  type SiteSettingsFormValues,
} from './site-settings-form.utils';

export function useSiteSettingsForm() {
  const t = useTranslations('entities.siteSettings');
  const tCommon = useTranslations('common');
  const tAuth = useTranslations('auth');
  const tTable = useTranslations('table');
  const { can } = useAuthPermissions();
  const canUpdate = can(PERMISSION_CODES.SITE_SETTING_UPDATE);
  const { data, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const form = useForm<SiteSettingsFormValues>({
    defaultValues: emptySiteSettingsFormValues,
  });

  const socialLinks = useFieldArray({
    control: form.control,
    name: 'footer.socialLinks',
  });

  useEffect(() => {
    if (!data) return;
    form.reset(toSiteSettingsFormValues(data));
  }, [data, form]);

  const onSubmit = form.handleSubmit(async (values) => {
    const location = values.contactInfo.location ?? emptyLocalizedText();
    const address = values.contactInfo.address ?? emptyLocalizedText();
    const workHours = values.contactInfo.workHours ?? emptyLocalizedText();
    const hasText = (value: string | null | undefined) =>
      Boolean(value?.trim());
    const normalizedLocation =
      hasText(location.en) || hasText(location.mn) ? location : null;
    const normalizedAddress =
      hasText(address.en) || hasText(address.mn) ? address : null;
    const normalizedWorkHours =
      hasText(workHours.en) || hasText(workHours.mn) ? workHours : null;
    const normalizeUrl = (value: string | null | undefined) =>
      hasText(value) ? value!.trim() : null;

    try {
      await updateSettings.mutateAsync({
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
        contactInfo: {
          ...values.contactInfo,
          location: normalizedLocation,
          address: normalizedAddress,
          workHours: normalizedWorkHours,
        },
        about: {
          ...values.about,
          imageUrl: normalizeUrl(values.about.imageUrl),
        },
      });
      toast.success(t('toastSaved'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  });

  return {
    t,
    tCommon,
    tAuth,
    tTable,
    canUpdate,
    data,
    isLoading,
    form,
    socialLinks,
    updateSettings,
    onSubmit,
  };
}

export type SiteSettingsFormModel = ReturnType<typeof useSiteSettingsForm>;
