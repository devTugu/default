'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { X } from 'lucide-react';
import { useAdminContentLocale } from '@/shared/i18n/admin-content-locale-context';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

interface LocalizedTagInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
}

export function LocalizedTagInputField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: LocalizedTagInputFieldProps<T>) {
  const t = useTranslations('formFields');
  const tCommon = useTranslations('common');
  const { locale } = useAdminContentLocale();
  const [input, setInput] = useState('');

  return (
    <FormField
      control={control}
      name={`${name}.${locale}` as FieldPath<T>}
      render={({ field }) => {
        const tags = (field.value as string[] | undefined) ?? [];

        const addTag = (value: string) => {
          const trimmed = value.trim();
          if (!trimmed || tags.includes(trimmed)) return;
          field.onChange([...tags, trimmed]);
          setInput('');
        };

        const removeTag = (tag: string) => {
          field.onChange(tags.filter((item) => item !== tag));
        };

        const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            addTag(input);
          }
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="space-y-2">
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={t('tagInputPlaceholder')}
                  disabled={disabled}
                />
                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-4 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                          disabled={disabled}
                          aria-label={tCommon('removeAriaLabel', { name: tag })}
                        >
                          <X className="size-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
