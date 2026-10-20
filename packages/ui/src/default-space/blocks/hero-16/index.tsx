import type { ReactNode } from "react";
import Navbar from "./navbar";
import type { NavigationSection } from "./navbar";
import HeroSection from "./hero";
import BrandSlider from "./brand-slider";

const navigationData: NavigationSection[] = [
  {
    name: "Integration",
    href: "#",
  },
  {
    name: "Features",
    href: "#",
    isActive: true, 
  },
  {
    name: "Support",
    href: "#",
  },
  {
    name: "Docs",
    href: "#",
  }
];


export type Hero16PageProps = {
  getStartedHref?: string;
  homeHref?: string;
  logo?: ReactNode;
};

const HeroPage = ({
  getStartedHref = "#",
  homeHref = "/",
  logo,
}: Hero16PageProps) => {
  return (
    <div>
        <Navbar
          navigationData={navigationData}
          getStartedHref={getStartedHref}
          homeHref={homeHref}
          logo={logo}
        />
        <HeroSection getStartedHref={getStartedHref} />
        <BrandSlider/>
    </div>
  )
}

export default HeroPage