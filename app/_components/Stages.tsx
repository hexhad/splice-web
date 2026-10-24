"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useId, useRef, useState } from "react";
import { Reveal, SWAP } from "./Reveal";
import layers from "@/public/shots/layers.webp";
import cut from "@/public/shots/cut.webp";
import eq from "@/public/shots/eq.webp";
import exportShot from "@/public/shots/export.webp";

type Stage = {
  name: string;
  clause: [string, string];
  says: string;
  shot: StaticImageData;
  alt: string;
};

const STAGES: Stage[] = [
  {
    name: "Bring it in",
    clause: ["First, bring in", "your recordings"],
    says: "Pick one file or several from the system picker, choose “Edit in Splice” from another app, or record straight in. Layer them on new tracks or join them on the main one.",
    shot: layers,
    alt: "The Splice editor for Morning Session: the main recording, with a second track, Interview Take 2, layered underneath it.",
  },
  {
    name: "Mark",
    clause: ["Then mark every", "part to lose"],
    says: "Drag across the waveform once per part. Nudge any edge by a tenth of a second with the plus and minus buttons.",
    shot: cut,
    alt: "The Splice editor with two parts of Morning Session marked, 16.9 seconds selected, and Delete 2, Keep only, Extract, Add audio and Record along the bottom.",
  },
  {
    name: "Shape",
    clause: ["Shape the sound", "track by track"],
    says: "Open a track's equaliser and drag its four points, or start from a preset such as Voice.",
    shot: eq,
    alt: "Splice's equaliser for the main track: four points on the curve, the low mid band at 500 Hz raised 1.5 dB, and the Flat, Voice, Podcast and Bass boost presets.",
  },
  {
    name: "Export",
    clause: ["Last, save it", "or share it"],
    says: "Name the file, choose M4A or WAV, and save it where you like or hand it to another app.",
    shot: exportShot,
    alt: "Splice's Export sheet: file name Morning Session, format M4A (AAC) at 192 kbps, with Share and Save to buttons.",
  },
];

export function Stages() {
  const [at, setAt] = useState(1);
  const id = useId();
  const stage = STAGES[at];

  // The phone drifts up and levels out as the section scrolls past (Motion's scroll-linked values).
  const shotRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: shotRef, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [6, 0, -3]);

  return (
    <div className="stages">
      <div className="stages-left">
        <Reveal className="stages-words">
          <h2 className="heading" aria-live="polite">
            {stage.clause.map((part, i) => (
              <motion.span
                key={`${at}-${i}`}
                className="swap-line"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SWAP, delay: i * 0.04 }}
              >
                {part}
              </motion.span>
            ))}
          </h2>
          <motion.p
            key={`s${at}`}
            className="stages-says"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SWAP, delay: 0.06 }}
          >
            {stage.says}
          </motion.p>
        </Reveal>

        <Reveal className="stages-track" delay={0.12}>
          <label htmlFor={id} className="sr">
            Stage
          </label>
          <div
            className="range"
            style={{
              ["--fill" as string]: at / (STAGES.length - 1),
            }}
          >
            <input
              id={id}
              type="range"
              min={0}
              max={STAGES.length - 1}
              step={1}
              value={at}
              onChange={(e) => setAt(Number(e.target.value))}
              aria-valuetext={stage.name}
            />
          </div>
          <ol className="stages-names">
            {STAGES.map((s, i) => (
              <li key={s.name}>
                <button
                  type="button"
                  className={i === at ? "on" : undefined}
                  onClick={() => setAt(i)}
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <div className="stages-shot" ref={shotRef}>
        <motion.div style={{ y: drift, rotateX: tilt, transformPerspective: 1200 }}>
          <Reveal settle className="stages-phone glass">
            {STAGES.map((s, i) => (
              <motion.div
                key={s.name}
                className="stages-frame"
                aria-hidden={i !== at}
                initial={false}
                animate={i === at ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
                transition={SWAP}
              >
                <Image src={s.shot} alt={i === at ? s.alt : ""} sizes="(max-width: 760px) 80vw, 380px" />
              </motion.div>
            ))}
          </Reveal>
        </motion.div>
      </div>
    </div>
  );
}
