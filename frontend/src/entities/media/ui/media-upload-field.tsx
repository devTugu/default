'use client';

import { useRef } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { Loader2, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useUploadMedia } from '@/entities/media/api/mutations';
import { getErrorMessage } from '@/shared/api';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

interface MediaUploadFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
}

export function MediaUploadField<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: MediaUploadFieldProps<T>) {
  const tCommon = useTranslations('common');
  const tMedia = useTranslations('entities.media');
  const tErrors = useTranslations('errors');
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadMedia();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleUpload = async (file: File) => {
          try {
            const result = await upload.mutateAsync(file);
            field.onChange(result.url);
            toast.success(tMedia('toastUploaded'));
          } catch (error) {
            toast.error(getErrorMessage(error), {
              description: tErrors('mediaUploadFallback'),
            });
          }
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input
                  type="url"
                  placeholder={tMedia('urlPlaceholder')}
                  disabled={disabled}
                  {...field}
                  value={field.value ?? ''}
                />
              </FormControl>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleUpload(file);
                  event.target.value = '';
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={disabled || upload.isPending}
                onClick={() => inputRef.current?.click()}
                aria-label={tCommon('uploadFile')}
              >
                {upload.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Upload className="size-4" />
                )}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
