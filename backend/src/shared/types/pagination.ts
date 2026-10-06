export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: number;
  email: string;
  roleNames: string[];
  permissionCodes: string[];
  type: 'access';
  jti?: string;
}
