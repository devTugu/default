import { ROUTES } from '@/shared/config/routes';

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD] as const;

export const AUTH_ROUTES = [ROUTES.LOGIN] as const;

export const isProtectedRoute = (path: string): boolean => {
  return path.startsWith(ROUTES.DASHBOARD);
};

export const isAuthRoute = (path: string): boolean => {
  return AUTH_ROUTES.some((route) => path.startsWith(route));
};
