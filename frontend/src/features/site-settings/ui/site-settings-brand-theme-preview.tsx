'use client';

import { applyBrandThemeCssVars, normalizeHexColor } from '@default/utils/color';
import { useEffect } from 'react';
import { useWatch, type Control } from 'react-hook-form';
import { useSiteSettings } from '@/entities/site-settings';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

type SiteSettingsBrandThemePreviewProps = {
  control: Control<SiteSettingsFormValues>;
};

/** Live primary color while editing base settings; restores saved color on unmount. */
export function SiteSettingsBrandThemePreview({
  control,
}: SiteSettingsBrandThemePreviewProps) {
  const brandFromForm = useWatch({ control, name: 'theme.brandColor' });
  const { data } = useSiteSettings();
  const savedColor = normalizeHexColor(data?.theme?.brandColor);

  useEffect(() => {
    const preview = normalizeHexColor(brandFromForm) ?? savedColor;
    applyBrandThemeCssVars(document.documentElement, preview);
    return () => applyBrandThemeCssVars(document.documentElement, savedColor);
  }, [brandFromForm, savedColor]);

  return null;
}
