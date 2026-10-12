import type { ApiClient, HttpRequest } from "./types";

export function createApiClient(request: HttpRequest): ApiClient {
  return {
    get<T>(url: string, config?: { params?: unknown }): Promise<T> {
      return request<T>({ method: "GET", url, params: config?.params });
    },
    post<T>(url: string, data?: unknown): Promise<T> {
      return request<T>({ method: "POST", url, data });
    },
    postForm<T>(url: string, form: FormData): Promise<T> {
      return request<T>({
        method: "POST",
        url,
        data: form,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    put<T>(url: string, data?: unknown): Promise<T> {
      return request<T>({ method: "PUT", url, data });
    },
    patch<T>(url: string, data?: unknown): Promise<T> {
      return request<T>({ method: "PATCH", url, data });
    },
    delete<T>(url: string): Promise<T> {
      return request<T>({ method: "DELETE", url });
    },
  };
}

let configured: ApiClient | null = null;

export function configureApi(client: ApiClient): void {
  configured = client;
}

export function getApi(): ApiClient {
  if (!configured) {
    throw new Error(
      "@default/api: call configureApi() before using getApi() (wire in frontend/src/shared/api)",
    );
  }
  return configured;
}

/** Convenience alias used by hooks after configureApi. */
export const api: ApiClient = {
  get: (url, config) => getApi().get(url, config),
  post: (url, data) => getApi().post(url, data),
  postForm: (url, form) => getApi().postForm(url, form),
  put: (url, data) => getApi().put(url, data),
  patch: (url, data) => getApi().patch(url, data),
  delete: (url) => getApi().delete(url),
};
