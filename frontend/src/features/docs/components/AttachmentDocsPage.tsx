"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Attachment 09 - With Trigger", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-09") },
  { label: "Attachment 08 - Group", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-08") },
  { label: "Attachment 07 - Uploaded", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-07") },
  { label: "Attachment 06 - Error", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-06") },
  { label: "Attachment 05 - Uploading", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-05") },
  { label: "Attachment 04 - Idle", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-04") },
  { label: "Attachment 03 - Spreadsheet", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-03") },
  { label: "Attachment 02 - Image Card", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-02") },
  { label: "Attachment 01 - Code File", isNew: true, load: () => import("@default/ui/composed/attachment/attachment-01") },
];

export function AttachmentDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="attachment"
      title="Attachment"
      description="Explore ready-to-use /ui Attachment components for files, images, and code, with color-tinted file icons, inline data previews, image cards, and remove actions."
      variants={VARIANTS}
    />
  );
}
