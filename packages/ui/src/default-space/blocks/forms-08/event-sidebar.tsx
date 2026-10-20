// @ts-nocheck
"use client";

import {
  CalendarDays,
  Ticket,
  ImagePlus,
  Image as ImageIcon,
  Lightbulb,
  Sparkles,
  ListChecks,
  TrendingUp,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Badge } from "@default/ui/primitives/badge";
import { Separator } from "@default/ui/primitives/separator";
import { Progress } from "@default/ui/primitives/progress";
import { cn } from "@default/ui/lib/cn";
import {
  categoryOptions,
  getOptionLabel,
  statusOptions,
  type ChecklistItem,
  type FormData,
} from "./types";

type EventSidebarProps = {
  currentStep: number;
  data: FormData;
  coverImage: string | null;
  galleryImages: string[];
  totalSeatsNumber: number;
  registeredNumber: number;
  waitlistNumber: number;
  seatsAvailable: number;
  capacityStatus: string;
  ticketPriceNumber: number;
  costPerAttendeeNumber: number;
  netPerSeat: number;
  netMargin: number;
  checklist: ChecklistItem[];
  readyCount: number;
  readyPercent: number;
};

const EventSidebar = ({
  currentStep,
  data,
  coverImage,
  galleryImages,
  totalSeatsNumber,
  registeredNumber,
  waitlistNumber,
  seatsAvailable,
  capacityStatus,
  ticketPriceNumber,
  costPerAttendeeNumber,
  netPerSeat,
  netMargin,
  checklist,
  readyCount,
  readyPercent,
}: EventSidebarProps) => {
  return (
    <div className="lg:sticky lg:top-6">
      {currentStep === 1 && (
        <Card className="border-border py-6">
          <CardContent className="px-6 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Lightbulb className="size-4" />
                </div>
                <p className="text-sm font-semibold">Event Tips</p>
              </div>
              <ul className="list-disc pl-4 space-y-1.5 text-sm text-muted-foreground">
                <li>Use a clear, descriptive event name.</li>
                <li>Choose the most relevant category.</li>
                <li>Add a short tagline for quick overview.</li>
                <li>Include a detailed agenda for attendees.</li>
                <li>Use tags to improve event discoverability.</li>
              </ul>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="size-4" />
                </div>
                <p className="text-sm font-semibold">Preview (Draft)</p>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-muted/80 p-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background">
                  <CalendarDays className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {data.eventName || "Untitled event"}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {data.eventCode || "No event code yet"}
                  </p>
                  <div className="flex gap-1.5">
                    <Badge variant="outline">
                      {getOptionLabel(statusOptions, data.status)}
                    </Badge>
                    <Badge variant="outline">
                      {getOptionLabel(categoryOptions, data.category)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card className="border-border py-6">
          <CardContent className="px-6 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Ticket className="size-4" />
                </div>
                <p className="text-sm font-semibold">Capacity Summary</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Seats</span>
                  <span className="font-medium">{totalSeatsNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="font-medium">{registeredNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-medium">{seatsAvailable}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Waitlist Threshold
                  </span>
                  <span className="font-medium">{waitlistNumber}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted-foreground">
                    Capacity Status
                  </span>
                  <Badge variant="outline">{capacityStatus}</Badge>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <TrendingUp className="size-4" />
                </div>
                <p className="text-sm font-semibold">Revenue Preview</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ticket Price</span>
                  <span className="font-medium">
                    ${ticketPriceNumber.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Cost per Attendee
                  </span>
                  <span className="font-medium">
                    ${costPerAttendeeNumber.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Net per Seat</span>
                  <span className="font-medium">
                    ${netPerSeat.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted-foreground">Net Margin</span>
                  <Badge variant="outline">{netMargin}%</Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Margin is calculated before taxes and platform fees.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card className="border-border py-6">
          <CardContent className="px-6 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ImagePlus className="size-4" />
                </div>
                <p className="text-sm font-semibold">Promotion Guidelines</p>
              </div>
              <ul className="list-disc pl-4 space-y-1.5 text-sm text-muted-foreground">
                <li>Use high-quality, well-lit photos.</li>
                <li>Recommended size: 1920 x 1080px.</li>
                <li>Show the venue or stage in the cover image.</li>
                <li>First image will be used as the cover.</li>
                <li>Trailers should be under 60 seconds.</li>
              </ul>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ImageIcon className="size-4" />
                </div>
                <p className="text-sm font-semibold">Gallery Preview</p>
              </div>
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-muted">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-8 text-muted-foreground" />
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-muted",
                      !galleryImages[index] && "opacity-40",
                    )}
                  >
                    {galleryImages[index] ? (
                      <img
                        src={galleryImages[index]}
                        alt={`Gallery photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="size-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                This is how your media will appear to attendees.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card className="border-border py-6">
          <CardContent className="px-6 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ListChecks className="size-4" />
                </div>
                <p className="text-sm font-semibold">
                  Confirmation Checklist
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {checklist.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-full",
                        item.done
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {item.done ? (
                        <Check className="size-3" />
                      ) : (
                        <X className="size-3" />
                      )}
                    </div>
                    <span
                      className={cn(
                        item.done
                          ? "text-foreground font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Readiness Summary</p>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold">
                  {readyCount}
                  <span className="text-base font-normal text-muted-foreground">
                    /{checklist.length}
                  </span>
                </p>
                <span className="text-sm text-muted-foreground">
                  {readyPercent}% ready
                </span>
              </div>
              <Progress value={readyPercent} className="h-2" />
              <div>
                <p className="text-sm font-medium">
                  {checklist.length - readyCount === 0
                    ? "All set to publish"
                    : `${checklist.length - readyCount} items need attention`}
                </p>
                <p className="text-xs text-muted-foreground">
                  Complete the unchecked items in the confirmation checklist
                  to publish.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start gap-2">
              <Lightbulb className="size-4 shrink-0 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Events with a clear agenda, sharp photos, and an early
                promotion push sell out seats faster.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventSidebar;
