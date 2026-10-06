export interface AuditLogRecord {
  userId: number | null;
  action: string;
  resource: string;
  resourceId: string | null;
  ipAddress: string | null;
  metadata: Record<string, unknown> | null;
  /** Stamped from IOrganizationContext when available. */
  organizationId?: number | null;
}

export interface AuditLogEntry extends AuditLogRecord {
  id: number;
  createdAt: Date;
}

export interface ListAuditLogsQuery {
  page?: number;
  limit?: number;
  userId?: number;
  resource?: string;
  action?: string;
  from?: Date;
  to?: Date;
  organizationId?: number;
}

export interface IAuditLogRepository {
  save(record: AuditLogRecord): Promise<void>;
  findAll(query: ListAuditLogsQuery): Promise<{
    items: AuditLogEntry[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  deleteOlderThan(before: Date): Promise<number>;
}
