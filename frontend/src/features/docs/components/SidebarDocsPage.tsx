"use client";

import {
  DocsMarketingBlockCatalogPage,
  type DocsMarketingBlockVariant,
} from "./DocsMarketingBlockCatalogPage";

/** Full-bleed block preview — order matches block catalog (Newest). */
const PREVIEW = "min-h-0 w-full p-0";

const VARIANTS: DocsMarketingBlockVariant[] = [
  {
    title: "Sidebar 08 - Mail Workspace Sidebar",
    description:
      "A modern workspace sidebar with a compact icon rail, searchable inbox, and secondary action panel. The structured layout keeps navigation organized while giving quick access to messages and tools.",
    load: () => import("@default/ui/composed/sidebar/sidebar-08"),
    blockPreview: "sidebar",
    shellClassName: "h-[36rem] min-h-[32rem]",
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[32rem]`,
    skeletonClassName: "min-h-[32rem]",
  },
  {
    title: "Sidebar 09 - Productivity Workspace Sidebar",
    description:
      "A workspace-first sidebar featuring AI assistance, organized navigation, project groups, and task management. Ideal for productivity tools and collaborative dashboards.",
    load: () => import("@default/ui/composed/sidebar/sidebar-09"),
    blockPreview: "sidebar",
    shellClassName: "h-[36rem] min-h-[32rem]",
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[32rem]`,
    skeletonClassName: "min-h-[32rem]",
  },
  {
    title: "Sidebar 07 - Animated Mega-Menu Console Sidebar",
    description:
      "A premium animated sidebar built with Framer Motion, featuring a clean brand logo header, search bar, icon-only collapsed state, and a full-width console-style mega-menu flyout overlay for quick service navigation — perfect for complex cloud panels and admin platforms.",
    load: () => import("@default/ui/composed/sidebar/sidebar-07"),
    blockPreview: "sidebar",
    shellClassName: "h-[40rem] min-h-[36rem] overflow-visible",
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[36rem] overflow-visible`,
    skeletonClassName: "min-h-[36rem]",
  },
  {
    title: "Sidebar 05 - Admin Sidebar with Promo",
    description:
      "A feature-rich admin sidebar combining structured navigation with a promotional upgrade card, helping users access key tools efficiently while encouraging premium adoption within the dashboard experience.",
    load: () => import("@default/ui/composed/sidebar/sidebar-05"),
    blockPreview: "sidebar",
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Sidebar 04 - Compact Dashboard Navigation",
    description:
      "A streamlined single-column dashboard sidebar that presents core sections like Dashboard, Frontend Pages, and Apps in a clear, minimal layout. Designed for simplicity and focus, it enables quick navigation, better organization, and efficient access to essential workspace features without visual clutter.",
    load: () => import("@default/ui/composed/sidebar/sidebar-04"),
    blockPreview: "sidebar",
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Sidebar 03 - Two Column Sidebar",
    description:
      "A structured dashboard sidebar that organizes analytics, apps, pages, and forms into clear categories, enabling faster navigation, improved productivity, and effortless access to essential platform features.",
    load: () => import("@default/ui/composed/sidebar/sidebar-03"),
    blockPreview: "sidebar",
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Sidebar 02 - Mini Sidebar Navigation",
    description:
      "A compact sidebar designed for efficient navigation, providing quick access to core features, tools, and settings while maintaining a clean layout that enhances usability and workflow focus.",
    load: () => import("@default/ui/composed/sidebar/sidebar-02"),
    blockPreview: "sidebar",
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Sidebar 01 - Admin Dashboard Sidebar",
    description:
      "A collapsible sidebar navigation with grouped menus, icons, and upgrade CTA, perfect for admin dashboards to organize pages, widgets, and apps while keeping workflows fast and intuitive.",
    load: () => import("@default/ui/composed/sidebar/sidebar-01"),
    blockPreview: "sidebar",
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Sidebar 06 - Card Layout Admin Dashboard Sidebar",
    description:
      "A responsive admin sidebar paired with a modern card-based dashboard layout. Features grouped navigation, icons, and collapsible menus, making it ideal for SaaS platforms, analytics dashboards, CRM systems, and enterprise applications.",
    load: () => import("@default/ui/composed/sidebar/sidebar-06"),
    blockPreview: "sidebar",
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
];

export function SidebarDocsPage() {
  return (
    <DocsMarketingBlockCatalogPage
      title="Sidebars"
      description="Explore 9+ default UI sidebar components to add navigation to dashboards and applications. Build responsive sidebars with customizable layouts and controls."
      variants={VARIANTS}
    />
  );
}
