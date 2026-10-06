import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  const users = { findById: jest.fn(), update: jest.fn() };
  const hasher = { hash: jest.fn() };
  const cache = { invalidate: jest.fn() };
  const useCase = new UpdateUserUseCase(
    users as never,
    hasher as never,
    cache as never,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws when user not found', async () => {
    users.findById.mockResolvedValue(null);
    await expect(useCase.execute(1, {})).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('updates user with hashed password and invalidates cache', async () => {
    users.findById.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      roleNames: [],
    });
    hasher.hash.mockResolvedValue('new-hash');
    users.update.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      roleNames: [],
    });

    const result = await useCase.execute(1, {
      password: 'NewPass123!',
      isActive: false,
    });
    expect(hasher.hash).toHaveBeenCalledWith('NewPass123!');
    expect(cache.invalidate).toHaveBeenCalledWith(1);
    expect(result.isActive).toBe(false);
  });
});
