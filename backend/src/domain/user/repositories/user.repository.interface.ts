import { User } from '../entities/user.entity';
import { PaginatedResult } from '@shared/types/pagination';

export interface CreateUserData {
  email: string;
  passwordHash: string;
  isActive: boolean;
  oauthProvider?: string | null;
  oauthSubject?: string | null;
  organizationId?: number | null;
}

export interface UpdateUserData {
  passwordHash?: string;
  isActive?: boolean;
  mfaEnabled?: boolean;
  mfaSecretEncrypted?: string | null;
  oauthProvider?: string | null;
  oauthSubject?: string | null;
  email?: string;
}

export interface ListUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
}

/** Lockout fields for the login path (kept off the domain User to avoid bloat). */
export interface LoginLockState {
  userId: number;
  passwordHash: string | null;
  lockedUntil: Date | null;
  failedLoginAttempts: number;
}

export interface IUserRepository {
  create(data: CreateUserData): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithRolesAndPermissions(email: string): Promise<User | null>;
  findByOAuth(provider: string, subject: string): Promise<User | null>;
  findActiveById(id: number): Promise<User | null>;
  findAll(query: ListUsersQuery): Promise<PaginatedResult<User>>;
  update(id: number, data: UpdateUserData): Promise<User>;
  softDelete(id: number): Promise<void>;
  anonymize(id: number): Promise<void>;
  emailExists(email: string): Promise<boolean>;
  getMfaSecretEncrypted(id: number): Promise<string | null>;
  getLoginLockState(email: string): Promise<LoginLockState | null>;
  /** Increments failed attempts; optionally sets lockedUntil when provided. */
  recordFailedLogin(id: number, lockedUntil?: Date): Promise<number>;
  clearFailedLogin(id: number): Promise<void>;
}
