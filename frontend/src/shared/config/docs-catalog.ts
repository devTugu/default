import { isDevServerMode } from './server-mode';

export const DOCS_ROUTE_PREFIX = '/docs';

export function isDocsPath(pathname: string): boolean {
  return (
    pathname === DOCS_ROUTE_PREFIX ||
    pathname.startsWith(`${DOCS_ROUTE_PREFIX}/`)
  );
}

/** Internal UI catalog — only when `NEXT_SERVER_MODE=dev`. */
export function isDocsCatalogEnabled(): boolean {
  return isDevServerMode();
}
