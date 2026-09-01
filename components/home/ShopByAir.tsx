import Link from "next/link";
import Image from "next/image";
import { tiers, type TierId } from "@/lib/tiers";

/**
 * The three tiers, shown the way the storefront shows them: the carton, the
 * name, one line. The packaging already does the explaining -- the MERV
 * numeral, the shield and the benefit rows are printed on the box -- so
 * repeating it in chips and bullet lists beside the image was saying
 * everything twice.
 */
export function ShopByAir() {
  return (
    <section
      aria-labelledby="shop-by-air-title"
      className="relative isolate py-20 sm:py-24"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sky-700">Shop by air</p>
          <h2
            id="shop-by-air-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Shop by what&apos;s in your air.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
            Three levels of filtration. Pick the one that matches your home.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {tiers.map((t) => (
            <Link
              key={t.id}
              href={`/merv-${t.merv}`}
              className="group flex flex-col text-center"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-line">
                <Image
                  src={t.heroImage}
                  alt={`KALERO ${t.name} MERV ${t.merv} air filter, four pack`}
                  fill
                  sizes="(min-width: 640px) 33vw, 90vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <p
                className="mt-5 text-eyebrow font-semibold uppercase"
                style={{ color: t.deepHex }}
              >
                {t.name}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-charcoal sm:text-2xl">
                MERV {t.merv}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
                {t.positioning}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export type ShopByAirTierId = TierId;
