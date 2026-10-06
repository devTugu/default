'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type {
  CreatePermissionInput,
  Permission,
  UpdatePermissionInput,
} from '../types/permission';
import { permissionKeys } from './queries';

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePermissionInput) =>
      api.post<Permission>(API_ENDPOINTS.PERMISSIONS.LIST, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePermissionInput }) =>
      api.put<Permission>(API_ENDPOINTS.PERMISSIONS.BY_ID(id), data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: permissionKeys.detail(id) });
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api.delete<void>(API_ENDPOINTS.PERMISSIONS.BY_ID(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
    },
  });
};
