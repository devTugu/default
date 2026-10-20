'use client';

import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/features/auth';

export function DashboardOverview() {
  const t = useTranslations('dashboard');
  const email = useAuthStore((state) => state.user?.email);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold tracking-tight">{t('title')}</h1>
      <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
      {email ? (
        <p className="text-muted-foreground mt-2 text-sm">
          {t('welcome', { email })}
        </p>
      ) : null}
    </div>
  );
}
