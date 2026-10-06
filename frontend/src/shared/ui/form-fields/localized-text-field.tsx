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
import { Input } from '@/shared/ui/input';

interface LocalizedTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
}

export function LocalizedTextField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  placeholder,
}: LocalizedTextFieldProps<T>) {
  const { locale } = useAdminContentLocale();

  return (
    <FormField
      control={control}
      name={`${name}.${locale}` as FieldPath<T>}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} disabled={disabled} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
