// @ts-nocheck
"use client";

import { ClipboardCheck, Sparkles, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@default/ui/primitives/card";
import { Button } from "@default/ui/primitives/button";
import { Field, FieldLabel, FieldDescription } from "@default/ui/primitives/field";
import { Badge } from "@default/ui/primitives/badge";
import { Checkbox } from "@default/ui/primitives/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@default/ui/primitives/toggle-group";
import {
  categoryOptions,
  getOptionLabel,
  promotionChannelOptions,
  visibilityOptions,
  type FormData,
  type UpdateField,
} from "./types";

type ReviewPublishStepProps = {
  data: FormData;
  update: UpdateField;
  goToStep: (id: number) => void;
  ticketPriceNumber: number;
  seatsAvailable: number;
  capacityStatus: string;
  coverImage: string | null;
  togglePromotionChannel: (channel: string) => void;
};

const ReviewPublishStep = ({
  data,
  update,
  goToStep,
  ticketPriceNumber,
  seatsAvailable,
  capacityStatus,
  coverImage,
  togglePromotionChannel,
}: ReviewPublishStepProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="relative overflow-hidden border-border py-0 gap-0">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/30" />
        <CardHeader className="px-6 pt-6 flex-row items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardCheck className="size-5" />
          </div>
          <div>
            <CardTitle className="text-lg">Review & Publish</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-6 pt-2 pb-2 divide-y divide-border">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
              1
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Event Details</p>
              <p className="text-sm text-muted-foreground truncate">
                {data.eventName || "Untitled event"} &middot;{" "}
                {data.eventCode || "no code"} &middot;{" "}
                {getOptionLabel(categoryOptions, data.category)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer shrink-0"
              onClick={() => goToStep(1)}
            >
              Edit
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
              2
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Capacity & Pricing</p>
              <p className="text-sm text-muted-foreground truncate">
                ${ticketPriceNumber.toFixed(2)} &middot;{" "}
                {data.trackCapacity
                  ? `${seatsAvailable} seats left`
                  : "not tracked"}{" "}
                &middot; {capacityStatus}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer shrink-0"
              onClick={() => goToStep(2)}
            >
              Edit
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 py-4">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
              3
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Media & Promotion</p>
              <p className="text-sm text-muted-foreground truncate">
                {data.galleryCount + (data.hasCoverImage ? 1 : 0)} images
                &middot; {getOptionLabel(visibilityOptions, data.visibility)}{" "}
                &middot; {data.featured ? "featured" : "not featured"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer shrink-0"
              onClick={() => goToStep(3)}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-6">
        <CardHeader className="px-6">
          <CardTitle>Publication Settings</CardTitle>
        </CardHeader>
        <CardContent className="px-6 grid sm:grid-cols-2 gap-6">
          <Field>
            <FieldLabel>
              Publish Timing
              <span className="text-destructive">*</span>
            </FieldLabel>
            <ToggleGroup
              value={[data.publishTiming]}
              onValueChange={(value: string[]) => {
                const next = value[value.length - 1];
                if (next) update("publishTiming", next);
              }}
              className="w-full grid grid-cols-2 gap-1.5 rounded-xl bg-muted p-1.5"
            >
              <ToggleGroupItem
                value="now"
                className="h-10 flex-1 w-full rounded-lg border-0 cursor-pointer text-muted-foreground data-pressed:bg-background aria-pressed:bg-background data-pressed:text-foreground aria-pressed:text-foreground data-pressed:shadow-sm aria-pressed:shadow-sm"
              >
                Publish now
              </ToggleGroupItem>
              <ToggleGroupItem
                value="later"
                className="h-10 flex-1 w-full rounded-lg border-0 cursor-pointer text-muted-foreground data-pressed:bg-background aria-pressed:bg-background data-pressed:text-foreground aria-pressed:text-foreground data-pressed:shadow-sm aria-pressed:shadow-sm"
              >
                Schedule for later
              </ToggleGroupItem>
            </ToggleGroup>
            <FieldDescription>
              {data.publishTiming === "now"
                ? "Make this event live immediately."
                : "Choose a future date to publish."}
            </FieldDescription>
          </Field>

          <div className="flex flex-col gap-5">
            <Field>
              <FieldLabel>Promotion Channels</FieldLabel>
              <div className="flex flex-col gap-2">
                {promotionChannelOptions.map((channel) => (
                  <FieldLabel
                    key={channel}
                    htmlFor={`channel-${channel}`}
                    className="flex-row items-center gap-2 bg-transparent!"
                  >
                    <Checkbox
                      id={`channel-${channel}`}
                      checked={data.promotionChannels.includes(channel)}
                      onCheckedChange={() => togglePromotionChannel(channel)}
                    />
                    <span className="text-sm font-normal">{channel}</span>
                  </FieldLabel>
                ))}
              </div>
            </Field>
            <Field>
              <FieldLabel>Visibility</FieldLabel>
              <p className="text-sm font-medium">
                {getOptionLabel(visibilityOptions, data.visibility)}
              </p>
              <FieldDescription>
                Set from the Media & Promotion step.
              </FieldDescription>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border py-6">
        <CardHeader className="px-6">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Event Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 flex flex-col sm:flex-row gap-5">
          <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted">
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <CalendarDays className="size-8 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">
                {data.eventName || "Untitled event"}
              </p>
              <Badge variant="outline">{capacityStatus}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {data.eventCode || "No event code yet"}
            </p>
            <p className="text-xl font-bold">
              ${ticketPriceNumber.toFixed(2)}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {getOptionLabel(categoryOptions, data.category)}
              </Badge>
              <Badge variant="secondary">{seatsAvailable} seats left</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewPublishStep;
