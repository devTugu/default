// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Logo from "../../assets/logo/logo";
import { X, ArrowRight, Equal, Globe } from "lucide-react";
import { Button } from "@default/ui/primitives/button";

const TwitterIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.791 2.188 8.46 5.996 5.58 2.188H1.408l4.984 6.518-4.723 5.399H3.69l3.646-4.166 3.187 4.166h4.068l-5.196-6.87 4.417-5.047zm-.71 10.707L3.77 3.335h1.2l7.23 9.56z" fill="currentColor" />
  </svg>
);

const LinkedinIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip-linkedin-navbar10)">
      <path d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="clip-linkedin-navbar10">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

import { Sheet, SheetContent, SheetTitle, SheetClose } from "@default/ui/primitives/sheet";
import { Separator } from "@default/ui/primitives/separator";
import { cn } from "@default/ui/lib/cn";

export type NavLink = {
  name: string;
  href: string;
  isActive?: boolean;
};

export type SocialLink = {
  icon: React.ComponentType<{ className?: string }>;
  url: string;
};

export interface Navbar22Props {
  tagline?: string;
  ctaText?: string;
  navLinks?: NavLink[];
  socialLinks?: SocialLink[];
}

const defaultNavLinks: NavLink[] = [
  { name: "Home", href: "#", isActive: true },
  { name: "About", href: "#" },
  { name: "Services", href: "#" },
  { name: "Projects", href: "#" },
  { name: "Contact", href: "#" },
];

const defaultSocialLinks: SocialLink[] = [
  { icon: TwitterIcon, url: "https://twitter.com" },
  { icon: LinkedinIcon, url: "https://linkedin.com" },
  { icon: Globe, url: "https://example.com" },
];

const MobileNavLink = ({ item }: { item: NavLink }) => (
  <li
    className={cn(
      "group flex items-center transition-all duration-500 ease-in-out w-fit",
      item.isActive ? "gap-3" : "gap-0 hover:gap-3",
    )}
  >
    <div
      className={cn(
        "overflow-hidden transition-all duration-500 ease-in-out flex items-center",
        item.isActive
          ? "max-w-6 opacity-100"
          : "max-w-0 opacity-0 group-hover:max-w-6 group-hover:opacity-100",
      )}
    >
      <div className="h-0.5 bg-foreground w-4" />
    </div>
    <a
      href={item.href}
      className={cn(
        "text-xl sm:text-2xl font-semibold transition-colors duration-300",
        item.isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {item.name}
    </a>
  </li>
);

export default function Navbar22({
  tagline = "A smarter way to build and grow.",
  ctaText = "Start free trial",
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
}: Navbar22Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full py-4 z-50">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isSticky
            ? "bg-muted/80 dark:bg-background/80 backdrop-blur-md rounded-full border border-border shadow-sm px-3 py-2"
            : ""
        )}>

          {/* Left: Logo pill with tagline */}
          <div className="flex items-center gap-3 bg-card border border-border rounded-full pl-3 pr-3 lg:pr-6 py-2 shrink-0">
            <a href="#" className="lg:-me-2">
              <Logo />
            </a>
            <Separator orientation="vertical" className="hidden lg:block h-6 my-auto shrink-0" />
            <p className="hidden lg:block text-xs text-foreground leading-4 whitespace-nowrap">
              {tagline.includes(" to ") ? (
                <>
                  {tagline.split(" to ")[0]} to
                  <br />
                  {tagline.split(" to ")[1]}
                </>
              ) : (
                tagline
              )}
            </p>
          </div>

          {/* Right desktop: CTA + sheet trigger */}
          <div className="hidden lg:flex items-center gap-0.5 bg-foreground rounded-full p-2">
            <Button
              size="sm"
              className="h-auto px-5 py-2.5 flex items-center rounded-full bg-background text-foreground hover:bg-background/80 shadow-xs gap-2 cursor-pointer group"
            >
              <span className="text-sm font-medium">{ctaText}</span>
              <ArrowRight className="size-4 group-hover:-rotate-45 transition-transform duration-300" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSheetOpen(true)}
              className="h-10 w-10 rounded-full text-background hover:bg-background dark:hover:bg-background hover:text-foreground cursor-pointer"
            >
              <Equal className="size-4" />
            </Button>
          </div>

          {/* Right below lg: hamburger opens Sheet */}
          <Button
            size="icon"
            onClick={() => setSheetOpen(true)}
            className="lg:hidden bg-foreground text-background rounded-full size-10 hover:bg-foreground cursor-pointer"
          >
            <Equal className="size-4" />
          </Button>

        </div>
      </div>

      {/* Mobile Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0 border-l-0" showCloseButton={false}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4">
              <p className="text-lg font-medium text-foreground">
                Menu
              </p>
              <SheetClose asChild>
<Button variant="outline" size="icon" className="rounded-full size-10 cursor-pointer" >
<X className="size-4" />
              
</Button>
</SheetClose>
            </div>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <hr className="border-border mx-6" />
            <div className="flex flex-col gap-6 px-6 py-6 flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-2 md:gap-3">
                {navLinks.map((item, i) => (
                  <MobileNavLink key={i} item={item} />
                ))}
              </ul>
              <Button
                size="lg"
                className="lg:hidden rounded-full h-auto px-4 py-2 w-fit bg-foreground text-background hover:bg-foreground/80 gap-2 cursor-pointer group"
              >
                {ctaText}
                <ArrowRight className="size-4 group-hover:-rotate-45 transition-transform duration-300" />
              </Button>
            </div>
            <div className="flex flex-col gap-4 px-6 pb-8">
              <div className="flex items-center gap-3">
                {socialLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:bg-muted border border-border p-2 rounded-full transition-colors"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground">© 2026 default</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

    </header>
  );
}
