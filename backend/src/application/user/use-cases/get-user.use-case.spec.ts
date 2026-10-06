import { GetUserUseCase } from './get-user.use-case';

describe('GetUserUseCase', () => {
  const users = { findById: jest.fn() };
  const useCase = new GetUserUseCase(users as never);

  it('throws when user not found', async () => {
    users.findById.mockResolvedValue(null);
    await expect(useCase.execute(1)).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('returns user output', async () => {
    users.findById.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      roleNames: ['ADMIN'],
    });
    const result = await useCase.execute(1);
    expect(result.email).toBe('a@b.com');
    expect(result.roles).toEqual(['ADMIN']);
  });
});
