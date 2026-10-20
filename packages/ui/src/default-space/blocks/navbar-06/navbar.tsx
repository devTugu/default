// @ts-nocheck
"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@default/ui/primitives/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@default/ui/primitives/collapsible";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@default/ui/primitives/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@default/ui/primitives/sheet";
import { Separator } from "@default/ui/primitives/separator";
import { ScrollArea } from "@default/ui/primitives/scroll-area";
import { Card, CardContent } from "@default/ui/primitives/card";
import { cn } from "@default/ui/lib/cn";
import {
  ChevronDown,
  TextAlignJustify,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// -- Types --

type NavigationItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
  href: string;
};

type FeatureSection = {
  heading: string;
  items: NavigationItem[];
  columns?: number;
};

type NavigationLink = {
  title: string;
  href: string;
  hasDropdown?: boolean;
  sections?: FeatureSection[];
};

// -- Data --

const navigationLinks: NavigationLink[] = [
  { title: "About us", href: "#" },
  {
    title: "Resources",
    href: "#",
    hasDropdown: true,
    sections: [
      {
        heading: "Content",
        items: [
          {
            title: "Custom Branding",
            description: "Match the platform to your brand",
            href: "#",
          },
          {
            title: "Role-Based Access",
            description: "Assign permissions by role",
            href: "#",
          },
        ],
      },
      {
        heading: "Other Resources",
        columns: 2,
        items: [
          {
            title: "Data Export",
            description: "Download and share reports",
            href: "#",
          },
          {
            title: "Task Management",
            description: "Organize and track tasks",
            href: "#",
          },
          {
            title: "API Access",
            description: "Connect with external systems",
            href: "#",
          },
          {
            title: "System Alerts",
            description: "Get notified of updates",
            href: "#",
          },
        ],
      },
    ],
  },
  { title: "Pricing", href: "#" },
  { title: "Blog", href: "#" },
];

// -- case study card --

const CaseStudy = () => {
  return (
    <>
      <a
        href="#"
        className="group relative flex lg:w-65.5 min-h-47.5 flex-col justify-start overflow-hidden rounded-2xl lg:rounded-lg bg-muted p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 bg-[url('https://images.shadcnspace.com/assets/backgrounds/navbar-changelog-bg.webp')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-sm font-medium text-white">
            Case Studies
            <ArrowRight
              size={14}
              className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </div>
          <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
            See real success stories
          </p>
        </div>
      </a>
    </>
  );
};

// -- Mega Menu Content --

