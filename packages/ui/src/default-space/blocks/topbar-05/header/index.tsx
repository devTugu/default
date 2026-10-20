// @ts-nocheck
"use client";

import { Button } from "@default/ui/primitives/button";
import { Separator } from "@default/ui/primitives/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import { SidebarTrigger } from "@default/ui/primitives/sidebar";
import { BellRing, Globe } from "lucide-react";
import { NavigationMenu, NavigationMenuList } from "@default/ui/primitives/navigation-menu";
import LanguageDropdown from "../../shared/dropdown-language";
import ProfileDropdown from "../../shared/dropdown-profile";
import { NavDropdown, NavButton } from "./desktop-nav";
import NavData from "../data";
import { NavGroup } from "../types";
import NotificationDropdown from "../../shared/notification-dropdown";

export default function Header() {
  return (
    <header className="bg-card sticky top-0 z-50 border-b">
      <div className="mx-auto flex items-center justify-between gap-6 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="[&_svg]:size-5! cursor-pointer" />
          <Separator
            orientation="vertical"
            className="hidden h-4! sm:block self-center!"
          />
          <div className="hidden lg:flex items-center justify-between">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="flex gap-1">
                {(NavData as NavGroup[]).map((item) => {
                  if (item.type === "dropdown" && item.items) {
                    return (
                      <NavDropdown
                        key={item.label}
                        label={item.label}
                        Icon={item.icon}
                        items={item.items}
                      />
                    );
                  }
                  return (
                    <NavButton
                      key={item.label}
                      label={item.label}
                      Icon={item.icon}
                      href={item.href}
                    />
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
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
                id="language-dropdown-trigger-05"
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
                id="profile-dropdown-trigger-05"
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
    </header>
  );
}
