"use client";

import Link from "next/link";
import NextImage from "next/image";
import { Check, Info, Leaf, Star } from "lucide-react";
import { ProductRender } from "@/components/product/ProductRender";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PurchaseConfigurator } from "@/components/product/PurchaseConfigurator";
import { useProductConfig } from "@/components/product/useProductConfig";
import { Chip } from "@/components/ui/Chip";
import { LinkButton } from "@/components/ui/Button";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
import { categoryByKey, liveProducts } from "@/lib/categories";
import { formatPrice } from "@/lib/pricing";
import { type Product } from "@/lib/products";
import { tierById } from "@/lib/tiers";

type Props = {
  product: Product;
};

export function ProductDetail({ product }: Props) {
  const category = categoryByKey(product.category)!;
  const config = useProductConfig(product);
  const tier = tierById(config.tierId);
  /* liveProducts, not products: the full list still carries Pet Defense,
     Hotel Collection and the rest of the unlaunched lines, and this row was
     putting them in front of customers with prices attached. */
  const others = liveProducts.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate bg-white">
        <div className="container-x relative pb-12 pt-6 sm:pt-8">
          <nav
            className="mb-5 flex items-center gap-1.5 text-[11px] text-charcoal-mid"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-charcoal">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" className="hover:text-charcoal">
              Shop
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/shop/${category.slug}`} className="hover:text-charcoal">
              {category.title}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-charcoal-mid">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[47fr_53fr] lg:gap-12">
            {/* LEFT — visuals */}
            <ProductGallery product={product} tierId={config.tierId} />

            {/* RIGHT — identity, then the one configurator */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <Chip
                  className="border"
                  style={{
                    backgroundColor: `${tier.softHex}80`,
                    color: tier.deepHex,
                    borderColor: `${tier.hex}55`,
                  }}
                >
                  MERV {tier.merv} {tier.name}
                </Chip>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]"
                  style={{ backgroundColor: category.softHex, color: category.deepHex }}
                >
                  <CategoryIcon icon={category.icon} size={11} color={category.deepHex} />
                  {category.title}
                </span>
              </div>

              <h1 className="mt-3 font-display text-display-lg font-semibold text-charcoal text-balance">
                {product.name}
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-charcoal-mid text-pretty">
                {product.tagline}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span
                  className="ml-auto text-[13px] text-charcoal-mid"
                  aria-live="polite"
                >
                  <span className="font-display text-lg font-semibold text-charcoal">
                    {formatPrice(config.quote.perFilter)}
                  </span>{" "}
                  / filter
                  {config.quote.subscriptionSavings != null &&
                    config.quote.subscriptionSavings > 0 &&
                    config.quote.listPerFilter != null && (
                      <span className="ml-1.5 text-charcoal-mid line-through">
                        {formatPrice(config.quote.listPerFilter)}
                      </span>
                    )}
                </span>
              </div>

              <div className="mt-5">
                <PurchaseConfigurator product={product} config={config} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HvacCompatibility />

      <section className="border-t border-sky-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="eyebrow">Designed for</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.designedFor.map((d) => (
                    <div
                      key={d}
                      className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-sky-100 shadow-soft"
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ backgroundColor: category.softHex, color: category.deepHex }}
                      >
                        <Leaf size={16} />
                      </span>
                      <span className="text-sm font-medium text-charcoal">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow">What it helps capture</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.helpsCapture.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-white px-4 py-2 text-sm text-charcoal ring-1 ring-sky-100"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <p className="mt-4 flex items-start gap-2 rounded-2xl bg-canvas p-4 text-xs leading-relaxed text-charcoal-mid ring-1 ring-sky-100">
                  <Info size={14} className="mt-0.5 shrink-0 text-sky-600" />
                  Performance depends on your HVAC compatibility, airflow, filter size, usage, and
                  replacement schedule. This is a product comparison, not a medical claim.
                </p>
              </div>

              <div>
                <p className="eyebrow">Long description</p>
                <p className="mt-4 text-base leading-relaxed text-charcoal-mid text-pretty">
                  {product.longDescription}
                </p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-card bg-white p-6 ring-1 ring-sky-100 shadow-soft">
                <p className="eyebrow">Replacement guidance</p>
                <p className="mt-3 font-display text-lg font-semibold text-charcoal">
                  {product.replacementCadence}
                </p>
                <p className="mt-2 text-sm text-charcoal-mid">
                  Homes with pets, allergies, or smoke exposure benefit from more frequent
                  replacements.
                </p>
              </div>
              <div className="rounded-card bg-white p-6 ring-1 ring-sky-100 shadow-soft">
                <p className="eyebrow">Compatibility</p>
                <p className="mt-3 text-sm text-charcoal-mid text-pretty">
                  Sized for standard residential HVAC returns. If your system is older or
                  smaller, we recommend MERV 8-11 filters, your technician can confirm.
                </p>
              </div>
              <div className="rounded-card bg-gradient-to-br from-sky-500 to-sky-700 p-6 text-white shadow-card">
                <p className="text-eyebrow text-sky-100">Compare</p>
                <p className="mt-3 font-display text-lg font-semibold">
                  How does {product.name} fit next to the rest?
                </p>
                <LinkButton
                  href="/shop"
                  variant="secondary"
                  className="mt-4 bg-white text-charcoal ring-0"
                  arrow
                >
                  Compare filters
                </LinkButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* The reviews section is gone, not hidden: it carried four invented
          customer quotes under named authors and a "verified reviews" count.
          Put it back when there are real ones, as with the homepage
          testimonials. */}

      <section className="border-t border-sky-100 py-16 sm:py-20">
        <div className="container-x">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Compare</p>
              <p className="mt-3 font-display text-2xl font-semibold text-charcoal">
                Other KALERO filters
              </p>
            </div>
            <Link
              href="/shop"
              className="link-underline text-sm font-medium text-sky-700"
            >
              Shop all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <div key={p.slug} className="[&>*]:h-full">
                <Link href={`/products/${p.slug}`}>
                  <div className="flex items-center gap-4 rounded-card bg-white p-5 ring-1 ring-sky-100 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
                    <div
                      className="pointer-events-none relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-xl"
                      style={{
                        background: `linear-gradient(180deg, ${p.color.soft} 0%, #FFFFFF 100%)`,
                      }}
                    >
                      {p.image ? (
                        <NextImage
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      ) : (
                        <ProductRender
                          name={p.name}
                          merv={p.merv === "Rotating" ? "Drop" : p.merv === "Activated Carbon" ? "Carbon" : p.merv}
                          category={p.category}
                          size="sm"
                          floating={false}
                          showBadge={false}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-base font-semibold text-charcoal">
                        {p.name}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs text-charcoal-mid text-pretty">{p.concern}</p>
                      <p className="mt-2 text-xs font-medium text-sky-700">
                        From ${p.priceFrom}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appears once configuring has begun, so it never covers the page on arrival. */}
      {config.touched && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E8EEF3] bg-white/95 px-4 py-2.5 shadow-[0_-8px_30px_-18px_rgba(11,90,148,0.5)] backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-charcoal">
                {config.sizeLabel} · MERV {tier.merv}
              </p>
              <p className="text-[11px] text-charcoal-light">
                {config.packQty} {config.packQty === 1 ? "filter" : "filters"}
                {config.purchaseType === "subscribe"
                  ? ` · every ${config.cadence} days`
                  : " · one-time"}
              </p>
            </div>
            <button
              type="button"
              onClick={config.addToCart}
              disabled={!config.canAddToCart}
              className="flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-sky-500 px-5 text-sm font-semibold text-charcoal transition-colors hover:bg-sky-400 disabled:bg-charcoal-light disabled:text-charcoal"
            >
              {config.tierComingSoon ? (
                "Coming soon"
              ) : (
                <>
                  Add to cart
                  {config.quote.total != null && (
                    <span className="opacity-70">{formatPrice(config.quote.total)}</span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

