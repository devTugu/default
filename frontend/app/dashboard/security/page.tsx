import { redirect } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

export default function SecurityPage() {
  redirect(ROUTES.SITE_SETTINGS);
}
