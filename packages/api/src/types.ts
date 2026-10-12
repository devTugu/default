export interface ApiEnvelope<T> {
  success: true;
  data: T;
  timestamp: string;
  path: string;
  requestId: string;
}

export interface ApiErrorDetail {
  path: string;
  message: string;
}

export interface ApiErrorEnvelope {
  success: false;
  error: {
    code: string;
    message: string | Record<string, unknown>;
    details?: ApiErrorDetail[];
  };
  timestamp: string;
  path: string;
  requestId: string;
}

export type {
  PaginatedResult,
  ListQueryParams,
} from "@default/types/common";

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
  details?: ApiErrorDetail[];
}

export type HttpRequest = <T>(config: {
  method: string;
  url: string;
  data?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
}) => Promise<T>;

export interface ApiClient {
  get<T>(url: string, config?: { params?: unknown }): Promise<T>;
  post<T>(url: string, data?: unknown): Promise<T>;
  /** Multipart upload; the HTTP wire must not force a JSON content type. */
  postForm<T>(url: string, form: FormData): Promise<T>;
  put<T>(url: string, data?: unknown): Promise<T>;
  patch<T>(url: string, data?: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
