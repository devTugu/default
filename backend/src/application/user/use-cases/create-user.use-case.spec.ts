import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  const users = {
    emailExists: jest.fn(),
    create: jest.fn(),
  };
  const hasher = { hash: jest.fn().mockResolvedValue('hashed') };

  const useCase = new CreateUserUseCase(users as never, hasher as never);

  it('creates user when email is unique', async () => {
    users.emailExists.mockResolvedValue(false);
    users.create.mockResolvedValue({
      id: 1,
      email: 'new@example.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      roleNames: [],
    });

    const result = await useCase.execute({
      email: 'new@example.com',
      password: 'Password1!',
    });

    expect(result.email).toBe('new@example.com');
    expect(hasher.hash).toHaveBeenCalledWith('Password1!');
  });

  it('throws conflict when email exists', async () => {
    users.emailExists.mockResolvedValue(true);
    await expect(
      useCase.execute({ email: 'dup@example.com', password: 'Password1!' }),
    ).rejects.toMatchObject({ code: 'CONFLICT' });
  });
});
