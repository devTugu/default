export interface UserAuthContext {
  roleNames: string[];
  permissionCodes: string[];
}

export interface IPermissionCache {
  get(userId: number): Promise<UserAuthContext | null>;
  set(userId: number, context: UserAuthContext, ttlSec: number): Promise<void>;
  invalidate(userId: number): Promise<void>;
}
