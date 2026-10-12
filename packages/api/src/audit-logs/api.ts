import {
  AuditLogOutputSchema,
  type AuditLogOutput,
  type ListAuditLogsParams,
} from "@default/types/audit-log";
import { PaginatedSchema } from "@default/types/common";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";
import type { PaginatedResult } from "../types";

const AuditLogPageSchema = PaginatedSchema(AuditLogOutputSchema);

export async function listAuditLogs(
  params: ListAuditLogsParams,
): Promise<PaginatedResult<AuditLogOutput>> {
  const data = await getApi().get(API_ENDPOINTS.AUDIT_LOGS.LIST, { params });
  return parseWith(AuditLogPageSchema, API_ENDPOINTS.AUDIT_LOGS.LIST)(data);
}
