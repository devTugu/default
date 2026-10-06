'use client';

import { useTranslations } from 'next-intl';
import { SUPPORTED_LOCALES } from '@/shared/i18n/localized-content';
import { useAdminContentLocale } from '@/shared/i18n/admin-content-locale-context';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

const localeLabels = {
  en: 'EN',
  mn: 'MN',
} as const;

interface AdminContentLocaleTabsProps {
  className?: string;
  /** Show amber dot on MN tab when Mongolian copy is incomplete. */
  mnIncomplete?: boolean;
}

export function AdminContentLocaleTabs({
  className,
  mnIncomplete = false,
}: AdminContentLocaleTabsProps) {
  const t = useTranslations('formFields');
  const { locale, setLocale } = useAdminContentLocale();

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 border-b bg-muted/30 px-6 py-3',
        className,
      )}
      role="group"
      aria-label={t('contentLocaleGroupLabel')}
    >
      <p className="text-muted-foreground text-xs">{t('contentLocaleHint')}</p>
      <div className="flex gap-1">
        {SUPPORTED_LOCALES.map((item) => (
          <Button
            key={item}
            type="button"
            size="sm"
            variant={locale === item ? 'default' : 'outline'}
            onClick={() => setLocale(item)}
            aria-pressed={locale === item}
            className="relative min-w-12"
          >
            {localeLabels[item]}
            {item === 'mn' && mnIncomplete ? (
              <span
                className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-amber-500"
                aria-hidden
              />
            ) : null}
          </Button>
        ))}
      </div>
    </div>
  );
}
