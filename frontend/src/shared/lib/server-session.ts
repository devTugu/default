import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAMES } from '@/shared/lib/auth-cookies';

export async function hasServerSession(): Promise<boolean> {
  const store = await cookies();
  const hasSessionHint = store.get(AUTH_COOKIE_NAMES.SESSION)?.value === '1';
  const hasRefreshToken = Boolean(store.get(AUTH_COOKIE_NAMES.REFRESH_TOKEN)?.value);
  return hasSessionHint && hasRefreshToken;
}
