// @ts-nocheck
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@default/ui/primitives/carousel";

const slides = [
  {
    image: "https://images.shadcnspace.com/assets/gallery/destinations-1.webp",
    title: "Mountain Trek",
    description:
      "Scale new heights and embrace the hiker's journey through the clouds.",
  },
  {
    image: "https://images.shadcnspace.com/assets/gallery/destinations-2.webp",
    title: "River Rafting",
    description:
      "Feel the adrenaline rush as you navigate the wild rapids with ease.",
  },
  {
    image: "https://images.shadcnspace.com/assets/gallery/destinations-3.webp",
    title: "Azure Beach",
    description:
      "Unwind on the crystal clear shores of a tropical paradise today.",
  },
  {
    image: "https://images.shadcnspace.com/assets/gallery/destinations-4.webp",
    title: "Spiritual Path",
    description:
      "Discover inner peace through ancient wisdom and serenity of mind.",
  },
];

const CarouselCardWithDetail = () => {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative overflow-hidden rounded-lg">
              <figure>
                <img
                  src={slide.image}
                  alt={slide.title}
                  width={800}
                  height={600}
                  className="aspect-video object-cover"
                />
              </figure>
              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/70 via-black/30 to-transparent p-6">
                <p className="mb-1 text-lg font-semibold text-white">
                  {slide.title}
                </p>
                <p className="text-sm text-white/80">{slide.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="cursor-pointer" />
      <CarouselNext className="cursor-pointer" />
    </Carousel>
  );
};

export default CarouselCardWithDetail;
