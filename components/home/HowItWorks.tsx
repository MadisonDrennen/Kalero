import { howItWorks } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { AirflowLines } from "@/components/ui/AirflowLines";

/** One photograph per step, replacing mock UI that included an empty grey
 *  square where a product image should have been. */
/** Tier colour per step, so the sequence reads blue → navy → carbon. */
const stepAccents = ["#35B1E6", "#0047B3", "#283238"];

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
          <p className="eyebrow justify-center">Becoming a partner</p>
          <h2
            id="how-title"
            className="mt-4 font-display text-display-xl font-semibold text-charcoal text-balance"
          >
            Three steps to a standing order.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
            No distributor minimums to clear before anyone will talk to you.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-sky-100 shadow-soft">
                <div
                  aria-hidden="true"
                  className="h-1.5 w-full"
                  style={{ backgroundColor: stepAccents[i] }}
                />
                <div className="px-7 pt-7">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-lg font-bold"
                    style={{ backgroundColor: `${stepAccents[i]}1F`, color: stepAccents[i] }}
                  >
                    {s.step}
                  </span>
                </div>
                <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
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
