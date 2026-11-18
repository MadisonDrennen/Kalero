import { products, type CategoryKey } from "./products";

export type Category = {
  key: CategoryKey;
  slug: string;
  title: string;
  shortTitle: string;
  concern: string;
  description: string;
  productSlug: string;
  gradient: string;
  chipClass: string;
  ringClass: string;
  hex: string;
  softHex: string;
  deepHex: string;
  icon: "dust" | "paw" | "flower" | "flame" | "leaf" | "sparkles";
  /**
   * Whether this line is on sale yet. Launch is the three MERV tiers only --
   * Everyday (8), Pet (11) and Allergy (13) -- so Smoke, Carbon, Hotel and
   * Seasonal are defined but not shown. One flag rather than a `!== "hotel"` in every grid: the last time a
   * category was hidden it took four separate filters, and any surface that
   * forgot one leaked it.
   */
  live: boolean;
};

export const categories: Category[] = [
  {
    key: "everyday",
    slug: "everyday-dust",
    title: "Everyday Dust",
    shortTitle: "Everyday",
    concern: "Everyday Dust",
    description:
      "Fresh air for daily dust, lint, and steady household circulation.",
    productSlug: "everyday-defense",
    gradient: "from-sky-soft via-white to-white",
    chipClass: "bg-sky-100 text-sky-700",
    ringClass: "ring-sky/30",
    hex: "#67B7F2",
    softHex: "#E5F2FD",
    deepHex: "#3A8FC9",
    icon: "dust",
    live: true,
  },
  {
    key: "pet",
    slug: "pets-and-dander",
    title: "Pets & Dander",
    shortTitle: "Pets",
    concern: "Pets & Dander",
    description:
      "Fresh air for pet-active homes. Dander, hair, and daily circulation.",
    productSlug: "pet-defense",
    gradient: "from-grass-soft via-white to-white",
    chipClass: "bg-sky-100 text-sky-700",
    ringClass: "ring-grass/30",
    hex: "#0047B3",
    softHex: "#D6E2F3",
    deepHex: "#022F72",
    icon: "paw",
    live: false,
  },
  {
    key: "allergy",
    slug: "allergies-and-pollen",
    title: "Allergies & Pollen",
    shortTitle: "Allergies",
    concern: "Allergies & Pollen",
    description:
      "Fresh air through pollen season. Pollen, dust mites, and mold spores at MERV 13.",
    productSlug: "allergy-defense",
    gradient: "from-blush-soft via-white to-white",
    chipClass: "bg-sky-100 text-sky-700",
    ringClass: "ring-blush/30",
    hex: "#2B3238",
    softHex: "#E4E6E8",
    deepHex: "#050708",
    icon: "flower",
    live: true,
  },
  {
    key: "hotel",
    slug: "hotel-collection",
    title: "Hotel Collection",
    shortTitle: "Hotel",
    concern: "Hotel Collection",
    description:
      "Hospitality-grade air for hotels, serviced apartments, and property portfolios.",
    productSlug: "hotel-collection",
    gradient: "from-gold-soft via-white to-white",
    chipClass: "bg-sky-100 text-sky-700",
    ringClass: "ring-gold/30",
    hex: "#5A6670",
    softHex: "#E4E6E8",
    deepHex: "#2B3238",
    icon: "sparkles",
    live: false,
  },
  {
    key: "smoke",
    slug: "smoke-and-pollution",
    title: "Smoke & Pollution",
    shortTitle: "Smoke",
    concern: "Smoke & Pollution",
    description:
      "Clean air on wildfire days and in dense cities. Fine smoke and urban particulates.",
    productSlug: "smoke-defense",
    gradient: "from-smoke-soft via-white to-white",
    chipClass: "bg-sky-100 text-sky-700",
    ringClass: "ring-smoke/30",
    hex: "#2B3238",
    softHex: "#E4E6E8",
    deepHex: "#050708",
    icon: "flame",
    live: false,
  },
  {
    key: "carbon",
    slug: "odors-and-vocs",
    title: "Odors & VOCs",
    shortTitle: "Odors",
    concern: "Odors & VOCs",
    description:
      "Fresh air for cooking, pet, paint, and everyday household VOCs. Activated carbon layer.",
    productSlug: "carbon-defense",
    gradient: "from-graphite-soft via-white to-white",
    chipClass: "bg-sky-100 text-sky-700",
    ringClass: "ring-graphite/30",
    hex: "#2B3238",
    softHex: "#E4E6E8",
    deepHex: "#050708",
    icon: "sparkles",
    live: false,
  },
  {
    key: "seasonal",
    slug: "seasonal-air",
    title: "Seasonal Air",
    shortTitle: "Seasonal",
    concern: "Seasonal Air",
    description:
      "Limited drops for how the season actually feels, Spring Pollen, Summer Smoke, Fall Dust, Winter Fresh.",
    productSlug: "seasonal-defense",
    gradient: "from-sky-100 via-white to-white",
    chipClass: "bg-sky-100 text-sky-700",
    ringClass: "ring-sky-300/30",
    hex: "#35B2E6",
    softHex: "#CFE8F4",
    deepHex: "#0047B3",
    icon: "leaf",
    live: false,
  },
];

/** Everything on sale, in display order. The grids all read from this. */
export const liveCategories = categories.filter((c) => c.live);

/**
 * Products whose category is on sale. Derived rather than a second flag, so a
 * line can never be half-launched: turning a category live turns its products
 * on with it. Lives here, not in products.ts, to keep the dependency one-way.
 */
export const liveProducts = products.filter(
  (p) => categories.find((c) => c.key === p.category)?.live ?? false,
);

export const categoryByKey = (key: CategoryKey) =>
  categories.find((c) => c.key === key);
export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
