// @ts-nocheck
import { Separator } from "@default/ui/primitives/separator";
import { SidebarProvider, SidebarTrigger } from "@default/ui/primitives/sidebar";
import { AppSidebar, MailSidebar } from "./app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@default/ui/primitives/breadcrumb";
import { CalendarDays, Plus, Settings, StickyNote, UserRound, type LucideIcon, } from "lucide-react";

type RightRailItem =
  | { id: string; type: "separator" }
  | { id: string; type: "button"; icon: LucideIcon; label: string };

const rightRailItems: RightRailItem[] = [
  { id: "1", type: "button", icon: CalendarDays, label: "Calendar" },
  { id: "2", type: "button", icon: StickyNote, label: "Notes" },
  { id: "3", type: "button", icon: UserRound, label: "Profile" },
  { id: "4", type: "separator" },
  { id: "5", type: "button", icon: Settings, label: "Settings" },
  { id: "6", type: "button", icon: Plus, label: "Add" },
];

export default function Page() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "282px",
        } as React.CSSProperties
      }
      className="bg-muted min-h-svh w-full items-stretch gap-0 py-2"
    >
      <AppSidebar />

      <div className="bg-background flex flex-1 overflow-hidden rounded-xl border">
        <MailSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center gap-3 border-b px-4 py-3">
            <SidebarTrigger className="cursor-pointer" />
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4 my-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Chat App</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 overflow-hidden p-3">
            <div className="bg-muted flex-1 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 px-1.5 py-1">
        {rightRailItems.map((item) =>
          item.type === "separator" ? (
            <Separator key={item.id} className="my-1" />
          ) : (
            <button
              id={item.id}
              key={item.id}
              aria-label={item.label}
              className="text-foreground hover:bg-primary/20 flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg"
            >
              <item.icon size={16} />
            </button>
          )
        )}
        <div className="bg-muted mt-auto size-10 shrink-0 rounded-full" />
      </div>
    </SidebarProvider>
  );
}