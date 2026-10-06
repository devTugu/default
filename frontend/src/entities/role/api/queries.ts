'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { listQueryOptions } from '@/shared/api/list-query-options';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type { ListQueryParams, PaginatedResult } from '@/shared/api';
import type { Role } from '../types/role';

export const roleKeys = {
  all: ['roles'] as const,
  lists: () => [...roleKeys.all, 'list'] as const,
  list: (params: ListQueryParams) => [...roleKeys.lists(), params] as const,
  details: () => [...roleKeys.all, 'detail'] as const,
  detail: (id: number) => [...roleKeys.details(), id] as const,
};

export const useRoles = (params: ListQueryParams) => {
  return useQuery({
    queryKey: roleKeys.list(params),
    queryFn: () =>
      api.get<PaginatedResult<Role>>(API_ENDPOINTS.ROLES.LIST, { params }),
    ...listQueryOptions,
  });
};

export const useRole = (id: number, enabled = true) => {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => api.get<Role>(API_ENDPOINTS.ROLES.BY_ID(id)),
    enabled: enabled && id > 0,
  });
};
