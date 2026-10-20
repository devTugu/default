// @ts-nocheck
"use client";
import { useState } from "react";
import Logo from "../../assets/logo/logo";
import { ArrowUpRight, MapPin, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@default/ui/primitives/dropdown-menu";
import { Button } from "@default/ui/primitives/button";
import { cn } from "@default/ui/lib/cn";

export type NavigationSection = {
    name: string;
    href: string;
    isActive?: boolean;
};

const navigationData: NavigationSection[] = [
    {
        name: "Home",
        href: "#",
        isActive: true,
    },
    {
        name: "Projects",
        href: "#",
    },
    {
        name: "Experience",
        href: "#",
    },
    {
        name: "Contact",
        href: "#",
    }
];

const NavLink = ({ item, onClick }: { item: NavigationSection; onClick?: () => void; }) => {
    return (
        <li className={cn("group flex items-center transition-all duration-500 ease-in-out w-fit", item.isActive ? "gap-3" : "gap-0 hover:gap-3")}>
            <div className={cn("overflow-hidden transition-all duration-500 ease-in-out flex items-center", item.isActive ? "max-w-6 opacity-100" : "max-w-0 opacity-0 group-hover:max-w-6 group-hover:opacity-100")}>
                <div className="w-6 h-0.5 rounded-full bg-foreground" />
            </div>
            <a href={item.href} onClick={onClick} className={cn("text-2xl sm:text-3xl sm:leading-10 leading-8 font-medium transition-colors duration-300", item.isActive ? "text-foreground" : "text-foreground/80")}>{item.name}</a>
        </li>
    );
};

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="border-b border-border">
            <nav className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
                <div className="border-x border-border px-4 lg:px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                            <a href="#">
                                <Logo />
                            </a>
                            <a href="#" className="max-lg:hidden flex items-center gap-2 px-5 py-2.5">
                                <MapPin size={16} />
                                <span>Based on New York, USA</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
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
                                <DropdownMenuTrigger className="rounded-full bg-background hover:bg-muted flex items-center justify-center size-10 gap-2 border border-border cursor-pointer">
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
                                                Menu
                                            </p>
                                            <Button variant="outline" onClick={() => setMenuOpen(false)} className="size-10 cursor-pointer rounded-full">
                                                <X size={20} />
                                            </Button>
                                        </div>
                                        <hr className="border-border" />
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
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button className="group max-lg:hidden h-auto px-5 py-2.5 flex items-center gap-2 rounded-full cursor-pointer hover:bg-primary/80">
                                <ArrowUpRight size={16} className="transition-all duration-300 group-hover:rotate-45" />
                                <span>Hire me</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar