import type { TokenPair } from '@/shared/api';
import type { UserOutput } from '@/entities/user';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthSession {
  user: UserOutput;
  roleNames: string[];
  permissionCodes: string[];
}

export type { TokenPair };
