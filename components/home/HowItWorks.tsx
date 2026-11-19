import { howItWorks } from "@/lib/copy";
import { Reveal } from "@/components/ui/Reveal";
import { AirflowLines } from "@/components/ui/AirflowLines";

/** One photograph per step, replacing mock UI that included an empty grey
 *  square where a product image should have been. */
/** Tier colour per step, so the sequence reads blue → navy → carbon. */
/* Light to brand blue. The old ramp ended on Graphite, which is invisible
   against Carbon. */
const stepAccents = ["#CFE8F4", "#7ACCEE", "#35B2E6"];

export function HowItWorks() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal py-24 sm:py-28"
      aria-labelledby="how-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full opacity-70">
        <AirflowLines color="#35B2E6" opacity={0.12} strokeWidth={1} className="h-full w-full" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow flex justify-center text-sky-300">Becoming a partner</p>
          <h2
            id="how-title"
            className="mt-4 font-display text-display-xl font-semibold text-sky-500 text-balance"
          >
            Three steps to a standing order.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70 text-pretty">
            No distributor minimums to clear before anyone will talk to you.
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          {howItWorks.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-card bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.07] hover:ring-white/20">
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
                  <div className="font-display text-lg font-semibold text-white">
                    {s.title}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/65 text-pretty">
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
