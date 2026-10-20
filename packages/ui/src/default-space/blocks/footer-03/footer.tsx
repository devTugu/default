// @ts-nocheck
import Logo from "../../assets/logo/logo";
import { Separator } from "@default/ui/primitives/separator";
import { ArrowRight } from "lucide-react";
import { Input } from "@default/ui/primitives/input";
import { Button } from "@default/ui/primitives/button";
import SubFooter from "./subfooter";

type FooterData = {
  links: {
    title: string;
    href: string;
  }[];
};

const footerSections: FooterData[] = [
  {
    links: [
      {
        title: "Landing page",
        href: "#",
      },
      {
        title: "Website",
        href: "#",
      },
      {
        title: "E-commerce",
        href: "#",
      },
      {
        title: "Portfolio",
        href: "#",
      },
      {
        title: "Personal",
        href: "#",
      },
      {
        title: "SaaS",
        href: "#",
      },
    ],
  },
  {
    links: [
      {
        title: "Startup",
        href: "#",
      },
      {
        title: "Business",
        href: "#",
      },
      {
        title: "Corporate",
        href: "#",
      },
      {
        title: "Agency",
        href: "#",
      },
      {
        title: "Real estate",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="lg:pt-20 sm:pt-16 pt-8">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto ">
        <div className="relative z-10 flex flex-col gap-6 sm:gap-12">
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
            {/* Logo */}
            <a href="#">
              <Logo />
            </a>
          </div>
          <Separator orientation="horizontal" />
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 lg:gap-x-8 gap-y-10">
            <div className="col-span-full lg:col-span-5">
              <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                <h3 className="text-2xl font-medium text-foreground">
                  Unlock what’s hidden ✨
                </h3>
                <p className="text-base text-muted-foreground">
                  Get early access to exclusive programs, workshops, and events.
                  Stay updated with industry news and reports.
                </p>
                <form className="flex items-center gap-3 pt-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="py-2 px-4 rounded-full text-sm h-9 shadow-xs"
                  />
                  <Button
                    type="submit"
                    className="rounded-full py-2 px-4 h-auto text-sm font-medium cursor-pointer"
                  >
                    Subscribe
                    <ArrowRight width={16} height={16} />
                  </Button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-3 lg:block hidden"></div>
            <div className="lg:col-span-4 col-span-12 grid grid-cols-2 gap-6 gap-y-10">
              {footerSections.map(({ links }, index) => (
                <div key={index}>
                  <ul className="flex flex-col gap-3">
                    {links.map(({ title, href }) => (
                      <li key={title}>
                        <a
                          href={href}
                          className="text-base font-normal text-foreground hover:opacity-80 duration-200"
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex items-center justify-between md:flex-nowrap flex-wrap gap-6">
            <p className="text-base font-normal text-muted-foreground">
              ©2026 default. All Rights Reserved.
            </p>
            <div className="flex sm:items-center items-start sm:flex-row flex-col gap-3">
              <a
                href="#"
                className="text-muted-foreground text-base font-normal hover:text-primary duration-200"
              >
                Terms & Conditions
              </a>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50 sm:block hidden" />
              <a
                href="#"
                className="text-muted-foreground text-base font-normal hover:text-primary duration-200"
              >
                Privacy policy
              </a>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50 sm:block hidden" />
              <a
                href="#"
                className="text-muted-foreground text-base font-normal hover:text-primary duration-200"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
      <SubFooter />
    </footer>
  );
};

export default Footer;
