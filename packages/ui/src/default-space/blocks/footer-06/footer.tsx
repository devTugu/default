// @ts-nocheck
"use client";
import { Button } from "@default/ui/primitives/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@default/ui/lib/cn";
import Logo from "../../assets/logo/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";

const DribbbleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#footer06-dribbble-clip)">
      <path
        d="M15.942 4.242C12.683 7.617 8.333 8.7 1.874 9.117m16.25 1.583c-5.517-1.175-10.117.833-13.65 5.267M7.133 2.292c3.642 5 5 7.85 6.667 14.766M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="footer06-dribbble-clip">
        <path fill="currentColor" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#footer06-instagram-clip)">
      <path
        d="M12 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.413.56.218.96.478 1.38.898s.68.82.898 1.38c.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228a3.7 3.7 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.228-.413a3.7 3.7 0 0 1-1.38-.898c-.42-.42-.68-.82-.898-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38s.82-.68 1.38-.898c.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14c-.297.763-.5 1.635-.558 2.912C.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.912.307.79.717 1.459 1.384 2.126A5.9 5.9 0 0 0 4.14 23.37c.763.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.912-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.912a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63c-.763-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="footer06-instagram-clip">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const GithubIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#footer06-github-clip)">
      <path
        d="M12 0C5.37 0 0 5.377 0 12c0 5.305 3.438 9.802 8.203 11.388.602.113.82-.258.82-.579 0-.285-.007-1.039-.012-2.04-3.34.724-4.043-1.612-4.043-1.612-.547-1.384-1.336-1.755-1.336-1.755-1.086-.742.087-.726.087-.726 1.203.082 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.495.996.105-.773.418-1.305.758-1.601-2.663-.301-5.465-1.332-5.465-5.93 0-1.314.465-2.383 1.234-3.223-.133-.301-.54-1.523.106-3.176 0 0 1.004-.32 3.3 1.23a11.6 11.6 0 0 1 3-.405c1.02.006 2.039.14 3 .405 2.282-1.55 3.285-1.23 3.285-1.23.645 1.652.238 2.874.121 3.176.762.84 1.227 1.91 1.227 3.223 0 4.608-2.805 5.625-5.472 5.918.416.359.807 1.098.807 2.219 0 1.605-.015 2.898-.015 3.289 0 .312.21.687.828.566A11.95 11.95 0 0 0 24 12c0-6.625-5.371-12-12-12"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="footer06-github-clip">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

const LinkedinIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#footer06-linkedin-clip)">
      <path
        d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="footer06-linkedin-clip">
        <path d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

const socialLinks = [
  { icon: DribbbleIcon, href: "#" },
  { icon: InstagramIcon, href: "#" },
  { icon: GithubIcon, href: "#" },
  { icon: LinkedinIcon, href: "#" },
];

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1], // subtle cubic-bezier for premium feel
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 overflow-hidden" />
      </div>
      <div className="border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="border-x border-border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-12 p-6 lg:p-12 border-b md:border-b-0 md:border-r border-border"
              >
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground">
                  Ready to create something extraordinary? Let’s do it.
                </h2>
                <p className="text-base font-normal text-muted-foreground">
                  Let's create together
                </p>
              </motion.div>
              <div className="flex flex-col justify-between">
                <motion.div variants={itemVariants} className="p-6 lg:p-12">
                  <div className="flex flex-col gap-10">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="relative flex items-center">
                        <img
                          src="https://images.shadcnspace.com/assets/profiles/hero-4-img.png"
                          alt="user-img"
                          width={80}
                          height={80}
                          className="rounded-full relative z-10"
                        />
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                              },
                            },
                          }}
                          className="flex items-center gap-1 ml-2 relative z-0"
                        >
                          <motion.div
                            variants={{
                              hidden: { x: 40, opacity: 0 },
                              visible: { x: 0, opacity: 1 },
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-10 h-20 overflow-hidden shrink-0 -rotate-180"
                          >
                            <div className="w-20 h-20 rounded-full bg-orange-400" />
                          </motion.div>
                          <motion.div
                            variants={{
                              hidden: { x: 60, opacity: 0 },
                              visible: { x: 0, opacity: 1 },
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-7 h-20 overflow-hidden shrink-0 -rotate-180"
                          >
                            <div className="w-20 h-20 rounded-full bg-orange-400" />
                          </motion.div>
                          <motion.div
                            variants={{
                              hidden: { x: 80, opacity: 0 },
                              visible: { x: 0, opacity: 1 },
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="w-3.5 h-20 overflow-hidden shrink-0 -rotate-180"
                          >
                            <div className="w-20 h-20 rounded-full bg-orange-400" />
                          </motion.div>
                        </motion.div>
                      </div>
                      <div>
                        <p className="text-xl font-medium text-foreground">
                          Bianca Doe
                        </p>
                        <p className="text-lg font-normal text-muted-foreground">
                          Front-end Developer
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 lg:gap-3">
                      <p className="text-base text-muted-foreground font-normal">
                        Contact me
                      </p>
                      <a
                        href="mailto:info@shadcnspace.com"
                        className="text-2xl lg:text-3xl font-medium text-foreground hover:text-foreground/80"
                      >
                        info@shadcnspace.com
                      </a>
                    </div>
                    <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden hover:cursor-pointer hover:bg-primary/80">
                      <span className="relative z-10 transition-all duration-500">
                        Book a Call
                      </span>
                      <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                        <ArrowUpRight size={16} />
                      </div>
                    </Button>
                  </div>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-4 min-h-20 border-t border-border"
                >
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={cn(
                        "py-8 lg:py-12 flex items-center justify-center hover:bg-muted/50 transition-colors",
                        index !== socialLinks.length - 1 &&
                          "border-r border-border",
                      )}
                    >
                      <link.icon />
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
            <motion.div
              variants={itemVariants}
              className="border-t border-border flex flex-col md:flex-row items-center justify-between gap-1 px-6 lg:px-12 py-8"
            >
              <a href="#">
                <Logo />
              </a>
              <p className="text-sm font-normal text-muted-foreground">
                © 2026 shadcnspace. All Rights Reserved.
              </p>
              <div className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground">
                <p>Designed by</p>
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={
                      "https://images.shadcnspace.com/assets/profiles/hero-4-img.png"
                    }
                  />
                  <AvatarFallback>{"SS"}</AvatarFallback>
                </Avatar>
                <p>default</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        <div className="border-x border-border px-5 md:px-8 py-8 overflow-hidden" />
      </div>
    </motion.footer>
  );
};

export default Footer;
