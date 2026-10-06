'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';

interface PublishedStatusBadgeProps {
  isPublished: boolean;
  className?: string;
}

export function PublishedStatusBadge({
  isPublished,
  className,
}: PublishedStatusBadgeProps) {
  const t = useTranslations('status');

  return (
    <Badge
      variant={isPublished ? 'default' : 'secondary'}
      className={cn(className)}
    >
      {isPublished ? t('published') : t('draft')}
    </Badge>
  );
}
