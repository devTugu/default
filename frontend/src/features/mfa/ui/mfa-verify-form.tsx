'use client';

import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { FadeIn } from '@/shared/ui/motion';
import { TotpCodeInput } from './totp-code-input';

interface MfaVerifyFormProps {
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: () => void | Promise<void>;
  isVerifying?: boolean;
  onBack?: () => void;
}

export function MfaVerifyForm({
  code,
  onCodeChange,
  onVerify,
  isVerifying = false,
  onBack,
}: MfaVerifyFormProps) {
  const t = useTranslations('mfa');
  const tCommon = useTranslations('common');

  return (
    <FadeIn>
      <div className="space-y-4">
        <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
          {t('verifyHint')}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary size-4" />
            <Label htmlFor="mfa-verify-code" className="text-sm font-medium">
              {t('verificationCode')}
            </Label>
          </div>
          <TotpCodeInput
            id="mfa-verify-code"
            value={code}
            onChange={onCodeChange}
            disabled={isVerifying}
            autoFocus
          />
        </div>

        <Button
          className="w-full"
          onClick={() => void onVerify()}
          disabled={isVerifying || code.length !== 6}
        >
          {isVerifying ? t('verifying') : t('verifyCode')}
        </Button>

        {onBack && (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onBack}
            disabled={isVerifying}
          >
            {tCommon('backToSignIn')}
          </Button>
        )}
      </div>
    </FadeIn>
  );
}
