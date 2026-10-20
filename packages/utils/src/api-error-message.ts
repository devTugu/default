/** Normalize API / Nest error payloads to a single user-facing string. */
export function readApiErrorMessage(
  message: unknown,
  fallback = "An error occurred",
): string {
  if (typeof message === "string") {
    return message;
  }
  if (Array.isArray(message)) {
    return message.map(String).join(", ");
  }
  if (message && typeof message === "object") {
    const nested = (message as { message?: unknown }).message;
    if (typeof nested === "string") {
      return nested;
    }
    if (Array.isArray(nested)) {
      return nested.map(String).join(", ");
    }
  }
  return fallback;
}
