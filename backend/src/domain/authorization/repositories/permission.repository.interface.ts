import { Permission } from '../entities/permission.entity';
import { PaginatedResult } from '@shared/types/pagination';

export interface IPermissionRepository {
  create(code: string, description?: string): Promise<Permission>;
  findById(id: number): Promise<Permission | null>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Permission>>;
  update(id: number, description?: string): Promise<Permission>;
  delete(id: number): Promise<void>;
  codeExists(code: string): Promise<boolean>;
  findByIds(ids: number[]): Promise<Permission[]>;
}
