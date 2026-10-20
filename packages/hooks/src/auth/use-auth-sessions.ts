"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthSessionsFetcher } from "../auth-sessions-fetcher";

export const authSessionKeys = {
  all: ["auth", "sessions"] as const,
  list: () => [...authSessionKeys.all, "list"] as const,
};

export function useAuthSessions(options?: { enabled?: boolean }) {
  const fetcher = getAuthSessionsFetcher();
  return useQuery({
    queryKey: authSessionKeys.list(),
    queryFn: () => fetcher.list(),
    enabled: options?.enabled ?? true,
  });
}

export function useRevokeAuthSession() {
  const fetcher = getAuthSessionsFetcher();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: number) => fetcher.revoke(sessionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authSessionKeys.all });
    },
  });
}

export function useRevokeOtherAuthSessions() {
  const fetcher = getAuthSessionsFetcher();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetcher.revokeOthers(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: authSessionKeys.all });
    },
  });
}
