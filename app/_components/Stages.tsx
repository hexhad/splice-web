"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useInView, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal, SWAP } from "./Reveal";
import layers from "@/public/shots/layers.webp";
import cut from "@/public/shots/cut.webp";
import eq from "@/public/shots/eq.webp";
import exportShot from "@/public/shots/export.webp";

type Stage = {
  name: string;
  title: string;
  says: string;
  shot: StaticImageData;
  alt: string;
};

const STAGES: Stage[] = [
  {
    name: "Bring it in",
    title: "Bring in your recordings",
    says: "Pick one file or several from the system picker, choose “Edit in Splice” from another app, or record straight in. Layer them on new tracks or join them on the main one.",
    shot: layers,
    alt: "The Splice editor for Morning Session: the main recording, with a second track, Interview Take 2, layered underneath it.",
  },
  {
    name: "Mark",
    title: "Mark every part to lose",
    says: "Drag across the waveform once per part. Nudge any edge by a tenth of a second with the plus and minus buttons, then delete them all at once.",
    shot: cut,
    alt: "The Splice editor with two parts of Morning Session marked, 16.9 seconds selected, and Delete 2, Keep only, Extract, Add audio and Record along the bottom.",
  },
  {
    name: "Shape",
    title: "Shape the sound, track by track",
    says: "Open a track's equaliser and drag its four points, or start from a preset such as Voice or Podcast.",
    shot: eq,
    alt: "Splice's equaliser for the main track: four points on the curve, the low mid band at 500 Hz raised 1.5 dB, and the Flat, Voice, Podcast and Bass boost presets.",
  },
  {
    name: "Export",
    title: "Save it or share it",
    says: "Name the file, choose M4A or WAV, and save it where you like or hand it to another app.",
    shot: exportShot,
    alt: "Splice's Export sheet: file name Morning Session, format M4A (AAC) at 192 kbps, with Share and Save to buttons.",
  },
];

/**
 * How it works, as scroll-driven steps: every step is readable at once, the one in the middle of
 * the screen is lit, and the sticky phone shows its screen. On phones each step carries its own shot.
 */
export function Stages() {
  const [at, setAt] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start center", "end center"] });

  return (
    <div className="steps">
      <div className="steps-words">
        <Reveal as="h2" className="heading steps-title">
          Four steps,
          <br />
          one phone.
        </Reveal>
        <ol className="steps-list" ref={list}>
          <motion.i className="steps-rail" style={{ scaleY: scrollYProgress }} aria-hidden />
          {STAGES.map((s, i) => (
            <Step key={s.name} stage={s} index={i} on={i === at} onActive={() => setAt(i)} />
          ))}
        </ol>
      </div>

      <div className="steps-shot">
        <Reveal settle className="stages-phone glass">
          {STAGES.map((s, i) => (
            <motion.div
              key={s.name}
              className="stages-frame"
              aria-hidden={i !== at}
              initial={false}
              animate={i === at ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.97, y: i < at ? -12 : 12 }}
              transition={SWAP}
            >
              <Image src={s.shot} alt={i === at ? s.alt : ""} sizes="360px" />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

function Step({ stage, index, on, onActive }: { stage: Stage; index: number; on: boolean; onActive: () => void }) {
  const ref = useRef<HTMLLIElement>(null);
  // Lit while it crosses the middle band of the screen.
  const centred = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (centred) onActive();
  }, [centred, onActive]);

  return (
    <li ref={ref} className={on ? "step on" : "step"}>
      <span className="step-num mono">
        {String(index + 1).padStart(2, "0")} · {stage.name}
      </span>
      <h3 className="step-title">
        <button
          type="button"
          onClick={() => ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
        >
          {stage.title}
        </button>
      </h3>
      <p className="step-says">{stage.says}</p>
      <div className="step-shot" aria-hidden>
        <Image src={stage.shot} alt="" sizes="(max-width: 960px) 70vw, 1px" />
      </div>
    </li>
  );
}
