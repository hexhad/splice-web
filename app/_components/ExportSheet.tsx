"use client";

import { useId, useState } from "react";
import { PLAY_URL } from "@/lib/links";

const SECONDS = 4 * 60 + 36;
const RATES = [128, 192, 256] as const;

export function ExportSheet() {
  const [name, setName] = useState("Interview, take 2");
  const [format, setFormat] = useState<"m4a" | "wav">("m4a");
  const [rate, setRate] = useState<(typeof RATES)[number]>(192);
  const id = useId();

  const mb = format === "wav" ? (SECONDS * 44100 * 2 * 2) / 1_000_000 : (SECONDS * rate * 1000) / 8 / 1_000_000;
  const file = `${name.trim() || "Untitled"}.${format}`;

  return (
    <div data-ui className="sheet">
      <span className="sheet-grip" aria-hidden />
      <p className="sheet-title">Export</p>

      <div className="sheet-field">
        <label htmlFor={id}>File name</label>
        <input id={id} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
      </div>

      <p className="sheet-label">Format</p>
      <div className="sheet-seg" role="radiogroup" aria-label="Format">
        {(["m4a", "wav"] as const).map((f) => (
          <button key={f} type="button" role="radio" aria-checked={format === f} onClick={() => setFormat(f)}>
            {format === f ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden className="sheet-check">
                <path d="M5 12.5 10 17.5 19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
            {f === "m4a" ? "M4A (AAC)" : "WAV (16-bit)"}
          </button>
        ))}
      </div>

      {format === "m4a" ? (
        <>
          <p className="sheet-label">Quality</p>
          <div className="sheet-chips" role="radiogroup" aria-label="Quality">
            {RATES.map((r) => (
              <button key={r} type="button" role="radio" aria-checked={rate === r} onClick={() => setRate(r)}>
                {r} kbps
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="sheet-hint">Lossless, 44.1 kHz stereo. About 10 MB per minute.</p>
      )}

      <p className="sheet-size">
        <span className="mono">{file}</span>
        <span className="mono">
          4:36 · {mb.toFixed(1)} MB
        </span>
      </p>

      <a className="sheet-go" href={PLAY_URL}>
        Get Splice on Google Play
      </a>
    </div>
  );
}
