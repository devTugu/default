import { cn } from '@/shared/lib/utils';
import { GradientMeshBlobs } from './gradient-mesh-blobs';
import { meshBandClipStyle, meshBandShellClassName } from './mesh-band-layout';

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div aria-hidden className={cn(meshBandShellClassName, className)}>
      <div className="absolute inset-0" style={meshBandClipStyle}>
        <GradientMeshBlobs />
      </div>
    </div>
  );
}
