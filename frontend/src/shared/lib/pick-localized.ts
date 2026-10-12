import type { Locale } from "@/shared/i18n/config";
import type { LocalizedStringList, LocalizedText } from "@/shared/i18n/localized-content";
import {
  hasLocalizedMn as hasMn,
  pickLocalized as pick,
  pickLocalizedList as pickList,
  pickLocalizedOptional as pickOptional,
} from "@default/utils/localized";

export function pickLocalized(
  text: LocalizedText | null | undefined,
  locale: Locale,
): string {
  return pick(text, locale);
}

export function pickLocalizedOptional(
  text: LocalizedText | null | undefined,
  locale: Locale,
): string {
  return pickOptional(text, locale);
}

export function pickLocalizedList(
  list: LocalizedStringList,
  locale: Locale,
): string[] {
  return pickList(list, locale);
}

export function hasLocalizedMn(text: LocalizedText): boolean {
  return hasMn(text);
}
