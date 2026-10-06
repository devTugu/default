import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AuditLogAdminV1Controller } from '../controllers/v1/admin/audit-log.controller';
import { ListAuditLogsUseCase } from '@application/audit/use-cases/list-audit-logs.use-case';
import { PurgeAuditLogsUseCase } from '@application/audit/use-cases/purge-audit-logs.use-case';
import { RecordAuditLogUseCase } from '@application/audit/use-cases/record-audit-log.use-case';
import { AuditRetentionScheduler } from '@infrastructure/audit/audit-retention.scheduler';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AuditLogAdminV1Controller],
  providers: [
    RecordAuditLogUseCase,
    ListAuditLogsUseCase,
    PurgeAuditLogsUseCase,
    AuditRetentionScheduler,
  ],
  exports: [RecordAuditLogUseCase],
})
export class AuditPresentationModule {}
