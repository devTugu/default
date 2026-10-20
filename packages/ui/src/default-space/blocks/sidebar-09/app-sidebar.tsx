// @ts-nocheck
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@default/ui/primitives/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import { Badge } from "@default/ui/primitives/badge";
import { cn } from "@default/ui/lib/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@default/ui/primitives/dropdown-menu";
import { Input } from "@default/ui/primitives/input";
import { Progress } from "@default/ui/primitives/progress";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@default/ui/primitives/collapsible";
import {
  Bell,
  CalendarDays,
  ChartColumn,
  ChevronRight,
  ChevronsUpDown,
  FileText,
  Gift,
  Home,
  Inbox,
  LayoutGrid,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  SquareCheckBig,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ScrollArea } from "@default/ui/primitives/scroll-area";

const mainNav = [
  { title: "Home", icon: Home, isActive: true },
  { title: "Inbox", icon: Inbox, badge: "5" },
  { title: "Calendar", icon: CalendarDays },
  { title: "Tasks", icon: SquareCheckBig },
  { title: "Projects", icon: LayoutGrid },
  { title: "Analytics", icon: ChartColumn },
  { title: "Document", icon: FileText },
  { title: "Trial", icon: Gift, trialBadge: "18 Days left" },
];

const favorites = [
  {
    emoji: "🎨",
    name: "Design Sytem",
    tasks: "8 Open Tasks",
    dot: "bg-blue-500",
  },
  {
    emoji: "📱",
    name: "Mobile App",
    tasks: "14 Open Tasks",
    dot: "bg-orange-400",
  },
  {
    emoji: "🌐",
    name: "Marketing Site",
    tasks: "14 Open Tasks",
    dot: "bg-teal-400",
  },
];

const workspaces = [
  {
    name: "Product",
    count: 9,
    dot: "bg-teal-400",
    children: [
      { name: "API migration", count: 11, isActive: true },
      { name: "Infra & scaling", count: 6 },
      { name: "Bug bash Q3", count: 4 },
    ],
  },
  {
    name: "Engineering",
    count: 21,
    dot: "bg-orange-400",
    defaultOpen: true,
    children: [
      { name: "API migration", count: 11, isActive: true },
      { name: "Infra & scaling", count: 6 },
      { name: "Bug bash Q3", count: 4 },
    ],
  },
  {
    name: "Design",
    count: 7,
    dot: "bg-blue-500",
    children: [
      { name: "API migration", count: 11, isActive: true },
      { name: "Infra & scaling", count: 6 },
      { name: "Bug bash Q3", count: 4 },
    ],
  },
];

const user = {
  name: "Steve Anderson",
  role: "UI/UX Designer",
  avatar: "https://images.shadcnspace.com/assets/profiles/rough.webp",
};

