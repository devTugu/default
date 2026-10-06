'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  isEnrollmentStep,
  isMfaStep,
  createLoginSchema,
  type LoginFormValues,
  useConfirmMfaEnrollment,
  useLogin,
  useVerifyMfaLogin,
} from '@/features/auth';
import { MfaEnrollmentStep } from '@/features/auth/ui/mfa-enrollment-step';
import { MfaVerifyForm } from '@/features/mfa/ui/mfa-verify-form';
import { ROUTES } from '@/shared/config/routes';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@/shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { FadeIn } from '@/shared/ui/motion';
import { OAuthSignInButton } from '@/widgets/oauth-sign-in-button';

type SignInStep = 'credentials' | 'mfa-verify' | 'mfa-enroll';

interface LoginFormProps {
  onStepChange?: (step: SignInStep) => void;
}

export function LoginForm({ onStepChange }: LoginFormProps) {
  const router = useRouter();
  const t = useTranslations('auth');
  const tVal = useTranslations('validation');
  const login = useLogin();
  const verifyMfa = useVerifyMfaLogin();
  const confirmEnrollment = useConfirmMfaEnrollment();
  const [step, setStep] = useState<SignInStep>('credentials');
  const [mfaToken, setMfaToken] = useState<string | null>(null);
  const [enrollmentToken, setEnrollmentToken] = useState<string | null>(null);
  const [totpCode, setTotpCode] = useState('');

  const schema = useMemo(
    () =>
      createLoginSchema({
        invalidEmailAddress: tVal('invalidEmailAddress'),
        passwordMinLength: tVal('passwordMinLength'),
      }),
    [tVal],
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const goToStep = (nextStep: SignInStep) => {
    setStep(nextStep);
    onStepChange?.(nextStep);
  };

  const resetToCredentials = () => {
    setMfaToken(null);
    setEnrollmentToken(null);
    setTotpCode('');
    goToStep('credentials');
  };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const result = await login.mutateAsync(values);

      if (isMfaStep(result)) {
        setMfaToken(result.mfaToken);
        goToStep('mfa-verify');
        toast.message(t('enterAuthenticatorCode'));
        return;
      }

      if (isEnrollmentStep(result)) {
        setEnrollmentToken(result.enrollmentToken);
        goToStep('mfa-enroll');
        return;
      }

      toast.success(t('welcomeBack'));
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onVerifyMfa = async () => {
    if (!mfaToken) return;

    try {
      await verifyMfa.mutateAsync({ mfaToken, code: totpCode });
      toast.success(t('welcomeBack'));
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onConfirmEnrollment = async (code: string) => {
    if (!enrollmentToken) return;

    await confirmEnrollment.mutateAsync({ enrollmentToken, code });
    toast.success(t('mfaEnabledWelcome'));
    router.push(ROUTES.DASHBOARD);
  };

  if (step === 'mfa-enroll' && enrollmentToken) {
    return (
      <MfaEnrollmentStep
        enrollmentToken={enrollmentToken}
        onBack={resetToCredentials}
        onConfirm={onConfirmEnrollment}
        isConfirming={confirmEnrollment.isPending}
      />
    );
  }

  if (step === 'mfa-verify' && mfaToken) {
    return (
      <MfaVerifyForm
        code={totpCode}
        onCodeChange={setTotpCode}
        onVerify={onVerifyMfa}
        isVerifying={verifyMfa.isPending}
        onBack={resetToCredentials}
      />
    );
  }

  return (
    <FadeIn>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={login.isPending}
          >
            {login.isPending ? t('signingIn') : t('signIn')}
          </Button>
          <OAuthSignInButton />
        </form>
      </Form>
    </FadeIn>
  );
}

export type { SignInStep };
