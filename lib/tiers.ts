/**
 * KALERO performance tiers.
 * The primary product axis for the new tier + size commerce model.
 * Each SIZE × TIER × PACK is a variant; tier is the fixed 3-way choice.
 */
export type TierId = "standard" | "pro" | "max";
export type MervRating = 8 | 11 | 13;

/** Kept to a closed set so a tier cannot name an icon the card cannot draw. */
export type HandledIcon =
  | "dust"
  | "pets"
  | "pollen"
  | "allergens"
  | "dander"
  | "smoke"
  | "smog"
  | "bacteria"
  | "odors";

export type FilterTier = {
  id: TierId;
  name: string;
  merv: MervRating;
  tagline: string;
  positioning: string;
  /** Two or three words for the tier cards in the PDP configurator. */
  shortBenefit: string;
  /**
   * What this tier is for, as four scannable chips. Separate from `bestFor`,
   * which is prose for the product page -- these are one or two words each
   * because they sit under an icon.
   */
  handles: { icon: HandledIcon; label: string }[];
  bestFor: string[];
  captures: string[];
  colorToken: "merv-standard" | "merv-pro" | "merv-max";
  hex: string;
  softHex: string;
  /** For tier-coloured text and icons on white. */
  deepHex: string;
  /**
   * Text colour to sit on a solid `hex` fill. Brand Kit v5 fixes the tier
   * colours as spectrum stops and they are all pastels, so white on them runs
   * 1.9:1 to 2.4:1 -- well under the 4.5:1 floor. Carbon on the same fills runs
   * 8:1 to 10:1, which keeps the button the real tier colour instead of a
   * darkened stand-in the kit does not define.
   */
  onHex: string;
  /** Held back from launch: listed and indexed, but not purchasable. */
  comingSoon?: boolean;
  /** The tier's packaging render. */
  /* Photography is null until the new blue-and-navy cartons are shot. The old
     renders were v5 packaging with green MERV 11 and lilac MERV 13 media, so
     they were removed rather than left on the site looking current. Callers
     fall back to the drawn FilterBox. */
  heroImage: string | null;
  /** The filter itself, three-quarter view. */
  angleImage: string | null;
  /** The filter out of its carton, showing the tier's media colour. */
  filterImage: string | null;
};

export const tiers: FilterTier[] = [
  {
    id: "standard",
    name: "Standard",
    merv: 8,
    tagline: "Everyday clean air.",
    shortBenefit: "Everyday dust",
    handles: [
      { icon: "dust", label: "Dust" },
      { icon: "pets", label: "Pets" },
      { icon: "pollen", label: "Pollen" },
      { icon: "allergens", label: "Everyday allergens" },
    ],
    positioning: "Everyday protection for cleaner home air.",
    bestFor: ["Everyday homes", "Baseline filtration", "Households without pets"],
    captures: ["Household dust", "Pollen", "Lint", "Larger airborne particles"],
    colorToken: "merv-standard",
    hex: "#35B1E6",
    softHex: "#CFE8F4",
    deepHex: "#0047B3",
    onHex: "#050708",
    heroImage: null,
    angleImage: null,
    filterImage: null,
  },
  {
    id: "pro",
    name: "Pro",
    merv: 11,
    tagline: "More protection for the home you live in.",
    shortBenefit: "Pets + allergies",
    handles: [
      { icon: "pets", label: "Pets" },
      { icon: "allergens", label: "Allergies" },
      { icon: "pollen", label: "Pollen" },
      { icon: "dander", label: "Dander" },
    ],
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
    hex: "#0047B3",
    softHex: "#D6E2F3",
    deepHex: "#022F72",
    onHex: "#FFFFFF",
    heroImage: null,
    angleImage: null,
    filterImage: null,
  },
  {
    id: "max",
    name: "Max",
    merv: 13,
    tagline: "When cleaner air matters most.",
    shortBenefit: "Smoke + bacteria",
    handles: [
      { icon: "smoke", label: "Smoke" },
      { icon: "smog", label: "Smog" },
      { icon: "bacteria", label: "Bacteria" },
      { icon: "odors", label: "Odors" },
    ],
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
    hex: "#283238",
    softHex: "#E3E6E8",
    deepHex: "#050708",
    onHex: "#FFFFFF",
    comingSoon: true,
    heroImage: null,
    angleImage: null,
    filterImage: null,
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

/** MERV 13 is out for launch; the range is MERV 8 and MERV 11. */
export const purchasableTiers = tiers.filter((t) => !t.comingSoon);

export function tierIsPurchasable(id: TierId): boolean {
  return !tierById(id).comingSoon;
}
