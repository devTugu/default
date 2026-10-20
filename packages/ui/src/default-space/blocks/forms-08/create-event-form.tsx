// @ts-nocheck
"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Save, PartyPopper } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Badge } from "@default/ui/primitives/badge";
import {
  steps,
  initialData,
  type FormData,
  type UpdateField,
} from "./types";
import StepHeader from "./step-header";
import EventDetailsStep from "./event-details-step";
import CapacityPricingStep from "./capacity-pricing-step";
import MediaPromotionStep from "./media-promotion-step";
import ReviewPublishStep from "./review-publish-step";
import EventSidebar from "./event-sidebar";

const CreateEventForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const update: UpdateField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const addTag = () => {
    const value = tagInput.trim();
    if (value && !data.tags.includes(value)) {
      update("tags", [...data.tags, value]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    update(
      "tags",
      data.tags.filter((t) => t !== tag),
    );
  };

  const togglePromotionChannel = (channel: string) => {
    if (data.promotionChannels.includes(channel)) {
      update(
        "promotionChannels",
        data.promotionChannels.filter((c) => c !== channel),
      );
    } else {
      update("promotionChannels", [...data.promotionChannels, channel]);
    }
  };

  const handleCoverImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverImage(URL.createObjectURL(file));
    update("hasCoverImage", true);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    const remaining = Math.max(8 - data.galleryCount, 0);
    const selected = files.slice(0, remaining);
    if (selected.length === 0) return;
    const urls = selected.map((file) => URL.createObjectURL(file));
    setGalleryImages((prev) => [...prev, ...urls].slice(0, 8));
    update("galleryCount", Math.min(data.galleryCount + selected.length, 8));
    e.target.value = "";
  };

  const totalSeatsNumber = Number(data.totalSeats) || 0;
  const registeredNumber = Number(data.registered) || 0;
  const waitlistNumber = Number(data.waitlistThreshold) || 0;
  const seatsAvailable = Math.max(totalSeatsNumber - registeredNumber, 0);

  const capacityStatus = !data.trackCapacity
    ? "Not tracked"
    : seatsAvailable <= 0
      ? "Sold out"
      : seatsAvailable <= waitlistNumber
        ? "Filling up"
        : "Open";

  const ticketPriceNumber = Number(data.ticketPrice) || 0;
  const costPerAttendeeNumber = Number(data.costPerAttendee) || 0;
  const netPerSeat = ticketPriceNumber - costPerAttendeeNumber;
  const netMargin =
    ticketPriceNumber > 0
      ? Math.round((netPerSeat / ticketPriceNumber) * 100)
      : 0;

  const checklist = [
    {
      label: "Event details completed",
      done: Boolean(data.eventName && data.eventCode && data.category),
    },
    { label: "Capacity and pricing set", done: Boolean(data.ticketPrice) },
    { label: "Cover image uploaded", done: data.hasCoverImage },
    {
      label: "Category and tags added",
      done: Boolean(data.category && data.tags.length > 0),
    },
    {
      label: "Preview looks good",
      done: Boolean(data.eventName && data.ticketPrice && data.hasCoverImage),
    },
    {
      label: "Ready to publish",
      done: Boolean(
        data.eventName &&
          data.eventCode &&
          data.ticketPrice &&
          data.hasCoverImage &&
          data.promotionChannels.length > 0,
      ),
    },
  ];
  const readyCount = checklist.filter((item) => item.done).length;
  const readyPercent = Math.round((readyCount / checklist.length) * 100);

  const goToStep = (id: number) => setCurrentStep(id);
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="py-10 lg:py-16">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto w-full">
        <div className="rounded-2xl border border-border bg-muted/30 p-4 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="text-3xl font-medium tracking-tight text-foreground">
                Create Event
              </p>
              <p className="text-muted-foreground">
                Add a new event to your calendar using a guided setup.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="h-9 rounded-md px-3 gap-1 bg-background"
              >
                <span className="font-bold text-primary">{currentStep}</span>
                <span className="text-muted-foreground">
                  / {steps.length}
                </span>
              </Badge>
              <Button
                variant="outline"
                className="h-10 gap-2 cursor-pointer bg-background"
              >
                <Save className="size-4" />
                Save draft
              </Button>
            </div>
          </div>

          <StepHeader currentStep={currentStep} onStepClick={goToStep} />

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {currentStep === 1 && (
                <EventDetailsStep
                  data={data}
                  update={update}
                  tagInput={tagInput}
                  setTagInput={setTagInput}
                  addTag={addTag}
                  removeTag={removeTag}
                />
              )}

              {currentStep === 2 && (
                <CapacityPricingStep
                  data={data}
                  update={update}
                  seatsAvailable={seatsAvailable}
                />
              )}

              {currentStep === 3 && (
                <MediaPromotionStep
                  data={data}
                  update={update}
                  coverImage={coverImage}
                  galleryImages={galleryImages}
                  onCoverImageChange={handleCoverImageChange}
                  onGalleryChange={handleGalleryChange}
                  togglePromotionChannel={togglePromotionChannel}
                />
              )}

              {currentStep === 4 && (
                <ReviewPublishStep
                  data={data}
                  update={update}
                  goToStep={goToStep}
                  ticketPriceNumber={ticketPriceNumber}
                  seatsAvailable={seatsAvailable}
                  capacityStatus={capacityStatus}
                  coverImage={coverImage}
                  togglePromotionChannel={togglePromotionChannel}
                />
              )}
            </div>

            <EventSidebar
              currentStep={currentStep}
              data={data}
              coverImage={coverImage}
              galleryImages={galleryImages}
              totalSeatsNumber={totalSeatsNumber}
              registeredNumber={registeredNumber}
              waitlistNumber={waitlistNumber}
              seatsAvailable={seatsAvailable}
              capacityStatus={capacityStatus}
              ticketPriceNumber={ticketPriceNumber}
              costPerAttendeeNumber={costPerAttendeeNumber}
              netPerSeat={netPerSeat}
              netMargin={netMargin}
              checklist={checklist}
              readyCount={readyCount}
              readyPercent={readyPercent}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-6 border-t border-border">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="h-10 gap-2 cursor-pointer bg-background"
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
            ) : (
              <span />
            )}

            <p className="hidden sm:block text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </p>

            {currentStep < steps.length ? (
              <Button onClick={nextStep} className="h-10 gap-2 cursor-pointer">
                Next
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <Button className="h-10 gap-2 cursor-pointer">
                <PartyPopper className="size-4" />
                Publish event
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEventForm;
