import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PurgeAuditLogsUseCase } from '@application/audit/use-cases/purge-audit-logs.use-case';

@Injectable()
export class AuditRetentionScheduler {
  private readonly logger = new Logger(AuditRetentionScheduler.name);

  constructor(
    private readonly purgeAuditLogs: PurgeAuditLogsUseCase,
    private readonly config: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async purgeExpiredLogs(): Promise<void> {
    if (this.config.get<string>('NODE_ENV') !== 'production') {
      return;
    }
    if (this.config.get<string>('AUDIT_PURGE_ENABLED') !== 'true') {
      return;
    }

    const deleted = await this.purgeAuditLogs.execute();
    this.logger.log(`Purged ${deleted} audit log rows`);
  }
}
