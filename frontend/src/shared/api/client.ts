import type { AxiosRequestConfig } from 'axios';
import { axiosInstance } from './axiosInstance';
import type { ApiEnvelope } from './types';

async function request<T>(
  config: AxiosRequestConfig
): Promise<T> {
  const response = await axiosInstance.request<ApiEnvelope<T>>(config);

  if (response.status === 204) {
    return undefined as T;
  }

  return response.data.data;
}

export const api = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'GET', url });
  },

  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'POST', url, data });
  },

  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'PUT', url, data });
  },

  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return request<T>({ ...config, method: 'PATCH', url, data });
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>({ ...config, method: 'DELETE', url });
  },
};
