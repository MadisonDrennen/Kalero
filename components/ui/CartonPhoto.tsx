import Image from "next/image";

/**
 * The KALERO carton, cut out of its studio white.
 *
 * One photograph serves every tier and that is deliberate: the kit is explicit
 * that the filter never varies by level — same blue frame, same white pleats,
 * same Carbon side panel — and the tier is told apart by the label, not the
 * product. Using a different shot per level would be inventing a difference
 * that the product does not have.
 *
 * The studio reflection is cut along the carton's own base, which is slanted
 * because the box is tilted. No horizontal crop works: the reflection starts
 * about 60px higher on the left than the frame ends on the right, so a single
 * row either slices the box or leaves a wedge of reflection reading as a grey
 * shelf. The line is least-squares fitted through the lowest frame pixel in
 * each column.
 */
export function CartonPhoto({
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 20vw, 45vw",
  fit = "width",
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** "height" fills a fixed-height stage; "width" fills its column. */
  fit?: "width" | "height";
}) {
  return (
    <Image
      src="/images/products/carton-v2.png"
      alt={alt}
      width={834}
      height={1302}
      priority={priority}
      sizes={sizes}
      className={`${fit === "height" ? "h-full w-auto" : "h-auto w-full"} object-contain drop-shadow-[0_14px_24px_rgba(0,71,179,0.26)] ${className}`}
    />
  );
}
