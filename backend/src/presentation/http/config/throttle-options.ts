function readNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const LOGIN_THROTTLE_OPTIONS = {
  default: {
    limit: readNumber(process.env.LOGIN_THROTTLE_LIMIT, 5),
    ttl: readNumber(process.env.LOGIN_THROTTLE_TTL, 60) * 1000,
  },
};
