import {
  emptyLocalizedStringList,
  emptyLocalizedText,
  type LocalizedStringList,
  type LocalizedText,
} from '@/shared/i18n/localized-content';

export function locText(
  value: LocalizedText | null | undefined,
): LocalizedText {
  return {
    en: value?.en ?? '',
    mn: value?.mn ?? '',
  };
}

export function locTextOrEmpty(
  value: LocalizedText | null | undefined,
): LocalizedText {
  return value ? locText(value) : emptyLocalizedText();
}

export function locKeywords(
  value: LocalizedStringList | null | undefined,
): LocalizedStringList {
  return value ?? emptyLocalizedStringList();
}
