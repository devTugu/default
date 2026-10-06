import { Inject, Injectable } from '@nestjs/common';
import { and, count, desc, eq, gte, lt, lte } from 'drizzle-orm';
import {
  AuditLogEntry,
  AuditLogRecord,
  IAuditLogRepository,
  ListAuditLogsQuery,
} from '@application/ports/audit-log.port';
import { IOrganizationContext } from '@application/ports/organization-context.port';
import { ORGANIZATION_CONTEXT } from '@shared/constants/tokens';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import { auditLogs } from '../database/drizzle/schema';

@Injectable()
export class AuditLogDrizzleRepository implements IAuditLogRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDatabase,
    @Inject(ORGANIZATION_CONTEXT)
    private readonly orgContext: IOrganizationContext,
  ) {}

  async save(record: AuditLogRecord): Promise<void> {
    const organizationId =
      record.organizationId !== undefined
        ? record.organizationId
        : await this.orgContext.getCurrentOrganizationId();

    await this.db.insert(auditLogs).values({
      userId: record.userId,
      organizationId: organizationId ?? null,
      action: record.action,
      resource: record.resource,
      resourceId: record.resourceId,
      ipAddress: record.ipAddress,
      metadata: record.metadata,
    });
  }

  async findAll(query: ListAuditLogsQuery) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const filters = [];

    if (query.userId !== undefined) {
      filters.push(eq(auditLogs.userId, query.userId));
    }
    if (query.resource) {
      filters.push(eq(auditLogs.resource, query.resource));
    }
    if (query.action) {
      filters.push(eq(auditLogs.action, query.action));
    }
    if (query.organizationId !== undefined) {
      filters.push(eq(auditLogs.organizationId, query.organizationId));
    }
    if (query.from && query.to) {
      filters.push(
        gte(auditLogs.createdAt, query.from),
        lte(auditLogs.createdAt, query.to),
      );
    } else if (query.from) {
      filters.push(gte(auditLogs.createdAt, query.from));
    } else if (query.to) {
      filters.push(lte(auditLogs.createdAt, query.to));
    }

    const whereClause = filters.length ? and(...filters) : undefined;

    const [items, totalRow] = await Promise.all([
      this.db.query.auditLogs.findMany({
        where: whereClause,
        orderBy: desc(auditLogs.createdAt),
        limit,
        offset: (page - 1) * limit,
      }),
      this.db.select({ value: count() }).from(auditLogs).where(whereClause),
    ]);

    const total = totalRow[0]?.value ?? 0;
    return {
      items: items.map((item) => this.toEntry(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  async deleteOlderThan(before: Date): Promise<number> {
    const result = await this.db
      .delete(auditLogs)
      .where(lt(auditLogs.createdAt, before));
    return result[0].affectedRows ?? 0;
  }

  private toEntry(entity: typeof auditLogs.$inferSelect): AuditLogEntry {
    return {
      id: entity.id,
      userId: entity.userId,
      organizationId: entity.organizationId,
      action: entity.action,
      resource: entity.resource,
      resourceId: entity.resourceId,
      ipAddress: entity.ipAddress,
      metadata: entity.metadata,
      createdAt: entity.createdAt,
    };
  }
}
