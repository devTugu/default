// @ts-nocheck
"use client";

import { Input } from "@default/ui/primitives/input";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import { Textarea } from "@default/ui/primitives/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import {
  businessTypeOptions,
  countryOptions,
  type RegistrationData,
  type UpdateRegistrationField,
} from "./types";

type BusinessDetailsStepProps = {
  data: RegistrationData;
  update: UpdateRegistrationField;
};

const BusinessDetailsStep = ({ data, update }: BusinessDetailsStepProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <Field>
        <FieldLabel htmlFor="business-name">Business Name</FieldLabel>
        <Input
          id="business-name"
          placeholder="e.g. Nova Traders Ltd."
          value={data.businessName}
          onChange={(e) => update("businessName", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="business-type">Business Type</FieldLabel>
        <Select
          items={businessTypeOptions}
          value={data.businessType}
          onValueChange={(value) => update("businessType", value as string)}
        >
          <SelectTrigger id="business-type" className="h-10! w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {businessTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="registration-number">
          Registration Number
        </FieldLabel>
        <Input
          id="registration-number"
          placeholder="e.g. BRN-2026-00142"
          value={data.registrationNumber}
          onChange={(e) => update("registrationNumber", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="business-address">Business Address</FieldLabel>
        <Textarea
          id="business-address"
          placeholder="Street address, building, floor"
          value={data.businessAddress}
          onChange={(e) => update("businessAddress", e.target.value)}
          className="min-h-20 resize-none"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="business-city">City</FieldLabel>
        <Input
          id="business-city"
          placeholder="e.g. Dar es Salaam"
          value={data.businessCity}
          onChange={(e) => update("businessCity", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="business-country">Country</FieldLabel>
        <Select
          items={countryOptions}
          value={data.businessCountry}
          onValueChange={(value) =>
            update("businessCountry", value as string)
          }
        >
          <SelectTrigger id="business-country" className="h-10! w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
};

export default BusinessDetailsStep;