export function AppSidebar() {
  const { open, isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "none"}
      className={cn(
        "shrink-0 overflow-hidden border-r transition-[width] duration-200 ease-linear bg-background sticky top-0 left-0",
        open ? "w-(--sidebar-width)!" : "w-0 border-r-0"
      )}
    >
      <style>{`
        [data-slot="sidebar"][data-mobile="true"] {
          width: var(--sidebar-width) !important;
        }
      `}</style>
      <SidebarHeader className="gap-0 border-b px-4 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    id="sidebar-workspace-switcher"
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent justify-between p-0 hover:bg-transparent"
                  />
                }
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.shadcnspace.com/assets/logo/shadcn-logo.png"
                    alt="default logo"
                    width={32}
                    height={32}
                    className="size-8 rounded-lg dark:hidden"
                  />
                  <img
                    src="https://images.shadcnspace.com/assets/logo/shadcn-white-logo.png"
                    alt="default logo"
                    width={32}
                    height={32}
                    className="hidden size-8 rounded-lg dark:block"
                  />
                  <div className="flex flex-col gap-0 text-left">
                    <span className="text-sidebar-foreground text-sm font-medium">
                      default
                    </span>
                    <span className="text-muted-foreground text-xs">
                      Pro Workspace
                    </span>
                  </div>
                </div>
                <ChevronsUpDown className="text-muted-foreground size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-muted-foreground text-xs">
                    Workspace
                  </DropdownMenuLabel>
                  <DropdownMenuItem className="cursor-pointer gap-2 p-2">
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <img
                        src="https://images.shadcnspace.com/assets/logo/shadcn-logo.png"
                        alt="default logo"
                        width={16}
                        height={16}
                        className="size-4 rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">default</span>
                      <span className="text-muted-foreground text-xs">
                        Pro Workspace
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    id="sidebar-workspace-add-new"
                    className="cursor-pointer gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                      <Plus className="size-4" />
                    </div>
                    <span className="text-muted-foreground font-medium">
                      Add new workspace
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-[calc(100svh-190px)] w-full">
          <div className="flex flex-col gap-3 px-3 pt-4 pb-3">
            <div className="relative">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                id="sidebar-search"
                placeholder="Search or jump to..."
                className="h-9 pl-9 shadow-xs"
              />
            </div>

            <div className="flex flex-col gap-3 rounded-lg bg-blue-500/10 p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-blue-500" />
                <span className="text-sidebar-foreground text-sm font-medium">
                  Ask AI
                </span>
              </div>
              <p className="text-sidebar-foreground text-sm">
                Summarize threads, draft updates, or find anything across your
                workspace.
              </p>
              <button
                id="sidebar-ask-ai-start-chat"
                className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-blue-500"
              >
                Start a chat
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <SidebarGroup className="px-2 py-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {mainNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      id={`sidebar-nav-${item.title.toLowerCase()}`}
                      isActive={item.isActive}
                    >
                      <item.icon />
                      <span className="flex-1 truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="rounded-md">
                          {item.badge}
                        </Badge>
                      )}
                      {item.trialBadge && (
                        <Badge
                          variant="secondary"
                          className="rounded-full bg-blue-500/10 text-blue-500"
                        >
                          {item.trialBadge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="text-muted-foreground px-2 text-sm">
              Favorites
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {favorites.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      id={`sidebar-favorite-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="h-auto py-1"
                    >
                      <div className="border-border flex size-6 shrink-0 items-center justify-center rounded-md border text-xs">
                        {item.emoji}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col text-xs">
                        <span className="text-sidebar-foreground truncate font-medium">
                          {item.name}
                        </span>
                        <span className="text-muted-foreground truncate">
                          {item.tasks}
                        </span>
                      </div>
                      <span
                        className={`size-1.5 shrink-0 rounded-full ${item.dot}`}
                      />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="px-2">
            <SidebarGroupLabel className="text-muted-foreground flex items-center justify-between px-2 text-sm">
              Workspace
              <button
                id="sidebar-workspace-add"
                className="text-muted-foreground hover:text-sidebar-foreground cursor-pointer"
              >
                <Plus className="size-4" />
              </button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {workspaces.map((team) =>
                  team.children.length > 0 ? (
                    <Collapsible key={team.name} defaultOpen={team.defaultOpen}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger
                          render={
                            <SidebarMenuButton
                              id={`sidebar-team-${team.name.toLowerCase()}`}
                              className="group"
                            />
                          }
                        >
                          <ChevronRight className="text-muted-foreground size-4 shrink-0 transition-transform group-aria-expanded:rotate-90" />
                          <span
                            className={`size-1.5 shrink-0 rounded-full ${team.dot}`}
                          />
                          <span className="flex-1 truncate font-medium">
                            {team.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {team.count}
                          </span>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="mx-0 px-0 border-none ">
                            {team.children.map((child) => (
                              <SidebarMenuSubItem key={child.name}>
                                <SidebarMenuSubButton
                                  className="pl-8"
                                  id={`sidebar-team-${team.name.toLowerCase()}-${child.name.toLowerCase().replace(/\s+/g, "-")}`}
                                  isActive={
                                    "isActive" in child ? child.isActive : false
                                  }
                                >
                                  <span className="text-muted-foreground flex-1 truncate">
                                    {child.name}
                                  </span>
                                  <span className="text-muted-foreground text-xs">
                                    {child.count}
                                  </span>
                                  <MoreHorizontal className="text-muted-foreground size-4" />
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={team.name}>
                      <SidebarMenuButton
                        id={`sidebar-team-${team.name.toLowerCase()}`}
                      >
                        <ChevronRight className="text-muted-foreground size-4" />
                        <span
                          className={`size-1.5 shrink-0 rounded-full ${team.dot}`}
                        />
                        <span className="flex-1 font-medium">{team.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {team.count}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="gap-5 border-t px-3 py-4">
        <div className="flex items-center gap-2">
          <Avatar className="size-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col text-xs">
            <span className="text-foreground truncate font-medium">
              {user.name}
            </span>
            <span className="text-muted-foreground truncate">{user.role}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="sidebar-footer-notifications"
              className="text-muted-foreground hover:text-foreground relative cursor-pointer"
            >
              <Bell className="size-4" />
              <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-red-500" />
            </button>
            <button
              id="sidebar-footer-settings"
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Settings className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-foreground font-medium">Storage</span>
            <span className="text-muted-foreground">6.8 / 10 GB</span>
          </div>
          <Progress
            value={68}
            className="*:data-[slot=progress-track]:h-1.5 **:data-[slot=progress-indicator]:bg-blue-500"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
