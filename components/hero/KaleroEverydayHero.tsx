import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Full-bleed hero on the product render.
 *
 * The artwork is light and the airflow ribbon runs left to right, so the copy
 * sits on the pale left side in carbon rather than reversed out in white —
 * the same treatment as the Shopify storefront, so the two read as one brand.
 */
export function KaleroEverydayHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-[560px] w-full overflow-hidden bg-white sm:min-h-[640px] lg:min-h-[calc(100dvh-8rem)]"
    >
      <Image
        src="/images/hero/new-hero.png"
        alt="A KALERO air filter with filtered air moving through it, dust and pollen held on the intake side"
        fill
        sizes="100vw"
        priority
        className="object-cover object-[68%_center] sm:object-right"
      />

      {/* Keeps the headline legible without washing the artwork out. On a phone
          there is no room beside the filter, so the wash runs top-down and the
          copy sits above it; from sm up it runs left-to-right instead. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/20 sm:inset-y-0 sm:left-0 sm:w-[85%] sm:bg-gradient-to-r sm:from-white/90 sm:via-white/55 sm:to-transparent lg:w-[70%]"
      />

      <div className="container-x relative z-10 flex min-h-[560px] flex-col justify-start py-12 sm:min-h-[640px] sm:justify-center sm:py-16 lg:min-h-[calc(100dvh-8rem)]">
        <div className="max-w-xl">
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.025em] text-charcoal text-balance"
          >
            Cleaner air.
            <br />
            Better living.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
            Premium air filters designed to make finding the right filtration
            for your home simple.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/air-filters"
              className="inline-flex h-12 items-center justify-center gap-2 bg-sky px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-sky-600"
            >
              Shop Filters
              <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
            <Link
              href="/find-your-filter"
              className="inline-flex h-12 items-center justify-center gap-2 border border-charcoal/20 px-6 text-sm font-medium text-charcoal transition-colors hover:border-charcoal/40 hover:bg-charcoal/[0.03]"
            >
              Find your filter
              <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
