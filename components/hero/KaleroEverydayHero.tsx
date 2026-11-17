import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Single-frame hero, matching how the storefront presents it: headline left,
 * product right, one call to action. The previous version cross-faded twelve
 * frames, which fought the copy and pushed the CTA around under it.
 */
export function KaleroEverydayHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate w-full overflow-hidden bg-white"
    >
      {/* The render carries its own light background, so it sits flush rather
          than being darkened for legibility — the copy has its own space. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/new-hero.png"
          alt="KALERO premium air filter with filtered air flowing through it"
          fill
          sizes="100vw"
          priority
          className="object-cover object-right"
        />
      </div>

      {/* Left-side wash so the headline holds against the image on narrow screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white via-white/80 to-transparent sm:w-[72%] sm:via-white/70 lg:w-[62%]"
      />

      <div className="container-x relative z-10 flex min-h-[560px] flex-col justify-center py-20 sm:min-h-[640px] lg:min-h-[720px]">
        <div className="max-w-xl">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-charcoal text-balance"
          >
            Cleaner air.
            <br />
            Better business.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
            MERV 8 and MERV 11 filters in every standard size, made in the USA.
            Built to be stocked by the contractors homeowners already trust.
          </p>

          {/* Trade first, homeowner second: HVAC partnerships are the launch
              motion, so the consumer route is the quieter of the two.
              Carbon on KALERO Blue -- white on this blue is 2.45:1 and fails. */}
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/partners"
              className="inline-flex h-12 items-center justify-center gap-2 bg-sky px-8 text-sm font-semibold uppercase tracking-[0.08em] text-charcoal transition-colors hover:bg-sky-400"
            >
              HVAC trade pricing
              <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-mid underline-offset-4 transition-colors hover:text-charcoal hover:underline"
            >
              Shopping for your home?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
