// @ts-nocheck
"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@default/ui/primitives/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@default/ui/primitives/sidebar"
import { Icon } from "@iconify/react"
import { LucideIcon } from "lucide-react"

export function NavProjects({
    projects,
}: {
    projects: {
        name: string
        url: string
        icon: string | LucideIcon
    }[]
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden gap-2">
            <SidebarGroupLabel>Auth Pages</SidebarGroupLabel>
            <SidebarMenu className="gap-1">
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name} className="h-9">
                        <SidebarMenuButton className="hover:bg-primary/5" render={<a href={item.url} />}>
                            <div className="flex items-center gap-2">
                                {item.icon && <item.icon />}
                                <span>{item.name}</span>
                            </div>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={<SidebarMenuAction showOnHover className="focus-visible:ring-0! focus-visible:shadow-none!" />}>
                                <Icon icon="solar:menu-dots-bold" />
                                <span className="sr-only">More</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    <Icon icon="solar:login-linear" />
                                    <span>Boxed Login</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Icon icon="solar:shield-user-broken" />
                                    <span>Boxed Register</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Icon icon="solar:password-broken" />
                                    <span>Boxed Reset Password</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">
                                    <Icon icon="solar:settings-outline" />
                                    <span>Maintainance</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <Icon icon="solar:menu-dots-bold" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
