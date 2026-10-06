export interface AuditLogOutput {
  id: number;
  userId: number | null;
  action: string;
  resource: string;
  resourceId: string | null;
  ipAddress: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface ListAuditLogsParams {
  page?: number;
  limit?: number;
  userId?: number;
  resource?: string;
  action?: string;
  from?: string;
  to?: string;
}
