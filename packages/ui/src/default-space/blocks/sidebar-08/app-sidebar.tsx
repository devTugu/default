// @ts-nocheck
"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@default/ui/primitives/sidebar";
import { NavUser } from "./nav-user";
import { Checkbox } from "@default/ui/primitives/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@default/ui/primitives/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@default/ui/primitives/input-group";
import { cn } from "@default/ui/lib/cn";
import { ScrollArea } from "@default/ui/primitives/scroll-area";
import {
  Bookmark,
  Clock,
  File,
  FileText,
  Inbox,
  MailOpen,
  MoreVertical,
  Search,
  Send,
  ShoppingBag,
  Star,
  Trash2,
  ReceiptText,
  OctagonAlert,
  type LucideIcon,
} from "lucide-react";

type NavMainItem =
  | { type: "separator"; title: string }
  | {
      type: "item";
      title: string;
      url: string;
      icon: LucideIcon;
      isActive: boolean;
    };

const navMainItems: NavMainItem[] = [
  { type: "item", title: "Inbox", url: "#", icon: Inbox, isActive: true },
  { type: "item", title: "Starred", url: "#", icon: Star, isActive: false },
  { type: "item", title: "Drafts", url: "#", icon: File, isActive: false },
  { type: "item", title: "Sent", url: "#", icon: Send, isActive: false },
  { type: "item", title: "Snoozed", url: "#", icon: Clock, isActive: false },
  {
    type: "item",
    title: "Bookmarks",
    url: "#",
    icon: Bookmark,
    isActive: false,
  },
  { type: "separator", title: "nav-main-separator" },
  {
    type: "item",
    title: "Shopping",
    url: "#",
    icon: ShoppingBag,
    isActive: false,
  },
  {
    type: "item",
    title: "Documents",
    url: "#",
    icon: ReceiptText,
    isActive: false,
  },
  { type: "separator", title: "nav-main-separator" },
  { type: "item", title: "Trash", url: "#", icon: Trash2, isActive: false },
  {
    type: "item",
    title: "Spam",
    url: "#",
    icon: OctagonAlert,
    isActive: false,
  },
];

// MAIL FOLDER NAV
const data = {
  user: {
    name: "default",
    email: "s@example.com",
    avatar: "https://images.shadcnspace.com/assets/profiles/rough.webp",
  },
  navMain: navMainItems,

  mails: [
    {
      name: "Maria Hernandez",
      email: "mariahernandez@example.com",
      subject: "Latest dashboard updates",
      date: "38 mins",
      teaser: "Can you review the latest dashboard updates",
    },
    {
      name: "James Johnson",
      email: "jamesjohnson@example.com",
      subject: "Design assets uploaded",
      date: "42 mins",
      teaser: "Design assets have been uploaded. Review it.",
    },
    {
      name: "David Smith",
      email: "davidsmith@example.com",
      subject: "Subscription invoice",
      date: "1hr ago",
      teaser:
        "Your subscription invoice for this billing cycle is now available",
    },
    {
      name: "Daisy Wilson",
      email: "daisywilson@example.com",
      subject: "New team member onboarding",
      date: "5hrs ago",
      teaser: "New team member onboarding details are ready for your review.",
    },
    {
      name: "Mark Berlin",
      email: "markberlin@example.com",
      subject: "Instructions for your team member",
      date: "1 week ago",
      teaser: "Please review the instructions for your team member.",
    },
    {
      name: "Bia Anderson",
      email: "biaanderson@example.com",
      subject: "Final slides for client presentation",
      date: "2 weeks ago",
      teaser: "Final slides prepared for tomorrow's client presentation.",
    },
    {
      name: "Andrew Johnson",
      email: "andrewjohnson@example.com",
      subject: "New design files",
      date: "4 weeks ago",
      teaser: "New design files have been uploaded and ready for review.",
    },
    {
      name: "Bob Wilson",
      email: "bobwilson@example.com",
      subject: "Summary of today's discussion",
      date: "4 weeks ago",
      teaser: "A summary of today's discussion has been prepared for review.",
    },
  ],
};

