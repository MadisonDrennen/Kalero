"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { ProductRender } from "@/components/product/ProductRender";
import { Chip } from "@/components/ui/Chip";
import { MervShield } from "@/components/ui/MervShield";
import { subscriptionPercent } from "@/lib/pricing";
import { tierById, tierForProduct } from "@/lib/tiers";

type Props = {
  product: Product;
  showSubscribeLabel?: boolean;
  className?: string;
};

export function ProductCard({ product, showSubscribeLabel = true, className = "" }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-card bg-white p-6 ring-1 ring-sky-100/80 shadow-soft transition-shadow hover:shadow-card ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-70 transition-opacity group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 60% at 50% 0%, ${product.color.glowFrom} 0%, ${product.color.glowTo} 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-3">
        {product.merv === "Activated Carbon" || product.merv === "Rotating" ? (
          <Chip className={product.color.chip}>
            {product.merv === "Activated Carbon" ? "Carbon" : "Rotating drop"}
          </Chip>
        ) : (
          <MervShield
            rating={product.merv.replace("MERV ", "")}
            /* Tier name and gradient both come from the tier, so a card can
               never label a filter with the wrong one. */
            label={tierById(tierForProduct(product.merv)).name}
            gradient={tierById(tierForProduct(product.merv)).gradient}
            size="xs"
          />
        )}
        {showSubscribeLabel && (
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-sky-600">
            {subscriptionPercent(product) != null
              ? `Save ${subscriptionPercent(product)}% subscribing`
              : "Subscription available"}
          </span>
        )}
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="relative mt-4 flex items-center justify-center overflow-hidden rounded-2xl"
        aria-label={`View ${product.name}`}
        style={{
          background: `linear-gradient(180deg, ${product.color.soft} 0%, #FFFFFF 100%)`,
        }}
      >
        {product.cardImage ? (
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.cardImage}
              alt={`${product.name} 4-pack`}
              fill
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 95vw"
              className="object-contain p-1 drop-shadow-[0_25px_40px_rgba(74,46,122,0.22)] transition-transform duration-500 group-hover:scale-[1.05]"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center py-4">
            <ProductRender
              name={product.name}
              subtitle={product.tagline}
              merv={product.merv === "Activated Carbon" ? "Carbon" : product.merv === "Rotating" ? "Drop" : product.merv}
              category={product.category}
              image={product.image}
              size="md"
            />
          </div>
        )}
      </Link>

      <div className="relative mt-4 flex-1">
        <h3 className="font-display text-xl font-semibold text-charcoal">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-charcoal-mid text-pretty">
          {product.concern}
        </p>
      </div>

      <div className="relative mt-5 flex items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-charcoal-light">
            From
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold text-charcoal">
              ${(
                product.priceFrom *
                (1 - (subscriptionPercent(product) ?? 0) / 100)
              ).toFixed(2)}
            </span>
            <span className="text-xs text-charcoal-light">/ filter</span>
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5 text-[11px] text-charcoal-mid">
            <span className="line-through text-charcoal-light">
              ${product.priceFrom}
            </span>
            <span>one-time</span>
            <span className="text-charcoal-light">·</span>
            <span className="font-medium text-sky-700">
              ${(product.priceFrom * 4).toFixed(0)} four-pack
            </span>
          </div>
        </div>
        {/* no Stars: ratings are null until real reviews exist */}
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-pill bg-charcoal px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-charcoal-soft"
        >
          Choose size
        </Link>
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800"
        >
          Learn more <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}
