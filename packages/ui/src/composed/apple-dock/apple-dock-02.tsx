// @ts-nocheck
"use client";

import { useState } from "react";
import {
  Bell,
  Compass,
  Folder,
  Inbox,
  Search,
  Settings,
} from "lucide-react";
import { cn } from "@default/ui/lib/cn";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import { AppleDock, AppleDockIcon } from "./apple-dock-01";

const NOTIFICATIONS = [
  { title: "New comment on your post", time: "2m ago" },
  { title: "Your export is ready to download", time: "1h ago" },
  { title: "Team member joined your workspace", time: "3h ago" },
];

export default function AppleDockWithPanelDemo() {
  const [panelOpen, setPanelOpen] = useState(true);

  const dockIcons = [
    { Icon: Folder, bg: "bg-blue-500/10", text: "text-blue-500", label: "Folder" },
    { Icon: Search, bg: "bg-orange-400/10", text: "text-orange-400", label: "Search" },
    { Icon: Inbox, bg: "bg-teal-400/10", text: "text-teal-400", label: "Inbox" },
    { Icon: Bell, bg: "bg-red-500/10", text: "text-red-500", label: "Notifications", panel: true },
    { Icon: Settings, bg: "bg-amber-300/10", text: "text-amber-300", label: "Settings" },
    { Icon: Compass, bg: "bg-sky-400/10", text: "text-sky-400", label: "Compass" },
  ];

  return (
    <div className="flex min-h-[280px] w-full items-end justify-center pb-4">
      <div className="relative flex flex-col items-center gap-4">
        {panelOpen ? (
          <div className="w-[min(100%,320px)] rounded-xl border border-border bg-card p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">Notifications</p>
              <Badge variant="secondary">2</Badge>
            </div>
            <ul className="space-y-3">
              {NOTIFICATIONS.map((item) => (
                <li key={item.title} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="ghost" size="sm" className="w-full">
                Mark all as read
              </Button>
              <Button variant="link" size="sm" className="h-auto p-0">
                View all notifications
              </Button>
            </div>
          </div>
        ) : null}

        <AppleDock iconMagnification={60} iconDistance={140}>
          {dockIcons.map(({ Icon, bg, text, label, panel }) => (
            <AppleDockIcon
              key={label}
              className={cn(bg, text, panel && panelOpen && "ring-2 ring-primary/30")}
              aria-label={label}
              aria-expanded={panel ? panelOpen : undefined}
              onClick={panel ? () => setPanelOpen((open) => !open) : undefined}
            >
              <Icon className="size-6" />
            </AppleDockIcon>
          ))}
        </AppleDock>
      </div>
    </div>
  );
}
