"use client";

import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { quote, type Quote } from "@/lib/pricing";
import {
  isScentCompatible,
  scentStripPrice,
  type ScentKey,
} from "@/lib/scentStrips";
import {
  DEFAULT_SIZE_SLUG,
  formatSize,
  sizeSlug as makeSizeSlug,
  sizes as allSizes,
  type FilterSize,
} from "@/lib/sizes";
import { tierForProduct, type TierId, tierIsPurchasable } from "@/lib/tiers";
import {
  DEFAULT_CADENCE,
  PACK_QUANTITIES,
  type PackQty,
  type PurchaseType,
  type SubscribeCadenceDays,
} from "@/lib/variants";

/** "12 x 24 x 1", "12×24×1", "12 24 1" — all read as three numbers. */
function parseCustomSize(raw: string): { w: number; h: number; d: number } | null {
  const nums = raw.match(/\d+(\.\d+)?/g);
  if (!nums || nums.length < 3) return null;
  const [w, h, d] = nums.slice(0, 3).map(Number);
  if (![w, h, d].every((n) => n > 0)) return null;
  return { w, h, d };
}

export type ProductConfig = {
  /** Catalogue sizes this product is offered in. */
  availableSizes: FilterSize[];
  /** The chosen catalogue size, or null while a custom size is in use. */
  size: FilterSize | null;
  /** What the customer typed, once applied. */
  customSize: string | null;
  /** Always safe to show: a catalogue size or the custom one. */
  sizeLabel: string;
  tierId: TierId;
  packQty: PackQty;
  purchaseType: PurchaseType;
  cadence: SubscribeCadenceDays;
  scentKey: ScentKey | null;
  scentEligible: boolean;
  quote: Quote;
  /** False when nothing sellable is configured yet. */
  canAddToCart: boolean;
  /** True when the chosen filtration level is held back from launch. */
  tierComingSoon: boolean;
  /** True once the customer has touched any control. */
  touched: boolean;
  setSize: (s: FilterSize) => void;
  setCustomSize: (raw: string) => boolean;
  setTier: (t: TierId) => void;
  setPack: (q: PackQty) => void;
  stepPack: (direction: 1 | -1) => void;
  setPurchaseType: (t: PurchaseType) => void;
  setCadence: (d: SubscribeCadenceDays) => void;
  setScent: (k: ScentKey | null) => void;
  addToCart: () => void;
};

/**
 * Every purchase decision on the product page, in one place.
 *
 * The gallery, the configurator and the mobile bar all read the same state, and
 * `addToCart` writes exactly the LineItem shape the cart and drawer already
 * expect — size slug, tier, pack, purchase type, cadence, scent.
 */
export function useProductConfig(product: Product): ProductConfig {
  const cart = useCart();

  const availableSizes = useMemo(() => {
    // product.sizes is a list of display labels; map it back onto catalogue
    // records so every selection carries a real slug for the cart.
    const offered = new Set(product.sizes as readonly string[]);
    const matched = allSizes.filter((s) => offered.has(formatSize(s)));
    return matched.length > 0 ? matched : allSizes;
  }, [product.sizes]);

  const [sizeSlug, setSizeSlug] = useState<string | null>(
    () =>
      (
        availableSizes.find((s) => s.slug === DEFAULT_SIZE_SLUG) ??
        availableSizes.find((s) => s.popular) ??
        availableSizes[0]
      )?.slug ?? null,
  );
  const [customSize, setCustomSizeState] = useState<string | null>(null);
  const [tierId, setTierId] = useState<TierId>(() => tierForProduct(product.merv));
  const [packQty, setPackQty] = useState<PackQty>(1);
  const [purchaseType, setPurchaseTypeState] = useState<PurchaseType>("subscribe");
  const [cadence, setCadence] = useState<SubscribeCadenceDays>(DEFAULT_CADENCE);
  const [scentKey, setScentKey] = useState<ScentKey | null>(null);
  const [touched, setTouched] = useState(false);

  const size = useMemo(
    () => availableSizes.find((s) => s.slug === sizeSlug) ?? null,
    [availableSizes, sizeSlug],
  );

  const scentEligible = isScentCompatible(product);
  const scentSubtotal = scentKey === null ? 0 : scentStripPrice * packQty;

  const currentQuote = useMemo(
    () =>
      quote({
        product,
        size,
        tierId,
        packQty,
        purchaseType,
        scentSubtotal,
      }),
    [product, size, tierId, packQty, purchaseType, scentSubtotal],
  );

  const sizeLabel = size ? formatSize(size) : (customSize ?? "Select a size");

  /** A custom size still needs a slug the cart can carry. */
  const cartSizeSlug = useMemo(() => {
    if (size) return size.slug;
    if (!customSize) return null;
    const parsed = parseCustomSize(customSize);
    return parsed ? makeSizeSlug(parsed.w, parsed.h, parsed.d) : null;
  }, [size, customSize]);

  const touch = () => setTouched(true);

  const setSize = useCallback((s: FilterSize) => {
    touch();
    setSizeSlug(s.slug);
    setCustomSizeState(null);
  }, []);

  const setCustomSize = useCallback((raw: string) => {
    const parsed = parseCustomSize(raw);
    if (!parsed) return false;
    touch();
    const label = `${parsed.w} × ${parsed.h} × ${parsed.d}`;
    // A typed size that matches the catalogue is just that catalogue size.
    const match = allSizes.find(
      (s) => s.slug === makeSizeSlug(parsed.w, parsed.h, parsed.d),
    );
    if (match) {
      setSizeSlug(match.slug);
      setCustomSizeState(null);
    } else {
      setSizeSlug(null);
      setCustomSizeState(label);
    }
    return true;
  }, []);

  const stepPack = useCallback((direction: 1 | -1) => {
    touch();
    setPackQty((current) => {
      const i = PACK_QUANTITIES.indexOf(current);
      const next = PACK_QUANTITIES[i + direction];
      return next ?? current;
    });
  }, []);

  const addToCart = useCallback(() => {
    if (!cartSizeSlug) return;
    cart.add({
      sizeSlug: cartSizeSlug,
      tierId,
      packQty,
      purchaseType,
      subscribeCadenceDays:
        purchaseType === "subscribe" ? cadence : undefined,
      scentSlug: scentKey,
      quantity: 1,
    });
  }, [cart, cartSizeSlug, tierId, packQty, purchaseType, cadence, scentKey]);

  return {
    availableSizes,
    size,
    customSize,
    sizeLabel,
    tierId,
    packQty,
    purchaseType,
    cadence,
    scentKey,
    scentEligible,
    quote: currentQuote,
    /* MERV 13 is out for launch, and the configurator can switch any product
       to it, so this gates on the chosen tier and not just the product. */
    canAddToCart: cartSizeSlug != null && tierIsPurchasable(tierId),
    tierComingSoon: !tierIsPurchasable(tierId),
    touched,
    setSize,
    setCustomSize,
    setTier: (t) => {
      touch();
      setTierId(t);
    },
    setPack: (q) => {
      touch();
      setPackQty(q);
    },
    stepPack,
    setPurchaseType: (t) => {
      touch();
      setPurchaseTypeState(t);
    },
    setCadence: (d) => {
      touch();
      setCadence(d);
    },
    setScent: (k) => {
      touch();
      setScentKey(k);
    },
    addToCart,
  };
}
