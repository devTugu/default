export interface Permission {
  id: number;
  code: string;
  description: string | null;
}

export interface CreatePermissionInput {
  code: string;
  description?: string;
}

export interface UpdatePermissionInput {
  description?: string;
}
