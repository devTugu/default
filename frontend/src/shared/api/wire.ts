import type { AxiosRequestConfig } from "axios";
import { configureApi, createApiClient } from "@default/api";
import { configureMeFetcher } from "@default/hooks";
import { axiosInstance } from "./axiosInstance";
import type { ApiEnvelope } from "@default/api";
import { bffMe } from "@/shared/lib/bff-auth";
import type { UserOutput } from "@default/types/user";

async function request<T>(config: {
  method: string;
  url: string;
  data?: unknown;
  params?: unknown;
  headers?: Record<string, string>;
}): Promise<T> {
  const axiosConfig: AxiosRequestConfig = {
    method: config.method,
    url: config.url,
    data: config.data,
    params: config.params,
    headers: config.headers,
  };
  const response = await axiosInstance.request<ApiEnvelope<T>>(axiosConfig);

  if (response.status === 204) {
    return undefined as T;
  }

  return response.data.data;
}

configureApi(createApiClient(request));
configureMeFetcher(() => bffMe<UserOutput>());
