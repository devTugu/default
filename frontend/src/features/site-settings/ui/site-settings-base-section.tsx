'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ColorPickerField, LocalizedTextField } from '@/shared/ui/form-fields';
import { Card, CardContent } from '@default/ui/primitives/card';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

interface SiteSettingsBaseSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
}

export function SiteSettingsBaseSection({
  control,
  canUpdate,
}: SiteSettingsBaseSectionProps) {
  const t = useTranslations('entities.siteSettings');

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <LocalizedTextField
          control={control}
          name="header.siteName"
          label={t('siteName')}
          disabled={!canUpdate}
        />
        <ColorPickerField
          control={control}
          name="theme.brandColor"
          label={t('siteColor')}
          description={t('siteColorDescription')}
          disabled={!canUpdate}
          placeholder="#635BFF"
        />
      </CardContent>
    </Card>
  );
}
