// @ts-nocheck
import { Separator } from "@default/ui/primitives/separator";
import Logo from "../../assets/logo/logo";

const footernavItems = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#" },
  { label: "Project", href: "#" },
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <>
      <div className="py-6 md:py-10 max-w-7xl mx-auto border-x" />
      <footer className="border-y">
        <div className="max-w-7xl mx-auto border-x px-6 py-12 md:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-12 md:gap-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 justify-between items-start lg:items-center">
              <Logo />
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-x-12">
                {footernavItems.map((item, index) => (
                  <a
                    key={index}
                    className="text-base font-medium transition-colors p-0 focus:bg-transparent hover:text-muted-foreground text-foreground"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <Separator className="mb-0 border-t" />
            <div className="flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-between text-center md:text-left">
              <p className="text-base text-muted-foreground">
                © 2026 shadcnspace. All Rights Reserved.
              </p>
              <p className="text-base transition-colors text-muted-foreground">
                Designed by{" "}
                <a href="#" className="hover:text-foreground">
                  shadcnspace
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="py-6 md:py-10 max-w-7xl mx-auto border-x" />
    </>
  );
}
