import type { UserOutput } from "@default/types/user";

type MeFetcher = () => Promise<UserOutput>;

let meFetcher: MeFetcher | null = null;

/** Wire BFF `/api/auth/me` (or equivalent) from the Next app. */
export function configureMeFetcher(fetcher: MeFetcher): void {
  meFetcher = fetcher;
}

export function getMeFetcher(): MeFetcher {
  if (!meFetcher) {
    throw new Error(
      "@default/hooks: call configureMeFetcher() before useMe (wire in frontend)",
    );
  }
  return meFetcher;
}
