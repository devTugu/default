'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { ColorPickerField } from '@/shared/ui/form-fields';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

interface SiteSettingsThemeSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
}

export function SiteSettingsThemeSection({
  control,
  canUpdate,
}: SiteSettingsThemeSectionProps) {
  const t = useTranslations('entities.siteSettings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('themeSectionTitle')}</CardTitle>
        <CardDescription>{t('themeSectionDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ColorPickerField
          control={control}
          name="theme.brandColor"
          label={t('brandColor')}
          description={t('brandColorDescription')}
          disabled={!canUpdate}
          placeholder="#635BFF"
        />
      </CardContent>
    </Card>
  );
}
