/**
 * KALERO filter sizes.
 * The other primary axis of the tier + size commerce model.
 * Slugs match URL segments: /air-filters/[slug]
 */
export type FilterSize = {
  slug: string;
  nominalWidth: number;
  nominalHeight: number;
  nominalDepth: number;
  actualWidth?: number;
  actualHeight?: number;
  actualDepth?: number;
  /** Whether this size is featured on the homepage Popular Sizes grid. */
  popular?: boolean;
};

/** Format a size record as the display label ("16 × 25 × 1"). */
export function formatSize(s: FilterSize): string {
  return `${s.nominalWidth} × ${s.nominalHeight} × ${s.nominalDepth}`;
}

/** Format actual (post-manufacture) size when available. */
export function formatActualSize(s: FilterSize): string | null {
  if (s.actualWidth == null || s.actualHeight == null || s.actualDepth == null) {
    return null;
  }
  return `${s.actualWidth} × ${s.actualHeight} × ${s.actualDepth}`;
}

/** Derive slug from raw dimensions. */
export function sizeSlug(w: number, h: number, d: number): string {
  return `${w}x${h}x${d}`;
}

export const sizes: FilterSize[] = [
  {
    slug: "12x12x1",
    nominalWidth: 12,
    nominalHeight: 12,
    nominalDepth: 1,
    actualWidth: 11.5,
    actualHeight: 11.5,
    actualDepth: 0.75,
  },
  {
    slug: "12x20x1",
    nominalWidth: 12,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 11.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
  },
  {
    slug: "14x20x1",
    nominalWidth: 14,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 13.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "14x25x1",
    nominalWidth: 14,
    nominalHeight: 25,
    nominalDepth: 1,
    actualWidth: 13.5,
    actualHeight: 24.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "16x20x1",
    nominalWidth: 16,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 15.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "16x25x1",
    nominalWidth: 16,
    nominalHeight: 25,
    nominalDepth: 1,
    actualWidth: 15.5,
    actualHeight: 24.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "20x20x1",
    nominalWidth: 20,
    nominalHeight: 20,
    nominalDepth: 1,
    actualWidth: 19.5,
    actualHeight: 19.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "20x25x1",
    nominalWidth: 20,
    nominalHeight: 25,
    nominalDepth: 1,
    actualWidth: 19.5,
    actualHeight: 24.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "20x30x1",
    nominalWidth: 20,
    nominalHeight: 30,
    nominalDepth: 1,
    actualWidth: 19.5,
    actualHeight: 29.5,
    actualDepth: 0.75,
    popular: true,
  },
  {
    slug: "16x25x4",
    nominalWidth: 16,
    nominalHeight: 25,
    nominalDepth: 4,
    actualWidth: 15.5,
    actualHeight: 24.5,
    actualDepth: 3.75,
    popular: true,
  },
  {
    slug: "20x25x4",
    nominalWidth: 20,
    nominalHeight: 25,
    nominalDepth: 4,
    actualWidth: 19.5,
    actualHeight: 24.5,
    actualDepth: 3.75,
  },
];

export const popularSizes = sizes.filter((s) => s.popular);

/**
 * Pre-selected on the product page. The most common US residential size, so
 * most visitors never touch the size picker at all. Falls back gracefully when
 * a product isn't offered in it.
 */
export const DEFAULT_SIZE_SLUG = "20x25x1";

/**
 * The homepage "Most popular sizes" module, by filter depth.
 *
 * Deliberately separate from the `sizes` catalogue above. That one is the
 * variant model — every size we actually build a SKU for. This is a
 * merchandising shortlist: the handful of sizes worth putting in front of
 * someone who already knows theirs, capped so the module stays scannable.
 * Growing one should never silently grow the other.
 *
 * The 1" list is business-supplied. The 2", 4" and 5" lists are the standard
 * industry sets and still need confirming against what KALERO actually
 * stocks — edit the pairs here, nothing else needs to change.
 */
export type PopularDepth = 1 | 2 | 4 | 5;

export const POPULAR_DEPTHS: PopularDepth[] = [1, 2, 4, 5];

/** [width, height] pairs. Depth comes from the key. */
const popularByDepth: Record<PopularDepth, [number, number][]> = {
  1: [
    [10, 20], [12, 20], [12, 24], [12, 25],
    [14, 20], [14, 24], [14, 25], [16, 20],
    [16, 24], [16, 25], [18, 20], [18, 24],
    [18, 25], [20, 20], [20, 24], [20, 25],
    [20, 30], [24, 20], [24, 24], [24, 25],
  ],
  2: [
    [10, 20], [12, 20], [12, 24], [12, 25],
    [14, 20], [14, 24], [14, 25], [16, 20],
    [16, 24], [16, 25], [18, 20], [18, 24],
    [18, 25], [20, 20], [20, 24], [20, 25],
    [20, 30], [24, 24], [24, 25], [25, 25],
  ],
  4: [
    [12, 24], [14, 20], [14, 24], [14, 25],
    [16, 20], [16, 24], [16, 25], [18, 20],
    [18, 24], [18, 25], [20, 20], [20, 24],
    [20, 25], [20, 30], [24, 24], [24, 25],
    [25, 25],
  ],
  // 5" is a media-cabinet depth and genuinely has fewer standard sizes, so
  // this list is shorter rather than padded out to twenty.
  5: [
    [12, 24], [14, 25], [16, 20], [16, 25],
    [18, 25], [20, 20], [20, 24], [20, 25],
    [20, 30], [24, 25], [25, 25],
  ],
};

export type PopularSize = { slug: string; label: string };

/** The module shows at most twenty; it is a shortcut, not the directory. */
export function popularSizesForDepth(
  depth: PopularDepth,
  limit = 20,
): PopularSize[] {
  return popularByDepth[depth].slice(0, limit).map(([w, h]) => ({
    slug: sizeSlug(w, h, depth),
    label: `${w} × ${h} × ${depth}`,
  }));
}

/**
 * Where a size links. Today `/air-filters/:slug` 307s to /shop (see
 * next.config.ts); when the real size page lands, every caller follows.
 */
export function sizeHref(slug: string): string {
  return `/air-filters/${slug}`;
}

/** Legacy alias — keeps STANDARD_SIZES imports working during migration. */
export const STANDARD_SIZES = sizes.map(formatSize);

export function sizeBySlug(slug: string): FilterSize | undefined {
  return sizes.find((s) => s.slug === slug);
}

/** Distinct depth values available across the catalog. */
export const availableDepths = Array.from(
  new Set(sizes.map((s) => s.nominalDepth)),
).sort((a, b) => a - b);

/** Distinct widths / heights for the FilterFinder selects. */
export const availableWidths = Array.from(
  new Set(sizes.map((s) => s.nominalWidth)),
).sort((a, b) => a - b);

export const availableHeights = Array.from(
  new Set(sizes.map((s) => s.nominalHeight)),
).sort((a, b) => a - b);
