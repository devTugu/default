'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  normalizeHexColor,
  toColorInputValue,
} from '@/shared/lib/normalize-hex-color';
import { cn } from '@/shared/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

interface ColorPickerFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function ColorPickerField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  placeholder = '#635BFF',
}: ColorPickerFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const displayValue = field.value ?? '';
        const pickerValue = toColorInputValue(displayValue);

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            {description ? (
              <p className="text-muted-foreground text-sm">{description}</p>
            ) : null}
            <FormControl>
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'relative size-11 shrink-0 overflow-hidden rounded-lg border shadow-sm',
                    disabled && 'opacity-60',
                  )}
                  style={{ backgroundColor: pickerValue }}
                >
                  <input
                    type="color"
                    aria-label={label}
                    disabled={disabled}
                    value={pickerValue}
                    onChange={(event) => {
                      field.onChange(event.target.value.toUpperCase());
                    }}
                    className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  />
                </div>
                <Input
                  disabled={disabled}
                  placeholder={placeholder}
                  value={displayValue}
                  onChange={(event) => field.onChange(event.target.value)}
                  onBlur={() => {
                    const normalized = normalizeHexColor(displayValue);
                    field.onChange(normalized ?? '');
                  }}
                  className="font-mono uppercase"
                  spellCheck={false}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
