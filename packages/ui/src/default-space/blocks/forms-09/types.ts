import {
  User,
  IdCard,
  Building2,
  MailCheck,
  PartyPopper,
  type LucideIcon,
} from "lucide-react";

export type RegistrationStep = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const registrationSteps: RegistrationStep[] = [
  {
    id: 1,
    title: "Personal Details",
    description: "Provide your personal details",
    icon: User,
  },
  {
    id: 2,
    title: "Identification Details",
    description: "Provide your identification details",
    icon: IdCard,
  },
  {
    id: 3,
    title: "Business Details",
    description: "Provide your business details",
    icon: Building2,
  },
  {
    id: 4,
    title: "Verify Your Email",
    description: "Enter your verification code",
    icon: MailCheck,
  },
  {
    id: 5,
    title: "Welcome to default",
    description: "Get up and running in 1 minute",
    icon: PartyPopper,
  },
];

export type SelectOption = { value: string; label: string };

export const salutationOptions: SelectOption[] = [
  { value: "mr", label: "Mr." },
  { value: "mrs", label: "Mrs." },
  { value: "ms", label: "Ms." },
  { value: "dr", label: "Dr." },
  { value: "other", label: "Other" },
];

export const countryCodeOptions: SelectOption[] = [
  { value: "+255", label: "+255" },
  { value: "+254", label: "+254" },
  { value: "+256", label: "+256" },
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
];

export const clientTypeOptions: SelectOption[] = [
  { value: "local", label: "Local" },
  { value: "international", label: "International" },
];

export const idTypeOptions: SelectOption[] = [
  { value: "national-id", label: "National ID" },
  { value: "passport", label: "Passport" },
  { value: "drivers-license", label: "Driver's License" },
];

export const businessTypeOptions: SelectOption[] = [
  { value: "sole-proprietor", label: "Sole Proprietor" },
  { value: "partnership", label: "Partnership" },
  { value: "limited-company", label: "Limited Company" },
  { value: "ngo", label: "NGO" },
];

export const countryOptions: SelectOption[] = [
  { value: "tanzania", label: "Tanzania" },
  { value: "kenya", label: "Kenya" },
  { value: "uganda", label: "Uganda" },
  { value: "united-states", label: "United States" },
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "other", label: "Other" },
];

export type RegistrationData = {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  clientType: string;
  password: string;
  confirmPassword: string;
  idType: string;
  idNumber: string;
  idCountry: string;
  dateOfBirth: string;
  idExpiry: string;
  businessName: string;
  businessType: string;
  registrationNumber: string;
  businessAddress: string;
  businessCity: string;
  businessCountry: string;
  otp: string;
};

export type UpdateRegistrationField = <K extends keyof RegistrationData>(
  key: K,
  value: RegistrationData[K],
) => void;

export const initialRegistrationData: RegistrationData = {
  salutation: "",
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+255",
  phone: "",
  clientType: "local",
  password: "",
  confirmPassword: "",
  idType: "national-id",
  idNumber: "",
  idCountry: "",
  dateOfBirth: "",
  idExpiry: "",
  businessName: "",
  businessType: "sole-proprietor",
  registrationNumber: "",
  businessAddress: "",
  businessCity: "",
  businessCountry: "",
  otp: "",
};
