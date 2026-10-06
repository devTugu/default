'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  bffEnrollmentConfirm,
  bffLogin,
  bffLogout,
  bffMe,
  bffVerifyMfa,
  type BffLoginResult,
} from '@/shared/lib/bff-auth';
import { sessionHint } from '@/shared/lib/session-hint';
import { useAuthStore } from '../model/store';
import { userKeys } from '@/entities/user/api/queries';
import type { UserOutput } from '@/entities/user';
import type { SignInRequest } from '../types/auth';

function isMfaStep(result: BffLoginResult): result is { requiresMfa: true; mfaToken: string } {
  return 'requiresMfa' in result && result.requiresMfa === true;
}

function isEnrollmentStep(
  result: BffLoginResult,
): result is { requiresMfaEnrollment: true; enrollmentToken: string } {
  return 'requiresMfaEnrollment' in result && result.requiresMfaEnrollment === true;
}

async function establishSession(expiresIn: number) {
  sessionHint.setSession(expiresIn);
  const user = await bffMe<UserOutput>();
  return user;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (data: SignInRequest) => bffLogin(data),
    onSuccess: async (result) => {
      if (isMfaStep(result) || isEnrollmentStep(result)) {
        return result;
      }
      const user = await establishSession(result.expiresIn);
      setSession(user);
      queryClient.setQueryData(userKeys.me, user);
      return result;
    },
  });
};

export const useVerifyMfaLogin = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (data: { mfaToken: string; code: string }) => bffVerifyMfa(data),
    onSuccess: async ({ expiresIn }) => {
      const user = await establishSession(expiresIn);
      setSession(user);
      queryClient.setQueryData(userKeys.me, user);
    },
  });
};

export const useConfirmMfaEnrollment = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (data: { enrollmentToken: string; code: string }) =>
      bffEnrollmentConfirm(data),
    onSuccess: async ({ expiresIn }) => {
      const user = await establishSession(expiresIn);
      setSession(user);
      queryClient.setQueryData(userKeys.me, user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((s) => s.clearSession);

  return useMutation({
    mutationFn: () => bffLogout(),
    onSettled: () => {
      sessionHint.clear();
      clearSession();
      queryClient.clear();
    },
  });
};

export { isMfaStep, isEnrollmentStep };
