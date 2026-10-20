// @ts-nocheck
"use client"

import * as React from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@default/ui/primitives/sidebar"
import { NavUser } from "./nav-user"
import { Airplay, Atom, BadgeCheck, BadgeDollarSign, Bandage, Blocks, Bolt, BookOpen, BriefcaseConveyorBelt, CalendarDays, ChartArea, ChartBarBig, ChartCandlestick, ChartColumnBig, ChartNetwork, ChartNoAxesColumnDecreasing, ChartNoAxesCombined, ChartPie, CircleQuestionMark, Clapperboard, ClockArrowDown, Codesandbox, Combine, Component, Dices, FlipHorizontal, GalleryHorizontal, GalleryVertical, GalleryVerticalEnd, Key, LassoSelect, Layers, LifeBuoy, ListTodo, Mails, MessageCircleMore, NotebookPen, PanelLeftDashed, PersonStanding, Phone, Radar, Radio, ReceiptText, Settings, ShoppingBasket, Shredder, TextCursorInput, TextSelect, Ticket, TicketCheck, VectorSquare } from "lucide-react"


// UPDATED DATA
const data = {
    user: {
        name: "default",
        email: "s@example.com",
        avatar: "https://images.shadcnspace.com/assets/profiles/user-11.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: Layers,
            isActive: true,
            subItems: [
                { title: "Dashboard 1", url: "#", icon: Atom },
                { title: "Dashboard 2", url: "#", icon: ChartColumnBig },
                { title: "Dashboard 3", url: "#", icon: Airplay },
            ],
        },
        {
            title: "Apps",
            url: "#",
            icon: Clapperboard,
            isActive: false,
            subItems: [
                { title: "Contacts", url: "#", icon: Phone },
                { title: "E-Commerce", url: "#", icon: ShoppingBasket },
                { title: "Blog", url: "#", icon: VectorSquare },
                { title: "Chats", url: "#", icon: MessageCircleMore },
                { title: "Invoice", url: "#", icon: ReceiptText },
                { title: "Notes", url: "#", icon: NotebookPen },
                { title: "Calendar", url: "#", icon: CalendarDays },
                { title: "Email", url: "#", icon: Mails },
                { title: "Tickets", url: "#", icon: Ticket },
            ],
        },
        {
            title: "Pages",
            url: "#",
            icon: BookOpen,
            isActive: false,
            subItems: [
                { title: "Account Setting", url: "#", icon: Bolt },
                { title: "FAQ", url: "#", icon: CircleQuestionMark },
                { title: "Pricing", url: "#", icon: BadgeDollarSign },
                { title: "Roll Base Access", url: "#", icon: PersonStanding },
                { title: "Integrations", url: "#", icon: Blocks },
                { title: "API Keys", url: "#", icon: Key },
            ],
        },
        {
            title: "Tables",
            url: "#",
            icon: Dices,
            isActive: false,
            subItems: [
                { title: "Order Table", url: "#", icon: ClockArrowDown },
                { title: "Customers", url: "#", icon: ClockArrowDown },
                { title: "Basic", url: "#", icon: ClockArrowDown },
                { title: "Dense", url: "#", icon: ClockArrowDown },
                { title: "Sorting", url: "#", icon: ClockArrowDown },
                { title: "Filtering", url: "#", icon: ClockArrowDown },
                { title: "Pagination", url: "#", icon: ClockArrowDown },
                { title: "Row Selection", url: "#", icon: ClockArrowDown },
                { title: "Column Visibility", url: "#", icon: ClockArrowDown },
            ],
        },
        {
            title: "Charts",
            url: "#",
            icon: ChartNoAxesCombined,
            isActive: false,
            subItems: [
                { title: "Line Charts", url: "#", icon: ChartNoAxesColumnDecreasing },
                { title: "Area Charts", url: "#", icon: ChartArea },
                { title: "Gradient Charts", url: "#", icon: ChartNetwork },
                { title: "Candlestick Charts", url: "#", icon: ChartCandlestick },
                { title: "Column Charts", url: "#", icon: ChartBarBig },
                { title: "Doughnut & Pie", url: "#", icon: ChartPie },
                { title: "Radialbar & Radar", url: "#", icon: Radar },
            ],
        },
        {
            title: "Forms",
            url: "#",
            icon: Codesandbox,
            isActive: false,
            subItems: [
                { title: "Forms Elements", url: "#", icon: TextSelect },
                { title: "Form Layouts", url: "#", icon: GalleryHorizontal },
                { title: "Forms Horizontal", url: "#", icon: GalleryVertical },
                { title: "Forms Vertical", url: "#", icon: GalleryVerticalEnd },
                { title: "Forms Custom", url: "#", icon: PanelLeftDashed },
                { title: "Form Validation", url: "#", icon: TicketCheck },
                { title: "Form Example", url: "#", icon: Shredder },
            ],
        },
        {
            title: "UI Element",
            url: "#",
            icon: Bandage,
            isActive: false,
            subItems: [
                { title: "Button", url: "#", icon: BriefcaseConveyorBelt },
                { title: "Input", url: "#", icon: TextCursorInput },
                { title: "Select", url: "#", icon: LassoSelect },
                { title: "Checkbox", url: "#", icon: ListTodo },
                { title: "Radio", url: "#", icon: Radio },
                { title: "Combobox", url: "#", icon: Combine },
                { title: "Command", url: "#", icon: Component },
            ],
        },
        {
            title: "Docs & Others",
            url: "#",
            icon: FlipHorizontal,
            isActive: false,
            subItems: [
                { title: "Applications", url: "#", icon: BadgeCheck },
                { title: "Form Options", url: "#", icon: BadgeCheck },
                { title: "Table Variations", url: "#", icon: BadgeCheck },
                { title: "Charts Selection", url: "#", icon: BadgeCheck },
                { title: "Widget", url: "#", icon: BadgeCheck },
                { title: "Documentation", url: "#", icon: BadgeCheck }
            ],
        },
    ],

    mails: [
        {
            name: "William Smith",
            email: "williamsmith@example.com",
            subject: "Meeting Tomorrow",
            date: "09:34 AM",
            teaser:
                "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
        },
        {
            name: "Alice Smith",
            email: "alicesmith@example.com",
            subject: "Re: Project Update",
            date: "Yesterday",
            teaser:
                "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
        },
        {
            name: "Bob Johnson",
            email: "bobjohnson@example.com",
            subject: "Weekend Plans",
            date: "2 days ago",
            teaser:
                "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [activeItem, setActiveItem] = React.useState(data.navMain[0])
    const [activeSubItem, setActiveSubItem] = React.useState(data.navMain[0].subItems[0])
    const [mails, setMails] = React.useState(data.mails)
    const { setOpen } = useSidebar()


    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
            {...props}
        >
            {/* First sidebar (icons only) */}
            <Sidebar
                collapsible="none"
                className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
            >
                <SidebarHeader >
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton id="sidebar-logo-button" size="lg" className="md:h-8 md:p-0" render={<a href="#" />}>
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
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            id={`nav-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            tooltip={{ children: item.title, hidden: false }}
                                            onClick={() => {
                                                setActiveItem(item)
                                                const mail = data.mails.sort(() => Math.random() - 0.5)
                                                setMails(
                                                    mail.slice(
                                                        0,
                                                        Math.max(5, Math.floor(Math.random() * 10) + 1)
                                                    )
                                                )
                                                setOpen(true)
                                            }}
                                            isActive={activeItem?.title === item.title}
                                            className={`px-2.5 md:px-2 rounded-lg hover:bg-primary/5 cursor-pointer ${activeItem?.title === item.title ? 'bg-primary/5!' : ''}`}
                                        >
                                            <item.icon size={16} />
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="items-start">
                    <a id="footer-link-buoy" href="#" className="px-2 py-1"><LifeBuoy size={16} /></a>
                    <a id="footer-link-settings" href="#" className="px-2 py-1"><Settings size={16} /></a>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </Sidebar>

            {/* Second Sidebar: Shows subItems or mails */}
            <Sidebar collapsible="none" className="hidden flex-1 lg:flex px-2">
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent className="flex flex-col gap-0.5">
                            <p className="px-3 py-3 text-xs text-sidebar-foreground/70 font-semibold uppercase tracking-wide">{activeItem.title}</p>
                            {/* SUB ITEMS OF ACTIVE MENU */}
                            {activeItem.subItems?.map((sub: any, i) => (
                                <a
                                    id={`nav-sub-item-${sub.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    href={sub.url}
                                    key={i}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm leading-tight whitespace-nowrap rounded-lg cursor-pointer hover:bg-primary/5 ${activeSubItem?.title === sub.title ? "bg-primary/5!" : ""}`}
                                    onClick={() => {
                                        setActiveSubItem(sub)
                                        const mail = data.mails.sort(() => Math.random() - 0.5)
                                        setMails(mail.slice(0, Math.max(5, Math.floor(Math.random() * 10) + 1)))
                                        setOpen(true)
                                    }}
                                >
                                    <sub.icon size={16} />
                                    <span>{sub.title}</span>
                                </a>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </Sidebar>
    )
}
