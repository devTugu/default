import { describe, expect, it } from 'vitest';
import { filterPermissions, groupPermissions } from './group-permissions';
import type { Permission } from '../types/permission';

const permission = (code: string): Permission => ({
  id: 1,
  code,
  description: null,
});

const mockTranslator = (key: string) => key;

describe('groupPermissions', () => {
  it('groups permissions by module prefix', () => {
    const groups = groupPermissions(
      [
        permission('USER_READ'),
        permission('USER_CREATE'),
        permission('SITE_SETTING_READ'),
      ],
      mockTranslator,
    );

    expect(groups.map((group) => group.key)).toEqual(['users', 'siteSettings']);
    expect(groups[0]?.items).toHaveLength(2);
    expect(groups[1]?.items[0]?.code).toBe('SITE_SETTING_READ');
  });

  it('filters permissions by search query', () => {
    const filtered = filterPermissions(
      [permission('USER_READ'), permission('ROLE_READ')],
      'role',
    );
    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.code).toBe('ROLE_READ');
  });
});
