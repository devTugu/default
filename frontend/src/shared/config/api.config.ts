export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    MFA_VERIFY: '/auth/mfa/verify',
    MFA_ENROLL: '/auth/mfa/enroll',
    MFA_ENROLL_CONFIRM: '/auth/mfa/enroll/confirm',
    MFA_DISABLE: '/auth/mfa/disable',
    MFA_ENROLLMENT_ENROLL: '/auth/mfa/enrollment/enroll',
    MFA_ENROLLMENT_CONFIRM: '/auth/mfa/enrollment/confirm',
    OAUTH_AUTHORIZE: '/auth/oauth/authorize',
    OAUTH_CALLBACK: '/auth/oauth/callback',
  },
  USERS: {
    LIST: '/users',
    BY_ID: (id: number) => `/users/${id}`,
    EXPORT: (id: number) => `/users/${id}/export`,
    ANONYMIZE: (id: number) => `/users/${id}/anonymize`,
  },
  ROLES: {
    LIST: '/roles',
    BY_ID: (id: number) => `/roles/${id}`,
    ASSIGN: '/roles/assign',
    UNASSIGN: (userId: number, roleId: number) =>
      `/roles/assign/${userId}/${roleId}`,
  },
  PERMISSIONS: {
    LIST: '/permissions',
    BY_ID: (id: number) => `/permissions/${id}`,
  },
  SITE_SETTINGS: {
    GET: '/admin/site-settings',
    PATCH: '/admin/site-settings',
  },
  MEDIA: {
    UPLOAD: '/admin/media/upload',
  },
  DASHBOARD: {
    STATS: '/admin/dashboard/stats',
  },
  AUDIT_LOGS: {
    LIST: '/admin/audit-logs',
  },
} as const;
