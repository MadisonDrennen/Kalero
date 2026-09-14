import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * The brand story on one full-bleed photograph: particulate on the left
 * clearing into the KALERO spectrum on the right. The copy sits on the clean
 * side of the image, so the picture does the explaining.
 */
const points = [
  "Three MERV levels, one easy choice",
  "Made in the USA",
  "Delivered on your schedule",
  "Fits every major HVAC brand",
];

export function BrandBento() {
  return (
    <section
      aria-labelledby="bento-title"
      className="relative isolate overflow-hidden"
    >
      <Image
        src="/images/products/air-particles-to-clean.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[30%_center] lg:object-left"
      />
      {/* keeps the text side calm on narrow screens, where the particles
          would otherwise sit behind the copy */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-white/80 lg:bg-transparent lg:bg-gradient-to-l lg:from-white/75 lg:via-white/40 lg:to-white/0"
      />

      <div className="container-x flex min-h-[560px] items-center py-20 sm:min-h-[640px] lg:justify-end">
        <div className="max-w-md">
          <p className="eyebrow">The KALERO way</p>
          <h2
            id="bento-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Dust in. Clean air out.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            Air filters, finally designed for your home.
          </p>
          <ul className="mt-7 grid gap-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm font-medium text-charcoal">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/find-your-filter"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-charcoal px-6 text-sm font-semibold text-white transition-colors hover:bg-charcoal-soft"
          >
            Find your filter
            <ArrowRight size={16} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
