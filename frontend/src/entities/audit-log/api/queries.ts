'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import { listQueryOptions } from '@/shared/api/list-query-options';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type { PaginatedResult } from '@/shared/api';
import type { AuditLogOutput, ListAuditLogsParams } from '../types/audit-log';

export const auditLogKeys = {
  all: ['audit-logs'] as const,
  lists: () => [...auditLogKeys.all, 'list'] as const,
  list: (params: ListAuditLogsParams) =>
    [...auditLogKeys.lists(), params] as const,
};

export const useAuditLogs = (params: ListAuditLogsParams) => {
  return useQuery({
    queryKey: auditLogKeys.list(params),
    queryFn: () =>
      api.get<PaginatedResult<AuditLogOutput>>(
        API_ENDPOINTS.AUDIT_LOGS.LIST,
        { params }
      ),
    ...listQueryOptions,
  });
};
