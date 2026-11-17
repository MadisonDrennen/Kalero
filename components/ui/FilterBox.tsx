"use client";

import { motion } from "framer-motion";
import type { CategoryKey } from "@/lib/products";

type Props = {
  name: string;
  subtitle?: string;
  merv?: string;
  category: CategoryKey;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  floating?: boolean;
  showBadge?: boolean;
  /** Explicit colours, for callers driven by tier rather than category. */
  colors?: { base: string; deep: string; soft: string; accent?: string };
};

const palette: Record<
  CategoryKey,
  { base: string; deep: string; soft: string; accent: string; label: string }
> = {
  everyday: { base: "#35B1E6", deep: "#0047B3", soft: "#CFE8F4", accent: "#0047B3", label: "Everyday" },
  pet: { base: "#0047B3", deep: "#022F72", soft: "#D6E2F3", accent: "#35B1E6", label: "Pet" },
  allergy: { base: "#283238", deep: "#050708", soft: "#E3E6E8", accent: "#35B1E6", label: "Allergy" },
  smoke: { base: "#283238", deep: "#050708", soft: "#E3E6E8", accent: "#CFE8F4", label: "Smoke" },
  carbon: { base: "#283238", deep: "#050708", soft: "#E3E6E8", accent: "#35B1E6", label: "Carbon" },
  hotel: { base: "#5A6670", deep: "#283238", soft: "#E3E6E8", accent: "#35B1E6", label: "Hotel" },
  seasonal: { base: "#35B1E6", deep: "#0047B3", soft: "#CFE8F4", accent: "#5A6670", label: "Seasonal" },
};

const sizeClasses: Record<NonNullable<Props["size"]>, string> = {
  sm: "w-40",
  md: "w-56",
  lg: "w-72",
  xl: "w-[22rem]",
};

/**
 * Stylized SVG representation of the KALERO packaging.
 * Acts as a design-appropriate placeholder until real product renders replace it.
 */
export function FilterBox({
  name,
  subtitle,
  merv,
  category,
  size = "md",
  className = "",
  floating = true,
  showBadge = true,
  colors,
}: Props) {
  const base = palette[category];
  const p = colors
    ? { ...base, ...colors, accent: colors.accent ?? base.accent }
    : base;
  const key = colors ? `${category}-${colors.base.replace("#", "")}` : category;
  const gid = `grad-${key}`;
  const inner = `inner-${key}`;
  const air = `air-${key}`;

  const boxContent = (
    <svg
      viewBox="0 0 360 460"
      className="h-auto w-full drop-shadow-[0_26px_46px_rgba(5,7,8,0.22)]"
      role="img"
      aria-label={`${name}, ${merv ?? ""} packaging`}
    >
      <defs>
        {/* The carton's wave: KALERO Blue folding into Navy. */}
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.base} />
          <stop offset="58%" stopColor={p.deep} />
          <stop offset="100%" stopColor={p.deep} />
        </linearGradient>
        <linearGradient id={air} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={inner}>
          <rect x="30" y="26" width="300" height="408" rx="14" />
        </clipPath>
      </defs>

      <ellipse cx="180" cy="446" rx="132" ry="14" fill="#050708" opacity="0.16" />

      {/* carton face */}
      <rect x="30" y="26" width="300" height="408" rx="14" fill="#FFFFFF" />

      <g clipPath={`url(#${inner})`}>
        {/* the wave band, as on the pack */}
        <path d="M30,150 C110,96 190,214 268,150 C300,124 320,118 330,122 L330,434 L30,434 Z" fill={`url(#${gid})`} />
        <path
          d="M30,168 C112,118 192,232 272,170 C302,146 320,140 330,144"
          fill="none"
          stroke={`url(#${air})`}
          strokeWidth="3"
        />
        <path
          d="M30,196 C116,146 196,258 276,198 C304,176 320,170 330,174"
          fill="none"
          stroke={`url(#${air})`}
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* pleat block along the bottom, like the window on the carton */}
        <rect x="30" y="344" width="300" height="90" fill="#FFFFFF" opacity="0.92" />
        {Array.from({ length: 13 }).map((_, i) => (
          <line
            key={i}
            x1={44 + i * 22}
            y1="352"
            x2={44 + i * 22}
            y2="426"
            stroke={p.deep}
            strokeOpacity="0.22"
            strokeWidth="5"
          />
        ))}
      </g>

      {/* wordmark */}
      <text
        x="180"
        y="74"
        textAnchor="middle"
        fontFamily="Poppins, ui-sans-serif, sans-serif"
        fontSize="30"
        fontWeight="700"
        letterSpacing="7"
        fill="#050708"
      >
        KALERO
      </text>
      <text
        x="180"
        y="94"
        textAnchor="middle"
        fontFamily="Poppins, ui-sans-serif, sans-serif"
        fontSize="9"
        fontWeight="500"
        letterSpacing="3.4"
        fill="#283238"
      >
        QUALITY AIR FILTERS
      </text>

      {/* MERV numeral, the loudest thing on the pack */}
      {merv && (
        <>
          <text
            x="62"
            y="214"
            fontFamily="Poppins, ui-sans-serif, sans-serif"
            fontSize="15"
            fontWeight="600"
            letterSpacing="5"
            fill="#FFFFFF"
          >
            MERV
          </text>
          <text
            x="58"
            y="300"
            fontFamily="Poppins, ui-sans-serif, sans-serif"
            fontSize="86"
            fontWeight="700"
            fill="#FFFFFF"
          >
            {merv.replace(/[^0-9]/g, "")}
          </text>
        </>
      )}

      {/* The pack prints the tier word. Product names are longer than the
          panel, so the type steps down rather than running off the carton. */}
      <text
        x="188"
        y="252"
        fontFamily="Poppins, ui-sans-serif, sans-serif"
        fontSize={name.length > 12 ? 14 : name.length > 8 ? 18 : 24}
        fontWeight="700"
        letterSpacing={name.length > 12 ? 0.4 : 1}
        fill="#FFFFFF"
      >
        {name.toUpperCase()}
      </text>
      {subtitle && (
        <text
          x="188"
          y="276"
          fontFamily="var(--font-sans), Instrument Sans, sans-serif"
          fontSize="10"
          fill="#FFFFFF"
          opacity="0.88"
        >
          {subtitle.length > 30 ? `${subtitle.slice(0, 30)}…` : subtitle}
        </text>
      )}

      {showBadge && (
        <text
          x="306"
          y="74"
          textAnchor="end"
          fontFamily="Poppins, ui-sans-serif, sans-serif"
          fontSize="10"
          fontWeight="600"
          letterSpacing="1.4"
          fill="#283238"
        >
          MADE IN USA
        </text>
      )}
    </svg>
  );

  const wrapClass = `relative ${sizeClasses[size]} ${className}`;

  if (!floating) {
    return <div className={wrapClass}>{boxContent}</div>;
  }
  return (
    <motion.div
      className={wrapClass}
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {boxContent}
    </motion.div>
  );
}
