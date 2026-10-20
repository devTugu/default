// @ts-nocheck
"use client";
import Logo from "../../assets/logo/logo";
import { Button } from "@default/ui/primitives/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@default/ui/primitives/navigation-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@default/ui/primitives/sheet";
import { ScrollArea } from "@default/ui/primitives/scroll-area";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@default/ui/primitives/collapsible";
import { cn } from "@default/ui/lib/cn";
import {
    ClipboardList,
    Phone,
    Stethoscope,
    Ambulance,
    TestTubeDiagonal,
    CalendarCheck,
    Syringe,
    ChevronDown,
    TextAlignJustify,
    X,
    LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Separator } from "@default/ui/primitives/separator";

export type NavigationItem = {
    title: string;
    description?: string;
    icon: LucideIcon;
    href?: string;
};

export type NavigationSection = {
    title: string;
    subtitle?: string;
    href?: string;
    items?: NavigationItem[];
    layout?: "list" | "grid";
};

const navigationData: NavigationSection[] = [
    {
        title: "About Us",
        href: "#",
    },
    {
        title: "Find a Doctor",
        href: "#",
    },
    {
        title: "Services",

        layout: "grid",
        items: [
            {
                title: "General Consultation",

                icon: ClipboardList,

                href: "#",
            },
            {
                title: "Specialist Care",

                icon: Stethoscope,
                href: "#",
            },
            {
                title: "Online Appointments",

                icon: CalendarCheck,
                href: "#",
            },
            {
                title: "Emergency Services",

                icon: Ambulance,
                href: "#",
            },
            {
                title: "Diagnostic Tests",
                icon: TestTubeDiagonal,
                href: "#",
            },
            {
                title: "Vaccination Services",

                icon: Syringe,
                href: "#",
            },
        ],
    },
    {
        title: "Health Blogs",
        href: "#",
    },
];

