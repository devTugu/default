'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { MediaUploadField } from '@/entities/media';
import {
  LocalizedTextField,
  LocalizedTextareaField,
} from '@/shared/ui/form-fields';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

interface SiteSettingsHeroSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
}

export function SiteSettingsHeroSection({
  control,
  canUpdate,
}: SiteSettingsHeroSectionProps) {
  const t = useTranslations('entities.siteSettings');
  const tTable = useTranslations('table');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('heroSectionTitle')}</CardTitle>
        <CardDescription>{t('heroSectionDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <LocalizedTextField
          control={control}
          name="hero.title"
          label={tTable('title')}
          disabled={!canUpdate}
        />
        <LocalizedTextField
          control={control}
          name="hero.subtitle"
          label={t('subtitle')}
          disabled={!canUpdate}
        />
        <LocalizedTextareaField
          control={control}
          name="hero.description"
          label={tTable('description')}
          disabled={!canUpdate}
          rows={3}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <LocalizedTextField
            control={control}
            name="hero.ctaLabel"
            label={t('ctaLabel')}
            disabled={!canUpdate}
          />
          <FormField
            control={control}
            name="hero.ctaUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('ctaUrl')}</FormLabel>
                <FormControl>
                  <Input disabled={!canUpdate} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <LocalizedTextField
            control={control}
            name="hero.secondaryCtaLabel"
            label={t('secondaryCtaLabel')}
            disabled={!canUpdate}
          />
          <FormField
            control={control}
            name="hero.secondaryCtaUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('secondaryCtaUrl')}</FormLabel>
                <FormControl>
                  <Input disabled={!canUpdate} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <MediaUploadField
          control={control}
          name="hero.imageUrl"
          label={t('heroImageUrl')}
          disabled={!canUpdate}
        />
      </CardContent>
    </Card>
  );
}
