"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmMfaEnroll, disableMfa, enrollMfa } from "@default/api";

export function useEnrollMfa() {
  return useMutation({
    mutationFn: () => enrollMfa(),
  });
}

export function useConfirmMfaEnroll() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => confirmMfaEnroll(code),
    onSuccess: () => {
      void queryClient.invalidateQueries();
    },
  });
}

export function useDisableMfa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => disableMfa(code),
    onSuccess: () => {
      void queryClient.invalidateQueries();
    },
  });
}
