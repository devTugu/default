"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const FIELD_PREVIEW = "items-start justify-center py-8";

const VARIANTS: DocsCatalogVariant[] = [
  {
    label: "Input OTP-10 - Interactive Animated Verification",
    load: () => import("@default/ui/composed/input-otp/input-otp-10"),
    isPro: true,
    frameClassName: "lg:col-span-2",
    previewClassName: "py-10 min-h-[26rem]",
  },
  {
    label: "Input OTP 09 - Animated",
    load: () => import("@default/ui/composed/input-otp/input-otp-09"),
    previewClassName: "py-8",
  },
  { label: "Input OTP 08 - Alphanumeric", load: () => import("@default/ui/composed/input-otp/input-otp-08") },
  {
    label: "Input OTP 07 - Four Digits",
    load: () => import("@default/ui/composed/input-otp/input-otp-07"),
    previewClassName: FIELD_PREVIEW,
  },
  {
    label: "Input OTP 06 - Invalid",
    load: () => import("@default/ui/composed/input-otp/input-otp-06"),
    previewClassName: FIELD_PREVIEW,
  },
  { label: "Input OTP 05 - Controlled", load: () => import("@default/ui/composed/input-otp/input-otp-05"), previewClassName: "py-8" },
  { label: "Input OTP 04 - Disabled", load: () => import("@default/ui/composed/input-otp/input-otp-04") },
  { label: "Input OTP 03 - With Separator", load: () => import("@default/ui/composed/input-otp/input-otp-03") },
  {
    label: "Input OTP 02 - Digits Only",
    load: () => import("@default/ui/composed/input-otp/input-otp-02"),
    previewClassName: FIELD_PREVIEW,
  },
  { label: "Input OTP 01 - Default", load: () => import("@default/ui/composed/input-otp/input-otp-01") },
];

export function InputOtpDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="input-otp"
      title="Input OTP"
      description="Explore clean and easy-to-use 10+ /ui Input OTP components built with React, Tailwind CSS, and /ui for secure login and verification flows."
      variants={VARIANTS}
    />
  );
}
