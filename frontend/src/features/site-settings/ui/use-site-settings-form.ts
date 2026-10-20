'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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

export function useSiteSettingsForm(options?: { enabled?: boolean }) {
  const t = useTranslations('entities.siteSettings');
  const tCommon = useTranslations('common');
  const { can, isSuperAdmin } = useAuthPermissions();
  const canUpdate = can(PERMISSION_CODES.SITE_SETTING_UPDATE);
  const { data, isLoading } = useSiteSettings({
    enabled: options?.enabled ?? true,
  });
  const updateSettings = useUpdateSiteSettings();

  const form = useForm<SiteSettingsFormValues>({
    defaultValues: emptySiteSettingsFormValues,
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
    canUpdate,
    isSuperAdmin,
    data,
    isLoading,
    form,
    updateSettings,
    onSubmit,
  };
}
