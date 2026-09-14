import Image from "next/image";

type Props = {
  className?: string;
  /** Mirror the ribbon so consecutive bands don't repeat left to right. */
  flip?: boolean;
  /** Kept for existing call sites; the photographic wave has one strength. */
  intensity?: "subtle" | "bold";
};

/**
 * The brand wave, from the real artwork rather than a drawn placeholder. The
 * image carries its own transparency, so it sits on the light page and the
 * dark footer alike. Callers set position and size through className.
 */
const FADE =
  "linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)";

export function IridescentWave({ className = "", flip = false }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
      /* Fade top and bottom to nothing. The ribbon is taller than most boxes
         it sits in, and without this the crop showed as a hard horizontal line. */
      style={{
        WebkitMaskImage: FADE,
        maskImage: FADE,
      }}
    >
      <Image
        src="/images/brand/kalero-wave.png"
        alt=""
        fill
        sizes="100vw"
        className={`object-cover object-center ${flip ? "-scale-x-100" : ""}`}
      />
    </div>
  );
}
