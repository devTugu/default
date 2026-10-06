'use client';

import { useState } from 'react';
import { GalleryVerticalEnd } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { env } from '@/shared/config/env';
import { getStepHeadings } from '@/shared/i18n/messages';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import type { Locale } from '@/shared/i18n/config';
import { BrandLogo } from '@/shared/ui/brand-logo';
import { LoginForm, type SignInStep } from '@/widgets/login-form/login-form';

export default function SignInPage() {
  const [step, setStep] = useState<SignInStep>('credentials');
  const locale = useLocale() as Locale;
  const t = useTranslations('auth');
  const heading = getStepHeadings(locale)[step];
  const heroTitle = t('heroTitle', { brandName: env.APP_NAME });
  const heroSubtitle = t('heroSubtitle');

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <BrandLogo name={env.APP_NAME} showName />
          </div>
          <LocaleSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="mb-6 space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {heading.title}
              </h1>
              <p className="text-muted-foreground text-sm">
                {heading.subtitle}
              </p>
            </div>
            <LoginForm onStepChange={setStep} />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950" />
        <div className="relative flex h-full flex-col justify-end p-10 text-white">
          <p className="max-w-md text-lg font-medium">{heroTitle}</p>
          <p className="mt-2 max-w-sm text-sm text-white/70">{heroSubtitle}</p>
        </div>
      </div>
    </div>
  );
}
