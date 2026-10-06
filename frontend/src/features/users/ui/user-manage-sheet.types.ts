import type { UserOutput } from "@/entities/user";

export type UserSheetState =
  | { mode: "create" }
  | { mode: "edit"; user: UserOutput; tab?: "profile" | "roles" };

export interface UnassignTarget {
  roleId: number;
  roleName: string;
}
