import { LinkButton } from "@/components/ui/Button";
import { SizeGrid } from "@/components/shop/SizeGrid";
import { GradientWave } from "@/components/ui/GradientWave";

/**
 * Homepage — the shortcut for someone who already knows their size.
 *
 * The tabs and grid live in SizeGrid, shared with the Shop by Size page so
 * the two cannot drift apart. What belongs to this section is the heading and
 * the ground: the cards are frosted glass, and a blur of a flat colour is
 * that same flat colour, so the drifting gradient below is what they bend.
 */
export function PopularSizes() {
  return (
    <section
      aria-labelledby="popular-sizes-title"
      className="relative isolate overflow-hidden py-14 sm:py-16"
    >
      {/* Clipped by the section: unclipped glows pushed a horizontal scrollbar
          onto /shop once already. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <GradientWave />
        {/* Meets the range section's ground on the same canvas, so there is
            no seam where the drifting gradient starts. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-canvas via-canvas/60 to-transparent sm:h-40" />
      </div>

      <div className="container-x">
        <p className="text-eyebrow text-sky-700">Sizes in stock</p>
        <h2
          id="popular-sizes-title"
          className="mt-2.5 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
        >
          The sizes your route actually calls for.
        </h2>

        <SizeGrid />

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
