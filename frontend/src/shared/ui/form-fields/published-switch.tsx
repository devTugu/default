'use client';

import { useTranslations } from 'next-intl';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Switch } from '@/shared/ui/switch';

interface PublishedSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  disabled?: boolean;
}

export function PublishedSwitch<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: PublishedSwitchProps<T>) {
  const tStatus = useTranslations('status');
  const resolvedLabel = label ?? tStatus('published');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-3">
          <div className="space-y-0.5">
            <FormLabel>{resolvedLabel}</FormLabel>
            <p className="text-xs text-muted-foreground">
              {tStatus('publishedHint')}
            </p>
          </div>
          <FormControl>
            <Switch
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
