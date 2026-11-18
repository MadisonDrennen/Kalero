/**
 * Variant configuration for the KALERO tier + size + pack model.
 *
 * Pricing is intentionally NULL until the business confirms it. The UI hides
 * price rows and disables cart actions when variantPrice() returns null.
 */
import type { TierId } from "./tiers";
import type { FilterSize } from "./sizes";

export type PackQty = 1 | 2 | 4 | 6 | 12;
export type PurchaseType = "onetime" | "subscribe";
export type SubscribeCadenceDays = 30 | 60 | 90 | 180;

export const PACK_QUANTITIES: PackQty[] = [1, 2, 4, 6, 12];
export const SUBSCRIBE_CADENCES: SubscribeCadenceDays[] = [30, 60, 90, 180];

/**
 * The packs offered as one-tap cards on the product page. Everything else in
 * PACK_QUANTITIES stays reachable through the stepper beside them, so the
 * 12-pack is available without a fifth card competing for attention.
 */
export const QUICK_PACK_QUANTITIES: PackQty[] = PACK_QUANTITIES.filter(
  (q) => q <= 6,
);

/**
 * Cadences offered on the product page. 180 days stays in SUBSCRIBE_CADENCES
 * for the subscription manager, where a longer interval makes sense to pick
 * deliberately.
 */
export const PDP_CADENCES: SubscribeCadenceDays[] = SUBSCRIBE_CADENCES.filter(
  (d) => d <= 90,
);

/** Pre-selected when a customer switches to a subscription. */
export const DEFAULT_CADENCE: SubscribeCadenceDays = 60;

/**
 * Best-value pack — surfaced with a "Best value" chip in the pack selector.
 * Marked here rather than fabricated at render time so it can be turned off
 * per business decision later.
 */
export const BEST_VALUE_PACK: PackQty = 4;

/**
 * Pack carrying the "Most popular" chip. Null until we have order data to back
 * the claim — the chip simply doesn't render while this is null.
 */
export const MOST_POPULAR_PACK: PackQty | null = null;

/**
 * Per-filter price multiplier at each pack size, e.g. { 4: 0.92 } for an 8%
 * multi-pack discount. Empty until business confirms the discount ladder, so
 * per-filter pricing stays flat rather than implying a saving we don't offer.
 */
export const PACK_PRICE_MULTIPLIER: Partial<Record<PackQty, number>> = {};

/**
 * Pricing matrix. All entries default to null until confirmed by business.
 * When null, the UI:
 *   - hides the price row on cards / configurators
 *   - disables the Add to Cart button
 *   - shows a "Pricing coming soon" microcopy line
 *
 * Structure keeps future population straightforward — index is [tier][pack].
 */
type TierPriceMatrix = Partial<Record<TierId, Partial<Record<PackQty, number | null>>>>;

const priceMatrix: TierPriceMatrix = {
  standard: {},
  max: {},
};

/**
 * Returns the base price for a size × tier × pack variant.
 * Depth can drive a multiplier once we're confident (4" filters generally
 * cost more than 1"), but until pricing is confirmed everything returns null.
 */
export function variantPrice(
  _size: FilterSize,
  tier: TierId,
  pack: PackQty,
): number | null {
  const base = priceMatrix[tier]?.[pack];
  return typeof base === "number" ? base : null;
}

/** Convenience: does this variant have a confirmed price? */
export function hasVariantPrice(
  size: FilterSize,
  tier: TierId,
  pack: PackQty,
): boolean {
  return variantPrice(size, tier, pack) !== null;
}
