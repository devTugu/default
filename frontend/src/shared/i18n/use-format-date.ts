'use client';

import { useCallback } from 'react';
import { useLocale } from 'next-intl';
import { getDateLocale } from '@/shared/i18n/messages';
import type { Locale } from '@/shared/i18n/config';

export function useFormatDate() {
  const locale = useLocale() as Locale;

  return useCallback(
    (value: string | Date) =>
      new Date(value).toLocaleDateString(getDateLocale(locale)),
    [locale],
  );
}

export function useFormatDateTime() {
  const locale = useLocale() as Locale;

  return useCallback(
    (value: string | Date) =>
      new Date(value).toLocaleString(getDateLocale(locale), {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    [locale],
  );
}
