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
      <div className="relative aspect-[16/9] w-full lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto">
        <Image
          src="/images/products/air-particles-to-clean.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-left"
        />
      </div>

      <div className="container-x py-12 sm:py-16 lg:flex lg:min-h-[640px] lg:items-center lg:justify-end lg:py-20">
        <div className="max-w-md">
          <p className="eyebrow">The KALERO way</p>
          <h2
            id="bento-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Dust in. Clean air out.
          </h2>
          <p className="mt-4 text-lg font-medium leading-relaxed text-charcoal-soft text-pretty">
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
