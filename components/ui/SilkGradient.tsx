"use client";

import { useEffect, useRef } from "react";

/**
 * Silk-blend gradient — a smooth multi-stop sweep that sways, under a vignette
 * and a fine film grain.
 *
 * Structure follows the 21st.dev "Nova" recipe: five stops along one angle,
 * a radial vignette, and a fractal-noise grain blended on overlay, with the
 * angle driven from a rAF clock. The palette is the kit's rather than Nova's,
 * which runs a different blue family and a teal the kit does not carry.
 *
 * Two details from the recipe that matter and are easy to get wrong:
 *
 *  - The modulation must be exactly zero at ph = 0, or the gradient jumps the
 *    moment motion starts. sin(spin * 0.6) is 0 at spin = 0, so it is clean.
 *  - The angle is never rounded. Quantising it per frame is what makes this
 *    kind of motion visibly step instead of glide.
 *
 * Stops run deep at the top and lift toward the base, because the copy sits
 * at the top of the panel and wants the dark end behind it.
 */

/* KALERO Blue is the accent, so the sweep sits in the light end of the family.
   Carbon is the type colour here: the darkest stop is sky-600, which holds
   5.9:1 against Carbon, and sky-700 was not used because it drops to 4.3:1. */
const STOPS = [
  ["#CFE8F4", 10],
  ["#7ACCEE", 27],
  ["#4ABCEA", 44],
  ["#35B2E6", 62],
  ["#2693D8", 96],
] as const;

const BASE_ANGLE = 187;
const SPEED = 0.52;
const AMOUNT = 0.88;

const GRAIN =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)' opacity='0.42'/></svg>\")";

const VIGNETTE =
  "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 38%, rgba(1,57,158,0.18) 100%)";

const sweep = (angle: number) =>
  `linear-gradient(${angle}deg, ${STOPS.map(([hex, pos]) => `${hex} ${pos}%`).join(", ")})`;

export function SilkGradient({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const paint = (angle: number) => {
      el.style.backgroundImage = [GRAIN, VIGNETTE, sweep(angle)].join(",");
    };
    paint(BASE_ANGLE);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let start = 0;
    let onScreen = false;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;
      const spin = t * SPEED;
      // zero at t = 0, so there is no snap when the loop starts
      paint(BASE_ANGLE + Math.sin(spin * 0.6) * 24 * AMOUNT);
      raf = requestAnimationFrame(tick);
    };

    const sync = () => {
      const play = onScreen && document.visibilityState === "visible";
      if (play && !raf) raf = requestAnimationFrame(tick);
      else if (!play && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        start = 0;
      }
    };

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundColor: "#35B2E6",
        backgroundSize: "120px 120px, auto, auto",
        backgroundBlendMode: "overlay, normal, normal",
      }}
    />
  );
}
