import { RequirePermission } from '@/features/auth';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { DashboardOverview } from '@/widgets/dashboard-stats';

export default function DashboardPage() {
  return (
    <RequirePermission permission={PERMISSION_CODES.DASHBOARD_READ}>
      <DashboardOverview />
    </RequirePermission>
  );
}
