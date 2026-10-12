"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignRole,
  createRole,
  deleteRole,
  getRole,
  listRoles,
  roleKeys,
  unassignRole,
  updateRole,
  userKeys,
  type ListQueryParams,
} from "@default/api";
import type {
  AssignRoleInput,
  CreateRoleInput,
  UpdateRoleInput,
} from "@default/types/role";
import { listQueryOptions } from "../list-query-options";

export { roleKeys };

export const useRoles = (params: ListQueryParams) => {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: () => listRoles(params),
    ...listQueryOptions,
  });
};

export const useRole = (id: number, enabled = true) => {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => getRole(id),
    enabled: enabled && id > 0,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRoleInput) => createRole(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleInput }) =>
      updateRole(id, data),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: roleKeys.detail(id) });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRole(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
    },
  });
};

export const useAssignRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AssignRoleInput) => assignRole(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
};

export const useUnassignRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: number; roleId: number }) =>
      unassignRole(userId, roleId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: userKeys.me });
    },
  });
};
