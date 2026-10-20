import type { Metadata } from 'next';
import { privateRouteMetadata } from '@/shared/seo/private-route-metadata';
import { DashboardLayoutClient } from './dashboard-layout-client';

export const metadata: Metadata = privateRouteMetadata('Admin');

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
