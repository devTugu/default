'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SupportedLocale } from '@/shared/i18n/localized-content';

interface AdminContentLocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
}

const AdminContentLocaleContext =
  createContext<AdminContentLocaleContextValue | null>(null);

interface AdminContentLocaleProviderProps {
  children: ReactNode;
  /** Reset to `en` when the parent form/sheet opens or record changes. */
  resetKey?: string | number | boolean;
}

function AdminContentLocaleState({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>('en');

  const setLocale = useCallback((next: SupportedLocale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  );

  return (
    <AdminContentLocaleContext.Provider value={value}>
      {children}
    </AdminContentLocaleContext.Provider>
  );
}

export function AdminContentLocaleProvider({
  children,
  resetKey,
}: AdminContentLocaleProviderProps) {
  return (
    <AdminContentLocaleState key={String(resetKey ?? 'default')}>
      {children}
    </AdminContentLocaleState>
  );
}

export function useAdminContentLocale(): AdminContentLocaleContextValue {
  const context = useContext(AdminContentLocaleContext);
  if (!context) {
    return {
      locale: 'en',
      setLocale: () => {},
    };
  }
  return context;
}
