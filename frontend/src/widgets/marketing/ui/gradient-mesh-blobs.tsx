const MESH_BANDS = [
  { left: '-10%', width: '44%', colorVar: '--marketing-mesh-color-1' },
  { left: '16%', width: '40%', colorVar: '--marketing-mesh-color-2' },
  { left: '40%', width: '42%', colorVar: '--marketing-mesh-color-3' },
  { left: '66%', width: '38%', colorVar: '--marketing-mesh-color-4' },
] as const;

/**
 * Four diagonal color bands — mirrors Stripe's WebGL wave layers in CSS.
 * @see stripe-gradient-config.ts (4 colors) + vertex.glsl wave loop
 */
export function GradientMeshBlobs() {
  return (
    <>
      {MESH_BANDS.map((band) => (
        <div
          key={band.colorVar}
          className="absolute -top-[18%] h-[135%] -skew-y-12 blur-3xl opacity-80"
          style={{
            left: band.left,
            width: band.width,
            background: `linear-gradient(180deg, transparent 0%, var(${band.colorVar}) 28%, var(${band.colorVar}) 72%, transparent 100%)`,
          }}
        />
      ))}
    </>
  );
}
