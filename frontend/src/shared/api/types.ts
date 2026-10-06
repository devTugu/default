export interface ApiEnvelope<T> {
  success: true;
  data: T;
  timestamp: string;
  path: string;
  requestId: string;
}

export interface ApiErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string | Record<string, unknown>;
  };
  timestamp: string;
  path: string;
  requestId: string;
}

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

export type LoginResult =
  | TokenPair
  | { requiresMfa: true; mfaToken: string }
  | { requiresMfaEnrollment: true; enrollmentToken: string };

export interface MfaEnrollmentResponse {
  otpauthUrl: string;
}

export interface LoginSuccessResponse {
  expiresIn: number;
}

export interface MfaStepResponse {
  requiresMfa: true;
  mfaToken: string;
}

export interface MfaEnrollmentStepResponse {
  requiresMfaEnrollment: true;
  enrollmentToken: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  code?: string;
}

export interface ListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}
