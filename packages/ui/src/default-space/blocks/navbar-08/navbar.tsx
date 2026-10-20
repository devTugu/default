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
    ChevronDown,
    Facebook,
    Instagram,
    LucideIcon,
    Mail,
    MapPin,
    Phone,
    TextAlignJustify,
    Twitter,
    X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Separator } from "@default/ui/primitives/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@default/ui/primitives/tooltip";

export type NavigationItem = {
    title: string;
    description?: string;
    icon?: LucideIcon;
    showArrow?: boolean;
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
        title: "About us",
        href: "#",
    },
    {
        title: "Services",
        layout: "list",
        items: [
            {
                title: "Data Security",
                href: "#",
            },
            {
                title: "Automation",
                href: "#",
            },
            {
                title: "API Integration",

                href: "#",
            },
            {
                title: "Insights",

                href: "#",
            },
        ],
    },

    {
        title: "Pricing",
        href: "#",
    },
    {
        title: "Blog",
        href: "#",
    },
    {
        title: "Contacts us",
        href: "#",
    },
];

const CollaborateButton = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center gap-1", className)}>

        <Button
            variant={"ghost"}
            className="w-full sm:w-auto h-10  gap-2 text-sm font-medium text-foreground px-5 rounded-lg"
        >
            <Phone size={16} />
            +1 0239 0310
        </Button>

        <Button className="w-full lg:w-auto h-10  px-5 hover:bg-primary/80 rounded-lg">
            Book a Service
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

    return (
        <div>
            <header className="bg-background">
                <div className="bg-secondary border-b border-white/10 hidden sm:block">
                    <div className="max-w-7xl mx-auto sm:px-6 px-4 py-2 w-full">
                        <div className="flex items-center justify-between">
                            {/* Left Section */}
                            <div className="flex items-center gap-4">
                                {/* Email */}
                                <a href="#" className="flex items-center gap-2 text-primary">
                                    <Mail size={16} />
                                    <p className="text-xs hidden sm:block">
                                        support@shadcnspace.com
                                    </p>
                                </a>

                                {/* Phone */}
                                <a href="#" className="flex items-center gap-2 text-primary">
                                    <MapPin size={16} />

                                    <p className="text-xs">Blane Street, Manchester</p>
                                </a>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4 text-primary">
                                <a href="#">
                                    <Twitter size={16} />
                                </a>
                                <a href="#">
                                    <Facebook size={16} />
                                </a>
                                <a href="#">
                                    <Instagram size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6">
                    <nav
                        className={cn(
                            "w-full flex items-center h-fit justify-between ",
                            sticky
                                ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
                                : "bg-transparent border-transparent",
                        )}
                    >
                        <div className="flex items-center justify-center gap-4">
                            <a href="#">
                                <Logo />
                            </a>

                            <Separator
                                orientation="vertical"
                                className="h-4 data-[orientation=vertical]:self-center max-lg:hidden"
                            />

                            <div>
                                <NavigationMenu className="max-lg:hidden ">
                                    <NavigationMenuList className="flex gap-0.5">
                                        {navigationData.map((section) => (
                                            <NavigationMenuItem key={section.title}>
                                                {section.items ? (
                                                    <>
                                                        <NavigationMenuTrigger className=" data-popup-open:bg-muted  data-popup-open:text-foreground px-2 lg:px-4 py-1.5 text-base font-normal rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted hover:shadow-xs transition tracking-normal data-[state=open]:bg-muted  data-[state=open]:text-foreground border-none shadow-none focus:bg-muted  h-auto bg-transparent cursor-pointer">
                                                            {section.title}
                                                        </NavigationMenuTrigger>

                                                        <NavigationMenuContent className="p-3 rounded-lg min-w-42 w-full">
                                                            <div className="flex flex-col  ">
                                                                {section.items.map((item) => (
                                                                    <NavigationMenuLink
                                                                        key={item.title}
                                                                        href={item.href || "#"}
                                                                        className="group  flex items-center py-1.5 px-2 rounded-lg hover:bg-muted/80  transition-all  mb-0"
                                                                    >
                                                                        <div className="text-sm font-normal text-muted-foreground group-hover:text-foreground">
                                                                            <p>{item.title}</p>
                                                                        </div>
                                                                    </NavigationMenuLink>
                                                                ))}
                                                            </div>
                                                        </NavigationMenuContent>
                                                    </>
                                                ) : (
                                                    <NavigationMenuLink
                                                        href={section.href}
                                                        className="px-2 lg:px-4 py-1.5 text-base font-normal rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted hover:shadow-xs transition tracking-normal whitespace-nowrap"
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
                                    className="min-w-80 p-0 gap-0"
                                >
                                    <div className="bg-secondary border-b border-white/10">
                                        <div className="max-w-7xl mx-auto sm:px-6 px-4 py-3 w-full">
                                            <div className="flex items-center justify-between">
                                                {/* Left Section */}
                                                <div className="flex items-center gap-4">
                                                    {/* Email */}

                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <a
                                                                    href="#"
                                                                    className="flex items-center gap-2 text-primary"
                                                                >
                                                                    <Mail size={16} />
                                                                </a>
                                                            </TooltipTrigger>

                                                            <TooltipContent>
                                                                <p className="text-xs">
                                                                    support@shadcnspace.com
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>

                                                    {/* Phone */}
                                                    <a
                                                        href="#"
                                                        className="flex items-center gap-2 text-primary"
                                                    >
                                                        <MapPin size={16} />

                                                        <p className="text-xs">Blane Street, Manchester</p>
                                                    </a>
                                                </div>

                                                {/* Social Icons */}
                                                <div className="flex items-center gap-4 text-primary">
                                                    <a href="#">
                                                        <Twitter size={16} />
                                                    </a>
                                                    <a href="#">
                                                        <Facebook size={16} />
                                                    </a>
                                                    <a href="#">
                                                        <Instagram size={16} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ScrollArea className="h-full px-4 py-4 overflow-y-auto ">
                                        <SheetHeader className=" p-0">
                                            <SheetTitle className="text-left">
                                                <Logo />
                                            </SheetTitle>
                                            <SheetClose className="absolute top-5 right-4 rounded-lg dark:bg-white bg-black dark:text-black text-white p-2 cursor-pointer ">
                                                <X size={16} />
                                            </SheetClose>
                                        </SheetHeader>
                                        <div className="flex flex-col gap-2 pt-5">
                                            {navigationData.map((section) =>
                                                section.items ? (
                                                    <Collapsible key={section.title} className="w-full">
                                                        <CollapsibleTrigger className=" aria-expanded:text-foreground aria-expanded:bg-muted mb-1 flex items-center justify-between w-full  rounded-lg px-2 py-1  hover:bg-muted hover:text-foreground text-base font-normal text-card-foreground/80 transition-colors group/collapsible">
                                                            {section.title}
                                                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-aria-expanded/collapsible:rotate-180" />
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent>
                                                            <div className="flex flex-col pl-4">
                                                                {section.items.map((item) => (
                                                                    <a
                                                                        key={item.title}
                                                                        href={item.href || "#"}
                                                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        <span className="text-sm font-normal text-muted-foreground group-hover:text-foreground transition-colors">
                                                                            {item.title}
                                                                        </span>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                ) : (
                                                    <a
                                                        key={section.title}
                                                        href={section.href}
                                                        className="text-base font-normal rounded-lg  text-foreground/80 hover:text-foreground hover:bg-muted  py-1 px-2 transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {section.title}
                                                    </a>
                                                ),
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <CollaborateButton className="flex flex-col items-center gap-1 w-full" />

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
