"use client";

import {
  DocsMarketingBlockCatalogPage,
  type DocsMarketingBlockVariant,
} from "./DocsMarketingBlockCatalogPage";

/** Order matches block catalog (Sort: Newest). */
const PREVIEW = "min-h-0 w-full p-0";

const VARIANTS: DocsMarketingBlockVariant[] = [
  {
    title: "Forms 09 - New Account Registration",
    description:
      "A 5-step account registration wizard with a sidebar stepper covering personal, identification, and business details, email verification with an OTP input, and a welcome step.",
    load: () => import("@default/ui/composed/form/form-09"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[720px]`,
  },
  {
    title: "Forms 08 - Create Event Multi-Step Form",
    description:
      "A 4-step guided event creation flow covering event details, capacity and pricing, media and promotion, and a final review and publish step with a live checklist and readiness summary.",
    load: () => import("@default/ui/composed/form/form-08"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[640px]`,
  },
  {
    title: "Forms 06 - Typeform-Style Onboarding",
    description:
      "A minimal, single-question-at-a-time onboarding flow with segmented step progress, animated transitions, and a friendly success screen.",
    load: () => import("@default/ui/composed/form/form-06"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[480px]`,
  },
  {
    title: "Forms 07 - Customer Support Intake",
    description:
      "A guided support-request intake with single-select options for issue category, urgency, and affected product area, ending in an email capture step, complete with animated transitions and a summary success screen.",
    load: () => import("@default/ui/composed/form/form-07"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[520px]`,
  },
  {
    title: "Forms 04 - Advanced Settings Sidebar Layout",
    description:
      "A professional settings layout featuring vertical navigation, category-based sections, and a clean interface for managing complex application preferences.",
    load: () => import("@default/ui/composed/form/form-04"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[560px]`,
  },
  {
    title: "Forms 05 - E-commerce Checkout Form",
    description:
      "A 4-step e-commerce checkout flow containing shipping details, delivery options, promo codes, and payment methods with an active order summary.",
    load: () => import("@default/ui/composed/form/form-05"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[720px]`,
  },
  {
    title: "Forms 02 - User Profile Form",
    description:
      "A user-friendly form with personal details, workspace details, and network details for managing account information.",
    load: () => import("@default/ui/composed/form/form-02"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[640px]`,
  },
  {
    title: "Forms 03 - Multi-Step Onboarding Form",
    description:
      "A premium multi-step onboarding form with smooth transitions, progress indicators, and specialized steps for capturing user information progressively.",
    load: () => import("@default/ui/composed/form/form-03"),
    isPro: true,
    previewClassName: `${PREVIEW} min-h-[520px]`,
  },
  {
    title: "Forms 01 - Edit Profile Form",
    description:
      "A user-friendly profile editing form with avatar upload, personal details, privacy controls, and action toggles, perfect for managing account information inside modern SaaS dashboards.",
    load: () => import("@default/ui/composed/form/form-01"),
    previewClassName: `${PREVIEW} min-h-[640px]`,
  },
];

export function FormDocsPage() {
  return (
    <DocsMarketingBlockCatalogPage
      title="Forms"
      description="Explore 9+ default UI form components to build forms with React Hook Form or TanStack Form. Use Zod for validation and accessible fields in dashboard and application use cases."
      variants={VARIANTS}
    />
  );
}
