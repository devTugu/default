import axios, { AxiosInstance } from 'axios';
import { env } from '@/shared/config/env';
import { setupRequestInterceptor, setupResponseInterceptor } from './interceptors';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

setupRequestInterceptor(axiosInstance);
setupResponseInterceptor(axiosInstance);

export default axiosInstance;
