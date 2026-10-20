// @ts-nocheck
"use client"

import { useState } from "react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@default/ui/primitives/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@default/ui/primitives/sidebar"
import { Icon } from "@iconify/react"
import { LucideIcon } from "lucide-react"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: string | LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null)
    

    return (
        <SidebarGroup>
            <SidebarMenu className="gap-1">
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        open={activeMenu === item.title}
                        onOpenChange={(isOpen) => {
                            if (isOpen) {
                                setActiveMenu(item.title)
                                setActiveSubMenu(null)
                            } else {
                                setActiveMenu(null)
                            }
                        }}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger
                                render={
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        data-active={activeMenu === item.title || undefined}
                                        className="cursor-pointer bg-transparent! data-[state=open]:bg-primary! data-[state=open]:text-white! data-[active=true]:bg-primary! data-[active=true]:text-primary-foreground!"
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <Icon
                                            icon="solar:alt-arrow-down-outline"
                                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180"
                                        />
                                    </SidebarMenuButton>
                                }
                            />

                            <CollapsibleContent>
                                <SidebarMenuSub className="mt-0.5">
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton
                                                href={subItem.url}
                                                onClick={() => {
                                                    setActiveMenu(item.title)
                                                    setActiveSubMenu(subItem.title)
                                                }}
                                                className={`cursor-pointer hover:bg-primary/5 ${activeSubMenu === subItem.title ? "bg-primary/5 text-accent-foreground" : ""}`}
                                            >
                                                <span>{subItem.title}</span>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
