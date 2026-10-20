import type { Metadata } from 'next';

/** Admin, auth, and other non-public routes — keep out of search indexes. */
export function privateRouteMetadata(title?: string): Metadata {
  return {
    ...(title ? { title } : {}),
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
  };
}
