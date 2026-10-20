// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo/logo";
import { NavigationLink } from "./index";
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
  navigationMenuTriggerStyle,
} from "@default/ui/primitives/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@default/ui/primitives/sheet";
import { ScrollArea } from "@default/ui/primitives/scroll-area";
import { cn } from "@default/ui/lib/cn";
import { ChevronDown, TextAlignJustify, X } from "lucide-react";

interface NavbarProps {
  navigationLinks: NavigationLink[];
  MegaMenuPanel: React.ComponentType<{
    link: NavigationLink;
    isVisible: boolean;
  }>;
}

const Navbar = ({ navigationLinks, MegaMenuPanel }: NavbarProps) => {
  const [sticky, setSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 50);
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (title: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(title);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <header
      className="bg-background sticky top-0 z-50 transition-all duration-300"
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6 ">
        <nav
          className={cn(
            "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
            sticky
              ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
              : "bg-transparent border-transparent",
          )}
        >
          <a href="#">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList className="gap-0.5">
              {navigationLinks.map((link) => (
                <NavigationMenuItem
                  key={link.title}
                  onMouseEnter={() =>
                    link.hasDropdown && handleMouseEnter(link.title)
                  }
                  onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                >
                  <NavigationMenuLink
                    href={link.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-2 lg:px-4 py-1.5 text-base font-medium text-muted-foreground hover:text-foreground tracking-normal gap-1 bg-transparent",
                      activeDropdown === link.title &&
                      "bg-muted text-foreground",
                    )}
                  >
                    {link.title}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          activeDropdown === link.title && "rotate-180",
                        )}
                      />
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button className="hidden lg:flex h-auto px-5 py-2.5 rounded-lg hover:bg-primary/80 cursor-pointer">
            Contact us
          </Button>

          {/* Mobile Nav */}
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
                    <SheetClose className="absolute top-6 right-4 rounded-lg dark:bg-white bg-black dark:text-black text-white p-2.5 cursor-pointer ">
                      <X size={16} />
                    </SheetClose>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col">
                  {navigationLinks.map((link) =>
                    link.hasDropdown ? (
                      <Collapsible key={link.title} className="w-full">
                        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors group/collapsible">
                          {link.title}
                          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-aria-expanded/collapsible:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="flex flex-col">
                            {link.featureSections?.map((section) =>
                              section.items.map((item) => (
                                <a
                                  key={item.title}
                                  href={item.href || "#"}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="flex items-center justify-center p-2 rounded-md bg-muted group-hover:bg-background transition-colors min-w-8 h-8">
                                    {item.icon && <item.icon size={16} />}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                      {item.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  </div>
                                </a>
                              )),
                            )}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <a
                        key={link.title}
                        href={link.href}
                        className="text-base font-medium text-muted-foreground hover:text-foreground py-2 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </a>
                    ),
                  )}
                </div>
                <Button className="w-full h-auto px-5 py-2.5 rounded-lg hover:bg-primary/80 mt-4 cursor-pointer">
                  Contact us
                </Button>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </nav>
      </div>

      {/* Mega Menu Integration */}
      {navigationLinks
        .filter((l) => l.hasDropdown)
        .map((link) => (
          <div
            key={link.title}
            onMouseEnter={() => handleMouseEnter(link.title)}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenuPanel
              link={link}
              isVisible={activeDropdown === link.title}
            />
          </div>
        ))}
    </header>
  );
};

export default Navbar;
