/** Short label for session lists from a User-Agent string. */
export function deviceLabelFromUserAgent(
  userAgent: string | null | undefined,
): string {
  if (!userAgent?.trim()) {
    return 'Unknown device';
  }
  const ua = userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua)) {
    return 'Mobile';
  }
  if (/Mac OS X|Macintosh/i.test(ua)) {
    return 'macOS';
  }
  if (/Windows/i.test(ua)) {
    return 'Windows';
  }
  if (/Linux/i.test(ua)) {
    return 'Linux';
  }
  return 'Browser';
}
