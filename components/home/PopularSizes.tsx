"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import {
  POPULAR_DEPTHS,
  popularSizesForDepth,
  sizeHref,
  type PopularDepth,
} from "@/lib/sizes";

/**
 * Homepage — the shortcut for someone who already knows their size.
 *
 * Depth tabs over a flat grid of up to twenty sizes. No photography, no
 * per-card subtitle: the whole point is that twenty options can be scanned in
 * a couple of seconds, and anything decorative competes with that. Everything
 * else lives behind Shop all sizes.
 */
export function PopularSizes() {
  const [depth, setDepth] = useState<PopularDepth>(1);
  const sizes = useMemo(() => popularSizesForDepth(depth), [depth]);
  const baseId = useId();
  const tabId = (d: PopularDepth) => `${baseId}-tab-${d}`;
  const panelId = (d: PopularDepth) => `${baseId}-panel-${d}`;

  /** role="tab" promises arrow-key navigation; this is it. */
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const i = POPULAR_DEPTHS.indexOf(depth);
    const next =
      e.key === "Home"
        ? POPULAR_DEPTHS[0]
        : e.key === "End"
          ? POPULAR_DEPTHS[POPULAR_DEPTHS.length - 1]
          : POPULAR_DEPTHS[
              (i + (e.key === "ArrowRight" ? 1 : -1) + POPULAR_DEPTHS.length) %
                POPULAR_DEPTHS.length
            ];
    setDepth(next);
    document.getElementById(tabId(next))?.focus();
  };

  return (
    <section
      aria-labelledby="popular-sizes-title"
      className="relative isolate py-14 sm:py-16"
    >
      <div className="container-x">
        <p className="text-eyebrow text-sky-700">Sizes in stock</p>
        <h2
          id="popular-sizes-title"
          className="mt-2.5 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
        >
          The sizes your route actually calls for.
        </h2>

        {/* Tabs scroll rather than wrap on a phone — four stacked rows would
            push the grid itself off the screen. */}
        <div
          role="tablist"
          aria-label="Filter thickness"
          onKeyDown={onTabKeyDown}
          className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {POPULAR_DEPTHS.map((d) => {
            const active = d === depth;
            return (
              <button
                key={d}
                id={tabId(d)}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId(d)}
                tabIndex={active ? 0 : -1}
                onClick={() => setDepth(d)}
                className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold tracking-[0.02em] transition-colors ${
                  active
                    ? "bg-sky-500 text-charcoal"
                    : "bg-[#EEF3F7] text-charcoal-mid hover:bg-[#E4EDF4] hover:text-charcoal"
                }`}
              >
                {d}&Prime; Filters
              </button>
            );
          })}
        </div>

        <div className="mt-4 h-px w-full bg-sky-100" aria-hidden="true" />

        <div
          id={panelId(depth)}
          role="tabpanel"
          aria-labelledby={tabId(depth)}
          className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {sizes.map((s) => (
            <Link
              key={s.slug}
              href={sizeHref(s.slug)}
              className="group flex items-center justify-between gap-3 rounded-xl border border-sky-100 bg-white px-4 py-3 transition-colors duration-150 hover:border-sky-300 hover:bg-sky-50/60"
            >
              <span className="font-display text-[15px] font-semibold text-charcoal">
                {s.label}
              </span>
              <ArrowRight
                size={15}
                strokeWidth={2.25}
                aria-hidden="true"
                className="shrink-0 text-sky-500 transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2.5">
          <LinkButton href="/shop" size="lg" arrow>
            Shop all sizes
          </LinkButton>
          <p className="text-center text-[13px] text-charcoal-mid">
            Don&apos;t see your size? Browse our complete list of filter sizes.
          </p>
        </div>
      </div>
    </section>
  );
}
