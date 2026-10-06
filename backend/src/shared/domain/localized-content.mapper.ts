import {
  SUPPORTED_LOCALES,
  type LocalizedStringList,
  type LocalizedText,
  type SupportedLocale,
} from './localized-content';

function emptyLocalizedText(): LocalizedText {
  return { en: '', mn: '' };
}

function emptyLocalizedStringList(): LocalizedStringList {
  return { en: [], mn: [] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readLocaleString(
  record: Record<string, unknown>,
  locale: SupportedLocale,
): string {
  const value = record[locale];
  return typeof value === 'string' ? value : '';
}

export function coerceLocalizedText(raw: unknown): LocalizedText {
  if (typeof raw === 'string') {
    return { en: raw, mn: raw };
  }

  if (!isRecord(raw)) {
    return emptyLocalizedText();
  }

  return {
    en: readLocaleString(raw, 'en'),
    mn: readLocaleString(raw, 'mn'),
  };
}

export function coerceLocalizedStringList(raw: unknown): LocalizedStringList {
  if (Array.isArray(raw)) {
    return { en: raw.map(String), mn: raw.map(String) };
  }

  if (!isRecord(raw)) {
    return emptyLocalizedStringList();
  }

  const toStringArray = (value: unknown): string[] => {
    if (!Array.isArray(value)) return [];
    return value.map(String);
  };

  return {
    en: toStringArray(raw.en),
    mn: toStringArray(raw.mn),
  };
}

export function pickLocalizedText(
  text: LocalizedText,
  locale: SupportedLocale,
): string {
  const localized = text[locale]?.trim();
  if (localized) return localized;
  return text.en?.trim() || '';
}

export function hasAllLocales(text: LocalizedText): boolean {
  return SUPPORTED_LOCALES.every((locale) => text[locale]?.trim().length > 0);
}
