"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  anonymizeUser,
  createUser,
  deleteUser,
  exportUserData,
  getUser,
  listUsers,
  updateUser,
  userKeys,
  type ListQueryParams,
} from "@default/api";
import type { CreateUserInput, UpdateUserInput } from "@default/types/user";
import { listQueryOptions } from "../list-query-options";
import { getMeFetcher } from "../me-fetcher";

export { userKeys };

export const useMe = (enabled = true) => {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: () => getMeFetcher()(),
    enabled: enabled && typeof window !== "undefined",
    retry: false,
  });
};

export const useUsers = (params: ListQueryParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => listUsers(params),
    ...listQueryOptions,
  });
};

export const useUser = (id: number, enabled = true) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: enabled && id > 0,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserInput) => createUser(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserInput }) =>
      updateUser(id, data),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

function downloadJsonFile(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export const useExportUserData = () =>
  useMutation({
    mutationFn: async (userId: number) => {
      const data = await exportUserData(userId);
      downloadJsonFile(data, `user-${userId}-export.json`);
      return data;
    },
  });

export const useAnonymizeUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => anonymizeUser(userId),
    onSuccess: (_, userId) => {
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
    },
  });
};
