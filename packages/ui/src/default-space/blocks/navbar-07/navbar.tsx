// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo/logo";
import { NavigationLink } from "../navbar-04/index";
import { Button } from "@default/ui/primitives/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@default/ui/primitives/collapsible";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
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
import { cn } from "@default/ui/lib/cn";
import { ArrowRight, ChevronDown, TextAlignJustify, X } from "lucide-react";

interface NavbarProps {
    navigationLinks: NavigationLink[];
    MegaMenuPanel: React.ComponentType<{
        link: NavigationLink;
        isVisible: boolean;
    }>;
}

const Navbar = ({ navigationLinks, MegaMenuPanel }: NavbarProps) => {
    const [sticky, setSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY >= 50);
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleMouseEnter = (title: string) => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setActiveDropdown(title);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    };

    return (
        <header
            className="bg-background sticky top-0 z-50 transition-all duration-300"
            ref={navRef}
        >
            <div className="max-w-7xl mx-auto w-full  px-4 py-4 sm:px-6 ">
                <nav
                    className={cn(
                        "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
                        sticky
                            ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
                            : "bg-transparent border-transparent",
                    )}
                >
                    <a href="#">
                        <Logo />
                    </a>

                    {/* Desktop Nav */}
                    <NavigationMenu className="max-lg:hidden">
                        <NavigationMenuList className="gap-0.5">
                            {navigationLinks.map((link) => (
                                <NavigationMenuItem
                                    key={link.title}
                                    onMouseEnter={() =>
                                        link.hasDropdown && handleMouseEnter(link.title)
                                    }
                                    onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
                                >
                                    <NavigationMenuLink
                                        href={link.href}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "px-2 lg:px-4 py-1.5 text-base font-medium text-muted-foreground hover:text-foreground tracking-normal gap-1 bg-transparent",
                                            activeDropdown === link.title &&
                                            "bg-muted text-foreground",
                                        )}
                                    >
                                        {link.title}
                                        {link.hasDropdown && (
                                            <ChevronDown
                                                size={14}
                                                className={cn(
                                                    "transition-transform duration-200",
                                                    activeDropdown === link.title && "rotate-180",
                                                )}
                                            />
                                        )}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex  gap-1">
                        <Button variant="outline" className="hidden lg:flex h-auto px-5 py-2.5 rounded-lg  cursor-pointer">
                            Register
                        </Button>
                        <Button className="hidden lg:flex h-auto px-5 py-2.5 rounded-lg hover:bg-primary/80 cursor-pointer">
                            Login
                        </Button>

                    </div>

                    {/* Mobile Nav */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border border-border p-2 outline-none flex items-center justify-center cursor-pointer hover:bg-muted transition-colors h-10 w-10 lg:hidden text-muted-foreground"
                                />
                            }
                        >
                            <TextAlignJustify size={20} />
                        </SheetTrigger>
                        <SheetContent
                            showCloseButton={false}
                            side="right"
                            className="min-w-80 p-0"
                        >
                            <ScrollArea className="h-full">
                                <SheetHeader className=" p-0 border-b px-4 py-4">
                                    <SheetTitle className="text-left flex items-center justify-between">
                                        <Logo />
                                        <SheetClose className="absolute top-4 right-4 rounded-full border dark:text-white text-black p-2.5 cursor-pointer ">
                                            <X size={16} />
                                        </SheetClose>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col  px-4 py-5">
                                    {navigationLinks.map((link) =>
                                        link.hasDropdown ? (
                                            <Collapsible key={link.title} className="w-full">
                                                <CollapsibleTrigger className=" aria-expanded:text-foreground aria-expanded:bg-muted flex items-center justify-between w-full py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-lg transition-colors group/collapsible">
                                                    {link.title}
                                                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-aria-expanded/collapsible:rotate-180" />
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <div className="flex flex-col px-4 gap-0.5 mt-2">
                                                        {link.featureSections?.map((section) =>
                                                            section.items.map((item) => (
                                                                <a
                                                                    key={item.title}
                                                                    href={item.href || "#"}
                                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group"
                                                                    onClick={() => setIsOpen(false)}
                                                                >

                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-medium">
                                                                            {item.title}
                                                                        </span>
                                                                        <span className="text-xs text-muted-foreground">
                                                                            {item.description}
                                                                        </span>
                                                                    </div>
                                                                </a>
                                                            )),
                                                        )}
                                                    </div>
                                                    <div className="py-3 px-4 rounded-xl bg-muted flex flex-col justify-between h-full min-h-67 mt-3 ">
                                                        <div>
                                                            <p className="text-sm font-normal text-muted-foreground tracking-wide h-5 mb-2">
                                                                More
                                                            </p>
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground tracking-wide ">
                                                                    Discovery
                                                                </p>
                                                                <p className="text-xs font-normal text-muted-foreground tracking-wide ">
                                                                    Explore the latest AI solutions
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <a
                                                                href={"#"}
                                                                className="group relative flex h-40 flex-col justify-start overflow-hidden rounded-2xl bg-muted p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                                                            >
                                                                {/* Background Image with Zoom Effect */}
                                                                <div className="absolute inset-0 bg-[url('https://images.shadcnspace.com/assets/backgrounds/navbar-changelog-bg.webp')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                                                                <div className="relative z-10">
                                                                    <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                                                                        Guides
                                                                        <ArrowRight
                                                                            size={14}
                                                                            className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                                                                        />
                                                                    </div>
                                                                    <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                                                                        Learn how to use AI tools
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            <a
                                                key={link.title}
                                                href={link.href}
                                                className="text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg p-2 transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.title}
                                            </a>

                                        ),
                                    )}
                                    <div className="flex flex-col mt-5  gap-2">
                                        <Button variant="outline" className=" lg:flex h-auto px-5 py-2.5 rounded-lg  cursor-pointer">
                                            Register
                                        </Button>
                                        <Button className="w-full h-auto px-5 py-2.5 rounded-lg hover:bg-primary/80 cursor-pointer">
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>

            {/* Mega Menu Integration */}
            {navigationLinks
                .filter((l) => l.hasDropdown)
                .map((link) => (
                    <div
                        key={link.title}
                        onMouseEnter={() => handleMouseEnter(link.title)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <MegaMenuPanel
                            link={link}
                            isVisible={activeDropdown === link.title}
                        />
                    </div>
                ))}
        </header>
    );
};

export default Navbar;
