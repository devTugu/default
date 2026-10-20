// @ts-nocheck
"use client";

import { CalendarDays, X } from "lucide-react";
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
import { Textarea } from "@default/ui/primitives/textarea";
import { Badge } from "@default/ui/primitives/badge";
import {
  categoryOptions,
  statusOptions,
  type FormData,
  type UpdateField,
} from "./types";

type EventDetailsStepProps = {
  data: FormData;
  update: UpdateField;
  tagInput: string;
  setTagInput: (value: string) => void;
  addTag: () => void;
  removeTag: (tag: string) => void;
};

const EventDetailsStep = ({
  data,
  update,
  tagInput,
  setTagInput,
  addTag,
  removeTag,
}: EventDetailsStepProps) => {
  return (
    <Card className="relative overflow-hidden border-border py-0 gap-0">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/30" />
      <span className="pointer-events-none select-none absolute -top-3 right-5 text-8xl font-black text-primary/5 leading-none">
        01
      </span>
      <CardHeader className="relative px-6 pt-6 flex-row items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays className="size-5" />
        </div>
        <div>
          <CardTitle className="text-lg">Event Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative px-6 pt-4 pb-6 grid sm:grid-cols-2 gap-5">
        <Field>
          <FieldLabel htmlFor="event-name">
            Event Name<span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="event-name"
            placeholder="e.g. Product Design Summit"
            value={data.eventName}
            onChange={(e) => update("eventName", e.target.value)}
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="event-code">
            Event Code<span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="event-code"
            placeholder="e.g. EVT-2026-014"
            value={data.eventCode}
            onChange={(e) => update("eventCode", e.target.value)}
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="event-category">
            Category<span className="text-destructive">*</span>
          </FieldLabel>
          <Select
            items={categoryOptions}
            value={data.category}
            onValueChange={(value) => update("category", value as string)}
          >
            <SelectTrigger id="event-category" className="h-10">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="event-organizer">Organizer</FieldLabel>
          <Input
            id="event-organizer"
            placeholder="e.g. Nova Events Co."
            value={data.organizer}
            onChange={(e) => update("organizer", e.target.value)}
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="event-format">Format</FieldLabel>
          <Input
            id="event-format"
            placeholder="In-person"
            value={data.format}
            onChange={(e) => update("format", e.target.value)}
            className="h-10"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="event-status">
            Status<span className="text-destructive">*</span>
          </FieldLabel>
          <Select
            items={statusOptions}
            value={data.status}
            onValueChange={(value) => update("status", value as string)}
          >
            <SelectTrigger id="event-status" className="h-10">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="event-tagline">Tagline</FieldLabel>
          <Textarea
            id="event-tagline"
            placeholder="A quick one-liner shown on the event card"
            value={data.tagline}
            maxLength={160}
            onChange={(e) => update("tagline", e.target.value)}
            className="min-h-20 resize-none"
          />
          <FieldDescription className="text-right">
            {data.tagline.length} / 160
          </FieldDescription>
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="event-tags">Tags</FieldLabel>
          <Input
            id="event-tags"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            className="h-10"
          />
          {data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="cursor-pointer rounded-full p-0.5 hover:bg-muted-foreground/20"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="event-description">
            Full Description
          </FieldLabel>
          <Textarea
            id="event-description"
            placeholder="Describe the agenda, speakers, and what attendees can expect"
            value={data.fullDescription}
            maxLength={2000}
            onChange={(e) => update("fullDescription", e.target.value)}
            className="min-h-30 resize-none"
          />
          <FieldDescription className="text-right">
            {data.fullDescription.length} / 2000
          </FieldDescription>
        </Field>
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="event-slug">Event URL Slug</FieldLabel>
          <Input
            id="event-slug"
            placeholder="e.g. product-design-summit-2026"
            value={data.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="h-10"
          />
        </Field>
      </CardContent>
    </Card>
  );
};

export default EventDetailsStep;
