export const SUPPORTED_LOCALES = ['en', 'mn'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export type LocalizedText = Record<SupportedLocale, string>;
export type LocalizedStringList = Record<SupportedLocale, string[]>;

export function localizedText(en: string, mn: string): LocalizedText {
  return { en, mn };
}

export function localizedStringList(
  en: string[],
  mn: string[],
): LocalizedStringList {
  return { en, mn };
}

export function emptyLocalizedText(): LocalizedText {
  return { en: '', mn: '' };
}

export function emptyLocalizedStringList(): LocalizedStringList {
  return { en: [], mn: [] };
}
