'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { MfaSetupPanel } from '@/features/mfa';
import { bffEnrollmentEnroll } from '@/shared/lib/bff-auth';
import { getErrorMessage } from '@/shared/api';

interface MfaEnrollmentStepProps {
  enrollmentToken: string;
  onBack: () => void;
  onConfirm: (code: string) => Promise<void>;
  isConfirming: boolean;
}

export function MfaEnrollmentStep({
  enrollmentToken,
  onBack,
  onConfirm,
  isConfirming,
}: MfaEnrollmentStepProps) {
  const [otpauthUrl, setOtpauthUrl] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [isLoadingSetup, setIsLoadingSetup] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const result = await bffEnrollmentEnroll(enrollmentToken);
        setOtpauthUrl(result.otpauthUrl);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoadingSetup(false);
      }
    })();
  }, [enrollmentToken]);

  const handleConfirm = async () => {
    try {
      await onConfirm(code);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <MfaSetupPanel
      otpauthUrl={otpauthUrl}
      isLoading={isLoadingSetup}
      code={code}
      onCodeChange={setCode}
      onConfirm={handleConfirm}
      isConfirming={isConfirming}
      onBack={onBack}
    />
  );
}
