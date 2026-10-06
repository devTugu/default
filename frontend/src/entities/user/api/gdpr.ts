'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import { userKeys } from './queries';

function downloadJsonFile(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export const useExportUserData = () =>
  useMutation({
    mutationFn: async (userId: number) => {
      const data = await api.get<Record<string, unknown>>(
        API_ENDPOINTS.USERS.EXPORT(userId),
      );
      downloadJsonFile(data, `user-${userId}-export.json`);
      return data;
    },
  });

export const useAnonymizeUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) =>
      api.post<void>(API_ENDPOINTS.USERS.ANONYMIZE(userId)),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
    },
  });
};
