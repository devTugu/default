import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  GetPermissionUseCase,
  ListPermissionsUseCase,
  UpdatePermissionUseCase,
} from './permission-crud.use-cases';

describe('Permission CRUD use cases', () => {
  const permissions = {
    codeExists: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  describe('CreatePermissionUseCase', () => {
    it('throws on duplicate code', async () => {
      permissions.codeExists.mockResolvedValue(true);
      const useCase = new CreatePermissionUseCase(permissions as never);
      await expect(useCase.execute('USER_READ')).rejects.toMatchObject({
        code: 'CONFLICT',
      });
    });

    it('creates permission', async () => {
      permissions.codeExists.mockResolvedValue(false);
      permissions.create.mockResolvedValue({ id: 1, code: 'USER_READ' });
      const useCase = new CreatePermissionUseCase(permissions as never);
      const result = await useCase.execute('user_read');
      expect(permissions.create).toHaveBeenCalledWith('USER_READ', undefined);
      expect(result.code).toBe('USER_READ');
    });
  });

  describe('ListPermissionsUseCase', () => {
    it('delegates to repository', async () => {
      permissions.findAll.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
      const useCase = new ListPermissionsUseCase(permissions as never);
      await useCase.execute(1, 20);
      expect(permissions.findAll).toHaveBeenCalledWith(1, 20);
    });
  });

  describe('GetPermissionUseCase', () => {
    it('throws when not found', async () => {
      permissions.findById.mockResolvedValue(null);
      const useCase = new GetPermissionUseCase(permissions as never);
      await expect(useCase.execute(1)).rejects.toMatchObject({
        code: 'NOT_FOUND',
      });
    });

    it('returns permission when found', async () => {
      permissions.findById.mockResolvedValue({ id: 1, code: 'USER_READ' });
      const useCase = new GetPermissionUseCase(permissions as never);
      await expect(useCase.execute(1)).resolves.toEqual({
        id: 1,
        code: 'USER_READ',
      });
    });
  });

  describe('UpdatePermissionUseCase', () => {
    it('updates permission', async () => {
      permissions.findById.mockResolvedValue({ id: 1 });
      permissions.update.mockResolvedValue({ id: 1, code: 'USER_READ' });
      const useCase = new UpdatePermissionUseCase(permissions as never);
      await useCase.execute(1, 'Read users');
      expect(permissions.update).toHaveBeenCalledWith(1, 'Read users');
    });
  });

  describe('DeletePermissionUseCase', () => {
    it('deletes permission', async () => {
      permissions.findById.mockResolvedValue({ id: 1 });
      const useCase = new DeletePermissionUseCase(permissions as never);
      await useCase.execute(1);
      expect(permissions.delete).toHaveBeenCalledWith(1);
    });
  });
});
