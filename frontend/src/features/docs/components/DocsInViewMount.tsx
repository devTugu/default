"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { DocsPreviewSkeleton } from "./DocsPreviewSkeleton";

type DocsInViewMountProps = {
  children: ReactNode;
  skeletonClassName?: string;
  rootMargin?: string;
};

export function DocsInViewMount({
  children,
  skeletonClassName,
  rootMargin = "200px 0px",
}: DocsInViewMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className="min-w-0">
      {visible ? children : <DocsPreviewSkeleton className={skeletonClassName} />}
    </div>
  );
}
