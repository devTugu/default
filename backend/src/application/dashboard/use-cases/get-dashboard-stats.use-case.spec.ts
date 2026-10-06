import { GetDashboardStatsUseCase } from './get-dashboard-stats.use-case';

describe('GetDashboardStatsUseCase', () => {
  it('returns empty stats without permissions', async () => {
    const users = { findAll: jest.fn() };
    const roles = { findAll: jest.fn() };
    const permissions = { findAll: jest.fn() };

    const result = await new GetDashboardStatsUseCase(
      users as never,
      roles as never,
      permissions as never,
    ).execute([]);

    expect(result).toEqual({});
    expect(users.findAll).not.toHaveBeenCalled();
  });

  it('loads counts for allowed permissions', async () => {
    const users = {
      findAll: jest.fn().mockResolvedValue({ total: 3, items: [] }),
    };
    const roles = {
      findAll: jest.fn().mockResolvedValue({ total: 2, items: [] }),
    };
    const permissions = {
      findAll: jest.fn().mockResolvedValue({ total: 10, items: [] }),
    };

    const result = await new GetDashboardStatsUseCase(
      users as never,
      roles as never,
      permissions as never,
    ).execute(['USER_READ', 'ROLE_READ', 'PERMISSION_READ']);

    expect(result).toEqual({ users: 3, roles: 2, permissions: 10 });
  });
});
