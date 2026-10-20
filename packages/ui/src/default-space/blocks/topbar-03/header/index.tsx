// @ts-nocheck
"use client";

import { TopbarLogo } from "../../shared/topbar-logo";
import { useEffect, useState } from "react";
import { Button } from "@default/ui/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@default/ui/primitives/sheet";
import { BellRing, Globe, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@default/ui/primitives/navigation-menu";
import NotificationDropdown from "../../shared/notification-dropdown";
import LanguageDropdown from "../../shared/dropdown-language";
import ProfileDropdown from "../../shared/dropdown-profile";
import Sidebar from "./sidebar";
import { NavDropdown, NavButton } from "./desktop-nav";
import NavData from "../data";
import { NavGroup } from "../types";

export default function Header() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const BREAKPOINT = 1024;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= BREAKPOINT) {
        setSheetOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      {/* TOP BAR */}
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              id="mobile-sidebar-trigger-03"
              className="lg:hidden"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Menu size={20} />
                </Button>
              }
            />

            <SheetContent side="left" className="overflow-auto w-75!">
              <SheetTitle className="sr-only">customizer</SheetTitle>
              <TopbarLogo />
              <Sidebar onLinkClick={() => setSheetOpen(false)} />
            </SheetContent>
          </Sheet>

          <TopbarLogo />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <NotificationDropdown
            defaultOpen={false}
            align="center"
            trigger={
              <div className="rounded-full p-2 hover:bg-accent relative before:absolute before:bottom-0 before:left-1/2 before:z-10 before:w-2 before:h-2 before:rounded-full before:bg-red-500 before:top-1">
                <BellRing className="size-4" />
              </div>
            }
          />
          <LanguageDropdown
            trigger={
              <Button
                id="language-dropdown-trigger-03"
                variant="ghost"
                size="icon"
                className="focus-visible:ring-0! focus-visible:shadow-none! rounded-full! hover:bg-accent/80! cursor-pointer"
                suppressHydrationWarning
              >
                <Globe size={16} />
              </Button>
            }
          />
          <ProfileDropdown
            trigger={
              <Button
                id="profile-dropdown-trigger-03"
                variant="ghost"
                size="icon"
                className="size-7 rounded-full cursor-pointer"
                suppressHydrationWarning
              >
                <Avatar className="size-7 rounded-full">
                  <AvatarImage src="https://images.shadcnspace.com/assets/profiles/user-11.jpg" />
                  <AvatarFallback>NJ</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
        </div>
      </div>

      <div className="h-px w-full bg-border" />

      {/* NAVIGATION BAR */}
      <div className="hidden lg:flex w-full items-center justify-between px-4 py-2 max-w-7xl mx-auto">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex gap-1">
            {(NavData as NavGroup[]).map((item) => {
              if (item.type === "dropdown" && item.items) {
                return (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    items={item.items}
                  />
                );
              }
              return (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    render={<NavButton label={item.label} icon={item.icon} />}
                  />
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <Button className="cursor-pointer hover:bg-primary/80">Login</Button>
      </div>
    </header>
  );
}
