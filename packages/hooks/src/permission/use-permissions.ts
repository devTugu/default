"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPermission,
  deletePermission,
  getPermission,
  listPermissions,
  permissionKeys,
  updatePermission,
  type ListQueryParams,
} from "@default/api";
import type {
  CreatePermissionInput,
  UpdatePermissionInput,
} from "@default/types/permission";
import { listQueryOptions } from "../list-query-options";

export { permissionKeys };

export const usePermissionList = (params: ListQueryParams, enabled = true) => {
  return useQuery({
    queryKey: permissionKeys.list(params),
    queryFn: () => listPermissions(params),
    enabled,
    ...listQueryOptions,
  });
};

export const usePermission = (id: number, enabled = true) => {
  return useQuery({
    queryKey: permissionKeys.detail(id),
    queryFn: () => getPermission(id),
    enabled: enabled && id > 0,
  });
};

export const useCreatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePermissionInput) => createPermission(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
    },
  });
};

export const useUpdatePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePermissionInput }) =>
      updatePermission(id, data),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: permissionKeys.detail(id),
      });
    },
  });
};

export const useDeletePermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePermission(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
    },
  });
};
