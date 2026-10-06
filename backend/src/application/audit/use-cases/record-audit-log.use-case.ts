import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  IAuditLogRepository,
  AuditLogRecord,
} from '@application/ports/audit-log.port';
import { AUDIT_LOG_REPOSITORY } from '@shared/constants/tokens';

@Injectable()
export class RecordAuditLogUseCase {
  private readonly logger = new Logger(RecordAuditLogUseCase.name);

  constructor(
    @Inject(AUDIT_LOG_REPOSITORY)
    private readonly auditLogs: IAuditLogRepository,
  ) {}

  async execute(record: AuditLogRecord): Promise<void> {
    try {
      await this.auditLogs.save(record);
    } catch (error) {
      this.logger.warn(
        `Audit log failed: ${record.action} ${record.resource}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}
