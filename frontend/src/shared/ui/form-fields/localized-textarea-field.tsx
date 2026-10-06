'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useAdminContentLocale } from '@/shared/i18n/admin-content-locale-context';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';

interface LocalizedTextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
  rows?: number;
}

export function LocalizedTextareaField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  rows = 4,
}: LocalizedTextareaFieldProps<T>) {
  const { locale } = useAdminContentLocale();

  return (
    <FormField
      control={control}
      name={`${name}.${locale}` as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} disabled={disabled} rows={rows} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
