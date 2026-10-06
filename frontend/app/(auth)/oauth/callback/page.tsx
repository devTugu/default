'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  isEnrollmentStep,
  isMfaStep,
  useConfirmMfaEnrollment,
  useVerifyMfaLogin,
} from '@/features/auth';
import { MfaEnrollmentStep } from '@/features/auth/ui/mfa-enrollment-step';
import { MfaVerifyForm } from '@/features/mfa/ui/mfa-verify-form';
import { bffMe, bffOAuthCallback } from '@/shared/lib/bff-auth';
import { OAUTH_STATE_KEY } from '@/widgets/oauth-sign-in-button/oauth-sign-in-button';
import { ROUTES } from '@/shared/config/routes';
import { useAuthStore } from '@/features/auth/model/store';
import { sessionHint } from '@/shared/lib/session-hint';
import type { UserOutput } from '@/entities/user';
import { getErrorMessage } from '@/shared/api';
import { getStepHeadings } from '@/shared/i18n/messages';
import { LocaleSwitcher } from '@/shared/i18n/locale-switcher';
import type { Locale } from '@/shared/i18n/config';

export default function OAuthCallbackPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const verifyMfa = useVerifyMfaLogin();
  const confirmEnrollment = useConfirmMfaEnrollment();
  const locale = useLocale() as Locale;
  const t = useTranslations('auth');
  const [mfaToken, setMfaToken] = useState<string | null>(null);
  const [enrollmentToken, setEnrollmentToken] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const callbackUrl = window.location.href;
        const result = await bffOAuthCallback(callbackUrl);

        if (isMfaStep(result)) {
          setMfaToken(result.mfaToken);
          return;
        }

        if (isEnrollmentStep(result)) {
          setEnrollmentToken(result.enrollmentToken);
          return;
        }

        sessionHint.setSession(result.expiresIn);
        const user = await bffMe<UserOutput>();
        setSession(user);
        sessionStorage.removeItem(OAUTH_STATE_KEY);
        router.replace(ROUTES.DASHBOARD);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    })();
  }, [router, setSession]);

  const onVerify = async () => {
    if (!mfaToken) return;
    try {
      await verifyMfa.mutateAsync({ mfaToken, code });
      sessionStorage.removeItem(OAUTH_STATE_KEY);
      router.replace(ROUTES.DASHBOARD);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const onConfirmEnrollment = async (totpCode: string) => {
    if (!enrollmentToken) return;
    await confirmEnrollment.mutateAsync({ enrollmentToken, code: totpCode });
    sessionStorage.removeItem(OAUTH_STATE_KEY);
    router.replace(ROUTES.DASHBOARD);
  };

  if (error) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  if (enrollmentToken) {
    const heading = getStepHeadings(locale)['mfa-enroll'];
    return (
      <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 p-6">
        <div className="flex justify-end">
          <LocaleSwitcher />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{heading.title}</h1>
          <p className="text-sm text-muted-foreground">{heading.subtitle}</p>
        </div>
        <MfaEnrollmentStep
          enrollmentToken={enrollmentToken}
          onBack={() => router.replace(ROUTES.LOGIN)}
          onConfirm={onConfirmEnrollment}
          isConfirming={confirmEnrollment.isPending}
        />
      </div>
    );
  }

  if (mfaToken) {
    return (
      <div className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-4 p-6">
        <div className="flex justify-end">
          <LocaleSwitcher />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t('oauthVerifyMfaTitle')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('oauthVerifyMfaSubtitle')}
          </p>
        </div>
        <MfaVerifyForm
          code={code}
          onCodeChange={setCode}
          onVerify={onVerify}
          isVerifying={verifyMfa.isPending}
          onBack={() => router.replace(ROUTES.LOGIN)}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <p className="text-muted-foreground text-sm">{t('oauthCompleting')}</p>
    </div>
  );
}
