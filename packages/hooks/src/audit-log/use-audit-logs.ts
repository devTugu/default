"use client";

import { useQuery } from "@tanstack/react-query";
import { auditLogKeys, listAuditLogs } from "@default/api";
import type { ListAuditLogsParams } from "@default/types/audit-log";
import { listQueryOptions } from "../list-query-options";

export { auditLogKeys };

export const useAuditLogs = (params: ListAuditLogsParams) => {
  return useQuery({
    queryKey: auditLogKeys.list(params),
    queryFn: () => listAuditLogs(params),
    ...listQueryOptions,
  });
};
