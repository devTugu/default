// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import Logo from "../../assets/logo/logo";
import { X, ArrowUpRight, Equal } from "lucide-react";
import { cn } from "@default/ui/lib/cn";
import { Button } from "@default/ui/primitives/button";
import { Sheet, SheetContent, SheetTitle, SheetClose } from "@default/ui/primitives/sheet";

const DiscordIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#discord-clip)">
            <path d="M12.25 0A3.75 3.75 0 0 1 16 3.75v8.5A3.75 3.75 0 0 1 12.25 16h-8.5A3.75 3.75 0 0 1 0 12.25v-8.5A3.75 3.75 0 0 1 3.75 0zM9.764 3.264a.04.04 0 0 0-.018.016 7 7 0 0 0-.316.65 9.5 9.5 0 0 0-2.858 0 7 7 0 0 0-.322-.65.04.04 0 0 0-.018-.016.04.04 0 0 0-.023-.003c-.879.151-1.734.417-2.544.789a.04.04 0 0 0-.017.014c-1.62 2.421-2.064 4.783-1.846 7.115a.04.04 0 0 0 .016.029 10.4 10.4 0 0 0 3.121 1.578.04.04 0 0 0 .024 0 .04.04 0 0 0 .02-.014 7.4 7.4 0 0 0 .64-1.039.04.04 0 0 0-.009-.046l-.014-.01a7 7 0 0 1-.975-.464.04.04 0 0 1-.02-.032q0-.01.003-.019a.04.04 0 0 1 .013-.016q.099-.073.193-.15a.04.04 0 0 1 .02-.01q.01 0 .02.003c2.046.934 4.261.934 6.283 0a.04.04 0 0 1 .021-.003q.01.002.02.008.095.079.194.152.008.006.012.016a.04.04 0 0 1 .004.019.04.04 0 0 1-.02.032 6.4 6.4 0 0 1-.975.465l-.014.008a.04.04 0 0 0-.012.03q0 .01.005.017.28.543.638 1.038a.04.04 0 0 0 .02.014.04.04 0 0 0 .024.001 10.3 10.3 0 0 0 3.126-1.578l.011-.013.005-.015c.26-2.697-.437-5.04-1.848-7.116a.03.03 0 0 0-.016-.014 10.3 10.3 0 0 0-2.545-.79.04.04 0 0 0-.023.004M5.927 7.239c.63 0 1.134.57 1.124 1.26 0 .694-.499 1.26-1.124 1.26-.616 0-1.123-.566-1.123-1.26s.497-1.26 1.123-1.26m4.154 0c.63 0 1.133.57 1.123 1.26 0 .694-.493 1.26-1.123 1.26-.616 0-1.124-.566-1.124-1.26s.498-1.26 1.124-1.26" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="discord-clip">
                <path d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
);

const TwitterIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.791 2.188 8.46 5.996 5.58 2.188H1.408l4.984 6.518-4.723 5.399H3.69l3.646-4.166 3.187 4.166h4.068l-5.196-6.87 4.417-5.047zm-.71 10.707L3.77 3.335h1.2l7.23 9.56z" fill="currentColor" />
    </svg>
);

const LinkedinIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#linkedin-clip)">
            <path d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="linkedin-clip">
                <path d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
);

const YoutubeIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.647 4.152a2.01 2.01 0 0 0-1.416-1.416c-1.242-.339-6.239-.339-6.239-.339s-4.997.01-6.24.35A2.01 2.01 0 0 0 .338 4.161c-.376 2.206-.521 5.568.01 7.686a2.01 2.01 0 0 0 1.416 1.416c1.242.339 6.24.339 6.24.339s4.996 0 6.238-.339a2.01 2.01 0 0 0 1.416-1.416c.396-2.21.518-5.569-.01-7.696" fill="currentColor" />
        <path d="M6.402 10.401 10.547 8 6.402 5.599z" fill="var(--background)" />
    </svg>
);

export type NavLink = {
    name: string;
    href: string;
    isActive?: boolean;
};

export type SocialLink = {
    icon: React.ComponentType<{ className?: string }>;
    url: string;
    label: string;
};

export interface Navbar23Props {
    navLinks?: NavLink[];
    socialLinks?: SocialLink[];
    contactText?: string;
    ctaText?: string;
}

const defaultNavLinks: NavLink[] = [
    { name: "Solutions", href: "#", isActive: true },
    { name: "Use cases", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "About", href: "#" },
];