const CollaborateButton = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <Button
            variant={"ghost"}
            className="w-full sm:w-auto h-10  gap-2 text-sm font-medium text-foreground px-5 rounded-full cursor-pointer"
        >
            <Phone size={16} />
            (512) 203-0405
        </Button>

        <Button className="w-full lg:w-auto h-10  px-5 hover:bg-primary/80 rounded-full cursor-pointer">
            Contact Us
        </Button>
    </div>
);
const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleScroll = useCallback(() => {
        setSticky(window.scrollY >= 50);
    }, []);

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768) setIsOpen(false);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [handleScroll, handleResize]);
    const [openMenu, setOpenMenu] = useState("Services");
    return (
        <div>
            <header className="bg-background">
                <div className="max-w-7xl mx-auto w-full  px-4 py-4 sm:px-6">
                    <nav
                        className={cn(
                            "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
                            sticky
                                ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
                                : "bg-transparent border-transparent",
                        )}
                    >
                        <div className="flex items-center justify-center gap-5">
                            {/* Logo */}
                            <a href="#">
                                <Logo />
                            </a>
                            <Separator
                                orientation="vertical"
                                className="h-4 data-[orientation=vertical]:self-center max-lg:hidden"
                            />

                            {/*  Navigation */}
                            <div>
                                <NavigationMenu
                                    className="max-lg:hidden p-0.5 rounded-full"
                                    value={openMenu}
                                    onValueChange={setOpenMenu}
                                >
                                    <NavigationMenuList className="flex gap-0.5">
                                        {navigationData.map((section) => (
                                            <NavigationMenuItem
                                                key={section.title}
                                                value={section.title}
                                            >
                                                {section.items ? (
                                                    <>


                                                        <NavigationMenuTrigger className=" data-popup-open:bg-muted  data-popup-open:text-foreground px-2 lg:px-4 py-1.5 text-base font-normal rounded-full text-foreground/80 hover:text-foreground hover:bg-muted hover:shadow-xs transition tracking-normal data-[state=open]:bg-muted  data-[state=open]:text-foreground border-none shadow-none focus:bg-muted  h-auto bg-transparent cursor-pointer">
                                                            {section.title}
                                                        </NavigationMenuTrigger>


                                                        <NavigationMenuContent
                                                            className={cn(
                                                                "p-0 bg-muted rounded-lg shadow-none",
                                                                section.layout === "grid" ? "w-lg" : "w-fit",
                                                            )}
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "p-6 rounded-lg ",
                                                                    section.layout === "grid"
                                                                        ? "grid grid-cols-2 gap-1.5 gap-x-6  whitespace-nowrap "
                                                                        : "flex flex-col ",
                                                                )}
                                                            >
                                                                {section.items.map((item,index) => (
                                                                    <div key={index} className="px-2 py-1.5 w-full">
                                                                        <NavigationMenuLink
                                                                        key={item.title}
                                                                        href={item.href ?? "#"}
                                                                        className="flex items-center gap-1.5 py-1.5 px-2 mb-0 transition-all hover:rounded-full hover:bg-white dark:hover:bg-background"
                                                                        >
                                                                        <item.icon size={16} className="text-muted-foreground min-w-4 h-4" />

                                                                        <span className="flex items-center gap-1 text-sm font-medium text-card-foreground">
                                                                            {item.title}
                                                                        </span>
                                                                        </NavigationMenuLink>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </NavigationMenuContent>
                                                    </>
                                                ) : (
                                                    <NavigationMenuLink
                                                        href={section.href}
                                                        className="px-2 lg:px-4 py-1.5 text-base font-normal rounded-full text-foreground/80 hover:text-foreground hover:bg-muted hover:shadow-xs transition tracking-normal whitespace-nowrap"
                                                    >
                                                        {section.title}
                                                    </NavigationMenuLink>
                                                )}
                                            </NavigationMenuItem>
                                        ))}
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </div>
                        </div>

                        <CollaborateButton className="hidden lg:flex" />

                        <div className="lg:hidden">
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger
                                    render={
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full border border-border p-2 outline-none flex items-center justify-center cursor-pointer hover:bg-muted transition-colors h-10 w-10"
                                        />
                                    }
                                >
                                    <TextAlignJustify size={20} />
                                    <span className="sr-only">Toggle Menu</span>
                                </SheetTrigger>
                                <SheetContent
                                    showCloseButton={false}
                                    side="right"
                                    className="min-w-80 p-0 "
                                >
                                    <ScrollArea className="h-full ">
                                        <SheetHeader className="p-4">
                                            <SheetTitle className="text-left">
                                                <Logo />
                                            </SheetTitle>
                                            <SheetClose className="absolute top-4 right-4 rounded-full dark:bg-white bg-black dark:text-black text-white p-2.5 cursor-pointer ">
                                                <X size={16} />
                                            </SheetClose>
                                        </SheetHeader>
                                        <div className="px-4 py-2">
                                            <div className="flex flex-col gap-1.5">
                                                {navigationData.map((section) =>
                                                    section.items ? (
                                                        <Collapsible key={section.title} className="w-full">
                                                            <CollapsibleTrigger className="aria-expanded:text-foreground aria-expanded:bg-muted mb-1.5 flex items-center justify-between w-full  rounded-lg px-2 py-1  hover:bg-muted hover:text-foreground text-base font-normal text-card-foreground/80 transition-colors group/collapsible">
                                                                {section.title}
                                                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-aria-expanded/collapsible:rotate-180" />
                                                            </CollapsibleTrigger>
                                                            <CollapsibleContent>
                                                                <div className="flex flex-col bg-muted rounded-2xl py-5 px-4 gap-2">
                                                                    {section.items.map((item) => (
                                                                        <a
                                                                            key={item.title}
                                                                            href={item.href || "#"}
                                                                            className="flex items-center gap-1.5 px-2 py-1.5 rounded-full hover:bg-white dark:hover:bg-background  transition-colors group"
                                                                            onClick={() => setIsOpen(false)}
                                                                        >
                                                                            <div className="flex items-center justify-center  text-muted-foreground min-w-4 h-4">
                                                                                <item.icon size={16} strokeWidth={1.25} />
                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <span className="text-sm font-medium  text-card-foreground">
                                                                                    {item.title}
                                                                                </span>
                                                                            </div>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </CollapsibleContent>
                                                        </Collapsible>
                                                    ) : (
                                                        <a
                                                            key={section.title}
                                                            href={section.href}
                                                            className="text-base  font-normal text-card-foreground/80 rounded-lg px-2 py-1   transition-colors hover:text-foreground hover:bg-muted"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {section.title}
                                                        </a>
                                                    ),
                                                )}
                                            </div>
                                            <div className="mt-4">
                                                <CollaborateButton className="flex flex-col items-center gap-2 w-full" />
                                            </div>
                                        </div>
                                    </ScrollArea>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Navbar;