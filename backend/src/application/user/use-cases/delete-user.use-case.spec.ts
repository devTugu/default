import { DeleteUserUseCase } from './delete-user.use-case';

describe('DeleteUserUseCase', () => {
  const users = { findById: jest.fn(), softDelete: jest.fn() };
  const cache = { invalidate: jest.fn() };
  const useCase = new DeleteUserUseCase(users as never, cache as never);

  it('throws when user not found', async () => {
    users.findById.mockResolvedValue(null);
    await expect(useCase.execute(1)).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('soft deletes user and invalidates cache', async () => {
    users.findById.mockResolvedValue({ id: 1 });
    await useCase.execute(1);
    expect(users.softDelete).toHaveBeenCalledWith(1);
    expect(cache.invalidate).toHaveBeenCalledWith(1);
  });
});
