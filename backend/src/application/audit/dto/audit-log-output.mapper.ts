import { AuditLogEntry } from '@application/ports/audit-log.port';

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

export function toAuditLogOutput(entry: AuditLogEntry): AuditLogOutput {
  return {
    id: entry.id,
    userId: entry.userId,
    action: entry.action,
    resource: entry.resource,
    resourceId: entry.resourceId,
    ipAddress: entry.ipAddress,
    metadata: entry.metadata,
    createdAt: entry.createdAt.toISOString(),
  };
}
