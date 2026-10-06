'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/client';
import { API_ENDPOINTS } from '@/shared/config/api.config';

export function useEnrollMfa() {
  return useMutation({
    mutationFn: () =>
      api.post<{ otpauthUrl: string }>(API_ENDPOINTS.AUTH.MFA_ENROLL),
  });
}

export function useConfirmMfaEnroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) =>
      api.post<void>(API_ENDPOINTS.AUTH.MFA_ENROLL_CONFIRM, { code }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}

export function useDisableMfa() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) =>
      api.post<void>(API_ENDPOINTS.AUTH.MFA_DISABLE, { code }),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
