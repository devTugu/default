'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Check, Copy, ShieldCheck, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { parseOtpAuthUrl } from '@/features/mfa/lib/parse-otpauth-url';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Skeleton } from '@/shared/ui/skeleton';
import { TotpCodeInput } from './totp-code-input';

const QrCode = dynamic(
  () => import('react-qr-code').then((module) => module.default),
  {
    ssr: false,
    loading: () => <Skeleton className="size-48 rounded-lg" />,
  },
);

interface MfaSetupPanelProps {
  otpauthUrl: string | null;
  isLoading?: boolean;
  code: string;
  onCodeChange: (value: string) => void;
  onConfirm: () => void | Promise<void>;
  isConfirming?: boolean;
  onBack?: () => void;
  confirmLabel?: string;
  confirmingLabel?: string;
  backLabel?: string;
}

export function MfaSetupPanel({
  otpauthUrl,
  isLoading = false,
  code,
  onCodeChange,
  onConfirm,
  isConfirming = false,
  onBack,
  confirmLabel,
  confirmingLabel,
  backLabel,
}: MfaSetupPanelProps) {
  const t = useTranslations('mfa');
  const tCommon = useTranslations('common');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  const details = otpauthUrl ? parseOtpAuthUrl(otpauthUrl) : null;
  const canConfirm = Boolean(otpauthUrl) && code.length === 6 && !isLoading;

  const handleCopySecret = async () => {
    if (!details?.secret) return;
    await navigator.clipboard.writeText(details.secret);
    toast.success(t('setupKeyCopied'));
    setCopiedSecret(true);
    window.setTimeout(() => setCopiedSecret(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Smartphone className="size-4" />
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-medium">{t('useAuthenticatorApp')}</p>
            <p className="text-muted-foreground">{t('authenticatorAppsHint')}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col items-center gap-3">
          {isLoading ? (
            <Skeleton className="size-48 rounded-xl" />
          ) : otpauthUrl ? (
            <div className="rounded-xl border bg-white p-4 shadow-sm">
              <QrCode value={otpauthUrl} size={176} />
            </div>
          ) : null}

          {details && (
            <div className="text-center text-sm">
              <p className="text-muted-foreground">{t('account')}</p>
              <p className="font-medium">{details.account}</p>
              {details.issuer && (
                <p className="text-muted-foreground mt-1">{details.issuer}</p>
              )}
            </div>
          )}
        </div>

        {details && (
          <div className="rounded-lg border">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
              onClick={() => setShowManualEntry((current) => !current)}
            >
              {t('cantScanQr')}
              <span className="text-muted-foreground text-xs">
                {showManualEntry ? t('hideSetupKey') : t('showSetupKey')}
              </span>
            </button>

            {showManualEntry && (
              <div className="space-y-3 border-t px-4 py-3">
                <p className="text-muted-foreground text-sm">
                  {t('manualEntryHint')}
                </p>
                <div className="flex items-center gap-2">
                  <code className="bg-muted flex-1 rounded-md px-3 py-2 font-mono text-sm break-all">
                    {details.secret}
                  </code>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCopySecret}
                    aria-label={t('copySetupKey')}
                  >
                    {copiedSecret ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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

        {onBack && (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onBack}
            disabled={isConfirming}
          >
            {backLabel ?? tCommon('backToSignIn')}
          </Button>
        )}
      </div>
    </div>
  );
}
