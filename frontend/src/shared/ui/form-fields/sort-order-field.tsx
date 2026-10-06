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
import { Input } from '@/shared/ui/input';

interface SortOrderFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  disabled?: boolean;
}

export function SortOrderField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: SortOrderFieldProps<T>) {
  const t = useTranslations('formFields');
  const resolvedLabel = label ?? t('sortOrder');

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{resolvedLabel}</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={0}
              disabled={disabled}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              value={field.value ?? ''}
              onChange={(event) =>
                field.onChange(Number(event.target.value) || 0)
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
