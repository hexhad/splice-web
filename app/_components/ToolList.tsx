"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { ENTER, SWAP } from "./Reveal";

const TOOLS = [
  { name: "Delete marked parts", says: "Mark any number of parts, then remove every one of them in a single step. The gaps close up on their own." },
  { name: "Keep only", says: "The reverse: keep the parts you marked and drop everything around them." },
  { name: "Extract", says: "Save each marked part as a file of its own." },
  { name: "Record", says: "Record from the mic straight into the project, at the playhead or on a new track while the rest plays along." },
  { name: "Layer a track", says: "Put music under a voice. Drag a clip to move it, drag an edge to trim it." },
  { name: "Mixer", says: "Volume, mute and solo for every track, with the level in decibels." },
  { name: "Equaliser", says: "Four bands you drag on the curve, plus Voice, Podcast and Bass boost presets." },
  { name: "Speed", says: "Anywhere from 0.5× to 2×, keeping the pitch or letting it follow." },
  { name: "Fades", says: "Fade any clip in and out, on a linear or a smooth curve." },
  { name: "Insert silence", says: "Drop a pause in at the playhead when a sentence needs room." },
  { name: "Export", says: "M4A at 128, 192 or 256 kbps, or lossless 16-bit WAV. Save it or share it." },
];

export function ToolList() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const id = useId();
  const shown = TOOLS.filter((t) => `${t.name} ${t.says}`.toLowerCase().includes(query.trim().toLowerCase()));
  const current = Math.min(active, Math.max(0, shown.length - 1));

  return (
    <div data-ui className="tools">
      <label htmlFor={id} className="sr">
        Find a tool
      </label>
      <input
        id={id}
        className="tools-input heading"
        type="search"
        placeholder="Find a tool"
        autoComplete="off"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(shown.length - 1, a + 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          }
        }}
        aria-controls={`${id}-list`}
      />
      <ul id={`${id}-list`} className="tools-list">
        {shown.map((t, i) => (
          <motion.li
            key={t.name}
            className={i === current ? "on" : undefined}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ ...ENTER, delay: Math.min(i, 8) * 0.05 }}
          >
            <button
              type="button"
              aria-expanded={i === current}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              {i === current ? <motion.span layoutId="tool-on" className="tools-on" transition={SWAP} aria-hidden /> : null}
              <span className="tools-name">{t.name}</span>
              <span className="tools-says">{t.says}</span>
            </button>
          </motion.li>
        ))}
        {shown.length === 0 ? <li className="tools-none statement">Nothing by that name. Try “fade” or “EQ”.</li> : null}
      </ul>
    </div>
  );
}
