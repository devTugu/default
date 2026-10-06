import Image from 'next/image';
import {
  type LayoutBleed,
  resolveBleedClasses,
  resolveLayerClasses,
} from '@/widgets/marketing/lib/marketing/grid-layout';
import { cn } from '@/shared/lib/utils';

interface MarketingLayoutMediaProps {
  src: string;
  alt: string;
  bleed?: LayoutBleed;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

/** Grid-aligned media with optional bleed onto column guide lines. */
export function MarketingLayoutMedia({
  src,
  alt,
  bleed = 'none',
  className,
  imageClassName,
  priority = false,
}: MarketingLayoutMediaProps) {
  return (
    <div
      className={cn(
        'overflow-visible',
        resolveLayerClasses('media'),
        resolveBleedClasses(bleed),
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized
          className={cn('object-cover', imageClassName)}
          sizes="(max-width: 1024px) 100vw, 540px"
        />
      </div>
    </div>
  );
}
