export type DocsBlockNavItem = {
  slug: string;
  label: string;
  href: string;
};

export const DOCS_BLOCKS_NAV: DocsBlockNavItem[] = [
  { slug: "all", label: "All blocks", href: "/docs/blocks" },
  { slug: "navbar-section", label: "Navbar section", href: "/docs/blocks/marketing/navbar-section" },
  { slug: "footer-section", label: "Footer section", href: "/docs/blocks/marketing/footer-section" },
];
