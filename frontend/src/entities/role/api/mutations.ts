'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type {
  AssignRoleInput,
  CreateRoleInput,
  Role,
  UpdateRoleInput,
} from '../types/role';
import { roleKeys } from './queries';
import { userKeys } from '@/entities/user/api/queries';

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleInput) =>
      api.post<Role>(API_ENDPOINTS.ROLES.LIST, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleInput }) =>
      api.put<Role>(API_ENDPOINTS.ROLES.BY_ID(id), data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(id) });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete<void>(API_ENDPOINTS.ROLES.BY_ID(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
};

export const useAssignRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignRoleInput) =>
      api.post<null>(API_ENDPOINTS.ROLES.ASSIGN, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
};

export const useUnassignRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      roleId,
    }: {
      userId: number;
      roleId: number;
    }) => api.delete<void>(API_ENDPOINTS.ROLES.UNASSIGN(userId, roleId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
};
