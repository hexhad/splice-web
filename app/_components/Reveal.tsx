"use client";

import { motion, MotionConfig } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/** One spring for every entrance: no bounce, settles in about 0.8 s. */
export const ENTER = { type: "spring", bounce: 0, duration: 0.8 } as const;
/** Short swaps inside the demos. */
export const SWAP = { type: "spring", bounce: 0, duration: 0.32 } as const;

const TAGS = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  h2: motion.h2,
  nav: motion.nav,
  a: motion.a,
} as const;

type RevealProps = {
  as?: keyof typeof TAGS;
  /** Seconds before it starts. */
  delay?: number;
  /** Distance it rises, in px. */
  y?: number;
  /** Starts slightly large and settles, for big images. */
  settle?: boolean;
  /** Plays on page load instead of when scrolled into view. */
  onLoad?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  href?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  "aria-live"?: "polite";
  "data-on"?: boolean;
  "data-ui"?: boolean;
};

/** Rises into place once. Under reduced motion it only fades (see MotionProvider). */
export function Reveal({ as = "div", delay = 0, y = 24, settle, onLoad, ...rest }: RevealProps) {
  const Comp = TAGS[as] as typeof motion.div;
  const from = settle ? { opacity: 0, scale: 1.04 } : { opacity: 0, y };
  const to = settle ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 };
  return (
    <Comp
      initial={from}
      {...(onLoad ? { animate: to } : { whileInView: to, viewport: { once: true, margin: "0px 0px -12% 0px" } })}
      transition={{ ...ENTER, delay }}
      {...(rest as object)}
    />
  );
}

/** Headline lines slide up out of their own masks on load. */
export function MaskedLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span className="mask" key={line}>
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.08 + i * 0.11 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** Reduced motion: Motion drops transforms and keeps the fades. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
