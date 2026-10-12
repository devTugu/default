'use client';

import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useSiteSettings, useUpdateSiteSettings } from '@/entities/site-settings';
import { useAuthPermissions } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import {
  emptySiteSettingsFormValues,
  toSiteSettingsFormValues,
  type SiteSettingsFormValues,
} from './site-settings-form.utils';
import { createSiteSettingsSubmit } from './site-settings-form.submit';

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

  const onSubmit = createSiteSettingsSubmit({
    form,
    updateSettings,
    successMessage: t('toastSaved'),
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
