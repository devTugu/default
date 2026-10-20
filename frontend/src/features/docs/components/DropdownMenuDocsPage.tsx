"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Dropdown Menu 11 - Language Selector", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-11") },
  { label: "Dropdown Menu 10 - Export", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-10") },
  { label: "Dropdown Menu 09 - Filters", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-09") },
  { label: "Dropdown Menu 08 - Search", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-08") },
  { label: "Dropdown Menu 07 - Shopping Cart", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-07") },
  { label: "Dropdown Menu 06 - Voice Chat", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-06") },
  { label: "Dropdown Menu 05 - Team Selector", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-05"), isPro: true },
  { label: "Dropdown Menu 04 - Drill-down Submenu", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-04"), isPro: true },
  {
    label: "Dropdown Menu 03 - Collaborative Requests",
    load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-03"),
    isPro: true,
  },
  { label: "Dropdown Menu 02 - Notifications", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-02") },
  { label: "Dropdown Menu 01 - User Profile", load: () => import("@default/ui/composed/dropdown-menu/dropdown-menu-01") },
];

export function DropdownMenuDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="dropdown-menu"
      title="Dropdown Menu"
      description="Dropdown Menu components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
