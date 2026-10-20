'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import type { UserOutput } from '@/entities/user';
import { getErrorMessage } from '@/shared/api';
import { bffMe } from '@/shared/lib/bff-auth';
import {
  useConfirmMfaEnroll,
  useDisableMfa,
  useEnrollMfa,
} from '../api/mutations';

export function useMfaSettingsCard(onSessionUpdate: (user: UserOutput) => void) {
  const t = useTranslations('security');
  const enroll = useEnrollMfa();
  const confirm = useConfirmMfaEnroll();
  const disable = useDisableMfa();

  const [otpauthUrl, setOtpauthUrl] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [showDisable, setShowDisable] = useState(false);

  const refreshUser = async () => {
    const me = await bffMe<UserOutput>();
    onSessionUpdate(me);
  };

  const handleToggle = async (next: boolean) => {
    if (next) {
      try {
        const result = await enroll.mutateAsync();
        setOtpauthUrl(result.otpauthUrl);
        setCode('');
        setShowDisable(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
      return;
    }
    setOtpauthUrl(null);
    setShowDisable(true);
  };

  const handleConfirm = async () => {
    try {
      await confirm.mutateAsync(code);
      setOtpauthUrl(null);
      setCode('');
      await refreshUser();
      toast.success(t('mfaEnabledToast'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleDisable = async () => {
    try {
      await disable.mutateAsync(code);
      setCode('');
      setShowDisable(false);
      await refreshUser();
      toast.success(t('mfaDisabledToast'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const cancelDisable = () => {
    setShowDisable(false);
    setCode('');
  };

  const cancelSetup = () => {
    setOtpauthUrl(null);
    setCode('');
  };

  return {
    enroll,
    confirm,
    disable,
    otpauthUrl,
    code,
    setCode,
    showDisable,
    setShowDisable,
    handleToggle,
    handleConfirm,
    handleDisable,
    cancelDisable,
    cancelSetup,
  };
}
