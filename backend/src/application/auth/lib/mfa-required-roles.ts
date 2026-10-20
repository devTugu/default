/** Parse comma-separated role names from env (empty = none). */
export function parseMfaRequiredRoles(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [];
  }
  return raw
    .split(',')
    .map((role) => role.trim())
    .filter(Boolean);
}

export function roleRequiresMfa(
  roleNames: string[],
  requiredRoles: string[],
): boolean {
  return roleNames.some((role) => requiredRoles.includes(role));
}

/** When platform policy is on, privileged roles must enroll MFA before login. */
export function resolveMfaRequiredRolesFromPolicy(
  enforcePrivilegedMfa: boolean,
  envRaw: string | undefined,
): string[] {
  if (!enforcePrivilegedMfa) {
    return [];
  }
  const parsed = parseMfaRequiredRoles(envRaw);
  return parsed.length > 0 ? parsed : ['SUPER_ADMIN'];
}
