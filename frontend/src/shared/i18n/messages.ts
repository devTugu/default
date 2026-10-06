import { ROUTES } from '@/shared/config/routes';
import en from './messages/en.json';
import mn from './messages/mn.json';
import { defaultLocale, locales, type Locale } from './config';

const catalogs = { en, mn } as const;

export type AppMessages = typeof en;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function resolveLocale(value: string | null | undefined): Locale {
  if (value && isLocale(value)) {
    return value;
  }
  return defaultLocale;
}

export function getMessages(locale: Locale = defaultLocale): AppMessages {
  return catalogs[locale] ?? catalogs[defaultLocale];
}

export function getStepHeadings(locale: Locale = defaultLocale) {
  const messages = getMessages(locale);
  return {
    credentials: {
      title: messages.auth.signInTitle,
      subtitle: messages.auth.signInSubtitle,
    },
    'mfa-verify': {
      title: messages.auth.verifyMfaTitle,
      subtitle: messages.auth.verifyMfaSubtitle,
    },
    'mfa-enroll': {
      title: messages.auth.enrollMfaTitle,
      subtitle: messages.auth.enrollMfaSubtitle,
    },
  } as const;
}

const PAGE_TITLE_KEYS: Record<string, keyof AppMessages['nav']> = {
  [ROUTES.DASHBOARD]: 'overview',
  [ROUTES.USERS]: 'users',
  [ROUTES.ROLES]: 'roles',
  [ROUTES.PERMISSIONS]: 'permissions',
  [ROUTES.AUDIT_LOGS]: 'auditLogs',
  [ROUTES.SECURITY]: 'security',
  [ROUTES.SITE_SETTINGS]: 'siteSettings',
};

export function getPageTitle(
  pathname: string,
  locale: Locale = defaultLocale,
): string {
  const messages = getMessages(locale);
  const key = PAGE_TITLE_KEYS[pathname];
  if (key) {
    return messages.nav[key];
  }
  return messages.common.dashboard;
}

export function getDateLocale(locale: Locale): string {
  return locale === 'mn' ? 'mn-MN' : 'en-US';
}
