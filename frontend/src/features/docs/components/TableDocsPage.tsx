"use client";

import {
  DocsMarketingBlockCatalogPage,
  type DocsMarketingBlockVariant,
} from "./DocsMarketingBlockCatalogPage";

/** Full-bleed dashboard table previews — order matches block catalog (Newest). */
const PREVIEW = "min-h-0 w-full overflow-x-auto p-4 sm:p-6";

const VARIANTS: DocsMarketingBlockVariant[] = [
  {
    title: "Table 11 - Project Tracking Table",
    description:
      "A structured table presenting ongoing projects with budget details, assigned teams, project leads, and activity trends—making it easy to monitor performance and track progress at a glance.",
    load: () => import("@default/ui/composed/table/table-11"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[32rem]`,
    skeletonClassName: "min-h-[32rem]",
  },
  {
    title: "Table 10 - Customer Reviews Table",
    description:
      "A clean, searchable reviews table displaying customer details, ratings, feedback, and timestamps—designed to help teams quickly monitor user sentiment, manage responses, and improve overall customer experience.",
    load: () => import("@default/ui/composed/table/table-10"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 09 - Popular Products Table",
    description:
      "A detailed products table showcasing items, payment progress, and order statuses—helping teams track transactions, monitor confirmations, and manage customer purchases efficiently.",
    load: () => import("@default/ui/composed/table/table-09"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 08 - Top Performing Products Table",
    description:
      "A performance-driven products table showcasing categories, sales figures, earnings, and technologies—helping teams identify top revenue generators and optimize strategic product decisions effectively",
    load: () => import("@default/ui/composed/table/table-08"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 07 - Project Overview Table",
    description:
      "A structured project overview table showcasing users, project names, team members, statuses, and budgets—helping teams track progress and manage resources efficiently.",
    load: () => import("@default/ui/composed/table/table-07"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 06 - User Subscription Management Table",
    description:
      "A structured user management table displaying roles, plans, billing methods, statuses, and actions—helping teams monitor subscriptions, and streamline account administration efficiently.",
    load: () => import("@default/ui/composed/table/table-06"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 05 - Transaction Status Table",
    description:
      "A clean, sortable transaction table displaying payment statuses, customer emails, amounts, and actions—helping teams monitor processing updates and manage financial records efficiently",
    load: () => import("@default/ui/composed/table/table-05"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 04 - Revenue Tracker Table",
    description:
      "An interactive revenue table that highlights product performance, progress, priorities, and budgets—enabling teams to analyze profitability, allocate resources wisely, and make faster data-driven decisions.",
    load: () => import("@default/ui/composed/table/table-04"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 03 - Course Assignment Overview Table",
    description:
      "A structured assignment table displaying authors, course categories, technology tags, and user counts—helping teams track engagement, manage contributors, and monitor platform growth efficiently.",
    load: () => import("@default/ui/composed/table/table-03"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 02 - Invoice Management Table",
    description:
      "A clean, searchable invoice table displaying customer details, statuses, totals, issue dates, balances, and actions—designed to streamline billing workflows and monitor payments efficiently.",
    load: () => import("@default/ui/composed/table/table-02"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
  {
    title: "Table 01 - Project Management Table",
    description:
      "A sortable projects table with manager, team avatars, progress indicators, search, and pagination, ideal for admin dashboards to track project status and streamline team workflows efficiently.",
    load: () => import("@default/ui/composed/table/table-01"),
    previewClassName: `${PREVIEW} min-h-[28rem]`,
    skeletonClassName: "min-h-[28rem]",
  },
];

export function TableDocsPage() {
  return (
    <DocsMarketingBlockCatalogPage
      title="Tables"
      description="Explore 11+ default UI table components for displaying structured data in dashboards. Build tables with sorting, filtering, pagination, and customizable columns using /ui Table."
      variants={VARIANTS}
    />
  );
}
