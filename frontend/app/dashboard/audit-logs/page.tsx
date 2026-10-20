import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

export default function AuditLogsPage() {
  redirect(`${ROUTES.SITE_SETTINGS}?tab=audit`);
}
