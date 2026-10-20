// @ts-nocheck
import Logo from "../../assets/logo/logo";

export function TopbarLogo({ className }: { className?: string }) {
  return (
    <a href="#" className="inline-flex shrink-0 items-center">
      <Logo className={className ?? "h-10 w-auto"} aria-label="Home" />
    </a>
  );
}
