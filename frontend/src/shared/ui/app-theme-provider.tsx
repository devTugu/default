'use client';

import * as React from 'react';

const MEDIA = '(prefers-color-scheme: dark)';
const STORAGE_KEY = 'theme';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme | ((prev: Theme) => Theme)) => void;
  resolvedTheme?: 'light' | 'dark';
  themes: Theme[];
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

function getSystemTheme(): 'light' | 'dark' {
  return window.matchMedia(MEDIA).matches ? 'dark' : 'light';
}

function readStoredTheme(defaultTheme: Theme): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return defaultTheme;
}

function applyThemeClass(resolved: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (resolved === 'dark') {
    root.classList.add('dark');
  }
  root.style.colorScheme = resolved;
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>(
    'light',
  );
  const hasHydrated = React.useRef(false);

  React.useEffect(() => {
    if (!hasHydrated.current) {
      hasHydrated.current = true;
      const initial = readStoredTheme('system');
      setThemeState(initial);
      const resolved = initial === 'system' ? getSystemTheme() : initial;
      setResolvedTheme(resolved);
      applyThemeClass(resolved);
    }
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia(MEDIA);
    const onChange = () => {
      if (theme !== 'system') {
        return;
      }
      const next = getSystemTheme();
      setResolvedTheme(next);
      applyThemeClass(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = React.useCallback(
    (value: Theme | ((prev: Theme) => Theme)) => {
      setThemeState((prev) => {
        const next = typeof value === 'function' ? value(prev) : value;
        const resolved = next === 'system' ? getSystemTheme() : next;
        setResolvedTheme(resolved);
        applyThemeClass(resolved);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // ignore
        }
        return next;
      });
    },
    [],
  );

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      resolvedTheme,
      themes: ['light', 'dark', 'system'] as Theme[],
    }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: 'system',
      setTheme: () => undefined,
      resolvedTheme: 'light',
      themes: ['light', 'dark', 'system'],
    };
  }
  return ctx;
}
