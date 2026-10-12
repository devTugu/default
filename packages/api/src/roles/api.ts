import {
  RoleSchema,
  type AssignRoleInput,
  type CreateRoleInput,
  type Role,
  type UpdateRoleInput,
} from "@default/types/role";
import { PaginatedSchema } from "@default/types/common";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";
import type { ListQueryParams, PaginatedResult } from "../types";

const RolePageSchema = PaginatedSchema(RoleSchema);

export async function listRoles(
  params: ListQueryParams,
): Promise<PaginatedResult<Role>> {
  const data = await getApi().get(API_ENDPOINTS.ROLES.LIST, { params });
  return parseWith(RolePageSchema, API_ENDPOINTS.ROLES.LIST)(data);
}

export async function getRole(id: number): Promise<Role> {
  const endpoint = API_ENDPOINTS.ROLES.BY_ID(id);
  const data = await getApi().get(endpoint);
  return parseWith(RoleSchema, endpoint)(data);
}

export async function createRole(data: CreateRoleInput): Promise<Role> {
  const result = await getApi().post(API_ENDPOINTS.ROLES.LIST, data);
  return parseWith(RoleSchema, API_ENDPOINTS.ROLES.LIST)(result);
}

export async function updateRole(
  id: number,
  data: UpdateRoleInput,
): Promise<Role> {
  const endpoint = API_ENDPOINTS.ROLES.BY_ID(id);
  const result = await getApi().put(endpoint, data);
  return parseWith(RoleSchema, endpoint)(result);
}

export function deleteRole(id: number): Promise<void> {
  return getApi().delete(API_ENDPOINTS.ROLES.BY_ID(id));
}

export function assignRole(data: AssignRoleInput): Promise<null> {
  return getApi().post(API_ENDPOINTS.ROLES.ASSIGN, data);
}

export function unassignRole(userId: number, roleId: number): Promise<void> {
  return getApi().delete(API_ENDPOINTS.ROLES.UNASSIGN(userId, roleId));
}
