'use client';

import type { Control } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { LocalizedTextField } from '@/shared/ui/form-fields';
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
import { Switch } from '@/shared/ui/switch';
import type { SiteSettingsFormValues } from './site-settings-form.utils';

interface SiteSettingsContactSectionProps {
  control: Control<SiteSettingsFormValues>;
  canUpdate: boolean;
}

export function SiteSettingsContactSection({
  control,
  canUpdate,
}: SiteSettingsContactSectionProps) {
  const t = useTranslations('entities.siteSettings');
  const tAuth = useTranslations('auth');

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('contactSectionTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="contactInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tAuth('email')}</FormLabel>
              <FormControl>
                <Input type="email" disabled={!canUpdate} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="contactInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('phone')}</FormLabel>
              <FormControl>
                <Input
                  disabled={!canUpdate}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <LocalizedTextField
          control={control}
          name="contactInfo.location"
          label={t('location')}
          disabled={!canUpdate}
        />
        <LocalizedTextField
          control={control}
          name="contactInfo.address"
          label={t('address')}
          disabled={!canUpdate}
        />
        <LocalizedTextField
          control={control}
          name="contactInfo.workHours"
          label={t('workHours')}
          disabled={!canUpdate}
        />
        <FormField
          control={control}
          name="contactInfo.showForm"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <FormLabel>{t('showContactForm')}</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!canUpdate}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
