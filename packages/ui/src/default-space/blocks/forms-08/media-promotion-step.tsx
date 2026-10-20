// @ts-nocheck
"use client";

import { ImagePlus, Camera, X, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import { Badge } from "@default/ui/primitives/badge";
import { Switch } from "@default/ui/primitives/switch";
import { Label } from "@default/ui/primitives/label";
import {
  categoryOptions,
  getOptionLabel,
  promotionChannelOptions,
  visibilityOptions,
  type FormData,
  type UpdateField,
} from "./types";

type MediaPromotionStepProps = {
  data: FormData;
  update: UpdateField;
  coverImage: string | null;
  galleryImages: string[];
  onCoverImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGalleryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePromotionChannel: (channel: string) => void;
};

const MediaPromotionStep = ({
  data,
  update,
  coverImage,
  galleryImages,
  onCoverImageChange,
  onGalleryChange,
  togglePromotionChannel,
}: MediaPromotionStepProps) => {
  return (
    <Card className="relative overflow-hidden border-border py-0 gap-0">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary to-primary/30" />
      <span className="pointer-events-none select-none absolute -top-3 right-5 text-8xl font-black text-primary/5 leading-none">
        03
      </span>
      <CardHeader className="relative px-6 pt-6 flex-row items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ImagePlus className="size-5" />
        </div>
        <div>
          <CardTitle className="text-lg">Media & Promotion</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="relative px-6 pt-4 pb-6 flex flex-col gap-5">
        <Field>
          <FieldLabel>
            Cover Image
            <span className="text-destructive">*</span>
          </FieldLabel>
          <label
            htmlFor="cover-image-upload"
            className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-muted"
          >
            {coverImage ? (
              <>
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/50">
                  <span className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-xs font-semibold opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                    <Camera className="size-3.5" />
                    Replace cover
                  </span>
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm">
                  Cover
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-background text-primary shadow-sm">
                  <Camera className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Add a cover photo</p>
                  <p className="text-xs text-muted-foreground">
                    1920 x 1080px works best
                  </p>
                </div>
              </div>
            )}
            <input
              id="cover-image-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onCoverImageChange}
            />
          </label>
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel>Gallery Images</FieldLabel>
            <span className="text-xs text-muted-foreground">
              {galleryImages.length}/8 added
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {galleryImages.map((src, index) => (
              <div
                key={src}
                className="size-20 shrink-0 overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={src}
                  alt={`Gallery photo ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <label
              htmlFor="gallery-image-upload"
              className="flex size-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Plus className="size-4" />
              <span className="text-xs font-medium">Add</span>
              <input
                id="gallery-image-upload"
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={onGalleryChange}
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground">
            Add up to 8 photos from past editions.
          </p>
        </Field>

        <Field>
          <FieldLabel htmlFor="trailer-url">Trailer / Video URL</FieldLabel>
          <Input
            id="trailer-url"
            placeholder="https://example.com/event-trailer"
            value={data.trailerUrl}
            onChange={(e) => update("trailerUrl", e.target.value)}
            className="h-10"
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field>
            <FieldLabel htmlFor="event-series">Event Series</FieldLabel>
            <Input
              id="event-series"
              placeholder="Add a series or collection"
              value={data.eventSeries}
              onChange={(e) => update("eventSeries", e.target.value)}
              className="h-10"
            />
          </Field>
          <Field>
            <FieldLabel>Promotion Channels</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {data.promotionChannels.map((channel) => (
                <Badge key={channel} variant="secondary" className="gap-1 pr-1">
                  {channel}
                  <button
                    type="button"
                    onClick={() => togglePromotionChannel(channel)}
                    className="cursor-pointer rounded-full p-0.5 hover:bg-muted-foreground/20"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
              {promotionChannelOptions
                .filter((c) => !data.promotionChannels.includes(c))
                .map((channel) => (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => togglePromotionChannel(channel)}
                    className="cursor-pointer"
                  >
                    <Badge
                      variant="outline"
                      className="gap-1 text-muted-foreground"
                    >
                      <Plus className="size-3" />
                      {channel}
                    </Badge>
                  </button>
                ))}
            </div>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field>
            <FieldLabel htmlFor="category-confirmed">
              Category (Confirmed)
            </FieldLabel>
            <Input
              id="category-confirmed"
              disabled
              value={getOptionLabel(categoryOptions, data.category)}
              className="h-10"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="visibility">
              Visibility<span className="text-destructive">*</span>
            </FieldLabel>
            <Select
              items={visibilityOptions}
              value={data.visibility}
              onValueChange={(value) => update("visibility", value as string)}
            >
              <SelectTrigger id="visibility" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {visibilityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Featured Event</Label>
            <p className="text-sm text-muted-foreground">
              Show this event on the homepage calendar.
            </p>
          </div>
          <Switch
            checked={data.featured}
            onCheckedChange={(checked) => update("featured", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaPromotionStep;
