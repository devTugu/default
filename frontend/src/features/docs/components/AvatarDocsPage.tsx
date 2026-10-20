"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Avatar 08 - Avatar stack", load: () => import("@default/ui/composed/avatar/avatar-08") },
  { label: "Avatar 07 - Selectable Avatar", load: () => import("@default/ui/composed/avatar/avatar-07") },
  { label: "Avatar 06 - Fallback", load: () => import("@default/ui/composed/avatar/avatar-06") },
  { label: "Avatar 05 - Counter", load: () => import("@default/ui/composed/avatar/avatar-05") },
  { label: "Avatar 04 - Border", load: () => import("@default/ui/composed/avatar/avatar-04") },
  { label: "Avatar 03 - Badge", load: () => import("@default/ui/composed/avatar/avatar-03") },
  { label: "Avatar 02 - Group", load: () => import("@default/ui/composed/avatar/avatar-02") },
  { label: "Avatar 01 - Default", load: () => import("@default/ui/composed/avatar/avatar-01") },
];

export function AvatarDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="avatar"
      title="Avatar"
      description="Browse /ui Avatar components built with React and Tailwind CSS — profile images, initials, groups, stacks, and status badges."
      variants={VARIANTS}
    />
  );
}
