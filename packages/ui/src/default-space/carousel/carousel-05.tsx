// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@default/ui/primitives/carousel";
import { cn } from "@default/ui/lib/cn";

const images = [
  "https://images.shadcnspace.com/assets/gallery/destinations-1.webp",
  "https://images.shadcnspace.com/assets/gallery/destinations-2.webp",
  "https://images.shadcnspace.com/assets/gallery/destinations-3.webp",
  "https://images.shadcnspace.com/assets/gallery/destinations-4.webp",
];

const CarouselPreviews = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full max-w-xs">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={index}>
              <figure>
                <img
                  src={src}
                  alt={`img ${index + 1}`}
                  width={800}
                  height={600}
                  className="aspect-4/3 rounded-lg object-cover"
                />
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn("overflow-hidden rounded-md border-2 transition-all cursor-pointer", {
              "border-primary": index === current,
              "border-transparent opacity-50": index !== current,
            })}
          >
            <img
              src={src}
              alt={`sub-img ${index + 1}`}
              width={80}
              height={60}
              className="h-12 w-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default CarouselPreviews;
