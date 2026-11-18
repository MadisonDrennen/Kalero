type Props = {
  /** Tier or category colour, used for the field and the rule. */
  tint?: { soft: string; deep: string };
  /** Smaller type and a shorter label for thumbnails. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Stands in where a product photograph will go.
 *
 * The site previously drew an illustrated carton here. That read as a real
 * product shot at a glance, which is misleading while the actual cartons are
 * still being shot — so this says plainly that the photography is coming
 * rather than approximating the pack.
 *
 * The wording is about the photograph, never the product — both filters on
 * the site ship today, only their photography is outstanding.
 */
export function PhotoComingSoon({
  tint = { soft: "#CFE8F4", deep: "#0047B3" },
  size = "md",
  className = "",
}: Props) {
  const label = size === "sm" ? "Photo soon" : "Photography coming soon";

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl ${className}`}
      style={{
        backgroundColor: `${tint.soft}66`,
        border: `1px dashed ${tint.deep}33`,
      }}
    >
      <span
        aria-hidden="true"
        className="block rounded-full"
        style={{
          width: size === "sm" ? 18 : 28,
          height: 2,
          backgroundColor: `${tint.deep}59`,
        }}
      />
      <span
        className={`px-2 text-center font-semibold uppercase leading-tight tracking-[0.14em] ${
          size === "sm" ? "text-[8px]" : size === "lg" ? "text-[11px]" : "text-[10px]"
        }`}
        style={{ color: tint.deep, opacity: 0.75 }}
      >
        {label}
      </span>
    </div>
  );
}
