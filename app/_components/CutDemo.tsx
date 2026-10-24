"use client";

import { useMemo, useRef, useState } from "react";
import { BARS_PER_SECOND, type Region, formatTime, mergeRegions, regionLength, snap, voiceWave } from "@/lib/wave";

const SOURCE_SECONDS = 24;
const SOURCE = voiceWave(SOURCE_SECONDS);
const START: Region[] = [
  { start: 3.2, end: 5.1 },
  { start: 13.4, end: 14.8 },
];

type Draft = { anchor: number; now: number } | null;

export function CutDemo() {
  const [bars, setBars] = useState(SOURCE);
  const [regions, setRegions] = useState<Region[]>(START);
  const [draft, setDraft] = useState<Draft>(null);
  const [note, setNote] = useState("Drag across the waveform to mark a part.");
  const stage = useRef<HTMLDivElement>(null);

  const total = bars.length / BARS_PER_SECOND;
  const selected = regionLength(regions);
  const ticks = useMemo(() => Array.from({ length: Math.floor(total / 5) + 1 }, (_, i) => i * 5), [total]);

  const toSeconds = (clientX: number) => {
    const box = stage.current!.getBoundingClientRect();
    return snap(Math.min(total, Math.max(0, ((clientX - box.left) / box.width) * total)));
  };

  const commit = (r: Region) => {
    if (r.end - r.start < 0.3) return;
    setRegions((prev) => mergeRegions([...prev, r]));
    setNote("Mark as many parts as you need, then cut them together.");
  };

  const cut = (keep: boolean) => {
    if (!regions.length) return;
    const inside = (i: number) => regions.some((r) => i / BARS_PER_SECOND >= r.start && i / BARS_PER_SECOND < r.end);
    setBars((prev) => prev.filter((_, i) => (keep ? inside(i) : !inside(i))));
    setNote(
      keep
        ? `Kept ${regions.length} part${regions.length === 1 ? "" : "s"}, ${formatTime(selected)} in all.`
        : `Removed ${formatTime(selected)} in one step. The gaps closed with a 2 ms fade at each seam.`,
    );
    setRegions([]);
  };

  const reset = () => {
    setBars(SOURCE);
    setRegions(START);
    setNote("Drag across the waveform to mark a part.");
  };

  const markNext = () => {
    const free = [2, 8, 18, 10, 20].find((s) => s + 1.5 <= total && !regions.some((r) => s < r.end && s + 1.5 > r.start));
    if (free !== undefined) commit({ start: free, end: free + 1.5 });
  };

  const shown = draft
    ? [...regions, { start: Math.min(draft.anchor, draft.now), end: Math.max(draft.anchor, draft.now) }]
    : regions;
  const edited = bars !== SOURCE || regions !== START;

  return (
    <div data-ui className="cut glass" aria-label="A working copy of the Splice editor">
      <div className="cut-head">
        <span className="cut-title">Interview, take 2</span>
        {edited ? (
          <button type="button" className="cut-ghost" onClick={reset}>
            Reset
          </button>
        ) : null}
      </div>

      <div className="cut-time">
        <span className="mono cut-total">{formatTime(total)}</span>
        {selected > 0 ? <span className="mono cut-selected">{formatTime(selected)} selected</span> : null}
      </div>

      <div className="cut-ruler mono" aria-hidden>
        {ticks.map((t) => (
          <span key={t} style={{ left: `${(t / total) * 100}%` }}>
            {formatTime(t, false)}
          </span>
        ))}
      </div>

      <div
        ref={stage}
        className="cut-stage"
        role="application"
        tabIndex={0}
        aria-label={`Waveform, ${formatTime(total)} long, ${regions.length} marked parts. Drag to mark a part, or press Enter to mark one.`}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          const s = toSeconds(e.clientX);
          setDraft({ anchor: s, now: s });
        }}
        onPointerMove={(e) => draft && setDraft({ ...draft, now: toSeconds(e.clientX) })}
        onPointerUp={() => {
          if (draft) commit({ start: Math.min(draft.anchor, draft.now), end: Math.max(draft.anchor, draft.now) });
          setDraft(null);
        }}
        onPointerCancel={() => setDraft(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            markNext();
          }
        }}
      >
        <svg viewBox={`0 0 ${bars.length} 100`} preserveAspectRatio="none" aria-hidden>
          {bars.map((a, i) => (
            <rect key={i} x={i + 0.18} width={0.64} y={50 - a * 46} height={a * 92} rx={0.3} />
          ))}
        </svg>
        <i className="cut-play" aria-hidden />
        {shown.map((r, i) => (
          <div
            key={`${r.start}-${i}`}
            className="cut-region"
            style={{ left: `${(r.start / total) * 100}%`, width: `${((r.end - r.start) / total) * 100}%` }}
          >
            <span className="mono">{i + 1}</span>
            <i className="cut-handle" style={{ left: -3 }} />
            <i className="cut-handle" style={{ right: -3 }} />
          </div>
        ))}
      </div>

      <ul className="cut-chips" aria-label="Marked parts">
        {regions.map((r, i) => (
          <li key={`${r.start}-${r.end}`} className="cut-chip">
            <span className="mono">
              {i + 1}&nbsp;&nbsp;{formatTime(r.start)} - {formatTime(r.end)}
            </span>
            <button
              type="button"
              aria-label={`Unmark part ${i + 1}`}
              onClick={() => setRegions((prev) => prev.filter((x) => x !== r))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <div className="cut-actions">
        <button type="button" className="cut-act cut-delete" disabled={!regions.length} onClick={() => cut(false)}>
          Delete {regions.length || ""}
        </button>
        <button type="button" className="cut-act" disabled={!regions.length} onClick={() => cut(true)}>
          Keep only
        </button>
      </div>

      <p className="cut-note" aria-live="polite">
        {note}
      </p>
    </div>
  );
}
