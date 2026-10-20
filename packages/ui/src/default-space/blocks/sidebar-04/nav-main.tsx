// @ts-nocheck
"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@default/ui/primitives/dropdown-menu"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@default/ui/primitives/sidebar"
import { LucideIcon, Ellipsis } from "lucide-react"

export type NavMainProps = {
    items: {
        title: string
        url: string
        icon: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
            icon: LucideIcon
        }[]
    }[]
}

export function NavMain({ items }: NavMainProps) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup>
            <SidebarMenu className="gap-1">
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                id={`nav-main-trigger-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                                render={
                                    <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:shadow-none! focus-visible:ring-0! text-foreground font-normal hover:bg-primary/5 w-full">
                                        <div className="flex items-center gap-2">
                                            <item.icon height={18} className="text-foreground" />
                                            {item.title}
                                        </div>

                                        <Ellipsis className="ml-auto cursor-pointer" />
                                    </SidebarMenuButton>
                                }
                            />
                            {item.items?.length ? (
                                <DropdownMenuContent
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                    className="min-w-56 rounded-lg"
                                >
                                    {item.items.map((subItem) => (
                                        <DropdownMenuItem
                                            key={subItem.title}
                                            className='flex gap-3 font-normal cursor-pointer'
                                        >
                                            <a href={subItem.url} className="flex gap-3">
                                                <subItem.icon height={18} className="text-foreground" />
                                                <span>{subItem.title}</span>
                                            </a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            ) : null}
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
