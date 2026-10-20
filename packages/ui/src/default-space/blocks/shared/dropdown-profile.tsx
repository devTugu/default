// @ts-nocheck
"use client";

import type { ReactElement } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@default/ui/primitives/dropdown-menu";
import {
  Bookmark,
  LogOut,
  LucideIcon,
  ReceiptText,
  Settings,
  User,
} from "lucide-react";

export type ProfileDropdownUser = {
  displayName?: string;
  email: string;
  avatarUrl?: string | null;
  fallbackInitials?: string;
};

type Props = {
  trigger: ReactElement;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
  user?: ProfileDropdownUser;
  onSignOut?: () => void;
  signOutPending?: boolean;
};

type MenuItem = {
  label: string;
  icon: LucideIcon;
  destructive?: boolean;
};

const PROFILE_ITEMS: MenuItem[] = [
  { label: "My Profile", icon: User },
  { label: "My Subscription", icon: Bookmark },
  { label: "My Invoice", icon: ReceiptText },
];

const SETTINGS_ITEMS: MenuItem[] = [
  { label: "Account Settings", icon: Settings },
];

const LOGOUT_ITEM: MenuItem = {
  label: "Signout",
  icon: LogOut,
  destructive: true,
};

const itemClass = "px-4 py-2.5 text-base cursor-pointer gap-3";

const ProfileDropdown = ({
  trigger,
  defaultOpen,
  align = "end",
  user,
  onSignOut,
  signOutPending = false,
}: Props) => {
  const isAdmin = Boolean(user);
  const displayName = user?.displayName ?? user?.email ?? "David McMichael";
  const email = user?.email ?? "david.mcmichael@example.com";
  const initials =
    user?.fallbackInitials ??
    displayName.slice(0, 2).toUpperCase();

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-80" align={align}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-4 px-4 py-2.5 font-normal">
            <div className="relative">
              <Avatar className="size-10">
                {user?.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={displayName} />
                ) : null}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="ring-card absolute right-0 bottom-0 size-2 rounded-full bg-green-600 ring-2" />
            </div>

            <div className="flex flex-col">
              <span className="text-foreground text-lg font-semibold">
                {displayName}
              </span>
              <span className="text-muted-foreground text-sm">{email}</span>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {!isAdmin ? (
            <>
              {PROFILE_ITEMS.map(({ label, icon: Icon }) => (
                <DropdownMenuItem key={label} className={itemClass}>
                  <Icon size={20} className="text-foreground" />
                  <span>{label}</span>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {SETTINGS_ITEMS.map(({ label, icon: Icon }) => (
                  <DropdownMenuItem key={label} className={itemClass}>
                    <Icon size={20} className="text-foreground" />
                    <span>{label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
            </>
          ) : null}

          <DropdownMenuItem
            variant="destructive"
            className={itemClass}
            disabled={signOutPending}
            onClick={isAdmin ? onSignOut : undefined}
          >
            <LOGOUT_ITEM.icon size={20} />
            <span>{LOGOUT_ITEM.label}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
