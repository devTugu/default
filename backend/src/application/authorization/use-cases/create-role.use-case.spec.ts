import { CreateRoleUseCase } from './create-role.use-case';

describe('CreateRoleUseCase', () => {
  const roles = { nameExists: jest.fn(), create: jest.fn() };
  const useCase = new CreateRoleUseCase(roles as never);

  it('throws when role name exists', async () => {
    roles.nameExists.mockResolvedValue(true);
    await expect(useCase.execute({ name: 'admin' })).rejects.toMatchObject({
      code: 'CONFLICT',
    });
  });

  it('creates role with uppercase name', async () => {
    roles.nameExists.mockResolvedValue(false);
    roles.create.mockResolvedValue({ id: 1, name: 'EDITOR' });
    const result = await useCase.execute({
      name: 'editor',
      description: 'Editor role',
    });
    expect(roles.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'EDITOR' }),
    );
    expect(result.name).toBe('EDITOR');
  });
});
