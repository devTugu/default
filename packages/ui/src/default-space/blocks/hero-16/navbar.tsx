"use client";
import Logo from "../../assets/logo/logo";
import { Button } from "@default/ui/primitives/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@default/ui/primitives/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuPortal, DropdownMenuTrigger } from "@default/ui/primitives/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { cn } from "@default/ui/lib/cn";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

export type NavigationSection = {
    name: string;
    href: string;
    isActive?: boolean;
};

interface NavbarProps {
    navigationData: NavigationSection[];
    getStartedHref?: string;
    homeHref?: string;
    logo?: ReactNode;
    navActions?: ReactNode;
    getStartedLabel?: string;
    bookDemoLabel?: string;
    bookDemoHref?: string;
    menuLabel?: string;
}

const NavLink = ({
    item,
    onClick,
}: {
    item: NavigationSection;
    onClick?: () => void;
}) => {
    return (
        <li
            className={cn(
                "group flex items-center transition-all duration-500 ease-in-out w-fit",
                item.isActive ? "gap-3" : "gap-0 hover:gap-3",
            )}
        >
            <div
                className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out flex items-center",
                    item.isActive
                        ? "max-w-6 opacity-100"
                        : "max-w-0 opacity-0 group-hover:max-w-6 group-hover:opacity-100",
                )}
            >
                <div className="w-6 h-0.5 rounded-full bg-foreground" />
            </div>
            <a
                href={item.href}
                onClick={onClick}
                className={cn(
                    "text-2xl sm:text-3xl sm:leading-10 leading-8 font-medium transition-colors duration-300",
                    item.isActive ? "text-foreground" : "text-foreground/80",
                )}
            >
                {item.name}
            </a>
        </li>
    );
};

const Navbar = ({
    navigationData,
    getStartedHref = "#",
    homeHref = "/",
    logo,
    navActions,
    getStartedLabel = "Get Started",
    bookDemoLabel = "Book a Demo",
    bookDemoHref = "#",
    menuLabel = "Menu",
}: NavbarProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <header>
            <nav className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
                <div className="border-x border-border px-4 lg:px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-6">
                            <a href={homeHref}>{logo ?? <Logo />}</a>
                            <NavigationMenu className="max-lg:hidden bg-muted p-0.5 rounded-full">
                                <NavigationMenuList className="flex gap-0">
                                    {navigationData.map((navItem) => (
                                        <NavigationMenuItem key={navItem.name}>
                                            <NavigationMenuLink
                                                href={navItem.href}
                                                className={cn("px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal", navItem.isActive ? "bg-background text-foreground" : "")}
                                            >
                                                {navItem.name}
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                        <div className="max-lg:hidden flex items-center gap-2">
                            {navActions}
                            <Button asChild variant="outline" className="h-auto px-4 py-2 rounded-full cursor-pointer">
                                <a href={getStartedHref}>{getStartedLabel}</a>
                            </Button>
                            <Button asChild className="group h-auto px-4 py-2 rounded-full hover:bg-primary/80 cursor-pointer">
                                <a
                                    href={bookDemoHref}
                                    className="flex items-center gap-1.5"
                                >
                                    {bookDemoLabel}
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className="lg:hidden relative">
                        <AnimatePresence>
                            {menuOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setMenuOpen(false)}
                                    className="fixed inset-0 z-40 backdrop-blur-sm"
                                />
                            )}
                        </AnimatePresence>
                        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                            <DropdownMenuTrigger
                                aria-label={menuLabel}
                                className="rounded-full bg-muted hover:bg-muted/80 h-auto p-2.5 gap-2 border border-border cursor-pointer"
                            >
                                <Menu className="w-4 h-4 text-foreground cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                sideOffset={10}
                                className="min-w-xs sm:min-w-sm bg-background py-8 px-6 shadow-2xl rounded-3xl border border-border -mt-12 z-50"
                            >
                                <div className="flex flex-col gap-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-medium text-foreground">
                                            {menuLabel}
                                        </p>
                                        <Button variant="outline" onClick={() => setMenuOpen(false)} className="h-auto p-2.5 cursor-pointer rounded-full">
                                            <X size={20} />
                                        </Button>
                                    </div>
                                    <hr className="border-border" />
                                    {navActions ? (
                                        <div className="flex items-center gap-2">{navActions}</div>
                                    ) : null}
                                    {/* Navigation */}
                                    <ul className="flex flex-col gap-3.5">
                                        {navigationData.map((item, index) => (
                                            <NavLink
                                                key={index}
                                                item={item}
                                                onClick={() => setMenuOpen(false)}
                                            />
                                        ))}
                                    </ul>
                                    <Button asChild className="h-auto rounded-full px-5 py-2.5 cursor-pointer hover:bg-primary/80">
                                        <a href={getStartedHref} onClick={() => setMenuOpen(false)}>
                                            {getStartedLabel}
                                        </a>
                                    </Button>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

            </nav>
        </header>
    )
}

export default Navbar