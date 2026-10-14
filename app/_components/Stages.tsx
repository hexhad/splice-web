"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useState } from "react";
import addaudio from "@/public/shots/addaudio.webp";
import marked from "@/public/shots/marked.webp";
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
    says: "Pick one file or several from the system picker, or choose “Edit in Splice” from another app. Layer them on new tracks or join them on the main one.",
    shot: addaudio,
    alt: "Splice's Add audio sheet, offering to layer on a new track or join the main track at the playhead, after clip 1, at the start or at the end.",
  },
  {
    name: "Mark",
    clause: ["Then mark every", "part to lose"],
    says: "Drag across the waveform once per part. Nudge any edge by a tenth of a second with the plus and minus buttons.",
    shot: marked,
    alt: "The Splice editor with two parts marked on a beat, 3.3 seconds selected, and Delete 2, Keep only and Extract along the bottom.",
  },
  {
    name: "Shape",
    clause: ["Shape the sound", "track by track"],
    says: "Open a track's equaliser and drag its four points, or start from a preset such as Voice.",
    shot: eq,
    alt: "Splice's equaliser for the main track with the Voice preset: the low end lowered, a lift around 2 kHz.",
  },
  {
    name: "Export",
    clause: ["Last, save it", "or share it"],
    says: "Name the file, choose M4A or WAV, and save it where you like or hand it to another app.",
    shot: exportShot,
    alt: "Splice's Export sheet: file name Beat, format M4A (AAC) at 192 kbps, with Share and Save to buttons.",
  },
];

export function Stages() {
  const [at, setAt] = useState(1);
  const id = useId();
  const stage = STAGES[at];

  return (
    <div className="stages">
      <div className="stages-left">
        <div className="stages-words rise">
          <h2 className="heading" aria-live="polite" key={at}>
            <span className="fade-swap">{stage.clause[0]}</span>
            <br />
            <span className="fade-swap">{stage.clause[1]}</span>
          </h2>
          <p className="stages-says fade-swap" key={`s${at}`}>
            {stage.says}
          </p>
        </div>

        <div className="stages-track rise" style={{ ["--d" as string]: "120ms" }}>
          <label htmlFor={id} className="sr">
            Stage
          </label>
          <div
            className="range"
            style={{
              ["--fill" as string]: `${(at / (STAGES.length - 1)) * 100}%`,
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
        </div>
      </div>

      <div className="stages-shot settle">
        {STAGES.map((s, i) => (
          <Image
            key={s.name}
            src={s.shot}
            alt={i === at ? s.alt : ""}
            aria-hidden={i !== at}
            className={i === at ? "on" : undefined}
            sizes="(max-width: 760px) 80vw, 380px"
          />
        ))}
      </div>
    </div>
  );
}
