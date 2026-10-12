"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "@default/api";

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: (file: File) => uploadMedia(file),
  });
};
