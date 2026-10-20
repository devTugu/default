// @ts-nocheck
import Logo from "../../assets/logo/logo";
import { Separator } from "@default/ui/primitives/separator";
import { ArrowRight } from "lucide-react";
import { Input } from "@default/ui/primitives/input";
import { Button } from "@default/ui/primitives/button";
import SubFooter from "./subfooter";

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.791 2.188 8.46 5.996 5.58 2.188H1.408l4.984 6.518-4.723 5.399H3.69l3.646-4.166 3.187 4.166h4.068l-5.196-6.87 4.417-5.047zm-.71 10.707L3.77 3.335h1.2l7.23 9.56z" fill="currentColor" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#footer04-linkedin-clip)">
      <path d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="footer04-linkedin-clip">
        <path d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

const DribbbleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#footer04-dribbble-clip)">
      <path d="M15.942 4.242C12.683 7.617 8.333 8.7 1.874 9.117m16.25 1.583c-5.517-1.175-10.117.833-13.65 5.267M7.133 2.292c3.642 5 5 7.85 6.667 14.766M18.333 10a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="footer04-dribbble-clip">
        <path fill="currentColor" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#footer04-instagram-clip)">
      <path d="M12 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.413.56.218.96.478 1.38.898s.68.82.898 1.38c.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228a3.7 3.7 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.228-.413a3.7 3.7 0 0 1-1.38-.898c-.42-.42-.68-.82-.898-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38s.82-.68 1.38-.898c.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14c-.297.763-.5 1.635-.558 2.912C.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.912.307.79.717 1.459 1.384 2.126A5.9 5.9 0 0 0 4.14 23.37c.763.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.912-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.912a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63c-.763-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0" fill="currentColor" />
    </g>
    <defs>
      <clipPath id="footer04-instagram-clip">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

type FooterData = {
  title: string;
  links: {
    title: string;
    href: string;
  }[];
};

const footerSections: FooterData[] = [
  {
    title: "Quick Links",
    links: [
      {
        title: "Default UI Blocks & Templates",
        href: "#",
      },
      {
        title: "React Templates",
        href: "#",
      },
      {
        title: "Leadership Team",
        href: "#",
      },
      {
        title: "Our Vision & Mission",
        href: "#",
      },
      {
        title: "Default Premium Components",
        href: "#",
      },
    ],
  },
  {
    title: "Media & Resources",
    links: [
      {
        title: "News / Press Release",
        href: "#",
      },
      {
        title: "Insights & Blogs",
        href: "#",
      },
      {
        title: "Media",
        href: "#",
      },
      {
        title: "Case Studies",
        href: "#",
      },
      {
        title: "Press Kit",
        href: "#",
      },
    ],
  },
  {
    title: "Our Services",
    links: [
      {
        title: "Web Design & Development",
        href: "#",
      },
      {
        title: "Search Engine Optimization & SEM",
        href: "#",
      },
      {
        title: "Mobile & Web Application",
        href: "#",
      },
      {
        title: "Branding & Identity",
        href: "#",
      },
      {
        title: "Digital Marketing",
        href: "#",
      },
    ],
  },
  {
    title: "Other",
    links: [
      {
        title: "Contact us",
        href: "#",
      },
      {
        title: "Careers",
        href: "#",
      },
      {
        title: "Events",
        href: "#",
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="lg:pt-20 sm:pt-16 pt-8">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto ">
        <div className="flex flex-col gap-6 sm:gap-12 md:mb-12 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-12 lg:gap-x-8 gap-y-10 px-6 xl:px-0">
            <div className="col-span-full lg:col-span-3">
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                {/* Logo */}
                <a href="#">
                  <Logo />
                </a>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 grid sm:grid-cols-2 grid-cols-1 gap-6 gap-y-10">
              {footerSections.map(({ title, links }, index) => (
                <div key={index}>
                  <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                    <p className="text-base font-medium text-foreground">
                      {title}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {links.map(({ title, href }) => (
                        <li key={title}>
                          <a
                            href={href}
                            className="text-sm font-normal text-muted-foreground hover:text-foreground duration-200"
                          >
                            {title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-3 col-span-12">
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
                <p className="text-sm text-muted-foreground">
                  Stay Connected
                </p>
                <h3 className="text-lg font-medium text-foreground">
                  Subscribe to our Newsletter for the latest news
                </h3>
                <form className="flex items-center gap-2">
                  <Input type="email" placeholder="Enter your email" className="py-2 px-4 h-9 shadow-xs rounded-full text-sm" />
                  <Button type="submit" className="rounded-full p-2.5 h-auto">
                    <ArrowRight width={16} height={16} />
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex items-center justify-between md:flex-nowrap flex-wrap gap-6">
            <div className="flex items-center flex-wrap gap-y-2 gap-x-3 text-sm font-normal text-muted-foreground animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100 ease-in-out fill-mode-both">
              <p>©2026 default. All Rights Reserved.</p>
              <span className="size-1 rounded-full bg-muted-foreground/50" />
              <a href="#" className="hover:text-foreground duration-200">
                Terms & Conditions
              </a>
              <span className="size-1 rounded-full bg-muted-foreground/50" />
              <a href="#" className="hover:text-foreground duration-200">
                Privacy policy
              </a>
              <span className="size-1 rounded-full bg-muted-foreground/50" />
              <a href="#" className="hover:text-foreground duration-200">
                Sitemap
              </a>
            </div>
            {/* social links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-foreground"
              >
                <TwitterIcon />
              </a>
              <a
                href="#"
                className="text-foreground"
              >
                <LinkedinIcon />
              </a>
              <a
                href="#"
                className="text-foreground"
              >
                <DribbbleIcon />
              </a>
              <a
                href="#"
                className="text-foreground"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
        <SubFooter />
      </div>
    </footer>
  );
};

export default Footer;
