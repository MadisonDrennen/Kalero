import Image from "next/image";
import { howItWorks } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { AirflowLines } from "@/components/ui/AirflowLines";

/** One photograph per step, replacing mock UI that included an empty grey
 *  square where a product image should have been. */
const stepImages = [
  { src: "/images/products/lifestyle-dog.jpg", alt: "A golden retriever resting on a rug in a bright living room" },
  { src: "/images/products/tiers-three-up.jpg", alt: "KALERO MERV 8, 11 and 13 filters side by side" },
  { src: "/images/products/lifestyle-home.jpg", alt: "A sunlit living room with clean air flowing through it" },
];

export function HowItWorks() {
  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-canvas via-sky-50/60 to-canvas py-24 sm:py-28"
      aria-labelledby="how-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-70">
        <AirflowLines opacity={0.18} strokeWidth={1} className="h-full w-full" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">How KALERO works</p>
          <h2
            id="how-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Cleaner air without another thing to remember.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            Three quiet steps between you and the filter your home actually needs.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-sky-100 shadow-soft">
                <div className="relative aspect-[3/2] w-full bg-sky-50">
                  <Image
                    src={stepImages[i].src}
                    alt={stepImages[i].alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 font-display text-lg font-semibold text-sky-700 shadow-soft backdrop-blur">
                    {s.step}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="font-display text-lg font-semibold text-charcoal">
                    {s.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
