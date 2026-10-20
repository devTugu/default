import type { Metadata } from 'next';
import { CsrfBootstrap } from '@/widgets/csrf-bootstrap/csrf-bootstrap';
import { privateRouteMetadata } from '@/shared/seo/private-route-metadata';

export const metadata: Metadata = privateRouteMetadata('Sign in');

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CsrfBootstrap />
      {children}
    </>
  );
}
