import Link from "next/link";

export function DocsPromoBar() {
  return (
    <div className="border-b border-[var(--border)] bg-[var(--foreground)] text-[var(--background)]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-2 text-xs md:px-6">
        <p className="min-w-0 truncate">
          <span className="font-medium">New</span>
          <span className="mx-1 opacity-70">(update: 6th Oct)</span>
          @default/ui blocks &amp; components — preview and copy from the catalog.
        </p>
        <Link href="/docs/blocks" className="shrink-0 font-medium underline-offset-4 hover:underline">
          Browse blocks
        </Link>
      </div>
    </div>
  );
}
