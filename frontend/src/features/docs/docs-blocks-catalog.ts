export type BlockCatalogTab = "marketing" | "ecommerce" | "dashboard" | "applications";

export type BlockCategoryEntry = {
  slug: string;
  title: string;
  tab: BlockCatalogTab;
  /** Detail route when blocks are available in-repo */
  href?: string;
  blockCount?: number;
  badge?: string;
  comingSoon?: boolean;
};

export const BLOCK_CATALOG_TABS: { id: BlockCatalogTab; label: string }[] = [
  { id: "marketing", label: "Marketing" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "dashboard", label: "Dashboard UI" },
  { id: "applications", label: "Applications" },
];

const marketingCategories: BlockCategoryEntry[] = [
  { slug: "hero-section", title: "Hero Section", tab: "marketing", comingSoon: true, badge: "+12 New" },
  { slug: "pricing-section", title: "Pricing Section", tab: "marketing", comingSoon: true },
  {
    slug: "navbar-section",
    title: "Navbar Section",
    tab: "marketing",
    href: "/docs/blocks/marketing/navbar-section",
    blockCount: 13,
    badge: "+1 New",
  },
  {
    slug: "footer-section",
    title: "Footer Section",
    tab: "marketing",
    href: "/docs/blocks/marketing/footer-section",
    blockCount: 7,
  },
  { slug: "feature-section", title: "Feature Section", tab: "marketing", comingSoon: true },
  { slug: "cta-section", title: "CTA Section", tab: "marketing", comingSoon: true },
  { slug: "newsletter-section", title: "Newsletter Section", tab: "marketing", comingSoon: true },
  { slug: "login", title: "Login", tab: "marketing", comingSoon: true },
];

const ecommerceCategories: BlockCategoryEntry[] = [
  { slug: "product-listing", title: "Product Listing", tab: "ecommerce", comingSoon: true },
  { slug: "checkout", title: "Checkout", tab: "ecommerce", comingSoon: true },
];

const dashboardCategories: BlockCategoryEntry[] = [
  { slug: "topbars", title: "Topbars", tab: "dashboard", comingSoon: true },
  { slug: "sidebars", title: "Sidebars", tab: "dashboard", comingSoon: true },
  { slug: "tables", title: "Tables", tab: "dashboard", comingSoon: true },
  { slug: "forms", title: "Forms", tab: "dashboard", comingSoon: true },
];

const applicationCategories: BlockCategoryEntry[] = [
  { slug: "chat-application", title: "Chat Application", tab: "applications", comingSoon: true },
  { slug: "calendar-application", title: "Calendar Application", tab: "applications", comingSoon: true },
];

export const BLOCK_CATEGORIES: BlockCategoryEntry[] = [
  ...marketingCategories,
  ...ecommerceCategories,
  ...dashboardCategories,
  ...applicationCategories,
];

export function categoriesForTab(tab: BlockCatalogTab): BlockCategoryEntry[] {
  return BLOCK_CATEGORIES.filter((entry) => entry.tab === tab);
}

export const BLOCK_TAB_INTRO: Record<BlockCatalogTab, string> = {
  marketing:
    "Reusable @default/ui blocks for landing pages, pricing, navigation, footers, and CTAs across marketing sites.",
  ecommerce: "Ecommerce layouts for product, checkout, and merchandising flows (coming soon).",
  dashboard:
    "Dashboard blocks — charts, tables, forms, sidebars, and shells for admin panels (coming soon).",
  applications: "Full application shells — chat, notes, kanban, and calendar (coming soon).",
};