const defaultSocialLinks: SocialLink[] = [
    { icon: DiscordIcon, url: "#", label: "Discord" },
    { icon: TwitterIcon, url: "#", label: "Twitter" },
    { icon: LinkedinIcon, url: "#", label: "LinkedIn" },
    { icon: YoutubeIcon, url: "#", label: "YouTube" },
];

export default function Navbar23({
    navLinks = defaultNavLinks,
    socialLinks = defaultSocialLinks,
    contactText = "Contact Sales",
    ctaText = "Get a Demo",
}: Navbar23Props) {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 1024px)");
        const onChange = () => {
            if (mql.matches) setSheetOpen(false);
        };
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return (
        <header className="sticky top-0 left-0 w-full z-50">
            <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto py-4">
                <nav className={cn(
                    "border border-border flex items-center justify-between transition-all duration-300",
                    isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
                )}>

                    {/* Left: Logo + nav links */}
                    <div className="flex items-center min-w-0">
                        <a href="#" className="px-4 py-3 lg:border-r lg:border-border shrink-0">
                            <Logo />
                        </a>
                        <ul className="hidden lg:flex items-center gap-6 px-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={cn(
                                            "text-base font-normal transition-colors whitespace-nowrap relative group",
                                            link.isActive
                                                ? "text-foreground font-medium"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {link.name}
                                        <span className={cn(
                                            "absolute bottom-0 left-0 h-px bg-current transition-all duration-300",
                                            link.isActive ? "w-full" : "w-0 group-hover:w-full"
                                        )} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Desktop right: social + contact + CTA */}
                    <div className="hidden lg:flex items-center gap-3 px-4 py-3 border-l border-border shrink-0">
                        <div className="flex items-center gap-1.5">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        aria-label={link.label}
                                        className="flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Icon className="size-3.5" />
                                    </a>
                                );
                            })}
                        </div>
                        <a
                            href="#"
                            className="text-sm hover:text-foreground text-muted-foreground transition-colors whitespace-nowrap ml-1"
                        >
                            {contactText}
                        </a>
                        <Button
                            size="sm"
                            className="h-auto flex items-center gap-2 py-2.5 px-4 rounded-lg bg-foreground text-background hover:bg-foreground/80 cursor-pointer group"
                        >
                            <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform duration-300" />
                            <span>{ctaText}</span>
                        </Button>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex lg:hidden border-border px-4">
                        <Button
                            size="icon"
                            onClick={() => setSheetOpen(true)}
                            className="rounded-lg size-10 bg-foreground text-background hover:bg-foreground/80 cursor-pointer"
                        >
                            <Equal className="size-4" />
                        </Button>
                    </div>

                </nav>
            </div>

            {/* Mobile Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="right" className="w-full sm:w-96 p-0 border-l-0" showCloseButton={false}>
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
                            <a href="#" onClick={() => setSheetOpen(false)}>
                                <Logo />
                            </a>
                            <SheetClose asChild>
<Button variant="outline" size="icon" className="rounded-lg size-10 cursor-pointer" >
<X className="size-4" />
                            
</Button>
</SheetClose>
                        </div>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <hr className="border-border mx-6" />
                        <div className="flex flex-col gap-4 p-4 sm:p-6 flex-1 overflow-y-auto">
                            <ul className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={() => setSheetOpen(false)}
                                            className={cn(
                                                "text-xl font-medium transition-colors relative group inline-block",
                                                link.isActive
                                                    ? "text-foreground"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {link.name}
                                            <span className={cn(
                                                "absolute bottom-0 left-0 h-px bg-current transition-all duration-300",
                                                link.isActive ? "w-full" : "w-0 group-hover:w-full"
                                            )} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex flex-col">
                                <a
                                    href="#"
                                    className="w-full sm:w-fit text-lg font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap py-2.5 px-4 text-center"
                                >
                                    {contactText}
                                </a>
                                <Button
                                    size="lg"
                                    className="rounded-lg h-auto py-2.5 px-4 w-full sm:w-fit bg-foreground text-background hover:bg-foreground/80 gap-2 cursor-pointer group"
                                >
                                    <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform duration-300" />
                                    {ctaText}
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 px-4 sm:px-6 pb-5">
                            <div className="flex items-center gap-3">
                                {socialLinks.map((link) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={link.label}
                                            href={link.url}
                                            aria-label={link.label}
                                            className="text-foreground hover:bg-muted border border-border p-3 transition-colors"
                                        >
                                            <Icon className="size-4" />
                                        </a>
                                    );
                                })}
                            </div>
                            <p className="text-sm text-muted-foreground">© 2026 default</p>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}
