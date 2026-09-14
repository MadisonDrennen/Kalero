import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { tiers, type TierId } from "@/lib/tiers";
import { IridescentWave } from "@/components/ui/IridescentWave";

/**
 * A photographic break between the comparison table and the brand story. The
 * middle of the homepage was a table, two bullet lists and three text cards
 * back to back; this is the three tiers shown in the air each one is for.
 */
const stories: Record<TierId, { src: string; line: string; focus: string }> = {
  standard: {
    src: "/images/products/merv-8-cinematic.jpg",
    line: "Clear days and everyday dust.",
    focus: "object-[72%_center]",
  },
  pro: {
    src: "/images/products/merv-11-cinematic.jpg",
    line: "Pets, pollen and the great outdoors.",
    focus: "object-[64%_center]",
  },
  max: {
    src: "/images/products/merv-13-cinematic.jpg",
    line: "Smoke, smog and city air.",
    focus: "object-[70%_center]",
  },
};

export function AirStories() {
  return (
    <section
      aria-labelledby="air-stories-title"
      className="relative isolate py-16 sm:py-20"
    >
      {/* the brand wave runs behind the heading and under the tops of the cards */}
      <IridescentWave className="absolute inset-x-0 top-0 -z-10 h-80 w-full opacity-70 sm:h-[26rem]" />
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sky-700">Made for real air</p>
          <h2
            id="air-stories-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Every home breathes differently.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {tiers.map((t) => {
            const s = stories[t.id];
            return (
              <Link
                key={t.id}
                href={`/merv-${t.merv}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-sky-100 sm:aspect-[3/4]"
              >
                <Image
                  src={s.src}
                  alt={`KALERO MERV ${t.merv} filter, ${s.line.toLowerCase()}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className={`object-cover ${s.focus} transition-transform duration-700 group-hover:scale-[1.04]`}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span
                    className="inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal"
                    style={{ backgroundColor: t.hex }}
                  >
                    MERV {t.merv} · {t.name}
                  </span>
                  <p className="mt-3 font-display text-xl font-semibold text-white text-balance sm:text-2xl">
                    {s.line}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition-transform group-hover:translate-x-0.5">
                    Shop {t.name}
                    <ArrowRight size={14} strokeWidth={2.25} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
