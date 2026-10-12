import {
  PermissionSchema,
  type CreatePermissionInput,
  type Permission,
  type UpdatePermissionInput,
} from "@default/types/permission";
import { PaginatedSchema } from "@default/types/common";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";
import type { ListQueryParams, PaginatedResult } from "../types";

const PermissionPageSchema = PaginatedSchema(PermissionSchema);

export async function listPermissions(
  params: ListQueryParams,
): Promise<PaginatedResult<Permission>> {
  const data = await getApi().get(API_ENDPOINTS.PERMISSIONS.LIST, { params });
  return parseWith(PermissionPageSchema, API_ENDPOINTS.PERMISSIONS.LIST)(data);
}

export async function getPermission(id: number): Promise<Permission> {
  const endpoint = API_ENDPOINTS.PERMISSIONS.BY_ID(id);
  const data = await getApi().get(endpoint);
  return parseWith(PermissionSchema, endpoint)(data);
}

export async function createPermission(
  data: CreatePermissionInput,
): Promise<Permission> {
  const result = await getApi().post(API_ENDPOINTS.PERMISSIONS.LIST, data);
  return parseWith(PermissionSchema, API_ENDPOINTS.PERMISSIONS.LIST)(result);
}

export async function updatePermission(
  id: number,
  data: UpdatePermissionInput,
): Promise<Permission> {
  const endpoint = API_ENDPOINTS.PERMISSIONS.BY_ID(id);
  const result = await getApi().put(endpoint, data);
  return parseWith(PermissionSchema, endpoint)(result);
}

export function deletePermission(id: number): Promise<void> {
  return getApi().delete(API_ENDPOINTS.PERMISSIONS.BY_ID(id));
}
