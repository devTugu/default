// @ts-nocheck
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@default/ui/primitives/sidebar";
import { AppSidebar } from "../../default-space/blocks/sidebar-09/app-sidebar";
import { RightPanel } from "../../default-space/blocks/sidebar-09/right-panel";

export default function Page() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "238px",
        } as React.CSSProperties
      }
      className="min-h-svh"
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center gap-2 border-b px-4 py-3 sticky top-0">
          <SidebarTrigger className="cursor-pointer" />
          <span className="text-sidebar-foreground text-sm font-medium">
            Overview
          </span>
        </header>
        <div className="flex-1" />
      </SidebarInset>
      <RightPanel />
    </SidebarProvider>
  );
}
