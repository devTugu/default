"use client";

import { DocsComponentCatalogPage, type DocsCatalogVariant } from "./DocsComponentCatalogPage";

const VARIANTS: DocsCatalogVariant[] = [
  { label: "Calendar 16 - Date Time Scheduler", load: () => import("@default/ui/composed/calendar/calendar-16") },
  { label: "Calendar 15 - With Pricing", load: () => import("@default/ui/composed/calendar/calendar-15") },
  { label: "Calendar 14 - Range Selection", load: () => import("@default/ui/composed/calendar/calendar-14") },
  { label: "Calendar 13 - With Date Input", load: () => import("@default/ui/composed/calendar/calendar-13") },
  { label: "Calendar 12 - With Today Button", load: () => import("@default/ui/composed/calendar/calendar-12") },
  { label: "Calendar 11 - Left Side Navigation", load: () => import("@default/ui/composed/calendar/calendar-11") },
  { label: "Calendar 10 - Right Side Navigation", load: () => import("@default/ui/composed/calendar/calendar-10") },
  { label: "Calendar 09 - Custom Range Select", load: () => import("@default/ui/composed/calendar/calendar-09") },
  { label: "Calendar 08 - With Event List", load: () => import("@default/ui/composed/calendar/calendar-08") },
  { label: "Calendar 07 - Variable Size", load: () => import("@default/ui/composed/calendar/calendar-07") },
  { label: "Calendar 06 - Disable Weekends", load: () => import("@default/ui/composed/calendar/calendar-06") },
  { label: "Calendar 05 - Month and Year Select", load: () => import("@default/ui/composed/calendar/calendar-05") },
  { label: "Calendar 04 - Dialog Calendar", load: () => import("@default/ui/composed/calendar/calendar-04") },
  { label: "Calendar 03 - Time Calendar", load: () => import("@default/ui/composed/calendar/calendar-03") },
  { label: "Calendar 02 - Style Calendar", load: () => import("@default/ui/composed/calendar/calendar-02") },
  { label: "Calendar 01 - Standard Calendar", load: () => import("@default/ui/composed/calendar/calendar-01") },
];

export function CalendarDocsPage() {
  return (
    <DocsComponentCatalogPage
      componentSlug="calendar"
      title="Calendar"
      description="Calendar components synced from Default registry — preview variants and copy-ready demos."
      variants={VARIANTS}
    />
  );
}
