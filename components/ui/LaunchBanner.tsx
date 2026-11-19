"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

/**
 * Pre-launch bar.
 *
 * The target is a single constant below. It is deliberately phrased as a
 * season rather than a timestamp: the launch is aimed at March–April 2027,
 * not a fixed day, and a clock ticking down to a precise second would claim
 * certainty the date does not have. Days are the smallest honest unit here.
 *
 * Rendered empty on the server and filled on mount, so the count never
 * hydrates against a stale server value.
 */
export const LAUNCH_TARGET = new Date("2027-04-01T00:00:00Z");
export const LAUNCH_WINDOW = "spring 2027";

const DISMISS_KEY = "kalero.launch-banner.dismissed";

function daysUntil(target: Date) {
  const ms = target.getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function LaunchBanner() {
  const [days, setDays] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") {
        setHidden(true);
        return;
      }
    } catch {
      /* private mode or blocked storage — show the banner */
    }
    setDays(daysUntil(LAUNCH_TARGET));
    const id = setInterval(() => setDays(daysUntil(LAUNCH_TARGET)), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const dismiss = () => {
    setHidden(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* nothing to persist to; it stays hidden for this page view */
    }
  };

  if (hidden) return null;

  return (
    <div /* No z-index. The sticky header sets z-40, which creates a stacking
         context, so the search overlay nested inside it can never paint
         above a sibling that claims a higher z — this bar used to punch
         straight through the open search panel. */
      className="relative bg-[linear-gradient(100deg,#35B2E6_0%,#4ABCEA_50%,#2693D8_100%)] text-charcoal">
      <div className="container-x flex items-center justify-center gap-x-4 gap-y-1 py-2.5 pr-8 text-center text-[13px] sm:pr-10">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
          <span className="font-semibold uppercase tracking-[0.14em] text-charcoal">
            Launching {LAUNCH_WINDOW}
          </span>
          {days !== null && (
            <span className="text-charcoal/80">
              <span aria-hidden="true" className="mx-1.5 text-charcoal/35">
                ·
              </span>
              {days.toLocaleString()} {days === 1 ? "day" : "days"} to go
            </span>
          )}
        </p>
        <Link
          href="/partners"
          className="group hidden shrink-0 items-center gap-1.5 font-semibold text-charcoal underline-offset-4 hover:underline sm:inline-flex"
        >
          Get trade pricing
          <ArrowRight
            size={14}
            strokeWidth={2.25}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss launch notice"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-charcoal/60 transition-colors hover:bg-charcoal/10 hover:text-charcoal"
      >
        <X size={15} strokeWidth={2.25} />
      </button>
    </div>
  );
}
