// @ts-nocheck
"use client";

import { Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Field, FieldLabel, FieldDescription } from "@default/ui/primitives/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import { Switch } from "@default/ui/primitives/switch";
import { Label } from "@default/ui/primitives/label";
import {
  currencyOptions,
  taxClassOptions,
  type FormData,
  type UpdateField,
} from "./types";

type CapacityPricingStepProps = {
  data: FormData;
  update: UpdateField;
  seatsAvailable: number;
};

const CapacityPricingStep = ({
  data,
  update,
  seatsAvailable,
}: CapacityPricingStepProps) => {
  return (
    <Card className="relative overflow-hidden border-border py-0 gap-0">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/30" />
      <span className="pointer-events-none select-none absolute -top-3 right-5 text-8xl font-black text-primary/5 leading-none">
        02
      </span>
      <CardHeader className="relative px-6 pt-6 flex-row items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Ticket className="size-5" />
        </div>
        <div>
          <CardTitle className="text-lg">Capacity & Pricing</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative px-6 pt-4 pb-6 grid sm:grid-cols-2 gap-5">
        <Field>
          <FieldLabel htmlFor="ticket-price">
            Ticket Price<span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="ticket-price"
            type="number"
            placeholder="0.00"
            value={data.ticketPrice}
            onChange={(e) => update("ticketPrice", e.target.value)}
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="early-bird-price">
            Early-bird Price
          </FieldLabel>
          <Input
            id="early-bird-price"
            type="number"
            placeholder="0.00"
            value={data.earlyBirdPrice}
            onChange={(e) => update("earlyBirdPrice", e.target.value)}
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="cost-per-attendee">
            Cost per Attendee
          </FieldLabel>
          <Input
            id="cost-per-attendee"
            type="number"
            placeholder="0.00"
            value={data.costPerAttendee}
            onChange={(e) => update("costPerAttendee", e.target.value)}
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="tax-class">Tax Class</FieldLabel>
          <Select
            items={taxClassOptions}
            value={data.taxClass}
            onValueChange={(value) => update("taxClass", value as string)}
          >
            <SelectTrigger id="tax-class" className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {taxClassOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="currency">Currency</FieldLabel>
          <Select
            items={currencyOptions}
            value={data.currency}
            onValueChange={(value) => update("currency", value as string)}
          >
            <SelectTrigger id="currency" className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencyOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="sm:col-span-2 flex items-center justify-between gap-4 rounded-xl border p-4">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Track Capacity</Label>
            <p className="text-sm text-muted-foreground">
              Enable seat tracking for this event.
            </p>
          </div>
          <Switch
            checked={data.trackCapacity}
            onCheckedChange={(checked) => update("trackCapacity", checked)}
          />
        </div>

        <Field>
          <FieldLabel htmlFor="total-seats">Total Seats</FieldLabel>
          <Input
            id="total-seats"
            type="number"
            placeholder="0"
            disabled={!data.trackCapacity}
            value={data.totalSeats}
            onChange={(e) => update("totalSeats", e.target.value)}
            className="h-10"
          />
          <FieldDescription>
            Maximum attendees the venue can hold.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="registered">Registered</FieldLabel>
          <Input
            id="registered"
            type="number"
            placeholder="0"
            disabled={!data.trackCapacity}
            value={data.registered}
            onChange={(e) => update("registered", e.target.value)}
            className="h-10"
          />
          <FieldDescription>
            Attendees who already registered.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="seats-available">
            Seats Available (Calculated)
          </FieldLabel>
          <Input
            id="seats-available"
            disabled
            value={seatsAvailable}
            className="h-10"
          />
          <FieldDescription>Total seats minus registered.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="waitlist-threshold">
            Waitlist Threshold
          </FieldLabel>
          <Input
            id="waitlist-threshold"
            type="number"
            placeholder="0"
            disabled={!data.trackCapacity}
            value={data.waitlistThreshold}
            onChange={(e) => update("waitlistThreshold", e.target.value)}
            className="h-10"
          />
          <FieldDescription>
            Start a waitlist once seats fall below this.
          </FieldDescription>
        </Field>
      </CardContent>
    </Card>
  );
};

export default CapacityPricingStep;
