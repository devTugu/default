import { Marquee } from "../../animations/marquee";

type BrandList = {
  image: string;
  lightimg: string;
  name: string;
};

const BrandSlider = () => {
  const brandList: BrandList[] = [
    {
      image: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-1.svg",
      lightimg: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-dark-1.svg",
      name: "Brand 1",
    },
    {
      image: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-2.svg",
      lightimg: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-dark-2.svg",
      name: "Brand 2",
    },
    {
      image: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-3.svg",
      lightimg: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-dark-3.svg",
      name: "Brand 3",
    },
    {
      image: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-4.svg",
      lightimg: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-dark-4.svg",
      name: "Brand 4",
    },
    {
      image: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-5.svg",
      lightimg: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-dark-5.svg",
      name: "Brand 5",
    },
    {
      image: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-3.svg",
      lightimg: "https://images.shadcnspace.com/assets/brand-logo/logo-icon-dark-3.svg",
      name: "Brand 6",
    },
  ];

  return (
    <div className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 flex items-center justify-center relative overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s] xl:px-0 px-5 py-0 h-full border-x border-border">
          {brandList.map((brand, index) => (
            <div
              key={index}
              className="py-4 sm:py-5 px-12 sm:px-14 border-r h-full flex items-center justify-center"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="dark:brightness-0 dark:invert"
                width={135}
                height={32}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default BrandSlider;
