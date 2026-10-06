'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, defaultLocale, type Locale } from '@/shared/i18n/config';
import { setLocaleCookie } from '@/shared/lib/locale-cookie';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

interface LocaleSwitcherProps {
  className?: string;
  size?: 'sm' | 'default';
  variant?: 'text' | 'flags';
}

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  mn: 'MN',
};

const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  mn: '🇲🇳',
};

const localeSwitchLabels: Record<Locale, string> = {
  en: 'Switch to Mongolian',
  mn: 'Switch to English',
};

export function LocaleSwitcher({
  className,
  size = 'sm',
  variant = 'text',
}: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();

  const handleLocaleChange = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    setLocaleCookie(nextLocale);
    router.refresh();
  };

  if (variant === 'flags') {
    const nextLocale = locales.find((item) => item !== locale) ?? defaultLocale;

    return (
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => handleLocaleChange(nextLocale)}
        aria-label={localeSwitchLabels[locale]}
        className={cn('size-8 text-base leading-none', className)}
      >
        <span aria-hidden>{localeFlags[locale]}</span>
      </Button>
    );
  }

  return (
    <div className={cn('flex gap-1', className)}>
      {locales.map((item) => (
        <Button
          key={item}
          type="button"
          size={size}
          variant={locale === item ? 'default' : 'ghost'}
          onClick={() => handleLocaleChange(item)}
          aria-pressed={locale === item}
        >
          {localeLabels[item]}
        </Button>
      ))}
    </div>
  );
}

/** @deprecated Use LocaleSwitcher */
export const AuthLocaleSwitcher = LocaleSwitcher;
