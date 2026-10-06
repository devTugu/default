import { Skeleton } from '@/shared/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full max-w-sm" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
