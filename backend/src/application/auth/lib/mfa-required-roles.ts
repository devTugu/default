export function parseMfaRequiredRoles(raw: string | undefined): string[] {
  if (raw === '') {
    return [];
  }
  if (!raw?.trim()) {
    return ['SUPER_ADMIN'];
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
