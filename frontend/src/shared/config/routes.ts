export const PUBLIC_ROUTES = {
  HOME: '/',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/sign-in',
  OAUTH_CALLBACK: '/oauth/callback',
  DASHBOARD: '/dashboard',
  SECURITY: '/dashboard/security',
  USERS: '/dashboard/users',
  ROLES: '/dashboard/roles',
  PERMISSIONS: '/dashboard/permissions',
  SITE_SETTINGS: '/dashboard/site-settings',
  AUDIT_LOGS: '/dashboard/audit-logs',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
