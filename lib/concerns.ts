/**
 * KALERO's "Shop by what's in your air" concerns.
 * Concerns are a discovery surface, not the SKU axis. Each concern maps to
 * a recommended tier.
 */
import type { TierId } from "./tiers";
import type { Category } from "./categories";

export type ConcernSlug =
  | "everyday-dust"
  | "pets-and-dander"
  | "allergies-and-pollen"
  | "smoke-and-pollution"
  | "odors-and-vocs"
  | "hotel-property";

export type Concern = {
  slug: ConcernSlug;
  title: string;
  shortTitle: string;
  chipLabel: string;
  description: string;
  recommendedTier: TierId;
  /** icon key on the shared CategoryIcon component */
  icon: Category["icon"];
  hex: string;
  softHex: string;
  deepHex: string;
  /** Optional artwork for the concern hub page. */
  heroImage?: string | null;
};

export const concerns: Concern[] = [
  {
    slug: "everyday-dust",
    title: "Everyday dust & lint",
    shortTitle: "Everyday dust",
    chipLabel: "For daily dust",
    description:
      "Baseline filtration for the way your home breathes every day.",
    recommendedTier: "standard",
    icon: "dust",
    hex: "#35B2E6",
    softHex: "#CFE8F4",
    deepHex: "#0047B3",
    heroImage: null,
  },
  {
    slug: "pets-and-dander",
    title: "Pets & dander",
    shortTitle: "Pets",
    chipLabel: "For pet dander",
    description:
      "Extra help for the dander, fur, and odors that come with pet-active homes.",
    recommendedTier: "pro",
    icon: "paw",
    hex: "#0047B3",
    softHex: "#D6E2F3",
    deepHex: "#022F72",
    heroImage: null,
  },
  {
    slug: "allergies-and-pollen",
    title: "Allergies & pollen",
    shortTitle: "Allergies",
    chipLabel: "For pollen + allergens",
    description:
      "Higher-capture filtration for households sensitive to seasonal allergens.",
    recommendedTier: "pro",
    icon: "flower",
    hex: "#0047B3",
    softHex: "#D6E2F3",
    deepHex: "#022F72",
    heroImage: null,
  },
  {
    slug: "smoke-and-pollution",
    title: "Smoke & outdoor air",
    shortTitle: "Smoke",
    chipLabel: "For smoke + smog",
    description:
      "Finer-particle filtration for homes near wildfire smoke, urban traffic, or outdoor haze.",
    recommendedTier: "max",
    icon: "flame",
    hex: "#2B3238",
    softHex: "#E4E6E8",
    deepHex: "#050708",
    heroImage: null,
  },
  {
    slug: "odors-and-vocs",
    title: "Odors & everyday air",
    shortTitle: "Odors",
    chipLabel: "For odors + VOCs",
    description:
      "Carbon-forward help for kitchens, entertaining, and homes that hold onto scent.",
    recommendedTier: "max",
    icon: "leaf",
    hex: "#2B3238",
    softHex: "#E4E6E8",
    deepHex: "#050708",
    heroImage: null,
  },
  {
    slug: "hotel-property",
    title: "Hospitality & property",
    shortTitle: "Property supply",
    chipLabel: "For hospitality",
    description:
      "Consistent replacement filtration built into a property's service cadence.",
    recommendedTier: "pro",
    icon: "sparkles",
    hex: "#0047B3",
    softHex: "#D6E2F3",
    deepHex: "#022F72",
    heroImage: null,
  },
];

export function concernBySlug(slug: string): Concern | undefined {
  return concerns.find((c) => c.slug === slug);
}
