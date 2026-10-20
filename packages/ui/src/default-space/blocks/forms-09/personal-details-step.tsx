// @ts-nocheck
"use client";

import { Input } from "@default/ui/primitives/input";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import {
  clientTypeOptions,
  countryCodeOptions,
  salutationOptions,
  type RegistrationData,
  type UpdateRegistrationField,
} from "./types";

type PersonalDetailsStepProps = {
  data: RegistrationData;
  update: UpdateRegistrationField;
};

const PersonalDetailsStep = ({ data, update }: PersonalDetailsStepProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="salutation">Salutation</FieldLabel>
        <Select
          items={salutationOptions}
          value={data.salutation}
          onValueChange={(value) => update("salutation", value as string)}
        >
          <SelectTrigger id="salutation" className="h-10! w-full">
            <SelectValue placeholder="--Select salutation--" />
          </SelectTrigger>
          <SelectContent>
            {salutationOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="first-name">First Name</FieldLabel>
        <Input
          id="first-name"
          placeholder="Enter your first name"
          value={data.firstName}
          onChange={(e) => update("firstName", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
        <Input
          id="last-name"
          placeholder="Enter your last name"
          value={data.lastName}
          onChange={(e) => update("lastName", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="email-address">Email address</FieldLabel>
        <Input
          id="email-address"
          type="email"
          placeholder="Enter your email address"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="phone-number">Phone Number</FieldLabel>
        <div className="flex gap-1">
          <Select
            items={countryCodeOptions}
            value={data.countryCode}
            onValueChange={(value) => update("countryCode", value as string)}
          >
            <SelectTrigger className="h-10! w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone-number"
            placeholder="e.g. 0712 000 000"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="h-10 flex-1"
          />
        </div>
      </Field>
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="client-type">Client Type</FieldLabel>
        <Select
          items={clientTypeOptions}
          value={data.clientType}
          onValueChange={(value) => update("clientType", value as string)}
        >
          <SelectTrigger id="client-type" className="h-10! w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {clientTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="**********"
          value={data.password}
          onChange={(e) => update("password", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="confirm-password">Re-enter Password</FieldLabel>
        <Input
          id="confirm-password"
          type="password"
          placeholder="**********"
          value={data.confirmPassword}
          onChange={(e) => update("confirmPassword", e.target.value)}
          className="h-10"
        />
      </Field>
    </div>
  );
};

export default PersonalDetailsStep;
