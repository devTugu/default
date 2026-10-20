import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

export default function AccountSettingsPage() {
  redirect(ROUTES.SITE_SETTINGS);
}
