"use client";

import { useEffect, useMemo, useState } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProductRender } from "@/components/product/ProductRender";
import type { Product } from "@/lib/products";
import { tierById, tiers, type TierId } from "@/lib/tiers";

type Shot = { src: string; label: string };

/** Every tier render, so another tier's artwork never trails into this one. */
const TIER_ART = new Set(tiers.flatMap((t) => [t.angleImage, t.heroImage]));

/**
 * Product visuals for the hero.
 *
 * The shots follow the selected tier, because the packaging genuinely differs
 * per MERV level — switching filtration level in the configurator changes what
 * you're looking at, rather than leaving a MERV 8 box on screen.
 */
export function ProductGallery({
  product,
  tierId,
}: {
  product: Product;
  tierId: TierId;
}) {
  const tier = tierById(tierId);

  const shots = useMemo<Shot[]>(() => {
    const list: Shot[] = [
      { src: tier.angleImage, label: "Filter" },
      { src: tier.heroImage, label: "Packaging" },
    ];
    // A product's own render is usually just one of the tier renders; only add
    // it when it's genuinely a different shot.
    if (product.image && !TIER_ART.has(product.image)) {
      list.push({ src: product.image, label: "Studio" });
    }
    return list;
  }, [tier, product.image]);

  const [active, setActive] = useState(0);
  // A tier change swaps the whole set, so start it from the top again.
  useEffect(() => setActive(0), [tierId]);

  const current = shots[Math.min(active, shots.length - 1)];

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-24 lg:self-start">
      <div
        className="relative flex aspect-[4/3.5] w-full items-center justify-center overflow-hidden rounded-2xl border lg:aspect-[4/4.9]"
        style={{
          borderColor: "#E8EEF3",
          background: `linear-gradient(168deg, ${tier.softHex} 0%, #FFFFFF 62%, #FFFFFF 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-6 top-4 h-1/2 bg-sky-glow opacity-60"
          aria-hidden="true"
        />
        {current ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <NextImage
                src={current.src}
                alt={`${product.name}, MERV ${tier.merv} ${tier.name}, ${current.label.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 620px, 92vw"
                className="object-contain p-4 drop-shadow-[0_28px_48px_rgba(11,90,148,0.18)] sm:p-6"
                priority
              />
            </motion.div>
          </AnimatePresence>
        ) : (
          <ProductRender
            name={product.name}
            subtitle={product.tagline}
            merv={String(tier.merv)}
            category={product.category}
            size="xl"
            priority
          />
        )}
      </div>

      {shots.length > 1 && (
        <div className="flex gap-2.5" aria-label="Product images">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              aria-label={shot.label}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className="relative aspect-square w-[72px] shrink-0 overflow-hidden rounded-xl border bg-white transition-all hover:-translate-y-0.5"
              style={{
                borderColor: i === active ? tier.hex : "#E8EEF3",
                boxShadow:
                  i === active ? `inset 0 0 0 1px ${tier.hex}` : undefined,
                background:
                  i === active
                    ? `linear-gradient(180deg, ${tier.softHex} 0%, #FFFFFF 100%)`
                    : "#FFFFFF",
              }}
            >
              <NextImage
                src={shot.src}
                alt=""
                fill
                sizes="72px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
