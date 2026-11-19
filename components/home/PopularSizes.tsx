"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { LiquidGlassTabs } from "@/components/ui/LiquidGlassTabs";
import { GradientWave } from "@/components/ui/GradientWave";
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
 *
 * Both the tabs and the cards are frosted glass, which means neither works on
 * bare canvas: a blur of a flat colour is that same flat colour. The glows
 * below are what they have to bend — without them the whole section would
 * render as plain white boxes and the treatment would simply be invisible.
 */
export function PopularSizes() {
  const [depth, setDepth] = useState<PopularDepth>(1);
  const sizes = useMemo(() => popularSizesForDepth(depth), [depth]);
  const baseId = useId();
  const tabId = (d: PopularDepth) => `${baseId}-tab-${d}`;
  const panelId = (d: PopularDepth) => `${baseId}-panel-${d}`;

  const tabs = POPULAR_DEPTHS.map((d) => ({
    key: String(d),
    label: `${d}″ Filters`,
    tabId: tabId(d),
    panelId: panelId(d),
  }));

  return (
    <section
      aria-labelledby="popular-sizes-title"
      className="relative isolate overflow-hidden py-14 sm:py-16"
    >
      {/* Clipped by the section: unclipped glows pushed a horizontal scrollbar
          onto /shop once already. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        {/* A drifting mesh gradient rather than static blobs: frosted glass
            over a still ground reads as a flat white box, and this gives the
            blur something that actually moves under it. */}
        <GradientWave />
        {/* Meets the hero's fade on the same white, so there is no seam. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/60 to-transparent sm:h-40" />
      </div>

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
        <div className="relative mt-6 -mx-5 px-5 sm:mx-0 sm:px-0">
          <div className="relative overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <LiquidGlassTabs
              items={tabs}
              value={String(depth)}
              onChange={(key) => setDepth(Number(key) as PopularDepth)}
              label="Filter thickness"
            />
          </div>
        </div>

        <div className="mt-4 h-px w-full bg-white/70" aria-hidden="true" />

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
              className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-xl border border-white/60 bg-white/40 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_10px_26px_-16px_rgba(0,71,179,0.42)] backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:border-white/90 hover:bg-white/70 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_14px_32px_-14px_rgba(0,71,179,0.5)]"
            >
              {/* The lit top edge, as on the MERV shield. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent"
              />
              <span className="relative font-display text-[15px] font-semibold text-charcoal">
                {s.label}
              </span>
              <ArrowRight
                size={15}
                strokeWidth={2.25}
                aria-hidden="true"
                className="relative shrink-0 text-sky-600 transition-transform duration-150 group-hover:translate-x-1"
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
