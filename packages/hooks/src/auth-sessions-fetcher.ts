import type { AuthSessionsList } from "@default/types/auth";

export type AuthSessionsFetcher = {
  list: () => Promise<AuthSessionsList>;
  revoke: (sessionId: number) => Promise<void>;
  revokeOthers: () => Promise<void>;
};

let fetcher: AuthSessionsFetcher | null = null;

export function configureAuthSessionsFetcher(next: AuthSessionsFetcher): void {
  fetcher = next;
}

export function getAuthSessionsFetcher(): AuthSessionsFetcher {
  if (!fetcher) {
    throw new Error(
      "@default/hooks: configureAuthSessionsFetcher() before session hooks (wire in frontend)",
    );
  }
  return fetcher;
}
