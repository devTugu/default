import type { Permission } from '../types/permission';

export interface PermissionGroup {
  key: string;
  title: string;
  items: Permission[];
}

const GROUP_PREFIXES: Array<{ key: string; prefix: string }> = [
  { key: 'users', prefix: 'USER_' },
  { key: 'roles', prefix: 'ROLE_' },
  { key: 'permissions', prefix: 'PERMISSION_' },
  { key: 'siteSettings', prefix: 'SITE_SETTING_' },
  { key: 'dashboard', prefix: 'DASHBOARD_' },
  { key: 'audit', prefix: 'AUDIT_' },
];

export function filterPermissions(
  permissions: Permission[],
  search: string,
): Permission[] {
  const query = search.trim().toLowerCase();
  if (!query) return permissions;

  return permissions.filter((permission) => {
    const haystack = `${permission.code} ${permission.description ?? ''}`.toLowerCase();
    return haystack.includes(query);
  });
}

export function groupPermissions(
  permissions: Permission[],
  translateGroup: (key: string) => string,
): PermissionGroup[] {
  const grouped = new Map<string, Permission[]>();

  for (const permission of permissions) {
    const match = GROUP_PREFIXES.find(({ prefix }) =>
      permission.code.startsWith(prefix),
    );
    const key = match?.key ?? 'other';
    const list = grouped.get(key) ?? [];
    list.push(permission);
    grouped.set(key, list);
  }

  const orderedKeys = [
    ...GROUP_PREFIXES.map(({ key }) => key),
    ...(grouped.has('other') ? (['other'] as const) : []),
  ];

  return orderedKeys
    .filter((key) => grouped.has(key))
    .map((key) => ({
      key,
      title: translateGroup(key),
      items: grouped.get(key) ?? [],
    }));
}
