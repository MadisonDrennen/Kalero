/**
 * MERV shield badge — pulled directly from Kalero packaging.
 * Shield with the rating, in the tier's colour.
 */
type Props = {
  rating: string;
  label?: string;
  size?: "xs" | "sm" | "md";
  /** Tier colour. Defaults to KALERO blue, the Standard tier's own. */
  color?: string;
  /** Hide the label inside the shield when the card already spells it out. */
  showLabel?: boolean;
  /** Set when surrounding text already carries the meaning. */
  decorative?: boolean;
  className?: string;
};

const dims = {
  xs: {
    box: "h-14 w-11",
    top: "text-[7px]",
    rating: "text-lg",
    bottom: "text-[6px]",
  },
  sm: {
    box: "h-20 w-16",
    top: "text-[8px]",
    rating: "text-2xl",
    bottom: "text-[7px]",
  },
  md: {
    box: "h-24 w-20 sm:h-28 sm:w-24",
    top: "text-[9px]",
    rating: "text-3xl sm:text-4xl",
    bottom: "text-[8px]",
  },
};

export function MervShield({
  rating,
  label = "Standard",
  size = "sm",
  color,
  showLabel = true,
  decorative = false,
  className = "",
}: Props) {
  const d = dims[size];
  return (
    <div
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `MERV ${rating} ${label}`}
      className={`relative flex flex-col items-center justify-center pt-1.5 text-white shadow-soft ${color ? "" : "bg-sky-500"} ${d.box} ${className}`}
      style={{
        backgroundColor: color,
        clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)",
      }}
    >
      <span className={`${d.top} font-semibold uppercase tracking-[0.14em]`}>
        MERV
      </span>
      <span className={`${d.rating} font-display font-bold leading-none`}>
        {rating}
      </span>
      {showLabel && (
        <span
          className={`mt-0.5 ${d.bottom} font-medium uppercase tracking-[0.14em]`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
