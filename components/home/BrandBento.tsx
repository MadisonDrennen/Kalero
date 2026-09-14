import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, Flag, Wrench } from "lucide-react";
import { tierById } from "@/lib/tiers";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The brand story as colour tiles instead of two bullet lists. Each tile
 * carries one idea, so the section reads at a glance, and the tier colours do
 * the talking the copy used to.
 */
export function BrandBento() {
  const standard = tierById("standard");
  const pro = tierById("pro");
  const max = tierById("max");

  return (
    <section aria-labelledby="bento-title" className="relative isolate py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:items-center lg:gap-14">
        <div className="max-w-md">
          <p className="eyebrow">The KALERO way</p>
          <h2
            id="bento-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Air filters, finally designed for your home.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            Clear choices, real colour, and filters that show up before you need them.
          </p>
          <Link
            href="/find-your-filter"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            Find your filter
            <ArrowRight size={14} strokeWidth={2.25} />
          </Link>
        </div>

        <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4">
          <Reveal className="row-span-2">
            <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl bg-canvas">
              <Image
                src="/images/products/air-particles-to-clean.jpg"
                alt="Dust, pollen and dander drifting into a clean ribbon of air"
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover object-[30%_center]"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur">
                <p className="font-display text-lg font-semibold text-charcoal">
                  Dust in. Clean air out.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-5"
              style={{ backgroundColor: standard.hex, color: standard.onHex }}
            >
              <p className="font-display text-3xl font-bold leading-none sm:text-4xl">
                8 · 11 · 13
              </p>
              <p className="mt-6 text-sm font-medium">Three MERV levels. One easy choice.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-5"
              style={{ backgroundColor: pro.hex, color: pro.onHex }}
            >
              <div className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-24 rotate-6 sm:h-36 sm:w-28">
                <Image
                  src={pro.angleImage}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-contain drop-shadow-xl"
                />
              </div>
              <Flag className="h-5 w-5" aria-hidden="true" />
              <p className="relative mt-6 max-w-[60%] font-display text-lg font-semibold leading-snug">
                Made in the USA
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl p-5"
              style={{ backgroundColor: max.hex, color: max.onHex }}
            >
              <CalendarClock className="h-5 w-5" aria-hidden="true" />
              <div className="mt-6">
                <p className="font-display text-lg font-semibold leading-snug">
                  Delivered on your schedule
                </p>
                <p className="mt-1 text-sm">Every 30, 60 or 90 days.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-charcoal p-5 text-white">
              <Wrench className="h-5 w-5 text-sky-300" aria-hidden="true" />
              <div className="mt-6">
                <p className="font-display text-lg font-semibold leading-snug">
                  Fits every major HVAC brand
                </p>
                <p className="mt-1 text-sm text-white/70">Carrier, Trane, Lennox and more.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
