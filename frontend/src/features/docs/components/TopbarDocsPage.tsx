"use client";

import { DocsDashboardBlockCatalogPage } from "./DocsDashboardBlockCatalogPage";
import type { DocsMarketingBlockVariant } from "./DocsMarketingBlockCatalogPage";

/** Full-bleed preview; clip vertically so blocks do not bleed into the next card. */
const PREVIEW = "min-h-0 w-full overflow-x-auto overflow-y-visible p-0";

/** Order + copy aligned with block catalog (Newest). All blocks are Free. */
const VARIANTS: DocsMarketingBlockVariant[] = [
  {
    title: "Topbar 06 - Search Focused Topbar",
    description:
      "Clean topbar with a prominent search bar, sidebar toggle, notifications, and profile actions for faster navigation and content discovery.",
    load: () => import("@default/ui/composed/topbar/topbar-06"),
    blockPreview: "topbar",
    shellClassName: "h-[36rem] min-h-[32rem]",
    isFree: true,
    unclipPreview: true,
    previewClassName: `${PREVIEW} min-h-[32rem]`,
    skeletonClassName: "min-h-[32rem]",
  },
  {
    title: "Topbar 05 - Sidebar Integrated Topbar",
    description:
      "Topbar paired with a collapsible sidebar, combining primary navigation, quick actions, notifications, and user controls in a unified workspace layout.",
    load: () => import("@default/ui/composed/topbar/topbar-05"),
    blockPreview: "topbar",
    shellClassName: "h-[36rem] min-h-[32rem]",
    isFree: true,
    unclipPreview: true,
    previewClassName: `${PREVIEW} min-h-[32rem]`,
    skeletonClassName: "min-h-[32rem]",
  },
  {
    title: "Topbar 04 - Centered Navigation Topbar",
    description:
      "Centered navigation topbar with brand logo, quick access links, notifications, and profile actions. Ideal for SaaS products, documentation websites, and modern web applications.",
    load: () => import("@default/ui/composed/topbar/topbar-04"),
    blockPreview: "topbar",
    shellClassName: "h-[32rem]",
    isFree: true,
    unclipPreview: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Topbar 03 - Login Action Topbar",
    description:
      "Navigation topbar with primary links, login action, notifications, and user profile for quick access. Ideal for SaaS products, documentation portals, developer tools, and web applications.",
    load: () => import("@default/ui/composed/topbar/topbar-03"),
    blockPreview: "topbar",
    shellClassName: "h-[42rem] min-h-[38rem]",
    minWidthClassName: "min-w-[64rem]",
    isFree: true,
    unclipPreview: true,
    previewClassName: `${PREVIEW} min-h-[38rem] max-h-[42rem]`,
    skeletonClassName: "min-h-[38rem]",
  },
  {
    title: "Topbar 02 - Navigation Mega Menu Topbar",
    description:
      "Multi level topbar with categorized navigation, quick access links, notifications, and user profile in a clean horizontal layout. Ideal for documentation sites, design systems, developer platforms, and large web applications.",
    load: () => import("@default/ui/composed/topbar/topbar-02"),
    blockPreview: "topbar",
    shellClassName: "h-[36rem] min-h-[32rem]",
    minWidthClassName: "min-w-[64rem]",
    isFree: true,
    unclipPreview: true,
    previewClassName: `${PREVIEW} min-h-[32rem]`,
    skeletonClassName: "min-h-[32rem]",
  },
  {
    title: "Topbar 01 - Simple Navigation Topbar",
    description:
      "Clean navigation topbar with brand logo, navigation menu, notifications, language switcher, and user profile. Ideal for admin panels, SaaS platforms, internal tools, and business applications.",
    load: () => import("@default/ui/composed/topbar/topbar-01"),
    blockPreview: "topbar",
    shellClassName: "h-[32rem]",
    isFree: true,
    unclipPreview: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
];

export function TopbarDocsPage() {
  return (
    <DocsDashboardBlockCatalogPage
      segment="Topbars"
      title="Topbars"
      description="Explore 6+ default UI dashboard header component for top navigation in dashboards. Includes menus, actions, and user controls with a clean, customizable layout."
      variants={VARIANTS}
    />
  );
}
