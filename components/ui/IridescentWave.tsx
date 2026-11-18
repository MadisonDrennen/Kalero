type Props = {
  className?: string;
  /** Mirror the ribbon so consecutive bands don't repeat left to right. */
  flip?: boolean;
  /** Kept for existing call sites. */
  intensity?: "subtle" | "bold";
};

/**
 * The KALERO wave, drawn rather than photographed.
 *
 * This used to render a bitmap ribbon that ran blue → teal → green → violet,
 * which was the retired v5 spectrum. The current kit has one gradient, white →
 * Glacier → KALERO Blue → Navy, so the wave is drawn from those stops. Being
 * vector it also scales to any band height without resampling.
 */
export function IridescentWave({ className = "", flip = false }: Props) {
  const id = flip ? "kaleroWaveFlip" : "kaleroWave";
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className={`h-full w-full ${flip ? "-scale-x-100" : ""}`}
      >
        <defs>
          <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CFE8F4" stopOpacity="0" />
            <stop offset="28%" stopColor="#CFE8F4" stopOpacity="0.85" />
            <stop offset="62%" stopColor="#35B2E6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0047B3" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#35B2E6" stopOpacity="0" />
            <stop offset="40%" stopColor="#35B2E6" stopOpacity="0.5" />
            <stop offset="78%" stopColor="#0047B3" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0047B3" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#CFE8F4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="M0,168 C240,96 420,232 700,180 C960,132 1140,52 1440,118 L1440,320 L0,320 Z"
          fill={`url(#${id}-a)`}
        />
        <path
          d="M0,214 C260,150 460,268 760,214 C1020,168 1200,112 1440,164 L1440,320 L0,320 Z"
          fill={`url(#${id}-b)`}
        />
        <path
          d="M0,150 C250,74 450,210 720,156 C980,104 1180,40 1440,96"
          fill="none"
          stroke={`url(#${id}-c)`}
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}
