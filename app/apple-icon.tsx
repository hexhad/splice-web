import { ImageResponse } from "next/og";
import { SPLICE_BARS, SPLICE_EMBER, SPLICE_TILE } from "./_components/SpliceIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so the tile is square here.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: SPLICE_TILE }}>
        <svg viewBox="18 18 72 72" width="180" height="180">
          <path d={SPLICE_BARS} fill="none" stroke={SPLICE_EMBER} strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
