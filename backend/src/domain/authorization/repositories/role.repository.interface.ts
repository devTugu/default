import { Role } from '../entities/role.entity';
import { PaginatedResult } from '@shared/types/pagination';

export interface CreateRoleData {
  name: string;
  description?: string;
  permissionIds?: number[];
}

export interface UpdateRoleData {
  description?: string;
  permissionIds?: number[];
}

export interface IRoleRepository {
  create(data: CreateRoleData): Promise<Role>;
  findById(id: number): Promise<Role | null>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Role>>;
  update(id: number, data: UpdateRoleData): Promise<Role>;
  softDelete(id: number): Promise<void>;
  nameExists(name: string): Promise<boolean>;
  assignToUser(userId: number, roleId: number): Promise<void>;
  removeFromUser(userId: number, roleId: number): Promise<void>;
  syncPermissions(roleId: number, permissionIds: number[]): Promise<void>;
  clearPermissions(roleId: number): Promise<void>;
  replacePermissions(roleId: number, permissionIds: number[]): Promise<void>;
  findUserIdsByRoleId(roleId: number): Promise<number[]>;
}
