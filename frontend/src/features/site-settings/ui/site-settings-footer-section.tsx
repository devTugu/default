'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { Control, UseFieldArrayReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { LocalizedTextField } from '@/shared/ui/form-fields';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
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

interface SiteSettingsFooterSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
  socialLinks: UseFieldArrayReturn<SiteSettingsFormValues, 'footer.socialLinks'>;
}

export function SiteSettingsFooterSection({
  control,
  canUpdate,
  socialLinks,
}: SiteSettingsFooterSectionProps) {
  const t = useTranslations('entities.siteSettings');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('footerSectionTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LocalizedTextField
          control={control}
          name="footer.copyright"
          label={t('copyright')}
          disabled={!canUpdate}
        />
        <LocalizedTextField
          control={control}
          name="footer.tagline"
          label={t('tagline')}
          disabled={!canUpdate}
        />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormLabel>{t('socialLinks')}</FormLabel>
            {canUpdate ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => socialLinks.append({ platform: '', url: '' })}
              >
                <Plus className="mr-1 size-4" />
                {t('addSocial')}
              </Button>
            ) : null}
          </div>
          {socialLinks.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 rounded-lg border p-3">
              <FormField
                control={control}
                name={`footer.socialLinks.${index}.platform`}
                render={({ field: platformField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t('platform')}</FormLabel>
                    <FormControl>
                      <Input disabled={!canUpdate} {...platformField} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`footer.socialLinks.${index}.url`}
                render={({ field: urlField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t('href')}</FormLabel>
                    <FormControl>
                      <Input disabled={!canUpdate} {...urlField} />
                    </FormControl>
                  </FormItem>
                )}
              />
              {canUpdate ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-8"
                  onClick={() => socialLinks.remove(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
