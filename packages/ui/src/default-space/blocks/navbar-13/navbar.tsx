// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Play, Search, X } from "lucide-react";
import { motion } from "motion/react";
import Logo from "../../assets/logo/logo";
import { Button } from "@default/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@default/ui/primitives/sheet";
import { cn } from "@default/ui/lib/cn";

export type NavigationItem = {
  title: string;
  href: string;
  isActive?: boolean;
};

const navigationData: NavigationItem[] = [
  { title: "Home", href: "#", isActive: true },
  { title: "Music", href: "#" },
  { title: "Tour", href: "#" },
  { title: "Gallery", href: "#" },
  { title: "About", href: "#" },
];

export interface Hero44NavbarProps {
  cta?: { label: string; href: string };
}

const Navbar = ({
  cta = { label: "Listen Now", href: "#" },
}: Hero44NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navListRef = useRef<HTMLDivElement>(null);
  const [hoverDot, setHoverDot] = useState({ left: 0, opacity: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wasVisibleRef = useRef(false);

  const handleLinkHover = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const container = navListRef.current;
    if (!container) return;
    const linkRect = event.currentTarget.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    setHoverDot({
      left: linkRect.left - containerRect.left + linkRect.width / 2,
      opacity: 1,
    });
  };

  const handleLinkLeave = () =>
    setHoverDot((state) => ({ ...state, opacity: 0 }));

  const dotTransition = wasVisibleRef.current
    ? { left: { type: "spring" as const, stiffness: 500, damping: 50 } }
    : { left: { duration: 0 } };
  wasVisibleRef.current = hoverDot.opacity === 1;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-300",
        isScrolled
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" className="transition-opacity hover:opacity-80">
          <Logo />
        </a>

        <nav
          ref={navListRef}
          aria-label="Main"
          onMouseLeave={handleLinkLeave}
          className="relative hidden items-center gap-8 lg:flex"
        >
          {navigationData.map((item) => (
            <a
              key={item.title}
              href={item.href}
              aria-current={item.isActive ? "page" : undefined}
              onMouseEnter={item.isActive ? handleLinkLeave : handleLinkHover}
              className={cn(
                "relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                item.isActive && "text-foreground",
              )}
            >
              {item.title}
              {item.isActive && (
                <span className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-orange-400" />
              )}
            </a>
          ))}

          <motion.span
            aria-hidden
            className="pointer-events-none absolute -bottom-0.5 size-1 -translate-x-1/2 rounded-full bg-orange-400"
            animate={{ left: hoverDot.left, opacity: hoverDot.opacity }}
            transition={{ opacity: { duration: 0.15 }, ...dotTransition }}
          />
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            aria-label="Search"
            className="hidden lg:inline-flex size-10 cursor-pointer rounded-full"
          >
            <Search className="size-4" />
          </Button>

          <Button
            nativeButton={false}
            render={<a href={cta.href} />}
            className="group relative hidden h-11 w-fit cursor-pointer overflow-hidden rounded-full bg-foreground p-1 ps-5 pe-13 text-sm font-medium text-background transition-all duration-500 hover:pe-5 hover:ps-13 lg:inline-flex"
          >
            <span className="relative z-10 transition-all duration-500">
              {cta.label}
            </span>
            <span className="absolute right-1 flex size-9 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-40px)]">
              <Play className="size-3 fill-current" />
            </span>
          </Button>

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Open menu"
                    className="size-10 cursor-pointer rounded-full"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="flex flex-col gap-6 overflow-auto border-l border-border bg-background p-5"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <SheetHeader className="flex-row items-center justify-between p-0">
                  <SheetClose
                    nativeButton={false}
                    render={
                      <a href="#" className="shrink-0">
                        <Logo />
                      </a>
                    }
                  />
                  <SheetClose
                    aria-label="Close menu"
                    className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                  >
                    <X className="size-4" />
                  </SheetClose>
                </SheetHeader>

                <div className="flex flex-col gap-1">
                  {navigationData.map((item) => (
                    <SheetClose
                      key={item.title}
                      nativeButton={false}
                      render={
                        <a
                          href={item.href}
                          aria-current={item.isActive ? "page" : undefined}
                          className={cn(
                            "group flex items-center rounded-lg px-3 py-2 text-base transition-colors hover:text-foreground",
                            item.isActive
                              ? "gap-2 text-foreground"
                              : "gap-0 text-foreground/80 hover:gap-2",
                          )}
                        >
                          <span
                            className={cn(
                              "shrink-0 overflow-hidden rounded-full bg-orange-400 transition-all duration-300",
                              item.isActive
                                ? "size-1.5 opacity-100"
                                : "size-0 opacity-0 group-hover:size-1.5 group-hover:opacity-100",
                            )}
                          />
                          {item.title}
                        </a>
                      }
                    />
                  ))}
                </div>

                <a
                  href={cta.href}
                  className="group relative mt-auto flex h-11 w-full items-center overflow-hidden rounded-full bg-foreground p-1 ps-5 pe-13 text-sm font-medium text-background transition-all duration-500 hover:pe-5 hover:ps-13"
                >
                  <span className="relative z-10 transition-all duration-500">
                    {cta.label}
                  </span>
                  <span className="absolute right-1 flex size-9 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-40px)]">
                    <Play className="size-3 fill-current" />
                  </span>
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