export function AppSidebar() {
  const [activeItem, setActiveItem] = useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="none"
      className="h-[calc(100svh-25px)] w-[calc(var(--sidebar-width-icon)+1px)]! shrink-0 bg-transparent"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              id="sidebar-logo-button"
              size="lg"
              className="md:h-8 p-0 hover:bg-transparent"
              render={<a href="#" />}
            >
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <img
                  src="https://images.shadcnspace.com/assets/logo/shadcn-logo.png"
                  alt="logo"
                  width={32}
                  height={32}
                  className="dark:hidden"
                />
                <img
                  src="https://images.shadcnspace.com/assets/logo/shadcn-white-logo.png"
                  alt="logo"
                  width={32}
                  height={32}
                  className="hidden dark:block"
                />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-0">
            <SidebarMenu className="gap-1">
              {data.navMain.map((item, index) =>
                item.type === "separator" ? (
                  <SidebarSeparator key={index} className="my-1 mx-auto" />
                ) : (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      id={`nav-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      tooltip={{ children: item.title, hidden: false }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className={`px-2.5 md:px-2 rounded-lg hover:bg-primary/20 text-foreground cursor-pointer ${activeItem?.title === item.title ? "bg-primary! text-primary-foreground!" : ""}`}
                    >
                      <item.icon size={16} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="items-start p-0">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

export function MailSidebar() {
  const { open, setOpen, isMobile } = useSidebar();
  const [activeTab, setActiveTab] = useState("all");
  const [checkedMails, setCheckedMails] = useState<string[]>([
    data.mails[1].email,
  ]);
  const [readMails, setReadMails] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const markAsRead = (email: string) => {
    setReadMails((prev) => (prev.includes(email) ? prev : [...prev, email]));
  };

  const toggleMail = (email: string) => {
    setCheckedMails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );
  };

  const toggleAll = () => {
    setCheckedMails((prev) =>
      prev.length === data.mails.length ? [] : data.mails.map((m) => m.email),
    );
  };

  const query = searchQuery.trim().toLowerCase();
  const visibleMails = (
    activeTab === "read"
      ? data.mails.filter((m) => readMails.includes(m.email))
      : data.mails
  ).filter(
    (m) =>
      !query ||
      m.name.toLowerCase().includes(query) ||
      m.subject.toLowerCase().includes(query) ||
      m.teaser.toLowerCase().includes(query),
  );

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "none"}
      className={cn(
        "shrink-0 overflow-hidden border-r transition-[width] duration-200 ease-linear bg-background",
        open ? "w-(--sidebar-width)!" : "w-0 border-r-0",
      )}
    >
      <style>{`
        [data-slot="sidebar"][data-mobile="true"] {
          width: var(--sidebar-width) !important;
        }
      `}</style>
      <SidebarHeader className="w-(--sidebar-width)! gap-3 pt-3 px-0 pb-0">
        <div className="px-2">
          <InputGroup>
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        <Tabs
          className="px-2 h-10"
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as string)}
        >
          <TabsList className="w-full h-full!">
            <TabsTrigger
              value="all"
              className="flex-1 h-8 data-active:bg-background!"
            >
              All Mails
            </TabsTrigger>
            <TabsTrigger
              value="read"
              className="flex-1 h-8 data-active:bg-background!"
            >
              Read
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-3 py-5 px-3 border-y border-border">
          <Checkbox
            checked={checkedMails.length === data.mails.length}
            onCheckedChange={toggleAll}
          />
          <button
            id="mail-toolbar-star"
            className="cursor-pointer hover:text-orange-400"
          >
            <Star size={16} />
          </button>
          <button
            id="mail-toolbar-snooze"
            className="cursor-pointer hover:text-teal-400"
          >
            <Clock size={16} />
          </button>
          <button
            id="mail-toolbar-trash"
            className="cursor-pointer hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
          <button
            id="mail-toolbar-mail"
            className="cursor-pointer hover:text-blue-500"
          >
            <MailOpen size={16} />
          </button>
          <button
            id="mail-toolbar-folder"
            className="cursor-pointer hover:text-foreground"
          >
            <FileText size={16} />
          </button>
          <button
            id="mail-toolbar-more"
            className="ml-auto cursor-pointer hover:text-foreground"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="w-(--sidebar-width)!">
        <ScrollArea className="w-full h-[calc(100svh-180px)]">
          <SidebarGroup className="px-0 pt-0">
            <SidebarGroupContent className="flex flex-col">
              {visibleMails.length === 0 && (
                <p className="text-muted-foreground px-3 py-6 text-center text-sm">
                  No mails found.
                </p>
              )}
              {visibleMails.map((mail) => {
                const isUnread = !readMails.includes(mail.email);
                return (
                  <a
                    id={`mail-item-${mail.email}`}
                    href="#"
                    key={mail.email}
                    className={`flex items-start gap-3 px-3 py-3 cursor-pointer hover:bg-primary/5 border-b border-border ${checkedMails.includes(mail.email) ? "bg-primary/5" : ""} ${isUnread ? "bg-muted/40" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      markAsRead(mail.email);
                      setOpen(true);
                    }}
                  >
                    <Checkbox
                      className="mt-0.5"
                      checked={checkedMails.includes(mail.email)}
                      onClick={(e) => e.stopPropagation()}
                      onCheckedChange={() => toggleMail(mail.email)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm truncate ${isUnread ? "font-semibold text-foreground" : "font-medium text-muted-foreground"}`}
                        >
                          {mail.name}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {mail.date}
                        </span>
                      </div>
                      <p
                        className={`text-sm line-clamp-2 ${isUnread ? "text-foreground/70" : "text-muted-foreground"}`}
                      >
                        {mail.teaser}
                      </p>
                    </div>
                  </a>
                );
              })}
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
