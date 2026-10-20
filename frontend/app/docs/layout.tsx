import type { Metadata } from "next";
import { DocsPromoBar } from "@/features/docs/components/DocsPromoBar";
import { DocsSpaceShell } from "@/features/docs/components/DocsSpaceShell";
import "./docs.css";

export const metadata: Metadata = {
  title: "Design system docs",
  description: "@default/ui component documentation",
  robots: { index: false, follow: false },
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocsPromoBar />
      <DocsSpaceShell>{children}</DocsSpaceShell>
    </>
  );
}
