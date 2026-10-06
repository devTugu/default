'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { bffOAuthAuthorize } from '@/shared/lib/bff-auth';
import { getErrorMessage } from '@/shared/api';
import { Button } from '@/shared/ui/button';

const OAUTH_STATE_KEY = 'oauth_state';

export function OAuthSignInButton() {
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
    <Button type="button" variant="outline" className="w-full" onClick={handleOAuth}>
      {t('continueWithSso')}
    </Button>
  );
}

export { OAUTH_STATE_KEY };
