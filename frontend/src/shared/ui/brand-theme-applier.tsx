'use client';

import { applyBrandThemeCssVars, normalizeHexColor } from '@default/utils/color';
import { useMe, useSiteSettings } from '@default/hooks';
import { useEffect } from 'react';

type BrandThemeApplierProps = {
  initialBrandColor: string | null;
};

export function BrandThemeApplier({ initialBrandColor }: BrandThemeApplierProps) {
  const { data: me } = useMe();
  const { data, isSuccess } = useSiteSettings({ enabled: Boolean(me) });
  const savedColor =
    normalizeHexColor(isSuccess ? data?.theme?.brandColor : null) ??
    normalizeHexColor(initialBrandColor);

  useEffect(() => {
    applyBrandThemeCssVars(document.documentElement, savedColor);
  }, [savedColor]);

  return null;
}
