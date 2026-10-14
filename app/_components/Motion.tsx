"use client";

import { useEffect } from "react";

export function Motion() {
  useEffect(() => {
    requestAnimationFrame(() => document.querySelector("[data-hero]")?.classList.add("ready"));

    const targets = document.querySelectorAll<HTMLElement>(".rise, .settle");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
