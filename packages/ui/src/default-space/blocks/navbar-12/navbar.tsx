// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Logo from "../../assets/logo/logo";
import { Equal, Search, Heart, User, ShoppingCart } from "lucide-react";
import { cn } from "@default/ui/lib/cn";
import { Button } from "@default/ui/primitives/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@default/ui/primitives/navigation-menu";
import { MegaMenuPanel } from "./mega-menu-panel";
import { MobileNavSheet } from "./mobile-nav-sheet";
import { defaultNavLinks, type NavLink } from "./navbar-12-data";

export type {
  MegaMenuLink,
  MegaMenuColumn,
  FeaturedProduct,
  ServiceItem,
  MegaMenuSide,
  MegaMenuFooter,
  MegaMenuBackgroundImage,
  MegaMenu,
  NavLink,
} from "./navbar-12-data";

export interface Navbar24Props {
  navLinks?: NavLink[];
  wishlistCount?: number;
  cartCount?: number;
}

export default function Navbar24({
  navLinks = defaultNavLinks,
  wishlistCount = 0,
  cartCount = 0,
}: Navbar24Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>("Furniture");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mql.matches) {
        setSheetOpen(false);
      } else {
        setActiveMenu(null);
      }
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const iconButtons = [
    { icon: Search, label: "Search" },
    { icon: Heart, label: "Wishlist", count: wishlistCount },
    { icon: User, label: "Account" },
    { icon: ShoppingCart, label: "Cart", count: cartCount },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 left-0 w-full z-50 bg-background transition-shadow duration-300",
        isScrolled ? "shadow-sm" : "",
      )}
    >
      {/* Top row: logo + icons */}
      <div className="border-b border-border">
        <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
          <div className="flex items-center justify-between py-4">
            <a href="#" className="shrink-0">
              <Logo
                viewBox="0 0 40 40"
                width={40}
                height={40}
                className="sm:hidden"
              />
              <Logo className="hidden sm:block" />
            </a>

            <div className="flex items-center gap-1">
              {iconButtons.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="relative flex items-center justify-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <item.icon className="size-4.5" />
                  {typeof item.count === "number" && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center size-4 rounded-full bg-foreground text-background text-[10px] font-medium leading-none">
                      {item.count}
                    </span>
                  )}
                </a>
              ))}

              <Button
                size="icon"
                onClick={() => setSheetOpen(true)}
                className="lg:hidden ml-1 rounded-lg size-9 bg-foreground text-background hover:bg-foreground/80 cursor-pointer"
              >
                <Equal className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: horizontal nav links with mega menu */}
      <div className="hidden lg:block border-b border-border bg-background">
        <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
          <NavigationMenu
            className="max-w-none justify-start"
            value={activeMenu}
            onValueChange={setActiveMenu}
          >
            <NavigationMenuList className="justify-start gap-1 py-1">
              {navLinks.map((link) =>
                link.megaMenu ? (
                  <NavigationMenuItem key={link.name} value={link.name}>
                    <NavigationMenuTrigger className="bg-transparent! rounded-lg px-3 py-2 text-sm font-medium cursor-pointer text-muted-foreground hover:text-foreground data-popup-open:text-foreground data-open:text-foreground">
                      {link.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-0">
                      <MegaMenuPanel menu={link.megaMenu} />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      render={
                        <a
                          href={link.href}
                          className="p-0! rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {link.name}
                        </a>
                      }
                    />
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <MobileNavSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        navLinks={navLinks}
      />
    </header>
  );
}
