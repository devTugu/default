import { CsrfBootstrap } from '@/widgets/csrf-bootstrap/csrf-bootstrap';

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
