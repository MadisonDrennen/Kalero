/**
 * KALERO business configuration.
 * All fields default to null so the UI never renders unsupported claims.
 * Fill in a value only when it's been confirmed with the business.
 */
export type BusinessConfig = {
  /** Sitewide announcement bar copy. Null hides the bar entirely. */
  announcementBar: string | null;
  /** Short line displayed on PDPs under Add to Cart. */
  shippingMessage: string | null;
  /** e.g. "Free shipping on orders over $50" threshold amount. */
  shippingThreshold: number | null;
  /** Returns / satisfaction copy near cart or PDP. */
  returnsMessage: string | null;
  /** Manufacturing origin claim (e.g. "Made in USA"). */
  manufacturingMessage: string | null;
  /** Percentage discount applied when subscribing (0-100). */
  subscriptionDiscount: number | null;
  supportEmail: string | null;
  supportPhone: string | null;
};

export const businessConfig: BusinessConfig = {
  announcementBar: null,
  shippingMessage: null,
  shippingThreshold: null,
  returnsMessage: null,
  manufacturingMessage: null,
  subscriptionDiscount: null,
  supportEmail: null,
  supportPhone: null,
};

/**
 * Convenience helper — returns the subscription discount as a decimal
 * (e.g. 15 → 0.15) or null if no discount is configured.
 */
export function subscriptionMultiplier(): number | null {
  const d = businessConfig.subscriptionDiscount;
  if (d == null) return null;
  return 1 - d / 100;
}

/**
 * HVAC trade programme.
 *
 * Same rule as the storefront config above: every commercial term starts null
 * so the page never states a price, a minimum or a lead time that has not been
 * agreed. Fill one in and its line appears; leave it null and the page simply
 * does not make that claim.
 */
export type PartnerConfig = {
  /** e.g. "Wholesale pricing from 40% off retail". */
  pricingMessage: string | null;
  /** e.g. "No minimum on reorders". */
  minimumOrderMessage: string | null;
  /** e.g. "Ships within 3 business days". */
  leadTimeMessage: string | null;
  /** e.g. "Net 30 on approved accounts". */
  termsMessage: string | null;
  /** Where partner enquiries should go. */
  partnerEmail: string | null;
  partnerPhone: string | null;
};

export const partnerConfig: PartnerConfig = {
  pricingMessage: null,
  minimumOrderMessage: null,
  leadTimeMessage: null,
  termsMessage: null,
  partnerEmail: null,
  partnerPhone: null,
};

/** The commercial terms that have actually been confirmed, for rendering. */
export function confirmedPartnerTerms(): { label: string; value: string }[] {
  const rows: [string, string | null][] = [
    ["Pricing", partnerConfig.pricingMessage],
    ["Minimum order", partnerConfig.minimumOrderMessage],
    ["Lead time", partnerConfig.leadTimeMessage],
    ["Terms", partnerConfig.termsMessage],
  ];
  return rows
    .filter(([, v]) => v != null)
    .map(([label, v]) => ({ label, value: v as string }));
}
