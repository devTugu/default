import {
  AssignRoleToUserUseCase,
  DeleteRoleUseCase,
  GetRoleUseCase,
  ListRolesUseCase,
  RemoveRoleFromUserUseCase,
  UpdateRoleUseCase,
} from './role-crud.use-cases';

describe('Role CRUD use cases', () => {
  const roles = {
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    replacePermissions: jest.fn(),
    assignToUser: jest.fn(),
    removeFromUser: jest.fn(),
    findUserIdsByRoleId: jest.fn().mockResolvedValue([1, 2]),
  };
  const cache = { invalidate: jest.fn() };

  describe('ListRolesUseCase', () => {
    it('delegates to repository', async () => {
      roles.findAll.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
      const useCase = new ListRolesUseCase(roles as never);
      await useCase.execute(1, 20);
      expect(roles.findAll).toHaveBeenCalledWith(1, 20);
    });
  });

  describe('GetRoleUseCase', () => {
    it('throws when not found', async () => {
      roles.findById.mockResolvedValue(null);
      const useCase = new GetRoleUseCase(roles as never);
      await expect(useCase.execute(1)).rejects.toMatchObject({
        code: 'NOT_FOUND',
      });
    });

    it('returns role when found', async () => {
      roles.findById.mockResolvedValue({ id: 1, name: 'ADMIN' });
      const useCase = new GetRoleUseCase(roles as never);
      await expect(useCase.execute(1)).resolves.toEqual({
        id: 1,
        name: 'ADMIN',
      });
    });
  });

  describe('UpdateRoleUseCase', () => {
    it('replaces permissions atomically', async () => {
      roles.findById.mockResolvedValue({ id: 1 });
      roles.update.mockResolvedValue({ id: 1, name: 'ADMIN' });
      const useCase = new UpdateRoleUseCase(roles as never, cache as never);
      await useCase.execute(1, { permissionIds: [1, 2] });
      expect(roles.replacePermissions).toHaveBeenCalledWith(1, [1, 2]);
    });
  });

  describe('DeleteRoleUseCase', () => {
    it('soft deletes role', async () => {
      roles.findById.mockResolvedValue({ id: 1 });
      const useCase = new DeleteRoleUseCase(roles as never, cache as never);
      await useCase.execute(1);
      expect(roles.softDelete).toHaveBeenCalledWith(1);
    });
  });

  describe('AssignRoleToUserUseCase', () => {
    it('invalidates permission cache', async () => {
      roles.findById.mockResolvedValue({ id: 2 });
      roles.assignToUser.mockResolvedValue(undefined);
      const useCase = new AssignRoleToUserUseCase(
        roles as never,
        cache as never,
      );
      await useCase.execute(1, 2);
      expect(cache.invalidate).toHaveBeenCalledWith(1);
    });

    it('throws conflict on duplicate assignment', async () => {
      roles.findById.mockResolvedValue({ id: 2 });
      roles.assignToUser.mockRejectedValue(new Error('DUPLICATE_USER_ROLE'));
      const useCase = new AssignRoleToUserUseCase(
        roles as never,
        cache as never,
      );
      await expect(useCase.execute(1, 2)).rejects.toMatchObject({
        code: 'CONFLICT',
      });
    });
  });

  describe('RemoveRoleFromUserUseCase', () => {
    it('throws when assignment missing', async () => {
      roles.removeFromUser.mockRejectedValue(new Error('USER_ROLE_NOT_FOUND'));
      const useCase = new RemoveRoleFromUserUseCase(
        roles as never,
        cache as never,
      );
      await expect(useCase.execute(1, 2)).rejects.toMatchObject({
        code: 'NOT_FOUND',
      });
    });
  });
});
