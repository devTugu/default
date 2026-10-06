import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { IAuditLogRepository } from '@application/ports/audit-log.port';
import { AUDIT_LOG_REPOSITORY } from '@shared/constants/tokens';

@Injectable()
export class PurgeAuditLogsUseCase {
  constructor(
    @Inject(AUDIT_LOG_REPOSITORY)
    private readonly auditLogs: IAuditLogRepository,
    private readonly config: ConfigService,
  ) {}

  async execute(): Promise<number> {
    const retentionDays = this.config.get<number>('AUDIT_RETENTION_DAYS', 90);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - retentionDays);
    return this.auditLogs.deleteOlderThan(cutoff);
  }
}
