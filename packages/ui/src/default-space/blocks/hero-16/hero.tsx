"use client";
import { Button } from "@default/ui/primitives/button";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { motion } from "motion/react";

export interface BrandList {
    image: string;
    name: string;
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98] as const,
        },
    },
};

type HeroSectionProps = {
    getStartedHref?: string;
};

const HeroSection = ({ getStartedHref = "#" }: HeroSectionProps) => {
    return (
        <section className="border-y border-border">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
                <div className="border-x border-border">
                    <div className="relative py-10 md:py-20 px-4 lg:px-10 overflow-hidden">
                        <video
                            className="absolute w-full h-full object-cover -z-10 opacity-50 sm:opacity-100 left-0 sm:left-auto sm:-right-36 top-0 dark:hidden"
                            autoPlay
                            loop
                            muted
                            aria-label="Video background showing luxurious real estate"
                        >
                            <source src="https://images.shadcnspace.com/assets/video/hero-16-vid-white.mp4" type="video/mp4" />
                        </video>

                        <video
                            className="absolute w-full h-full object-cover -z-10 opacity-50 sm:opacity-100 inset-0 left-0 sm:left-auto sm:-right-36 top-0 hidden dark:block"
                            autoPlay
                            loop
                            muted
                            aria-label="Video background showing luxurious real estate"
                        >
                            <source src="https://images.shadcnspace.com/assets/video/hero-16-vid.mp4" type="video/mp4" />
                        </video>

                        <div className="max-w-lg flex flex-col gap-12 md:gap-40">
                            <div className="flex flex-col gap-4 sm:gap-6">
                                <motion.div variants={itemVariants} className="w-fit bg-background flex items-center gap-1.5 border border-border py-1 px-3 rounded-full">
                                    <div className="w-1 h-1 rounded-full bg-teal-400" />
                                    <p className="text-sm font-normal text-foreground">Announcing API 1.0</p>
                                    <ArrowRight size={16} className="text-foreground" />
                                </motion.div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-foreground">Transforming Business with Intelligent AI</h1>
                                <p className="text-base text-muted-foreground font-normal">Seamlessly integrate powerful insights into your workflow and transform complex data into clear, confident decisions.</p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button asChild className="group cursor-pointer h-auto px-4 py-2 rounded-full flex items-center gap-1.5 hover:bg-primary/80">
                                        <a
                                            href={getStartedHref}
                                            className="inline-flex items-center gap-1.5"
                                        >
                                            Get Started
                                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="cursor-pointer h-auto px-4 py-2 rounded-full flex items-center gap-1.5">
                                        <img src="https://images.shadcnspace.com/assets/svgs/google-icon.svg" alt="Google" width={16} height={16} />
                                        Sign in with Google</Button>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-6 gap-y-2">
                                <div className="flex items-center">
                                    {["https://images.shadcnspace.com/assets/profiles/rough.webp", "https://images.shadcnspace.com/assets/profiles/jessica.webp", "https://images.shadcnspace.com/assets/profiles/albert.webp"]?.map((image, index) => (
                                        <img key={index} src={image} alt="Profile" width={40} height={40} className="rounded-full border-2 border-white  -mr-3" />
                                    ))}
                                </div>
                                <p className="text-muted-foreground max-w-52 leading-snug">
                                    <span className="inline-flex items-center gap-1 align-middle">
                                        Rated <Star size={16} className="text-foreground fill-foreground" />
                                        <strong>4.2</strong>
                                    </span>{" "}
                                    by founders, builders and teams
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection