import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

/**
 * Single-frame hero: headline left, product behind, one call to action. The
 * previous version cross-faded twelve frames, which fought the copy and pushed
 * the CTA around under it.
 *
 * The photograph is a macro of the pleat pack — the shot the kit asks for, and
 * the only one of the new set carrying no packaging text at all. It is light
 * (mean luminance 194/255) and uniform, so it crops safely to any ratio, but
 * it is still a busy texture: the scrims below are what keep Carbon type off
 * it. They are directional rather than a flat white wash, so the photograph
 * itself stays at full strength across most of the frame.
 */
export function KaleroEverydayHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate w-full overflow-hidden bg-white"
    >
      <Image
        src="/images/hero/pleat-macro.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Narrow screens: copy runs the full width, so the scrim lifts from the
          bottom. From lg it sweeps in from the left and clears the frame by
          two thirds, leaving the pleats untouched on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-white via-white/88 to-white/35 lg:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden lg:block bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.9)_26%,rgba(255,255,255,0.52)_46%,rgba(255,255,255,0)_68%)]"
      />

      {/* The photograph used to stop dead against the next section. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent sm:h-52"
      />

      <div className="container-x relative z-10 flex min-h-[560px] flex-col justify-center py-20 sm:min-h-[640px] lg:min-h-[720px]">
        <div className="max-w-xl">
          {/* The hero had no step between the nav and a 72px headline. An
              eyebrow gives it one, and says who the page is for. */}
          <p className="text-eyebrow text-sky-700">For HVAC professionals</p>

          <h1
            id="hero-title"
            /* Kit type table: page headlines are Poppins SemiBold, sentence case,
               tight leading. The caps setting is reserved for packaging and labels.
               Display type wants tighter tracking than body — at this size the
               default spacing reads loose. */
            className="mt-4 font-display text-[clamp(2.75rem,6.4vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-charcoal text-balance"
          >
            The right filter.
            <br />
            The right fit.
            <br />
            Cleaner air.
          </h1>

          {/* Graphite rather than the lighter mid grey: this sits on a
              photograph, and the lighter step lost its footing over the pleats. */}
          <p className="mt-6 max-w-[33rem] text-[17px] leading-[1.6] text-charcoal-soft text-pretty sm:text-lg">
            Premium HVAC filters in every standard size, made in the USA.
            Built to be stocked by the contractors homeowners already trust.
          </p>

          {/* Trade first, homeowner second: HVAC partnerships are the launch
              motion, so the consumer route is the quieter of the two. */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <LinkButton
              href="/partners"
              size="lg"
              arrow
              className="h-[3.25rem] px-9 text-sm font-semibold uppercase tracking-[0.1em]"
            >
              HVAC trade pricing
            </LinkButton>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-soft underline-offset-4 transition-colors hover:text-charcoal hover:underline"
            >
              Shopping for your home?
              <ArrowRight
                size={15}
                strokeWidth={2.25}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
