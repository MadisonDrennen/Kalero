import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  /** "light" knocks the mark out in white for dark grounds. */
  variant?: "dark" | "light" | "brand";
  size?: "sm" | "md" | "lg";
  /**
   * Whether to use the lockup carrying "Quality Air Filters". Defaults to the
   * plain wordmark, because the tagline only holds together at size.
   */
  tagline?: boolean;
  /** Kept so existing call sites keep compiling. */
  withMark?: boolean;
  stacked?: boolean;
  href?: string;
};

/* Natural size of each export, kept exact so the aspect ratio is never guessed.
   The lockup is noticeably taller than the plain wordmark. */
const ART = {
  lockup: { w: 1538, h: 370 },
  plain: { w: 1538, h: 246 },
} as const;

/* The kit sets a minimum width of 1.25in / 140px for the lockup. w-36 is
   exactly 144px, so that is the floor. */
const widths: Record<NonNullable<Props["size"]>, string> = {
  sm: "w-36",
  md: "w-40 sm:w-44",
  lg: "w-48 sm:w-56",
};

/**
 * The KALERO wordmark.
 *
 * Placed from file, never typeset: the mark sets the A as a gradient triangle
 * and the kit is explicit that it is artwork.
 *
 * Two lockups, not one: with "Quality Air Filters" and without. The plain
 * wordmark is the default and the lockup is opted into per call site — the
 * header carries it, the footer runs the wordmark alone in white.
 */
export function Logo({
  className = "",
  variant = "dark",
  size = "md",
  tagline = false,
  href = "/",
}: Props) {
  const light = variant === "light";
  const src = tagline
    ? light
      ? "/images/brand/kalero-wordmark-white.png"
      : "/images/brand/kalero-wordmark.png"
    : light
      ? "/images/brand/kalero-wordmark-white-notag.png"
      : "/images/brand/kalero-wordmark-notag.png";

  const art = ART[tagline ? "lockup" : "plain"];

  const img = (
    <Image
      src={src}
      alt="KALERO, quality air filters"
      width={art.w}
      height={art.h}
      priority={size === "lg"}
      className={`h-auto ${widths[size]} ${className}`}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus-visible:outline-none" aria-label="KALERO home">
        {img}
      </Link>
    );
  }
  return img;
}
