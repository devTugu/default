'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { bffOAuthAuthorize } from '@/shared/lib/bff-auth';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@default/ui/primitives/button';
import { OAUTH_STATE_KEY } from '@/widgets/oauth-sign-in-button/oauth-sign-in-button';

export function Login04OAuthSection() {
  const t = useTranslations('auth');

  if (process.env.NEXT_PUBLIC_OAUTH_ENABLED !== 'true') {
    return null;
  }

  const handleOAuth = async () => {
    try {
      const { url, state } = await bffOAuthAuthorize();
      sessionStorage.setItem(OAUTH_STATE_KEY, state);
      window.location.href = url;
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={() => void handleOAuth()}
          className="h-9 w-full flex-1 cursor-pointer gap-2 rounded-lg px-5! py-2! text-sm font-medium shadow-xs dark:bg-background sm:flex-1"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static OAuth brand mark */}
          <img
            src="/icons/oauth-google.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4"
          />
          {t('continueWithSso')}
        </Button>
      </div>
      <div className="text-muted-foreground flex w-full items-center gap-3 text-sm font-normal before:h-px before:flex-1 before:bg-border before:content-[''] after:h-px after:flex-1 after:bg-border after:content-['']">
        {t('orSignInWithEmail')}
      </div>
    </>
  );
}
