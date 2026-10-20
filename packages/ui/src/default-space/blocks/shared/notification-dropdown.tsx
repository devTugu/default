// @ts-nocheck
"use client";

import { useState, type ReactNode } from "react";
import { Paperclip, Settings, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@default/ui/primitives/popover";
import { cn } from "@default/ui/lib/cn";
import {
  DEMO_GENERAL_NOTIFICATIONS,
  DEMO_INBOX_NOTIFICATIONS,
  type NotificationInboxItem,
} from "./notification-dropdown-items";

type Props = {
  trigger: ReactNode;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
  title?: string;
  badgeLabel?: string;
  inboxLabel?: string;
  generalLabel?: string;
  settingsLabel?: string;
  declineLabel?: string;
  acceptLabel?: string;
  onViewAll?: () => void;
  viewAllLabel?: string;
};

function NotificationRow({
  item,
  declineLabel,
  acceptLabel,
}: {
  item: NotificationInboxItem;
  declineLabel: string;
  acceptLabel: string;
}) {
  const initials = item.name.slice(0, 2).toUpperCase();

  return (
    <div className="border-b border-border px-4 py-3 last:border-b-0">
      <div className="flex gap-3">
        <Avatar className="size-9 shrink-0">
          <AvatarImage src={item.avatarUrl} alt="" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{item.name}</p>
              <p className="text-muted-foreground text-xs">
                {item.time}
                {item.meta ? ` • ${item.meta}` : null}
              </p>
            </div>
            <div className="flex shrink-0 items-start gap-1">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground rounded-md p-0.5"
                aria-label="Dismiss"
              >
                <X className="size-3.5" />
              </button>
              {item.unread ? (
                <span className="bg-foreground mt-1 size-1.5 shrink-0 rounded-full" />
              ) : null}
            </div>
          </div>
          {item.body ? (
            <p className="text-muted-foreground mt-2 text-sm leading-snug">{item.body}</p>
          ) : null}
          {item.showActions ? (
            <div className="mt-3 flex gap-2">
              <Button type="button" variant="secondary" size="sm" className="h-8 flex-1">
                {declineLabel}
              </Button>
              <Button type="button" size="sm" className="h-8 flex-1">
                {acceptLabel}
              </Button>
            </div>
          ) : null}
          {item.attachmentLabel ? (
            <button
              type="button"
              className="text-foreground mt-2 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              <Paperclip className="size-3.5" />
              {item.attachmentLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const NotificationDropdown = ({
  trigger,
  defaultOpen,
  align = "end",
  title = "Notifications",
  badgeLabel = "5 New",
  inboxLabel = "Inbox",
  generalLabel = "General",
  settingsLabel = "Notification settings",
  declineLabel = "Decline",
  acceptLabel = "Accept",
  onViewAll,
  viewAllLabel = "See All Notifications",
}: Props) => {
  const [tab, setTab] = useState<"inbox" | "general">("inbox");
  const items =
    tab === "inbox" ? DEMO_INBOX_NOTIFICATIONS : DEMO_GENERAL_NOTIFICATIONS;

  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={align}
        side="bottom"
        sideOffset={8}
        collisionPadding={16}
        className="w-[min(380px,calc(100vw-2rem))] rounded-xl border bg-popover p-0 shadow-lg"
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {title}
          </p>
          <Badge variant="secondary" className="h-6 rounded-full px-2.5 font-normal">
            {badgeLabel}
          </Badge>
        </div>

        <div className="flex items-center gap-4 border-b border-border px-4 pb-0">
          {(["inbox", "general"] as const).map((key) => {
            const label = key === "inbox" ? inboxLabel : generalLabel;
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cn(
                  "text-sm font-medium pb-2.5 transition-colors",
                  active
                    ? "text-foreground border-foreground border-b-2"
                    : "text-muted-foreground hover:text-foreground border-b-2 border-transparent",
                )}
              >
                {label}
              </button>
            );
          })}
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground ml-auto mb-1"
            aria-label={settingsLabel}
          >
            <Settings className="size-4" />
          </Button>
        </div>

        <div className="max-h-[min(420px,calc(100vh-10rem))] overflow-y-auto overscroll-contain">
          {items.map((item) => (
            <NotificationRow
              key={item.id}
              item={item}
              declineLabel={declineLabel}
              acceptLabel={acceptLabel}
            />
          ))}
        </div>

        {onViewAll ? (
          <div className="border-t border-border p-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={onViewAll}
            >
              {viewAllLabel}
            </Button>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
