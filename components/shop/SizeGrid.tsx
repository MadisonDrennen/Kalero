"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LiquidGlassTabs } from "@/components/ui/LiquidGlassTabs";
import {
  POPULAR_DEPTHS,
  popularSizesForDepth,
  sizeHref,
  type PopularDepth,
} from "@/lib/sizes";

/**
 * Depth tabs over a flat grid of sizes.
 *
 * Shared by the homepage and the Shop by Size page, which were otherwise
 * going to grow two copies of the same control that drifted apart. The
 * section chrome — heading, background, spacing — belongs to the caller;
 * this is only the tabs and the grid.
 *
 * The cards are frosted glass, so they need a ground with some variation
 * behind them. On a flat white page they flatten into plain white boxes.
 */
export function SizeGrid() {
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
    <>
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
    </>
  );
}
