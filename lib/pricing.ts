/**
 * Pricing for a configured filter: size × tier × pack × purchase type (+ scent).
 *
 * One module so the PDP, the cart and anything added later quote the same
 * numbers. Nothing here invents a price. There are two sources, in order:
 *
 *   1. `variantPrice()` — the confirmed per-variant matrix in lib/variants.ts.
 *      Empty today, and the moment business fills it in it wins everywhere.
 *   2. The legacy `priceFrom` figures already carried on lib/products.ts, which
 *      are what the site shows today.
 *
 * Anything still unknown comes back as null, and callers render a dash and
 * disable the cart rather than guessing — the same contract lib/variants.ts and
 * lib/business.ts already set.
 */
import { businessConfig } from "./business";
import { scentStripPrice } from "./scentStrips";
import { products, type Product } from "./products";
import { sizeBySlug, type FilterSize } from "./sizes";
import { tierById, tierForProduct, type TierId } from "./tiers";
import {
  PACK_PRICE_MULTIPLIER,
  variantPrice,
  type PackQty,
  type PurchaseType,
} from "./variants";

export type Quote = {
  /** One filter at list price, before any subscription discount. */
  listPerFilter: number | null;
  /** One filter at the price actually charged. */
  perFilter: number | null;
  /** Every filter in the pack. */
  filtersSubtotal: number | null;
  /** Scent strips, which are never discounted by a subscription. */
  scentSubtotal: number;
  total: number | null;
  /** Saved against the same pack bought once, or null when not subscribing. */
  subscriptionSavings: number | null;
  /** The subscription discount as a percentage, for "save 15%" copy. */
  subscriptionPercent: number | null;
  /** True when the figures come from the confirmed variant matrix. */
  confirmed: boolean;
};

function money(n: number): number {
  return Math.round(n * 100) / 100;
}

/** The MERV number a legacy product record maps to, if it maps to one at all. */
function mervOf(p: Product): number | null {
  const m = /^MERV (\d+)$/.exec(p.merv);
  return m ? Number(m[1]) : null;
}

/**
 * List price for one filter at a tier, with no particular product in context —
 * the lowest `priceFrom` among the products carrying that MERV, which is the
 * "from" figure the shop pages already quote. Null when the catalogue has
 * nothing at that MERV, rather than extrapolating one.
 */
export function tierListPriceById(tierId: TierId): number | null {
  const tier = tierById(tierId);
  const atTier = products
    .filter((p) => mervOf(p) === tier.merv)
    .map((p) => p.priceFrom);
  return atTier.length > 0 ? Math.min(...atTier) : null;
}

/**
 * List price for one filter of THIS product at a given tier.
 *
 * The product keeps its own advertised price at its own tier, and the other two
 * tiers move by the same steps the catalogue already uses between tiers. That
 * matters for specialty filters: Carbon Defense has no MERV of its own, so
 * quoting it at the catalogue's Pro price would sell it $10 under its own
 * listing. Shifting the ladder keeps its price intact and keeps a higher tier
 * dearer than a lower one.
 */
export function tierListPrice(product: Product, tierId: TierId): number | null {
  const target = tierListPriceById(tierId);
  if (target == null) return null;
  const anchor = tierListPriceById(tierForProduct(product.merv));
  if (anchor == null) return target;
  return Math.max(0, money(target + (product.priceFrom - anchor)));
}

/**
 * Subscription discount with no product in context: the business config, else
 * the smallest saving any product in the catalogue advertises, so a shared
 * quote never promises more than the catalogue does.
 */
export function baseSubscriptionPercent(): number | null {
  if (businessConfig.subscriptionDiscount != null) {
    return businessConfig.subscriptionDiscount;
  }
  const advertised = products
    .map((p) => p.subscriptionSavings)
    .filter((n): n is number => typeof n === "number");
  return advertised.length > 0 ? Math.min(...advertised) : null;
}

/** Subscription discount as a percentage, preferring the business config. */
export function subscriptionPercent(product: Product): number | null {
  return businessConfig.subscriptionDiscount ?? product.subscriptionSavings ?? null;
}

export type QuoteInput = {
  product: Product;
  /** Null for a custom size, which has no variant to price against. */
  size: FilterSize | null;
  tierId: TierId;
  packQty: PackQty;
  purchaseType: PurchaseType;
  /** Per-strip price × strips, already resolved by the caller. */
  scentSubtotal?: number;
};

export function quote({
  product,
  size,
  tierId,
  packQty,
  purchaseType,
  scentSubtotal = 0,
}: QuoteInput): Quote {
  const confirmedUnit = size ? variantPrice(size, tierId, packQty) : null;
  const listPerFilter =
    confirmedUnit ??
    (() => {
      const base = tierListPrice(product, tierId);
      if (base == null) return null;
      // 1 until business confirms a multi-pack discount, so per-filter pricing
      // stays flat rather than implying a saving that isn't offered yet.
      return money(base * (PACK_PRICE_MULTIPLIER[packQty] ?? 1));
    })();

  const percent = subscriptionPercent(product);
  const subscribing = purchaseType === "subscribe";
  const perFilter =
    listPerFilter == null
      ? null
      : subscribing && percent != null
        ? money(listPerFilter * (1 - percent / 100))
        : listPerFilter;

  const filtersSubtotal = perFilter == null ? null : money(perFilter * packQty);
  const listSubtotal =
    listPerFilter == null ? null : money(listPerFilter * packQty);

  return {
    listPerFilter,
    perFilter,
    filtersSubtotal,
    scentSubtotal: money(scentSubtotal),
    total:
      filtersSubtotal == null ? null : money(filtersSubtotal + scentSubtotal),
    subscriptionSavings:
      subscribing && listSubtotal != null && filtersSubtotal != null
        ? money(listSubtotal - filtersSubtotal)
        : null,
    subscriptionPercent: percent,
    confirmed: confirmedUnit != null,
  };
}

/** "$18.70", or a dash when the figure isn't known yet. */
export function formatPrice(n: number | null): string {
  return n == null ? "—" : `$${n.toFixed(2)}`;
}

/**
 * What one cart line costs, without a Product in hand.
 *
 * The cart stores variants, not products, so this quotes from the tier alone
 * and uses the catalogue-wide subscription discount. Returns null whenever the
 * figure isn't known, which is what makes the drawer show a dash.
 */
export function lineItemPrice(item: {
  sizeSlug: string;
  tierId: TierId;
  packQty: PackQty;
  purchaseType: PurchaseType;
  scentSlug?: string | null;
}): { total: number | null; confirmed: boolean } {
  const size = sizeBySlug(item.sizeSlug) ?? null;
  const confirmedUnit = size
    ? variantPrice(size, item.tierId, item.packQty)
    : null;
  const listUnit =
    confirmedUnit ??
    (() => {
      const base = tierListPriceById(item.tierId);
      if (base == null) return null;
      return money(base * (PACK_PRICE_MULTIPLIER[item.packQty] ?? 1));
    })();
  if (listUnit == null) return { total: null, confirmed: false };

  const percent = baseSubscriptionPercent();
  const unit =
    item.purchaseType === "subscribe" && percent != null
      ? money(listUnit * (1 - percent / 100))
      : listUnit;
  const scent = item.scentSlug ? scentStripPrice * item.packQty : 0;
  return {
    total: money(unit * item.packQty + scent),
    confirmed: confirmedUnit != null,
  };
}
