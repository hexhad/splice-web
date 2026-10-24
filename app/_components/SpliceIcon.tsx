// Splice app icon (Night Glass), exported from audio/play-store/brand/build_icon.py.
// Square artwork; the rounding comes from CSS so it can match each size.
export function SpliceIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static icon, no need for the image optimiser
    <img src="/splice-icon.webp" width={size} height={size} alt="" aria-hidden className={`splice-icon ${className ?? ""}`} />
  );
}
