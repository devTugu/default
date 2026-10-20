export interface ClientRequestMeta {
  userAgent: string | null;
  ipAddress: string | null;
}

export function mergeSessionMeta(
  incoming: ClientRequestMeta | undefined,
  previous: { userAgent?: string | null; ipAddress?: string | null } | null,
): ClientRequestMeta {
  return {
    userAgent: incoming?.userAgent ?? previous?.userAgent ?? null,
    ipAddress: incoming?.ipAddress ?? previous?.ipAddress ?? null,
  };
}
