// Splice launcher icon, from audio/app/src/main/res/drawable/ic_launcher_{background,foreground}.xml.
// The adaptive icon is 108 units with a 72-unit visible area; the viewBox crops to that area.
export const SPLICE_TILE = "#4C1E01";
export const SPLICE_EMBER = "#FF7716";
export const SPLICE_BARS =
  "M32 48.9v10.2M36.4 45.5v17M40.8 47.2v13.6M45.2 42.1v23.8M49.6 38.7v30.6M54 37v34M58.4 38.7v30.6M62.8 42.1v23.8M67.2 47.2v13.6M71.6 45.5v17M76 48.9v10.2";

export function SpliceIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="18 18 72 72" width={size} height={size} className={className} aria-hidden focusable="false">
      <rect x="18" y="18" width="72" height="72" rx="16" fill={SPLICE_TILE} />
      <path d={SPLICE_BARS} fill="none" stroke={SPLICE_EMBER} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
