import type { AppMessages } from '@/shared/i18n/messages';
import en from '@/shared/i18n/messages/en.json';

export type ValidationMessages = AppMessages['validation'];

export const defaultValidationMessages: ValidationMessages = en.validation;
