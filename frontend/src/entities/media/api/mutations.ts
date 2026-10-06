'use client';

import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/shared/api/axiosInstance';
import { API_ENDPOINTS } from '@/shared/config/api.config';
import type { ApiEnvelope } from '@/shared/api/types';

interface UploadResult {
  url: string;
}

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadResult> => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post<ApiEnvelope<UploadResult>>(
        API_ENDPOINTS.MEDIA.UPLOAD,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      return response.data.data;
    },
  });
};
