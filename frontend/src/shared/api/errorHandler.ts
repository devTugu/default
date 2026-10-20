import { readApiErrorMessage } from '@default/utils/api-error-message';
import { AxiosError } from 'axios';
import type { ApiError, ApiErrorEnvelope } from './types';

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const envelope = error.response?.data as ApiErrorEnvelope | undefined;
    if (envelope?.error) {
      return {
        message: readApiErrorMessage(envelope.error.message),
        statusCode: error.response?.status ?? 500,
        code: envelope.error.code,
        details: envelope.error.details,
      };
    }
    return {
      message: error.message || 'An error occurred',
      statusCode: error.response?.status ?? 500,
    };
  }

  if (error instanceof Error) {
    const message =
      error.message === '[object Object]'
        ? 'An error occurred'
        : error.message;
    return { message, statusCode: 500 };
  }

  return { message: 'An unknown error occurred', statusCode: 500 };
};

export const getErrorMessage = (error: unknown): string => {
  return handleApiError(error).message;
};
