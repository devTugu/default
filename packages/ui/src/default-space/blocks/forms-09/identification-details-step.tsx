// @ts-nocheck
"use client";

import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Calendar } from "@default/ui/primitives/calendar";
import { Input } from "@default/ui/primitives/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@default/ui/primitives/popover";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import {
  countryOptions,
  idTypeOptions,
  type RegistrationData,
  type UpdateRegistrationField,
} from "./types";

type IdentificationDetailsStepProps = {
  data: RegistrationData;
  update: UpdateRegistrationField;
};

const parseDate = (value: string) => {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const currentYear = new Date().getFullYear();

const IdentificationDetailsStep = ({
  data,
  update,
}: IdentificationDetailsStepProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <Field>
        <FieldLabel htmlFor="id-type">ID Type</FieldLabel>
        <Select
          items={idTypeOptions}
          value={data.idType}
          onValueChange={(value) => update("idType", value as string)}
        >
          <SelectTrigger id="id-type" className="h-10! w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {idTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="id-number">ID Number</FieldLabel>
        <Input
          id="id-number"
          placeholder="Enter your ID number"
          value={data.idNumber}
          onChange={(e) => update("idNumber", e.target.value)}
          className="h-10"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="id-country">Country of Issue</FieldLabel>
        <Select
          items={countryOptions}
          value={data.idCountry}
          onValueChange={(value) => update("idCountry", value as string)}
        >
          <SelectTrigger id="id-country" className="h-10! w-full">
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
      <Field>
        <FieldLabel htmlFor="date-of-birth">Date of Birth</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
<Button
                id="date-of-birth"
                type="button"
                variant="outline"
                className="h-10 w-full justify-start px-3 font-normal cursor-pointer"
              >
<CalendarIcon className="size-4 text-muted-foreground" />
                {data.dateOfBirth ? (
                  format(parseDate(data.dateOfBirth)!, "PPP")
                ) : (
                  <span className="text-muted-foreground">
                    Select date of birth
                  </span>
                )}
              
</Button>
</PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={parseDate(data.dateOfBirth)}
              defaultMonth={parseDate(data.dateOfBirth)}
              onSelect={(date) =>
                update("dateOfBirth", date ? format(date, "yyyy-MM-dd") : "")
              }
              startMonth={new Date(1900, 0)}
              endMonth={new Date()}
              disabled={{ after: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field>
        <FieldLabel htmlFor="id-expiry">Expiry Date</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
<Button
                id="id-expiry"
                type="button"
                variant="outline"
                className="h-10 w-full justify-start px-3 font-normal cursor-pointer"
              >
<CalendarIcon className="size-4 text-muted-foreground" />
                {data.idExpiry ? (
                  format(parseDate(data.idExpiry)!, "PPP")
                ) : (
                  <span className="text-muted-foreground">
                    Select expiry date
                  </span>
                )}
              
</Button>
</PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={parseDate(data.idExpiry)}
              defaultMonth={parseDate(data.idExpiry)}
              onSelect={(date) =>
                update("idExpiry", date ? format(date, "yyyy-MM-dd") : "")
              }
              startMonth={new Date(currentYear - 5, 0)}
              endMonth={new Date(currentYear + 25, 11)}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field>
        <FieldLabel>Upload ID Document</FieldLabel>
        <label
          htmlFor="id-document-upload"
          className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Upload className="size-4" />
          Choose file to upload
          <input
            id="id-document-upload"
            type="file"
            accept="image/*,.pdf"
            className="sr-only"
          />
        </label>
      </Field>
    </div>
  );
};

export default IdentificationDetailsStep;
