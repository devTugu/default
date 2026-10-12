import {
  UserOutputSchema,
  type CreateUserInput,
  type UpdateUserInput,
  type UserOutput,
} from "@default/types/user";
import { PaginatedSchema } from "@default/types/common";
import { getApi } from "../client";
import { API_ENDPOINTS } from "../endpoints";
import { parseWith } from "../parse";
import type { ListQueryParams, PaginatedResult } from "../types";

const UserPageSchema = PaginatedSchema(UserOutputSchema);

export async function listUsers(
  params: ListQueryParams,
): Promise<PaginatedResult<UserOutput>> {
  const data = await getApi().get(API_ENDPOINTS.USERS.LIST, { params });
  return parseWith(UserPageSchema, API_ENDPOINTS.USERS.LIST)(data);
}

export async function getUser(id: number): Promise<UserOutput> {
  const endpoint = API_ENDPOINTS.USERS.BY_ID(id);
  const data = await getApi().get(endpoint);
  return parseWith(UserOutputSchema, endpoint)(data);
}

export async function createUser(data: CreateUserInput): Promise<UserOutput> {
  const result = await getApi().post(API_ENDPOINTS.USERS.LIST, data);
  return parseWith(UserOutputSchema, API_ENDPOINTS.USERS.LIST)(result);
}

export async function updateUser(
  id: number,
  data: UpdateUserInput,
): Promise<UserOutput> {
  const endpoint = API_ENDPOINTS.USERS.BY_ID(id);
  const result = await getApi().patch(endpoint, data);
  return parseWith(UserOutputSchema, endpoint)(result);
}

export function deleteUser(id: number): Promise<void> {
  return getApi().delete(API_ENDPOINTS.USERS.BY_ID(id));
}

export function exportUserData(
  userId: number,
): Promise<Record<string, unknown>> {
  return getApi().get(API_ENDPOINTS.USERS.EXPORT(userId));
}

export function anonymizeUser(userId: number): Promise<void> {
  return getApi().post(API_ENDPOINTS.USERS.ANONYMIZE(userId));
}
