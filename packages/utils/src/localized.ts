import type { LocalizedStringList, LocalizedText } from "@default/types/common";

export type LocaleCode = "en" | "mn";

export function pickLocalized(
  text: LocalizedText | null | undefined,
  locale: LocaleCode,
): string {
  if (!text) return "";
  const localized = text[locale]?.trim();
  if (localized) return localized;
  return text.en?.trim() || "";
}

export function pickLocalizedOptional(
  text: LocalizedText | null | undefined,
  locale: LocaleCode,
): string {
  if (!text) return "";
  return pickLocalized(text, locale);
}

export function pickLocalizedList(
  list: LocalizedStringList,
  locale: LocaleCode,
): string[] {
  const localized = list[locale];
  if (localized && localized.length > 0) return localized;
  return list.en ?? [];
}

export function hasLocalizedMn(text: LocalizedText): boolean {
  return Boolean(text.mn?.trim());
}
