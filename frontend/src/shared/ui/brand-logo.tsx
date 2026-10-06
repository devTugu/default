'use client';

import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

interface BrandLogoProps {
  name: string;
  logoUrl?: string | null;
  logoDarkUrl?: string | null;
  className?: string;
  imageClassName?: string;
  showName?: boolean;
}

export function BrandLogo({
  name,
  logoUrl,
  logoDarkUrl,
  className,
  imageClassName,
  showName = true,
}: BrandLogoProps) {
  const lightSrc = logoUrl ?? logoDarkUrl;
  const darkSrc = logoDarkUrl ?? logoUrl;

  if (!lightSrc && !darkSrc) {
    if (!showName) return null;
    return (
      <span className={cn('truncate font-semibold tracking-tight', className)}>
        {name}
      </span>
    );
  }

  const sharedImageClass = cn('h-8 w-auto max-w-[140px] object-contain', imageClassName);

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {lightSrc ? (
        <Image
          src={lightSrc}
          alt={name}
          width={140}
          height={32}
          className={cn(sharedImageClass, darkSrc !== lightSrc && 'dark:hidden')}
          unoptimized
        />
      ) : null}
      {darkSrc && darkSrc !== lightSrc ? (
        <Image
          src={darkSrc}
          alt={name}
          width={140}
          height={32}
          className={cn(sharedImageClass, 'hidden dark:block')}
          unoptimized
        />
      ) : null}
      {showName ? (
        <span className="truncate font-semibold tracking-tight">{name}</span>
      ) : null}
    </span>
  );
}
