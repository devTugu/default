import { Module } from '@nestjs/common';
import { DashboardAdminV1Controller } from '../controllers/v1/admin/dashboard.controller';
import { GetDashboardStatsUseCase } from '@application/dashboard/use-cases/get-dashboard-stats.use-case';

@Module({
  controllers: [DashboardAdminV1Controller],
  providers: [GetDashboardStatsUseCase],
})
export class DashboardPresentationModule {}
