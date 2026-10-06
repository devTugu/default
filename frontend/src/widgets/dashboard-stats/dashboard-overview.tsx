'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  KeyRound,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useDashboardStats } from '@/entities/dashboard';
import { useAuthPermissions } from '@/features/auth';
import { useAuthStore } from '@/features/auth/model/store';
import { PERMISSION_CODES } from '@/shared/config/permissions';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';
import type { AppMessages } from '@/shared/i18n/messages';
import { cn } from '@/shared/lib/utils';

type NavTitleKey = keyof AppMessages['nav'];

interface StatCardProps {
  title: string;
  value: number;
  loading: boolean;
  icon: LucideIcon;
  href?: string;
  accent?: 'blue' | 'violet' | 'amber';
}

const accentStyles = {
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
} as const;

function StatCard({
  title,
  value,
  loading,
  icon: Icon,
  href,
  accent = 'blue',
}: StatCardProps) {
  const t = useTranslations('dashboard');

  const card = (
    <Card
      className={cn(
        'gap-4 py-4',
        href && 'hover:border-primary/40 hover:bg-muted/20 transition-colors',
      )}
    >
      <CardHeader className="px-4">
        <CardDescription className="line-clamp-1">{title}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums">
          {loading ? <Skeleton className="h-8 w-14" /> : value}
        </CardTitle>
        <CardAction>
          <div
            className={cn(
              'flex size-9 items-center justify-center rounded-lg',
              accentStyles[accent],
            )}
          >
            <Icon className="size-4" aria-hidden />
          </div>
        </CardAction>
        {href ? (
          <span className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
            {t('view')}
            <ArrowRight className="size-3" aria-hidden />
          </span>
        ) : null}
      </CardHeader>
    </Card>
  );

  if (!href) {
    return card;
  }

  return (
    <Link
      href={href}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {card}
    </Link>
  );
}

interface QuickAction {
  labelKey: NavTitleKey;
  href: string;
  icon: LucideIcon;
  permission: (typeof PERMISSION_CODES)[keyof typeof PERMISSION_CODES];
}

const quickActions: QuickAction[] = [
  {
    labelKey: 'siteSettings',
    href: ROUTES.SITE_SETTINGS,
    icon: Settings,
    permission: PERMISSION_CODES.SITE_SETTING_READ,
  },
  {
    labelKey: 'users',
    href: ROUTES.USERS,
    icon: Users,
    permission: PERMISSION_CODES.USER_READ,
  },
];

export function DashboardOverview() {
  const t = useTranslations('dashboard');
  const tNav = useTranslations('nav');
  const { can } = useAuthPermissions();
  const user = useAuthStore((state) => state.user);
  const { data: stats, isLoading } = useDashboardStats();

  const visibleQuickActions = quickActions.filter((action) =>
    can(action.permission),
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <LayoutDashboard className="text-muted-foreground size-6" aria-hidden />
            {t('title')}
          </CardTitle>
          <CardDescription>
            {user?.email ? t('welcome', { email: user.email }) : t('subtitle')}
          </CardDescription>
        </CardHeader>
        {visibleQuickActions.length > 0 ? (
          <CardContent className="flex flex-wrap gap-2">
            {visibleQuickActions.map((action) => (
              <Button key={action.href} variant="secondary" size="sm" asChild>
                <Link href={action.href}>
                  <action.icon className="size-4" aria-hidden />
                  {tNav(action.labelKey)}
                </Link>
              </Button>
            ))}
          </CardContent>
        ) : null}
      </Card>

      <section className="space-y-3">
        <div>
          <h3 className="text-sm font-medium">{t('sectionSystem')}</h3>
          <p className="text-muted-foreground text-sm">
            {t('sectionSystemDescription')}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {can(PERMISSION_CODES.USER_READ) ? (
            <StatCard
              title={t('users')}
              value={stats?.users ?? 0}
              loading={isLoading}
              icon={Users}
              href={ROUTES.USERS}
              accent="blue"
            />
          ) : null}
          {can(PERMISSION_CODES.ROLE_READ) ? (
            <StatCard
              title={t('roles')}
              value={stats?.roles ?? 0}
              loading={isLoading}
              icon={Shield}
              href={ROUTES.ROLES}
              accent="violet"
            />
          ) : null}
          {can(PERMISSION_CODES.PERMISSION_READ) ? (
            <StatCard
              title={t('permissions')}
              value={stats?.permissions ?? 0}
              loading={isLoading}
              icon={KeyRound}
              href={ROUTES.PERMISSIONS}
              accent="amber"
            />
          ) : null}
        </div>
      </section>
      <Separator />
    </div>
  );
}
