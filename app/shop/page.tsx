import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { liveCategories, liveProducts } from "@/lib/categories";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { Reveal } from "@/components/ui/Reveal";
import { productBySlug } from "@/lib/products";
import { tierById, tierForProduct } from "@/lib/tiers";
import { PhotoComingSoon } from "@/components/ui/PhotoComingSoon";


export const metadata: Metadata = {
  title: "Shop Home Air Filters | MERV 8 & MERV 13 by Concern",
  description:
    "Shop every KALERO home air filter, sorted by concern: everyday dust and allergies. Available in 14x20x1, 16x20x1, 16x25x1, 20x20x1, 20x25x1, 20x30x1 and custom sizes.",
  alternates: { canonical: "/shop" },
  keywords: [
    "home air filters",
    "shop air filters",
    "HVAC air filter",
    "furnace filter",
    "MERV 8 filter",
    "20x25x1 air filter",
    "16x25x1 air filter",
    "20x20x1 air filter",
    "pet air filter",
    "allergy air filter",
    "smoke air filter",
    "KALERO air filters",
  ],
};

const visibleCategories = liveCategories;

/** Small enough a lookup beats pulling in a number-to-words dependency. */
const COUNT_WORD: Record<number, string> = {
  2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven",
};

export default function ShopPage() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-sky-200 via-sky-100/70 to-canvas"
      />
      {/* Clipped to the page width: the glows sit partly off-screen, and
          unclipped they made the whole page 96px wider than the window, so it
          scrolled sideways on a phone. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden"
      >
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl" />
        <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-sky-400/30 blur-3xl" />
      </div>

      <section aria-labelledby="shop-cats" className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <p id="shop-cats" className="eyebrow justify-center">
              Browse by concern
            </p>
            <h2 className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance">
              Start with what&apos;s in your air.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              {/* Counted, not written out -- this said "six" for a while after
                  the list stopped being six. */}
              {visibleCategories.length === 1 ? "One" : COUNT_WORD[visibleCategories.length] ?? visibleCategories.length}{" "}
              clearly named concerns for as many clearly named filters. Pick the one that
              sounds most like your home and we&apos;ll take it from there.
            </p>
            <Link
              href="/find-your-filter"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-800"
            >
              Not sure? Take the two-minute quiz
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Each concern in its tier's brand colour (blue, mint, lilac), with the
              carton floating on that colour. The cards used their own category
              palette -- a second blue, lime and navy, none of them in the brand
              kit -- washed over a cropped carton, which muddied the product. */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCategories.map((c, i) => {
              const product = productBySlug(c.productSlug);
              const tier = tierById(tierForProduct(product?.merv ?? "MERV 8"));
              return (
                <Reveal key={c.slug} delay={i * 0.05}>
                  <Link
                    href={`/shop/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#E8EEF3] transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    {/* The carton is the card. The render carries ~12% empty
                        margin each side, so it is scaled up from the bottom
                        edge to fill the stage instead of floating small in it. */}
                    <div
                      className="relative aspect-[4/5] overflow-hidden"
                      style={{
                        backgroundImage: [
                          `radial-gradient(70% 55% at 78% 12%, ${tier.gradient.glow}40 0%, transparent 62%)`,
                          `radial-gradient(130% 95% at 50% 105%, ${tier.gradient.base}66 0%, ${tier.softHex} 55%, #FFFFFF 100%)`,
                        ].join(","),
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute bottom-2 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-[50%] bg-charcoal/25 blur-2xl"
                      />
                      <div className="absolute inset-x-6 bottom-4 top-8 flex items-end justify-center transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                        <PhotoComingSoon
                          tint={{ soft: tier.softHex, deep: tier.deepHex }}
                          size="lg"
                          className="h-full w-full"
                        />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{ backgroundColor: tier.softHex }}
                        >
                          <CategoryIcon icon={c.icon} size={20} color={tier.deepHex} />
                        </span>
                        <span
                          className="text-[11px] font-bold uppercase tracking-[0.16em]"
                          style={{ color: tier.deepHex }}
                        >
                          MERV {tier.merv} · {tier.name}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-bold text-charcoal">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
                        {c.description}
                      </p>
                      {product && (
                        <p className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-semibold text-sky-700">
                          Shop {product.name}
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-white transition-transform group-hover:translate-x-0.5">
                            <ArrowRight size={17} strokeWidth={2.25} />
                          </span>
                        </p>
                      )}
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="shop-products" className="border-t border-sky-100/70 py-12 sm:py-14">
        <div className="container-x">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">The full lineup</p>
              <h2
                id="shop-products"
                className="mt-3 font-display text-2xl font-semibold text-charcoal text-balance sm:text-3xl"
              >
                {liveProducts.length} filters, ready to ship.
              </h2>
            </div>
            <Link
              href="/subscriptions"
              className="link-underline text-sm font-medium text-sky-700"
            >
              Build a household plan →
            </Link>
          </div>

          {/* Three filters sit side by side; a sideways scroller for three
              items left most of the row empty. */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
