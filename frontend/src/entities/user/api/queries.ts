'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { listQueryOptions } from '@/shared/api/list-query-options';
import { bffMe } from '@/shared/lib/bff-auth';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type { ListQueryParams, PaginatedResult } from '@/shared/api';
import type { UserOutput } from '../types/user';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: ListQueryParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
  me: ['auth', 'me'] as const,
};

export const useMe = (enabled = true) => {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: () => bffMe<UserOutput>(),
    enabled: enabled && typeof window !== 'undefined',
    retry: false,
  });
};

export const useUsers = (params: ListQueryParams) => {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () =>
      api.get<PaginatedResult<UserOutput>>(API_ENDPOINTS.USERS.LIST, {
        params,
      }),
    ...listQueryOptions,
  });
};

export const useUser = (id: number, enabled = true) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api.get<UserOutput>(API_ENDPOINTS.USERS.BY_ID(id)),
    enabled: enabled && id > 0,
  });
};
