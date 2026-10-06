import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListAuditLogsUseCase } from '@application/audit/use-cases/list-audit-logs.use-case';
import { Permissions } from '../../../decorators/permissions.decorator';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { ListAuditLogsQueryDto } from '../../../dto/v1/audit-log.dto';
import { JwtPayload } from '@shared/types/pagination';

@ApiTags('Audit Logs (Admin) v1')
@ApiBearerAuth('access-token')
@Controller({ path: 'admin/audit-logs', version: '1' })
export class AuditLogAdminV1Controller {
  constructor(private readonly listAuditLogs: ListAuditLogsUseCase) {}

  @Get()
  @Permissions('AUDIT_READ')
  @ApiOperation({ summary: 'List audit logs with filters' })
  findAll(
    @CurrentUser() user: JwtPayload,
    @Query() query: ListAuditLogsQueryDto,
  ) {
    return this.listAuditLogs.execute(
      {
        page: query.page,
        limit: query.limit,
        userId: query.userId,
        resource: query.resource,
        action: query.action,
        from: query.from ? new Date(query.from) : undefined,
        to: query.to ? new Date(query.to) : undefined,
      },
      user.sub,
    );
  }
}
