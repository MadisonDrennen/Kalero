type Gradient = { glow: string; base: string; deep: string };

type Props = {
  rating: string;
  label?: string;
  size?: "xs" | "sm" | "md";
  /** Tier gradient. Falls back to the KALERO Blue family. */
  gradient?: Gradient;
  showLabel?: boolean;
  decorative?: boolean;
  className?: string;
};

const DEFAULT_GRADIENT: Gradient = {
  glow: "#5BC8F5",
  base: "#1877CA",
  deep: "#0047B3",
};

const dims = {
  xs: { box: "h-14 w-11", top: "text-[7px]", rating: "text-lg", bottom: "text-[6px]" },
  sm: { box: "h-20 w-16", top: "text-[8px]", rating: "text-2xl", bottom: "text-[7px]" },
  md: {
    box: "h-24 w-20 sm:h-28 sm:w-24",
    top: "text-[9px]",
    rating: "text-3xl sm:text-4xl",
    bottom: "text-[8px]",
  },
};

/**
 * MERV shield, the badge printed on the carton.
 *
 * Painted rather than filled flat: a diagonal body gradient, a specular glow
 * in the top-right where no type sits, and a shadow under the point. A solid
 * KALERO Blue panel behind white numerals only reaches 2.4:1, so the bright
 * blue lives in the highlight and the body stays in the legible range.
 */
export function MervShield({
  rating,
  label = "Standard",
  size = "sm",
  gradient = DEFAULT_GRADIENT,
  showLabel = true,
  decorative = false,
  className = "",
}: Props) {
  const d = dims[size];
  const uid = `${gradient.base.replace("#", "")}-${rating}`;

  return (
    <div
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `MERV ${rating} ${label}`}
      className={`relative flex flex-col items-center justify-center pt-1.5 text-white ${d.box} ${className}`}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
        backgroundImage: [
          `radial-gradient(90% 75% at 82% 8%, ${gradient.glow}E6 0%, ${gradient.glow}00 60%)`,
          `linear-gradient(158deg, ${gradient.base} 0%, ${gradient.deep} 78%)`,
        ].join(","),
        filter: `drop-shadow(0 10px 14px ${gradient.deep}59)`,
      }}
    >
      {/* a thin lit edge along the top, as on a printed carton */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${gradient.glow}CC, transparent)` }}
      />
      <span className={`relative ${d.top} font-semibold uppercase tracking-[0.14em]`}>
        MERV
      </span>
      <span
        className={`relative ${d.rating} font-display font-bold leading-none`}
        style={{ textShadow: `0 1px 2px ${gradient.deep}80` }}
      >
        {rating}
      </span>
      {showLabel && (
        <span className={`relative mt-0.5 ${d.bottom} font-medium uppercase tracking-[0.14em]`}>
          {label}
        </span>
      )}
    </div>
  );
}
