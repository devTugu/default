import { LoadUserAuthContextUseCase } from './load-user-auth-context.use-case';

describe('LoadUserAuthContextUseCase', () => {
  const users = { findById: jest.fn() };
  const cache = { get: jest.fn(), set: jest.fn() };
  const config = { get: jest.fn().mockReturnValue(60) };
  const useCase = new LoadUserAuthContextUseCase(
    users as never,
    cache as never,
    config as never,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns cached context', async () => {
    cache.get.mockResolvedValue({
      roleNames: ['ADMIN'],
      permissionCodes: ['USER_READ'],
    });
    const result = await useCase.execute(1);
    expect(result?.permissionCodes).toEqual(['USER_READ']);
    expect(users.findById).not.toHaveBeenCalled();
  });

  it('loads from database and caches', async () => {
    cache.get.mockResolvedValue(null);
    users.findById.mockResolvedValue({
      id: 1,
      isActive: true,
      roleNames: ['ADMIN'],
      permissionCodes: ['USER_READ'],
    });

    const result = await useCase.execute(1);
    expect(cache.set).toHaveBeenCalled();
    expect(result?.roleNames).toEqual(['ADMIN']);
  });

  it('returns null for inactive user', async () => {
    cache.get.mockResolvedValue(null);
    users.findById.mockResolvedValue({ id: 1, isActive: false });
    expect(await useCase.execute(1)).toBeNull();
  });
});
