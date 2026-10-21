import type { ReactNode } from "react";
import Navbar from "./navbar";
import type { NavigationSection } from "./navbar";

export type { NavigationSection };
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
  navActions?: ReactNode;
  navigationData?: NavigationSection[];
  getStartedLabel?: string;
  bookDemoLabel?: string;
  bookDemoHref?: string;
  menuLabel?: string;
};

const HeroPage = ({
  getStartedHref = "#",
  homeHref = "/",
  logo,
  navActions,
  navigationData: navigationDataProp,
  getStartedLabel,
  bookDemoLabel,
  bookDemoHref = "#",
  menuLabel,
}: Hero16PageProps) => {
  const navItems = navigationDataProp ?? navigationData;
  return (
    <div>
        <Navbar
          navigationData={navItems}
          getStartedHref={getStartedHref}
          homeHref={homeHref}
          logo={logo}
          navActions={navActions}
          getStartedLabel={getStartedLabel}
          bookDemoLabel={bookDemoLabel}
          bookDemoHref={bookDemoHref}
          menuLabel={menuLabel}
        />
        <HeroSection getStartedHref={getStartedHref} />
        <BrandSlider/>
    </div>
  )
}

export default HeroPage