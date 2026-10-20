// @ts-nocheck
import { Separator } from "@default/ui/primitives/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@default/ui/primitives/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Bell, LayoutGrid, Moon, Search } from "lucide-react"


export default function Page() {
    return (
        <SidebarProvider
            defaultOpen={true}
            style={
                {
                    "--sidebar-width": "280px",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
                    <SidebarTrigger className="-ml-1 cursor-pointer" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4 self-center!"
                    />
                    <Search size={16} />
                    <LayoutGrid size={16} className="mx-2" />

                    <div className="flex items-center w-full flex-1 justify-end">
                        <Moon size={16} />
                        <Bell size={16} className="mx-4" />
                        <img src="https://images.shadcnspace.com/assets/profiles/user-11.jpg" alt="user-1" width={26} height={26} className="rounded-full" />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-muted/50 aspect-video h-11 w-full rounded-lg"
                        />
                    ))}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
