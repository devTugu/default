'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { X } from 'lucide-react';
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

interface TagInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export function TagInputField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
}: TagInputFieldProps<T>) {
  const t = useTranslations('formFields');
  const tCommon = useTranslations('common');
  const [input, setInput] = useState('');
  const resolvedPlaceholder = placeholder ?? t('tagInputPlaceholder');

  return (
    <FormField
      control={control}
      name={name}
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
                  placeholder={resolvedPlaceholder}
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
