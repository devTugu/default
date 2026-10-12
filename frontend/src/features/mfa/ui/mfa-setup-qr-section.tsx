'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { parseOtpAuthUrl } from '@/features/mfa/lib/parse-otpauth-url';
import { Button } from '@default/ui/primitives/button';
import { Skeleton } from '@default/ui/primitives/skeleton';

const QrCode = dynamic(
  () => import('react-qr-code').then((module) => module.default),
  {
    ssr: false,
    loading: () => <Skeleton className="size-48 rounded-lg" />,
  },
);

interface MfaSetupQrSectionProps {
  otpauthUrl: string | null;
  isLoading: boolean;
}

export function MfaSetupQrSection({
  otpauthUrl,
  isLoading,
}: MfaSetupQrSectionProps) {
  const t = useTranslations('mfa');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const details = otpauthUrl ? parseOtpAuthUrl(otpauthUrl) : null;

  const handleCopySecret = async () => {
    if (!details?.secret) return;
    await navigator.clipboard.writeText(details.secret);
    toast.success(t('setupKeyCopied'));
    setCopiedSecret(true);
    window.setTimeout(() => setCopiedSecret(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-3">
        {isLoading ? (
          <Skeleton className="size-48 rounded-xl" />
        ) : otpauthUrl ? (
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <QrCode value={otpauthUrl} size={176} />
          </div>
        ) : null}

        {details ? (
          <div className="text-center text-sm">
            <p className="text-muted-foreground">{t('account')}</p>
            <p className="font-medium">{details.account}</p>
            {details.issuer ? (
              <p className="text-muted-foreground mt-1">{details.issuer}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      {details ? (
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

          {showManualEntry ? (
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
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
