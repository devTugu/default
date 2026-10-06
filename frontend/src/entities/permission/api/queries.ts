'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { listQueryOptions } from '@/shared/api/list-query-options';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type { ListQueryParams, PaginatedResult } from '@/shared/api';
import type { Permission } from '../types/permission';

export const permissionKeys = {
  all: ['permissions'] as const,
  lists: () => [...permissionKeys.all, 'list'] as const,
  list: (params: ListQueryParams) =>
    [...permissionKeys.lists(), params] as const,
  details: () => [...permissionKeys.all, 'detail'] as const,
  detail: (id: number) => [...permissionKeys.details(), id] as const,
};

export const usePermissionList = (
  params: ListQueryParams,
  enabled = true
) => {
  return useQuery({
    queryKey: permissionKeys.list(params),
    queryFn: () =>
      api.get<PaginatedResult<Permission>>(API_ENDPOINTS.PERMISSIONS.LIST, {
        params,
      }),
    enabled,
    ...listQueryOptions,
  });
};

export const usePermission = (id: number, enabled = true) => {
  return useQuery({
    queryKey: permissionKeys.detail(id),
    queryFn: () => api.get<Permission>(API_ENDPOINTS.PERMISSIONS.BY_ID(id)),
    enabled: enabled && id > 0,
  });
};
