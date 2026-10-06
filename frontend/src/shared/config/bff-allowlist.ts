export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type RoutePattern = {
  pattern: RegExp;
  methods: ReadonlySet<HttpMethod>;
};

/** Static BFF routes derived from API_ENDPOINTS — single catalog for client + server. */
const ROUTE_DEFINITIONS: Array<{ path: string; methods: HttpMethod[] }> = [
  { path: '/users', methods: ['GET', 'POST'] },
  { path: '/users/:id', methods: ['GET', 'PATCH', 'DELETE'] },
  { path: '/roles', methods: ['GET', 'POST'] },
  { path: '/roles/:id', methods: ['GET', 'PATCH', 'DELETE'] },
  { path: '/roles/assign', methods: ['POST'] },
  { path: '/roles/assign/:userId/:roleId', methods: ['DELETE'] },
  { path: '/permissions', methods: ['GET', 'POST'] },
  { path: '/permissions/:id', methods: ['GET', 'PATCH', 'DELETE'] },
  { path: '/admin/site-settings', methods: ['GET', 'PATCH'] },
  { path: '/admin/media/upload', methods: ['POST'] },
  { path: '/admin/dashboard/stats', methods: ['GET'] },
  { path: '/admin/audit-logs', methods: ['GET'] },
  { path: '/users/:id/export', methods: ['GET'] },
  { path: '/users/:id/anonymize', methods: ['POST'] },
  { path: '/auth/mfa/enroll', methods: ['POST'] },
  { path: '/auth/mfa/enroll/confirm', methods: ['POST'] },
  { path: '/auth/mfa/disable', methods: ['POST'] },
  { path: '/auth/oauth/authorize', methods: ['GET'] },
];

function pathToPattern(path: string): RegExp {
  const escaped = path
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        return '[^/]+';
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return new RegExp(`^${escaped}$`);
}

const ALLOWED_ROUTE_PATTERNS: RoutePattern[] = ROUTE_DEFINITIONS.map(
  ({ path, methods }) => ({
    pattern: pathToPattern(path),
    methods: new Set(methods),
  }),
);

const PATH_TRAVERSAL = /(\.\.|%2e%2e|%2E%2E|\\)/i;

export function normalizeBffPath(segments: string[]): string {
  const decoded = segments.map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  });

  if (decoded.some((s) => PATH_TRAVERSAL.test(s))) {
    throw new BffPathError('Path traversal is not allowed');
  }

  return `/${decoded.join('/')}`;
}

export class BffPathError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BffPathError';
  }
}

export function isBffPathAllowed(path: string, method: string): boolean {
  const httpMethod = method.toUpperCase() as HttpMethod;
  return ALLOWED_ROUTE_PATTERNS.some(
    ({ pattern, methods }) => pattern.test(path) && methods.has(httpMethod),
  );
}

export { ALLOWED_ROUTE_PATTERNS, ROUTE_DEFINITIONS };
