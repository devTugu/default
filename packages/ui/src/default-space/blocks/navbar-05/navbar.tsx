// @ts-nocheck
"use client";

import { useState, useEffect, useCallback } from "react";
import Logo from "../../assets/logo/logo";
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
  FileText,
  BookOpen,
  Award,
  HelpCircle,
  Users,
  PenLine,
  Code2,
  Video,
  ScrollText,
  Map,
  MessageCircleQuestion,
  Image,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// -- Types --

type NavigationItem = {
  title: string;
  description: string;
  icon: LucideIcon;
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
  { title: "Templates", href: "#" },
  {
    title: "Resources",
    href: "#",
    hasDropdown: true,
    sections: [
      {
        heading: "Learn",
        items: [
          {
            title: "Documentation",
            description: "Everything you need to build",
            icon: FileText,
            href: "#",
          },
          {
            title: "Tutorials",
            description: "Learn by building projects",
            icon: BookOpen,
            href: "#",
          },
          {
            title: "Case Studies",
            description: "See real success stories",
            icon: Award,
            href: "#",
          },
        ],
      },
      {
        heading: "Support",
        columns: 2,
        items: [
          {
            title: "Help Center",
            description: "Answers to common questions",
            icon: HelpCircle,
            href: "#",
          },
          {
            title: "Developer Docs",
            description: "Technical setup instructions",
            icon: Code2,
            href: "#",
          },
          {
            title: "Community",
            description: "Connect with other users",
            icon: Users,
            href: "#",
          },
          {
            title: "Webinars",
            description: "Live learning sessions",
            icon: Video,
            href: "#",
          },
          {
            title: "Blog",
            description: "Insights, updates, and tips",
            icon: PenLine,
            href: "#",
          },
          {
            title: "Release Notes",
            description: "Latest updates and improvements",
            icon: ScrollText,
            href: "#",
          },
        ],
      },
      {
        heading: "Other Resources",
        items: [
          {
            title: "Roadmap",
            description: "See what's coming next",
            icon: Map,
            href: "#",
          },
          {
            title: "FAQ",
            description: "Quick answers to questions",
            icon: MessageCircleQuestion,
            href: "#",
          },
          {
            title: "Media Kit",
            description: "Brand assets and materials",
            icon: Image,
            href: "#",
          },
        ],
      },
    ],
  },
  { title: "Team", href: "#" },
  { title: "About us", href: "#" },
  { title: "Docs", href: "#" },
];

// -- Mega Menu Content --

const ResourcesMegaMenu = () => (
  <NavigationMenuContent className="flex items-center gap-2 p-2 w-6xl!">
    {/* Learn Column */}
    <Card className="grow border rounded-md p-5 ring-0">
      <CardContent className="p-0 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground px-2">Learn</p>
        <Separator />
        <div className="space-y-0.5">
          {navigationLinks[1].sections?.[0].items.map((item) => (
            <NavigationMenuLink
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted dark:hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center justify-center p-3 rounded-lg border">
                <item.icon size={16} className="text-foreground" />
              </div>
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
        <p className="text-sm text-muted-foreground px-2">Support</p>
        <Separator />
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
          {navigationLinks[1].sections?.[1].items.map((item) => (
            <NavigationMenuLink
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted dark:hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center justify-center p-3 rounded-lg border">
                <item.icon size={16} className="text-foreground" />
              </div>
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

    {/* Other Resources Column */}
    <Card className="grow border rounded-md p-5 bg-muted dark:bg-muted/40 ring-0">
      <CardContent className="p-0 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground px-2">Other Resources</p>
        <Separator />
        <div className="space-y-0.5">
          {navigationLinks[1].sections?.[2].items.map((item) => (
            <NavigationMenuLink
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg p-2 hover:bg-background transition-colors group"
            >
              <div className="flex items-center justify-center p-3 rounded-lg border">
                <item.icon size={16} className="text-foreground" />
              </div>
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
            "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
            sticky
              ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
              : "bg-transparent border-transparent",
          )}
        >
          {/* Logo */}
          <a href="#">
            <Logo />
          </a>

          {/* Desktop Navigation */}
          <NavigationMenu
            align="center"
            className="max-lg:hidden bg-muted p-0.5 rounded-full"
          >
            <NavigationMenuList className="gap-1">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.title}>
                  {link.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger className="px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-background hover:bg-foreground outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal bg-transparent dark:bg-transparent data-popup-open:bg-foreground! data-popup-open:text-background! data-popup-open:hover:bg-foreground! data-popup-open:hover:text-background! data-popup-open:outline-border data-popup-open:shadow-xs cursor-pointer h-auto">
                        {link.title}
                      </NavigationMenuTrigger>
                      <ResourcesMegaMenu />
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={link.href}
                      className="px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-background hover:bg-foreground outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal"
                    >
                      {link.title}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <Button className="hidden lg:flex h-auto px-5 py-2.5 rounded-full hover:bg-primary/80 cursor-pointer">
            Contact us
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border border-border p-2 outline-none flex items-center justify-center cursor-pointer hover:bg-muted transition-colors h-10 w-10 lg:hidden text-muted-foreground"
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
                    <Logo />
                    <SheetClose className="absolute top-6 right-4 rounded-full border dark:text-white text-black p-2.5 cursor-pointer ">
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
                                className={cn(
                                  "border rounded-2xl p-4 ring-0",
                                  section.heading === "Other Resources" &&
                                  "bg-muted dark:bg-muted/40",
                                )}
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
                                        className={cn("flex items-center gap-3 p-2 rounded-lg hover:bg-muted dark:hover:bg-muted/40 transition-colors group", section.heading === "Other Resources" && "hover:bg-background dark:hover:bg-background/40")}
                                        onClick={() => setIsOpen(false)}
                                      >
                                        <div className="flex items-center justify-center p-3 rounded-lg border">
                                          <item.icon
                                            size={16}
                                            className="text-foreground"
                                          />
                                        </div>
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
                <Button className="w-full h-10 px-5 py-2.5 rounded-full hover:bg-primary/80 mt-4 cursor-pointer">
                  Contact us
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
