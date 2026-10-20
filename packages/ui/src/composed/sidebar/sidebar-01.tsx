// @ts-nocheck
import { SidebarProvider, SidebarTrigger } from "@default/ui/primitives/sidebar";
import { AppSidebar } from "../../default-space/blocks/sidebar-01/app-sidebar";

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* ---------------- Main ---------------- */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 items-center border-b px-4">
          <SidebarTrigger className="cursor-pointer"/>
        </header>
        <main className="flex-1 p-4" />
      </div>
    </SidebarProvider>
  );
};

export default Page;