const ResourcesMegaMenu = () => (
  <NavigationMenuContent className="flex items-stretch gap-2 p-2 md:w-4xl! xl:w-6xl!">
    {/* Learn Column */}
    <Card className="grow border rounded-md p-5 ring-0">
      <CardContent className="p-0 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground px-2">Content</p>
        <Separator />
        <div className="space-y-0.5">
          {navigationLinks[1].sections?.[0].items.map((item) => (
            <NavigationMenuLink
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted dark:hover:bg-muted/40 transition-colors group"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium flex items-center gap-1 text-card-foreground">
                  {item.title}
                  <ArrowRight
                    size={12}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 size-3"
                  />
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Support Column */}
    <Card className="grow border rounded-md p-5 ring-0">
      <CardContent className="p-0 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground px-2">Other Resources</p>
        <Separator />
        <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
          {navigationLinks[1].sections?.[1].items.map((item) => (
            <NavigationMenuLink
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted dark:hover:bg-muted/40 transition-colors group"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium flex items-center gap-1 text-card-foreground">
                  {item.title}
                  <ArrowRight
                    size={12}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 size-3"
                  />
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.description}
                </span>
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Case Studies Link */}
    <CaseStudy />
  </NavigationMenuContent>
);

// -- Navbar Component --

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => setSticky(window.scrollY >= 50), []);
  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) setIsOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <header className="bg-background sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6">
        <nav
          className={cn(
            "h-fit w-full lg:w-fit mx-auto border rounded-full px-1.5 lg:px-2 py-1 flex items-center justify-between lg:justify-center gap-3.5 lg:gap-16 transition-all duration-500",
            sticky
              ? "bg-background/60 backdrop-blur-lg shadow-2xl shadow-primary/5"
              : "bg-transparent",
          )}
        >
          {/* Logo */}
          <a href="#">
            <img
              src="https://images.shadcnspace.com/assets/logo/shadcn-logo.png"
              alt="default dark logo"
              width={32}
              height={32}
              className="dark:hidden"
            />
            <img
              src="https://images.shadcnspace.com/assets/logo/shadcn-white-logo.png"
              alt="default white logo"
              width={32}
              height={32}
              className="hidden dark:block"
            />
          </a>

          {/* Desktop Navigation */}
          <NavigationMenu
            align="center"
            className="max-lg:hidden p-0.5 rounded-full"
          >
            <NavigationMenuList className="gap-1">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  {link.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-muted hover:shadow-xs transition tracking-normal bg-transparent dark:bg-transparent data-popup-open:bg-muted! data-popup-open:text-foreground! data-popup-open:hover:bg-muted! data-popup-open:hover:text-foreground! data-popup-open:shadow-xs cursor-pointer h-8">
                        {link.title}
                      </NavigationMenuTrigger>
                      <ResourcesMegaMenu />
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={link.href}
                      className="px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-muted hover:shadow-xs transition tracking-normal h-8"
                    >
                      {link.title}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <Button className="hidden lg:flex h-8 px-3 py-1.5 rounded-full hover:bg-primary/80 cursor-pointer">
            Sign In
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border border-border p-2 outline-none flex items-center justify-center cursor-pointer hover:bg-muted transition-colors h-9 w-9 lg:hidden text-muted-foreground"
                />
              }
            >
              <TextAlignJustify size={20} />
            </SheetTrigger>
            <SheetContent
              showCloseButton={false}
              side="right"
              className="min-w-80 p-0"
            >
              <ScrollArea className="h-full px-6 py-6">
                <SheetHeader className="mb-4 p-0">
                  <SheetTitle className="text-left flex items-center justify-between">
                    {/* logo */}
                    <>
                      <img
                        src="https://images.shadcnspace.com/assets/logo/shadcn-logo.png"
                        alt="default dark logo"
                        width={32}
                        height={32}
                        className="dark:hidden"
                      />
                      <img
                        src="https://images.shadcnspace.com/assets/logo/shadcn-white-logo.png"
                        alt="default white logo"
                        width={32}
                        height={32}
                        className="hidden dark:block"
                      />
                    </>
                    <SheetClose className="absolute top-5 right-4 rounded-full border dark:text-white text-black p-2.5 cursor-pointer ">
                      <X size={16} />
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2">
                  {navigationLinks.map((link) =>
                    link.hasDropdown ? (
                      <Collapsible key={link.title} className="w-full">
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted aria-expanded:bg-muted aria-expanded:text-foreground rounded-lg transition-colors group/collapsible cursor-pointer">
                          {link.title}
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-aria-expanded/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="flex flex-col gap-2 mt-4 p-2 border rounded-3xl">
                            {link.sections?.map((section) => (
                              <Card
                                key={section.heading}
                                className="border rounded-2xl p-4 ring-0"
                              >
                                <CardContent className="p-0 flex flex-col gap-4">
                                  <p className="text-sm text-muted-foreground px-2">
                                    {section.heading}
                                  </p>
                                  <Separator />
                                  <div className="flex flex-col gap-0.5">
                                    {section.items.map((item) => (
                                      <a
                                        key={item.title}
                                        href={item.href}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted dark:hover:bg-muted/40 transition-colors group"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        <div className="flex flex-col gap-0.5">
                                          <span className="text-sm font-medium flex items-center gap-1 text-card-foreground">
                                            {item.title}
                                            <ArrowRight
                                              size={12}
                                              className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 size-3"
                                            />
                                          </span>
                                          <span className="text-xs text-muted-foreground">
                                            {item.description}
                                          </span>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                            {/* Case Studies Link */}
                            <CaseStudy />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <a
                        key={link.title}
                        href={link.href}
                        className="text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2 rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </a>
                    ),
                  )}
                </div>
                <Button className="w-full mt-3 h-8 px-3 py-1.5 rounded-full hover:bg-primary/80 cursor-pointer">
                  Sign In
                </Button>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
