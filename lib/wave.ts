export type Region = { start: number; end: number };

export const BARS_PER_SECOND = 12;

// Seeded so the server and the browser draw the same waveform.
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function beatWave(seconds: number, seed = 7): number[] {
  const rand = seeded(seed);
  const count = Math.round(seconds * BARS_PER_SECOND);
  return Array.from({ length: count }, (_, i) => {
    const t = i / BARS_PER_SECOND;
    const sinceBeat = t % 0.5;
    const accent = Math.floor(t / 0.5) % 4 === 0 ? 1 : 0.82;
    const decay = Math.exp(-sinceBeat / 0.16);
    return Math.max(0.06, accent * (0.18 + 0.82 * decay) * (0.86 + rand() * 0.14));
  });
}

export function voiceWave(seconds: number, seed = 11): number[] {
  const rand = seeded(seed);
  const count = Math.round(seconds * BARS_PER_SECOND);
  return Array.from({ length: count }, (_, i) => {
    const phrase = Math.sin((i / count) * Math.PI * 9) * 0.5 + 0.5;
    return Math.max(0.05, 0.2 + phrase * 0.55 * (0.6 + rand() * 0.4));
  });
}

export const snap = (s: number) => Math.round(s * 10) / 10;

export function formatTime(s: number, tenths = true) {
  const safe = Math.max(0, s);
  const m = Math.floor(safe / 60);
  const rest = safe - m * 60;
  const sec = tenths ? rest.toFixed(1).padStart(4, "0") : String(Math.floor(rest)).padStart(2, "0");
  return `${m}:${sec}`;
}

export function mergeRegions(list: Region[]): Region[] {
  const sorted = [...list].sort((a, b) => a.start - b.start);
  const out: Region[] = [];
  for (const r of sorted) {
    const last = out[out.length - 1];
    if (last && r.start <= last.end) last.end = Math.max(last.end, r.end);
    else out.push({ ...r });
  }
  return out;
}

export const regionLength = (list: Region[]) =>
  list.reduce((sum, r) => sum + (r.end - r.start), 0);
