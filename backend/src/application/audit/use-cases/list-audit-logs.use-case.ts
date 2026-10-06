import { Inject, Injectable } from '@nestjs/common';
import {
  IAuditLogRepository,
  ListAuditLogsQuery,
} from '@application/ports/audit-log.port';
import { RecordAuditLogUseCase } from './record-audit-log.use-case';
import {
  AuditLogOutput,
  toAuditLogOutput,
} from '../dto/audit-log-output.mapper';
import { PaginatedResult } from '@shared/types/pagination';
import { AUDIT_LOG_REPOSITORY } from '@shared/constants/tokens';

@Injectable()
export class ListAuditLogsUseCase {
  constructor(
    @Inject(AUDIT_LOG_REPOSITORY)
    private readonly auditLogs: IAuditLogRepository,
    private readonly recordAuditLog: RecordAuditLogUseCase,
  ) {}

  async execute(
    query: ListAuditLogsQuery,
    actorUserId: number,
  ): Promise<PaginatedResult<AuditLogOutput>> {
    const result = await this.auditLogs.findAll(query);

    await this.recordAuditLog.execute({
      userId: actorUserId,
      action: 'AUDIT_LOG_READ',
      resource: 'audit_logs',
      resourceId: null,
      ipAddress: null,
      metadata: {
        filters: {
          page: query.page,
          limit: query.limit,
          userId: query.userId,
          resource: query.resource,
          action: query.action,
        },
        resultCount: result.items.length,
        total: result.total,
      },
    });

    return {
      ...result,
      items: result.items.map((item) => toAuditLogOutput(item)),
    };
  }
}
