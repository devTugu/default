import type { NavigationSection } from '@default/ui/default-space/blocks/hero-16/index';
import { PUBLIC_ROUTES, ROUTES } from '@/shared/config/routes';

type HomeHeroNavLabels = {
  privacy: string;
  terms: string;
  docs: string;
};

type BuildHomeHeroNavInput = {
  labels: HomeHeroNavLabels;
  showDocs: boolean;
};

export function buildHomeHeroNavigation({
  labels,
  showDocs,
}: BuildHomeHeroNavInput): NavigationSection[] {
  const items: NavigationSection[] = [
    { name: labels.privacy, href: PUBLIC_ROUTES.PRIVACY },
    { name: labels.terms, href: PUBLIC_ROUTES.TERMS },
  ];

  if (showDocs) {
    items.push({ name: labels.docs, href: '/docs' });
  }

  return items;
}

export function homeHeroBookDemoHref(): string {
  return ROUTES.LOGIN;
}
