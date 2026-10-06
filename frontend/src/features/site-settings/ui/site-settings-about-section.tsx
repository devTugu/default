'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MediaUploadField } from '@/entities/media';
import { LocalizedTextareaField } from '@/shared/ui/form-fields';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

interface SiteSettingsAboutSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
}

export function SiteSettingsAboutSection({
  control,
  canUpdate,
}: SiteSettingsAboutSectionProps) {
  const t = useTranslations('entities.siteSettings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('aboutSectionTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LocalizedTextareaField
          control={control}
          name="about.brief"
          label={t('aboutBrief')}
          disabled={!canUpdate}
          rows={3}
        />
        <MediaUploadField
          control={control}
          name="about.imageUrl"
          label={t('aboutImageUrl')}
          disabled={!canUpdate}
        />
        <LocalizedTextareaField
          control={control}
          name="about.mission"
          label={t('aboutMission')}
          disabled={!canUpdate}
          rows={3}
        />
        <LocalizedTextareaField
          control={control}
          name="about.vision"
          label={t('aboutVision')}
          disabled={!canUpdate}
          rows={3}
        />
      </CardContent>
    </Card>
  );
}
