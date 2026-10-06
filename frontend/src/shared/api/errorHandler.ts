import { AxiosError } from 'axios';
import type { ApiError, ApiErrorEnvelope } from './types';

const extractMessage = (
  message: string | Record<string, unknown>
): string => {
  if (typeof message === 'string') return message;
  if (Array.isArray(message)) return message.join(', ');
  if (typeof message === 'object' && message !== null) {
    const msg = (message as { message?: string }).message;
    if (typeof msg === 'string') return msg;
  }
  return 'An error occurred';
};

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const envelope = error.response?.data as ApiErrorEnvelope | undefined;
    if (envelope?.error) {
      return {
        message: extractMessage(envelope.error.message),
        statusCode: error.response?.status ?? 500,
        code: envelope.error.code,
      };
    }
    return {
      message: error.message || 'An error occurred',
      statusCode: error.response?.status ?? 500,
    };
  }

  if (error instanceof Error) {
    return { message: error.message, statusCode: 500 };
  }

  return { message: 'An unknown error occurred', statusCode: 500 };
};

export const getErrorMessage = (error: unknown): string => {
  return handleApiError(error).message;
};
