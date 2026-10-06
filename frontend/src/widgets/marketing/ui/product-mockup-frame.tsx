import { cn } from '@/shared/lib/utils';

interface ProductMockupFrameProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

export function ProductMockupFrame({
  className,
  title = 'Dashboard',
  children,
}: ProductMockupFrameProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
        <div className="size-2.5 rounded-full bg-red-400/80" />
        <div className="size-2.5 rounded-full bg-amber-400/80" />
        <div className="size-2.5 rounded-full bg-emerald-400/80" />
        <span className="text-muted-foreground ml-2 text-xs font-medium">{title}</span>
      </div>
      <div className="bg-muted/20 p-4">{children ?? <MockupPlaceholder />}</div>
    </div>
  );
}

function MockupPlaceholder() {
  return (
    <div className="space-y-3">
      <div className="bg-muted/60 h-8 w-1/3 rounded-md" />
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-muted/40 h-16 rounded-md" />
        <div className="bg-muted/40 h-16 rounded-md" />
        <div className="bg-muted/40 h-16 rounded-md" />
      </div>
      <div className="bg-muted/30 h-24 rounded-md" />
      <div className="bg-muted/30 h-32 rounded-md" />
    </div>
  );
}
