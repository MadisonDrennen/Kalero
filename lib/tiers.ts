/**
 * KALERO performance tiers.
 * The primary product axis for the new tier + size commerce model.
 * Each SIZE × TIER × PACK is a variant; tier is the fixed 3-way choice.
 */
export type TierId = "standard" | "pro" | "max";
export type MervRating = 8 | 11 | 13;

export type FilterTier = {
  id: TierId;
  name: string;
  merv: MervRating;
  tagline: string;
  positioning: string;
  /** Two or three words for the tier cards in the PDP configurator. */
  shortBenefit: string;
  bestFor: string[];
  captures: string[];
  colorToken: "merv-standard" | "merv-pro" | "merv-max";
  hex: string;
  softHex: string;
  deepHex: string;
  /** The tier's packaging render. */
  heroImage: string;
  /** The filter itself, three-quarter view. */
  angleImage: string;
  /** The filter out of its carton, showing the tier's media colour. */
  filterImage: string;
};

export const tiers: FilterTier[] = [
  {
    id: "standard",
    name: "Standard",
    merv: 8,
    tagline: "Everyday clean air.",
    shortBenefit: "Everyday dust",
    positioning: "Everyday protection for cleaner home air.",
    bestFor: ["Everyday homes", "Baseline filtration", "Households without pets"],
    captures: ["Household dust", "Pollen", "Lint", "Larger airborne particles"],
    colorToken: "merv-standard",
    hex: "#37B2E6",
    softHex: "#DDF1FB",
    deepHex: "#0C74B0",
    heroImage: "/images/products/merv-8-4pack.jpg",
    angleImage: "/images/products/merv-8-box.png",
    filterImage: "/images/products/merv-8-filter.jpg",
  },
  {
    id: "pro",
    name: "Pro",
    merv: 11,
    tagline: "More protection for the home you live in.",
    shortBenefit: "Pets + allergies",
    positioning: "Extra protection for pets, pollen, and everyday allergens.",
    bestFor: [
      "Homes with pets",
      "Pollen-sensitive households",
      "Allergy-aware homes",
    ],
    captures: [
      "Everything in Standard",
      "Pet dander",
      "Finer dust",
      "Common allergens",
    ],
    colorToken: "merv-pro",
    hex: "#86CCA8",
    softHex: "#DDEEE0",
    deepHex: "#4E9770",
    heroImage: "/images/products/merv-11-4pack.jpg",
    angleImage: "/images/products/merv-11-box.png",
    filterImage: "/images/products/merv-11-filter.jpg",
  },
  {
    id: "max",
    name: "Max",
    merv: 13,
    tagline: "When cleaner air matters most.",
    shortBenefit: "Smoke + bacteria",
    positioning: "Our strongest filtration for homes where air quality matters most.",
    bestFor: [
      "Homes near wildfire smoke",
      "Maximum-filtration households",
      "Finer-particle capture",
    ],
    captures: [
      "Everything in Pro",
      "Smoke and smog",
      "Finer particles",
      "Common airborne particles at high efficiency",
    ],
    colorToken: "merv-max",
    hex: "#C1A1CC",
    softHex: "#EDDDF3",
    deepHex: "#7E3E98",
    heroImage: "/images/products/merv-13-4pack.jpg",
    angleImage: "/images/products/merv-13-box.png",
    filterImage: "/images/products/merv-13-filter.jpg",
  },
];

export function tierById(id: TierId): FilterTier {
  const t = tiers.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown tier id: ${id}`);
  return t;
}

/**
 * The tier a legacy product record starts on in the configurator.
 *
 * Products carrying a MERV rating open on their own tier. Specialty filters
 * (Activated Carbon, rotating seasonal drops) have no MERV equivalent, so they
 * open on Pro — the middle choice, which neither under- nor over-sells them.
 */
export function tierForProduct(merv: string): TierId {
  const m = /^MERV (\d+)$/.exec(merv);
  const t = m ? tiers.find((x) => x.merv === Number(m[1])) : undefined;
  return t?.id ?? "pro";
}

export function tierByMerv(merv: MervRating): FilterTier {
  const t = tiers.find((x) => x.merv === merv);
  if (!t) throw new Error(`No tier for MERV ${merv}`);
  return t;
}
