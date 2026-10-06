import type { Locale } from '@/shared/i18n/config';

const LOCALE_COOKIE = 'locale';

export function setLocaleCookie(nextLocale: Locale): void {
  document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
}
