'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Login04 from '@default/ui/composed/login/login-04';
import { env } from '@/shared/config/env';
import { ROUTES } from '@/shared/config/routes';
import { getStepHeadings } from '@/shared/i18n/messages';
import type { Locale } from '@/shared/i18n/config';
import { LoginForm, type SignInStep } from './login-form';
import { Login04OAuthSection } from './login-04-oauth-section';

export function SignInLogin04View() {
  const [step, setStep] = useState<SignInStep>('credentials');
  const locale = useLocale() as Locale;
  const t = useTranslations('auth');
  const heading = getStepHeadings(locale)[step];
  const showSocial = step === 'credentials';

  return (
    <Login04
      homeHref={ROUTES.HOME}
      title={heading.title}
      subtitle={heading.subtitle}
      panelTitle={t('heroTitle', { brandName: env.APP_NAME })}
      socialAuth={showSocial ? <Login04OAuthSection /> : null}
      credentials={
        <LoginForm layout="login-04" hideOAuth onStepChange={setStep} />
      }
    />
  );
}
