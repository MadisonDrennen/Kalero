import Image from "next/image";
import { LinkButton } from "@/components/ui/Button";

/**
 * Homepage — air guides as one full-bleed landscape with the message over it,
 * in the style of the launch email. The guide articles are not written yet,
 * so this points at the filter finder rather than listing links that lead
 * nowhere.
 */
export function AirGuidesTeaser() {
  return (
    <section
      aria-labelledby="air-guides-title"
      className="relative isolate overflow-hidden"
    >
      <Image
        src="/images/products/lifestyle-mountains.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[center_62%]"
      />
      {/* A soft white bloom behind the copy, as in the email, so the headline
          reads over sky and snow alike. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_58%_62%_at_50%_46%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.55)_48%,rgba(255,255,255,0)_78%)]"
      />
      {/* fade the photo into the page above and below, so it isn't a hard box */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-canvas to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-canvas to-transparent" />

      <div className="container-x flex min-h-[520px] flex-col items-center justify-center py-24 text-center sm:min-h-[620px]">
        <p className="text-eyebrow text-sky-700">Air, explained simply</p>
        <h2
          id="air-guides-title"
          className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight text-charcoal text-balance sm:text-7xl"
        >
          Know your air.
          <span className="block bg-gradient-to-r from-[#35B2E6] to-[#0047B3] bg-clip-text pb-1 text-transparent">
            Breathe easier.
          </span>
        </h2>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal-soft text-pretty">
          MERV ratings, filter sizes and when to replace, made simple.
        </p>
        <div className="mt-8">
          <LinkButton href="/shop" size="lg" arrow>
            Find your filter
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
