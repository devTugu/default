import { ListUsersUseCase } from './list-users.use-case';

describe('ListUsersUseCase', () => {
  const users = { findAll: jest.fn() };
  const useCase = new ListUsersUseCase(users as never);

  it('maps users to output', async () => {
    users.findAll.mockResolvedValue({
      items: [
        {
          id: 1,
          email: 'a@b.com',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          roleNames: ['ADMIN'],
        },
      ],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
    });

    const result = await useCase.execute({ page: 1, limit: 20 });
    expect(result.items[0].roles).toEqual(['ADMIN']);
    expect(result.total).toBe(1);
  });
});
