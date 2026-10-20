"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  {
    label: "File Upload 05 - Crop & Preview Editor",
    load: () => import("@default/ui/composed/file-upload/file-upload-05"),
    previewClassName: "min-h-72 py-10",
  },
  {
    label: "File Upload 04 - Upload with Ring Progress",
    load: () => import("@default/ui/composed/file-upload/file-upload-04"),
    previewClassName: "min-h-64 py-10",
  },
  {
    label: "File Upload 03 - Avatar Upload",
    load: () => import("@default/ui/composed/file-upload/file-upload-03"),
    previewClassName: "min-h-96 py-10",
  },
  {
    label: "File Upload 02 - File Upload with Progress",
    load: () => import("@default/ui/composed/file-upload/file-upload-02"),
    previewClassName: "min-h-[32rem] items-start py-10",
  },
  {
    label: "File Upload 01 - Animated File Upload",
    load: () => import("@default/ui/composed/file-upload/file-upload-01"),
    previewClassName: "min-h-[28rem] overflow-visible py-10",
  },
];

export function FileUploadDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="file-upload"
      title="File Upload"
      description="Explore ready-to-use /ui File Upload components for drag-and-drop, progress, avatars, and image crop — built with React, Tailwind CSS, and react-dropzone."
      variants={VARIANTS}
      previewClassName="items-center justify-center px-4"
    />
  );
}
