import type { Locale } from '@/shared/i18n/config';
import type { LocalizedStringList, LocalizedText } from '@/shared/i18n/localized-content';

export function pickLocalized(
  text: LocalizedText | null | undefined,
  locale: Locale,
): string {
  if (!text) return '';
  const localized = text[locale]?.trim();
  if (localized) return localized;
  return text.en?.trim() || '';
}

export function pickLocalizedOptional(
  text: LocalizedText | null | undefined,
  locale: Locale,
): string {
  if (!text) return '';
  return pickLocalized(text, locale);
}

export function pickLocalizedList(
  list: LocalizedStringList,
  locale: Locale,
): string[] {
  const localized = list[locale];
  if (localized && localized.length > 0) return localized;
  return list.en ?? [];
}

export function hasLocalizedMn(text: LocalizedText): boolean {
  return Boolean(text.mn?.trim());
}
