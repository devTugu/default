export interface PermissionRef {
  id: number;
  code: string;
  description: string | null;
}

export interface Role {
  id: number;
  name: string;
  description: string | null;
  permissions: PermissionRef[];
}

export interface CreateRoleInput {
  name: string;
  description?: string;
  permissionIds?: number[];
}

export interface UpdateRoleInput {
  description?: string;
  permissionIds?: number[];
}

export interface AssignRoleInput {
  userId: number;
  roleId: number;
}
