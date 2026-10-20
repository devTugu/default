"use client";

import {
  CalendarDays,
  Ticket,
  ImagePlus,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

export type Step = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const steps: Step[] = [
  {
    id: 1,
    title: "Event Details",
    description: "Basic information",
    icon: CalendarDays,
  },
  {
    id: 2,
    title: "Capacity & Pricing",
    description: "Seats and ticket setup",
    icon: Ticket,
  },
  {
    id: 3,
    title: "Media & Promotion",
    description: "Upload assets and organize",
    icon: ImagePlus,
  },
  {
    id: 4,
    title: "Review & Publish",
    description: "Final checks",
    icon: ClipboardCheck,
  },
];

export const promotionChannelOptions = [
  "Website",
  "Email Newsletter",
  "Social Media",
  "Partner Listings",
];

export type SelectOption = { value: string; label: string };

export const categoryOptions: SelectOption[] = [
  { value: "conference", label: "Conference" },
  { value: "workshop", label: "Workshop" },
  { value: "concert", label: "Concert" },
  { value: "webinar", label: "Webinar" },
  { value: "meetup", label: "Meetup" },
  { value: "other", label: "Other" },
];

export const statusOptions: SelectOption[] = [
  { value: "draft", label: "Draft" },
  { value: "scheduled", label: "Scheduled" },
  { value: "live", label: "Live" },
];

export const taxClassOptions: SelectOption[] = [
  { value: "standard", label: "Standard Tax Rate" },
  { value: "reduced", label: "Reduced Rate" },
  { value: "zero", label: "Zero Rate" },
  { value: "exempt", label: "Exempt" },
];

export const currencyOptions: SelectOption[] = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
  { value: "inr", label: "INR" },
];

export const visibilityOptions: SelectOption[] = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
  { value: "invite-only", label: "Invite Only" },
];

export const getOptionLabel = (options: SelectOption[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

export type FormData = {
  eventName: string;
  eventCode: string;
  category: string;
  organizer: string;
  format: string;
  status: string;
  tagline: string;
  tags: string[];
  fullDescription: string;
  slug: string;
  ticketPrice: string;
  earlyBirdPrice: string;
  costPerAttendee: string;
  taxClass: string;
  currency: string;
  trackCapacity: boolean;
  totalSeats: string;
  registered: string;
  waitlistThreshold: string;
  hasCoverImage: boolean;
  galleryCount: number;
  trailerUrl: string;
  eventSeries: string;
  promotionChannels: string[];
  visibility: string;
  featured: boolean;
  publishTiming: string;
};

export type UpdateField = <K extends keyof FormData>(
  key: K,
  value: FormData[K],
) => void;

export const initialData: FormData = {
  eventName: "",
  eventCode: "",
  category: "conference",
  organizer: "",
  format: "In-person",
  status: "draft",
  tagline: "",
  tags: [],
  fullDescription: "",
  slug: "",
  ticketPrice: "",
  earlyBirdPrice: "",
  costPerAttendee: "",
  taxClass: "standard",
  currency: "usd",
  trackCapacity: true,
  totalSeats: "",
  registered: "",
  waitlistThreshold: "",
  hasCoverImage: false,
  galleryCount: 0,
  trailerUrl: "",
  eventSeries: "",
  promotionChannels: ["Website"],
  visibility: "public",
  featured: false,
  publishTiming: "now",
};

export type ChecklistItem = {
  label: string;
  done: boolean;
};
