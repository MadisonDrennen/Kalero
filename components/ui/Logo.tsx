import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  /** "light" knocks the mark out in white for dark grounds. */
  variant?: "dark" | "light" | "brand";
  size?: "sm" | "md" | "lg";
  /** Kept so existing call sites keep compiling; the tagline is part of the
   *  artwork now, so there is nothing left to stack. */
  withMark?: boolean;
  stacked?: boolean;
  href?: string;
};

/* Natural size of the exported artwork, used to keep the aspect ratio exact. */
const ART_W = 1120;
const ART_H = 283;

/* The kit sets a minimum width of 1.25in / 140px. w-36 is exactly 144px, so
   that is the floor here — "sm" used to be 112px and broke it. */
const widths: Record<NonNullable<Props["size"]>, string> = {
  sm: "w-36",
  md: "w-40 sm:w-44",
  lg: "w-48 sm:w-56",
};

/**
 * The KALERO wordmark.
 *
 * Placed from file, never typeset: the mark sets the A as a gradient triangle
 * and the brand kit is explicit that it is artwork. This used to render the
 * word in the UI font beside a drawn circle mark, which was a different logo
 * from the one on the carton.
 */
export function Logo({
  className = "",
  variant = "dark",
  size = "md",
  stacked = false,
  href = "/",
}: Props) {
  const src =
    variant === "light"
      ? "/images/brand/kalero-wordmark-white.png"
      : "/images/brand/kalero-wordmark.png";

  const art = (
    <Image
      src={src}
      alt="KALERO, quality air filters"
      width={ART_W}
      height={ART_H}
      priority={size === "lg"}
      className={`h-auto ${widths[size]} ${className}`}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus-visible:outline-none" aria-label="KALERO home">
        {art}
      </Link>
    );
  }
  return art;
}
