import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetDashboardStatsUseCase } from '@application/dashboard/use-cases/get-dashboard-stats.use-case';
import { Permissions } from '../../../decorators/permissions.decorator';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { JwtPayload } from '@shared/types/pagination';

@ApiTags('Dashboard (Admin) v1')
@ApiBearerAuth('access-token')
@Controller({ path: 'admin/dashboard', version: '1' })
export class DashboardAdminV1Controller {
  constructor(private readonly getDashboardStats: GetDashboardStatsUseCase) {}

  @Get('stats')
  @Permissions('DASHBOARD_READ')
  @ApiOperation({
    summary: 'Permission-aware dashboard counts in a single request',
  })
  stats(@CurrentUser() user: JwtPayload) {
    return this.getDashboardStats.execute(user.permissionCodes);
  }
}
