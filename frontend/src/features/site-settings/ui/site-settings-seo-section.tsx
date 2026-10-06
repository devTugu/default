'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MediaUploadField } from '@/entities/media';
import {
  LocalizedTagInputField,
  LocalizedTextField,
  LocalizedTextareaField,
} from '@/shared/ui/form-fields';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

interface SiteSettingsSeoSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
}

export function SiteSettingsSeoSection({
  control,
  canUpdate,
}: SiteSettingsSeoSectionProps) {
  const t = useTranslations('entities.siteSettings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('seoSectionTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LocalizedTextField
          control={control}
          name="seo.title"
          label={t('metaTitle')}
          disabled={!canUpdate}
        />
        <LocalizedTextareaField
          control={control}
          name="seo.description"
          label={t('metaDescription')}
          disabled={!canUpdate}
          rows={3}
        />
        <MediaUploadField
          control={control}
          name="seo.ogImageUrl"
          label={t('ogImageUrl')}
          disabled={!canUpdate}
        />
        <LocalizedTagInputField
          control={control}
          name="seo.keywords"
          label={t('keywords')}
          disabled={!canUpdate}
        />
      </CardContent>
    </Card>
  );
}
