'use client';

import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@default/ui/primitives/button';
import { Label } from '@default/ui/primitives/label';
import { TotpCodeInput } from './totp-code-input';

interface MfaSetupConfirmSectionProps {
  code: string;
  onCodeChange: (value: string) => void;
  onConfirm: () => void | Promise<void>;
  isConfirming: boolean;
  canConfirm: boolean;
  isLoading: boolean;
  otpauthUrl: string | null;
  onBack?: () => void;
  confirmLabel?: string;
  confirmingLabel?: string;
  backLabel?: string;
}

export function MfaSetupConfirmSection({
  code,
  onCodeChange,
  onConfirm,
  isConfirming,
  canConfirm,
  isLoading,
  otpauthUrl,
  onBack,
  confirmLabel,
  confirmingLabel,
  backLabel,
}: MfaSetupConfirmSectionProps) {
  const t = useTranslations('mfa');
  const tCommon = useTranslations('common');

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-primary size-4" />
          <Label htmlFor="mfa-setup-code" className="text-sm font-medium">
            {t('enterVerificationCode')}
          </Label>
        </div>
        <TotpCodeInput
          id="mfa-setup-code"
          value={code}
          onChange={onCodeChange}
          disabled={isLoading || isConfirming}
          autoFocus={Boolean(otpauthUrl)}
        />
        <p className="text-muted-foreground text-xs">{t('codeRefreshHint')}</p>
      </div>

      <div className="space-y-2">
        <Button
          className="w-full"
          onClick={() => void onConfirm()}
          disabled={!canConfirm || isConfirming}
        >
          {isConfirming
            ? (confirmingLabel ?? t('enabling'))
            : (confirmLabel ?? t('enableAndContinue'))}
        </Button>

        {onBack ? (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onBack}
            disabled={isConfirming}
          >
            {backLabel ?? tCommon('backToSignIn')}
          </Button>
        ) : null}
      </div>
    </>
  );
}
