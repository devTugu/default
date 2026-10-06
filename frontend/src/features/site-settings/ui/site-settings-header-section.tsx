'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MediaUploadField } from '@/entities/media';
import { LocalizedTextField } from '@/shared/ui/form-fields';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

interface SiteSettingsHeaderSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
}

export function SiteSettingsHeaderSection({
  control,
  canUpdate,
}: SiteSettingsHeaderSectionProps) {
  const t = useTranslations('entities.siteSettings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('headerSectionTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MediaUploadField
          control={control}
          name="header.logoUrl"
          label={t('logoUrl')}
          disabled={!canUpdate}
        />
        <MediaUploadField
          control={control}
          name="header.logoDarkUrl"
          label={t('logoDarkUrl')}
          disabled={!canUpdate}
        />
        <MediaUploadField
          control={control}
          name="header.adminLogoUrl"
          label={t('adminLogoUrl')}
          disabled={!canUpdate}
        />
        <MediaUploadField
          control={control}
          name="header.faviconUrl"
          label={t('faviconUrl')}
          disabled={!canUpdate}
        />
        <LocalizedTextField
          control={control}
          name="header.siteName"
          label={t('siteName')}
          disabled={!canUpdate}
        />
      </CardContent>
    </Card>
  );
}
