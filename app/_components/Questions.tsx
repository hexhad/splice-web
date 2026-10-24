"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { Reveal, SWAP } from "./Reveal";

const QA: { q: string; a: ReactNode }[] = [
  {
    q: "Does Splice ask for any permissions?",
    a: "One: the microphone, and Android asks only when you first tap Record. Say no and everything else still works. Splice never asks for storage or the internet; files reach it through Android's own picker, so it only ever sees the ones you choose.",
  },
  {
    q: "Does it send my audio anywhere?",
    a: "It can't. Splice has no internet access at all, and it carries no analytics, ads or crash reporting. Your audio leaves the phone only when you save or share it.",
  },
  {
    q: "Where are my projects kept?",
    a: "In Splice's private storage on the phone, with its own copy of each file so a project still opens if the original moves. Clear it in Settings, or delete the project.",
  },
  {
    q: "What can I export?",
    a: "M4A (AAC) at 128, 192 or 256 kbps, or WAV: lossless 16-bit, 44.1 kHz stereo, about 10 MB a minute.",
  },
  {
    q: "Which phones does it run on?",
    a: "Android 8.0 or newer, phones and tablets.",
  },
  {
    q: "Can I undo a cut?",
    a: "Yes. Undo and redo sit at the top of the editor, and a cut never touches your original file.",
  },
  {
    q: "Where is the privacy policy?",
    a: (
      <>
        It is short, because there is little to say.{" "}
        <a className="link" href="/privacy">
          Read it here
        </a>
        .
      </>
    ),
  },
];

export function Questions() {
  const [open, setOpen] = useState(0);

  return (
    <div className="qa">
      <ul className="qa-list">
        <Reveal as="li" className="qa-title soft">
          Questions, answered
        </Reveal>
        {QA.map((item, i) => (
          <Reveal as="li" key={item.q} data-on={i === open || undefined} delay={0.06 + i * 0.05}>
            <button
              type="button"
              aria-expanded={i === open}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onClick={() => setOpen(i)}
            >
              <i aria-hidden>{i === open ? <motion.b layoutId="qa-dot" transition={SWAP} /> : null}</i>
              {item.q}
            </button>
            <div className="qa-inline">{item.a}</div>
          </Reveal>
        ))}
      </ul>
      <Reveal className="qa-pane glass" delay={0.2} aria-live="polite">
        <motion.p key={open} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={SWAP}>
          {QA[open].a}
        </motion.p>
      </Reveal>
    </div>
  );
}
