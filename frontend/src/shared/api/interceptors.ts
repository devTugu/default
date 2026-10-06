import type {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { refreshClientSession } from '@/shared/lib/bff-refresh';
import { CSRF } from '@/shared/lib/csrf';
import { getCsrfHeaderValue } from '@/shared/lib/csrf-client';
import type { ApiErrorEnvelope } from './types';
import { getErrorMessage } from './errorHandler';

export const setupRequestInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.headers && !config.headers['x-request-id']) {
      config.headers['x-request-id'] = crypto.randomUUID();
    }

    const method = (config.method ?? 'get').toUpperCase();
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const csrf = getCsrfHeaderValue();
      if (csrf && config.headers) {
        config.headers[CSRF.HEADER] = csrf;
      }
    }

    return config;
  });
};

export const setupResponseInterceptor = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorEnvelope>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 403 && typeof window !== 'undefined') {
        const { toast } = await import('sonner');
        const message = getErrorMessage(error);
        const match = message.match(/Required permissions:\s*(.+)/i);
        toast.error(
          match
            ? `You need permission: ${match[1].trim()}`
            : message,
        );
      }

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        originalRequest.url?.includes('/api/auth/')
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const refreshed = await refreshClientSession({ redirectOnFailure: true });
      if (!refreshed) {
        return Promise.reject(error);
      }

      return instance(originalRequest);
    },
  );
};
