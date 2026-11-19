import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The brand story on one photograph: particulate on the left clearing into
 * the KALERO spectrum on the right. No white wash over it.
 *
 * From desktop width the photo is full bleed and the copy sits on its clean
 * right side. Below that there is no crop where the copy clears the
 * particles, so the photo gets its own band and the copy sits under it.
 *
 * The right half was empty space, so the mark now lives there: the A arrives
 * inside a drop of glass, which bends it into colour at the corners before it
 * lets go. It plays once when the section comes into view, and again on click.
 */
const points = [
  "Three MERV levels, one easy choice",
  "Made in the USA",
  "Delivered on your schedule",
  "Fits every major HVAC brand",
];

export function BrandBento() {
  return (
    <section aria-labelledby="bento-title" className="relative isolate overflow-hidden">
      {/* The wave artwork as the ground. It runs deep navy on the left into
          light blue on the right, so the copy side is the dark side and the
          type goes white: Carbon on that left end measures 1.5:1, white 13.2:1.
          The scrim guarantees it, since object-cover crops differently at
          every width and the light end must never slide under the headline. */}
      <Image
        src="/images/brand/brand-wave.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(1,41,110,0.92)_0%,rgba(1,41,110,0.75)_34%,rgba(1,41,110,0.25)_58%,rgba(1,41,110,0)_78%)]"
      />

      <div className="container-x relative flex min-h-[520px] items-center py-16 sm:py-20 lg:min-h-[600px]">
        <div className="max-w-md">
          <p className="text-eyebrow text-sky-200">The KALERO way</p>
          <h2
            id="bento-title"
            className="mt-4 font-display text-display-xl font-semibold text-white text-balance"
          >
            Dust in. Clean air out.
          </h2>
          <p className="mt-4 text-lg font-medium leading-relaxed text-sky-50/90 text-pretty">
            Air filters, finally designed for your home.
          </p>
          <ul className="mt-7 grid gap-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium text-white/90">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-charcoal transition-colors hover:bg-sky-50"
          >
            Find your filter
            <ArrowRight size={16} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
