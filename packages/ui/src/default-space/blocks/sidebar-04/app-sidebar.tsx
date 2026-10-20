// @ts-nocheck
"use client"
import * as React from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@default/ui/primitives/sidebar"
import { NavMain, NavMainProps } from "./nav-main"
import { SidebarFooterComp } from "./sidebar-footer"
import { Atom, ChartNoAxesCombined, Cast, House, CircleAlert, FileText, BookOpenText, Mailbox, BookImage, CircleDollarSign, MessageCircleMore, Phone, ShoppingCart, Blocks, Calendar, Ticket, ReceiptText, NotebookText, Mail, LayoutList, LayoutDashboard, AppWindow, MonitorSmartphone } from 'lucide-react';

const data: NavMainProps = {
    items: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
            items: [
                {
                    title: "Analytics",
                    icon: Atom,
                    url: "#",
                },
                {
                    title: "Ecommerce",
                    icon: ChartNoAxesCombined,
                    url: "#",
                },
                {
                    title: "Modern",
                    icon: Cast,
                    url: "#",
                },
            ],
        },
        {
            title: "Frontend Pages",
            url: "#",
            icon: AppWindow,
            items: [
                {
                    title: "Homepage",
                    url: "#",
                    icon: House
                },
                {
                    title: "About Us",
                    url: "#",
                    icon: CircleAlert
                },
                {
                    title: "Blog",
                    url: "#",
                    icon: FileText
                },
                {
                    title: "Blog Details",
                    url: "#",
                    icon: BookOpenText
                },
                {
                    title: "Contact Us",
                    url: "#",
                    icon: Mailbox
                },
                {
                    title: "Portfolio",
                    url: "#",
                    icon: BookImage
                },
                {
                    title: "Pricing",
                    url: "#",
                    icon: CircleDollarSign
                }
            ],
        },
        {
            title: "Apps",
            url: "#",
            icon: MonitorSmartphone,
            items: [
                {
                    title: "Chat",
                    url: "#",
                    icon: MessageCircleMore
                },
                {
                    title: "Contacts",
                    url: "#",
                    icon: Phone
                },
                {
                    title: "Ecommerce",
                    url: "#",
                    icon: ShoppingCart
                },
                {
                    title: "Blogs",
                    url: "#",
                    icon: Blocks
                },
                {
                    title: "Invoice",
                    url: "#",
                    icon: ReceiptText
                },
                {
                    title: "Notes",
                    url: "#",
                    icon: NotebookText
                },
                {
                    title: "Calendar",
                    url: "#",
                    icon: Calendar
                },
                {
                    title: "Email",
                    url: "#",
                    icon: Mail
                },
                {
                    title: "Ticket",
                    url: "#",
                    icon: Ticket
                },
                {
                    title: "Kanban",
                    url: "#",
                    icon: LayoutList
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader >
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton id="sidebar-logo-button" size="lg" className="md:p-0" render={<a href="#" />}>
                            <img
                                src="https://images.shadcnspace.com/assets/logo/shadcnspace-logo-black.svg"
                                alt="logo"
                                className="dark:hidden w-40 h-10"
                            />
                            <img
                                src="https://images.shadcnspace.com/assets/logo/shadcnspace-logo-white.svg"
                                alt="logo"
                                className="hidden dark:block w-40 h-10"
                            />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.items} />
            </SidebarContent>
            <SidebarFooter>
                <div className="p-1">
                    <SidebarFooterComp />
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
