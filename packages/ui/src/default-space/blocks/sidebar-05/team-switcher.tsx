// @ts-nocheck
"use client"

import * as React from "react"
import { ChevronsUpDown, LucideIcon, Plus } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@default/ui/primitives/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@default/ui/primitives/sidebar"
import { Icon } from "@iconify/react"

export function TeamSwitcher({
    teams,
}: {
    teams: {
        name: string
        logo: LucideIcon
        plan: string
    }[]
}) {
    const { isMobile } = useSidebar()
    const [activeTeam, setActiveTeam] = React.useState(teams[0])

    const [firstWord, ...otherWords] = activeTeam.name.split(' ')

    if (!activeTeam) {
        return null
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        id="team-switcher-trigger"
                        render={
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:shadow-none! focus-visible:ring-0!"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
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
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{firstWord}</span>
                                    <span className="truncate text-xs">{otherWords.join(' ')}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        }
                    />
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-muted-foreground text-xs">
                                Teams
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        {teams.map((team, index) => (
                            <DropdownMenuItem
                                key={team.name}
                                onClick={() => setActiveTeam(team)}
                                className="gap-2 p-2 cursor-pointer"
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border">
                                    <team.logo className="size-3.5 shrink-0" />
                                </div>
                                {team.name}
                                <DropdownMenuShortcut className="flex items-center gap-1">
                                    <Icon icon="solar:banknote-broken" />
                                    {index + 1}
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">Add Plan</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
