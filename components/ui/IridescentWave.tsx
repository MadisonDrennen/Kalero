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
export function IridescentWave({ className = "", flip = false }: Props) {
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
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
