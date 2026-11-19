import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bug,
  CloudFog,
  Factory,
  Flower2,
  Feather,
  Microscope,
  PawPrint,
  ShieldCheck,
  SprayCan,
  Truck,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { tiers, type HandledIcon, type TierId } from "@/lib/tiers";

/**
 * The three tiers, as three cards that each answer "is this the one for my
 * house?" without a click: what it is, what it looks like, and the four things
 * it handles. Tier colour carries the difference -- the rule on top, the
 * eyebrow, the button -- so the cards read as one family rather than three
 * unrelated blocks.
 */

const HANDLED: Record<HandledIcon, LucideIcon> = {
  dust: Wind,
  pets: PawPrint,
  pollen: Flower2,
  allergens: Bug,
  dander: Feather,
  smoke: CloudFog,
  smog: Factory,
  bacteria: Microscope,
  odors: SprayCan,
};

const TRUST = [
  { Icon: Truck, title: "Delivered on schedule", note: "Stock arrives before you run out" },
  { Icon: ShieldCheck, title: "Every standard size", note: "Plus custom cuts" },
  { Icon: BadgeUSA, title: "Made in the USA", note: "Printed on the carton" },
];

/** The flag as a drawn mark rather than an emoji, which renders differently on
 *  every platform and at a size the row cannot control. */
function BadgeUSA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className={className}>
      <rect width="24" height="16" rx="2" fill="#F4F7FA" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} y={y} width="24" height="1.25" fill="#B4472C" />
      ))}
      <rect width="10" height="8.75" rx="1" fill="#0047B3" />
    </svg>
  );
}

export function ShopByAir() {
  return (
    <section
      aria-labelledby="shop-by-air-title"
      className="relative isolate py-16 sm:py-20"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sky-700">The range</p>
          <h2
            id="shop-by-air-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Two levels cover almost every call.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
            MERV 8 for routine service, MERV 13 when a customer wants the most
            filtration. Short enough to stock, wide enough to cover the route.
          </p>
        </div>

        {/* Two tiers, not three. A three-column grid left the pair hugging the
            left edge with a dead column beside them. */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          {tiers.map((t) => (
            <TierCard key={t.id} tier={t} />
          ))}
        </div>

        <ul className="mt-10 grid gap-4 border-t border-sky-100 pt-6 sm:grid-cols-3 sm:gap-6">
          {TRUST.map(({ Icon, title, note }) => (
            <li key={title} className="flex items-center justify-center gap-3">
              <Icon className="h-5 w-5 shrink-0 text-sky-600" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold text-charcoal">
                  {title}
                </span>
                <span className="block text-xs text-charcoal-mid">{note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TierCard({ tier: t }: { tier: (typeof tiers)[number] }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-charcoal/[0.07] shadow-[0_2px_4px_rgba(5,7,8,0.03),0_18px_40px_-24px_rgba(5,7,8,0.18)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_4px_8px_rgba(5,7,8,0.04),0_30px_60px_-28px_rgba(0,71,179,0.3)]">
      {/* Daylight, white space, blue as the only accent — so the stage is a
          pale wash rather than a saturated panel, and the carton carries the
          colour on its own. */}
      <div
        className="relative flex h-72 items-center justify-center px-10 pb-9 pt-7 sm:h-80"
        style={{
          backgroundImage: `linear-gradient(168deg, #FFFFFF 0%, ${t.softHex}66 58%, ${t.softHex}B3 100%)`,
        }}
      >
        <span
          aria-hidden="true"
          className="absolute bottom-7 left-1/2 h-6 w-[44%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ backgroundColor: `${t.deepHex}33` }}
        />
        <Image
          src="/images/products/carton-v2.png"
          alt={`KALERO ${t.name} filter, MERV ${t.merv}`}
          width={834}
          height={1302}
          sizes="(min-width: 1024px) 18vw, 42vw"
          className="relative h-full w-auto object-contain drop-shadow-[0_16px_22px_rgba(5,7,8,0.14)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span className="inline-flex w-fit items-center gap-2">
          {/* The tier's deep step, not its bright one: KALERO Blue on white is
              2.4:1 and would not hold at label size. */}
          <span
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: t.deepHex }}
          >
            {t.name}
          </span>
          {t.comingSoon && (
            <span className="rounded-full bg-charcoal px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              Coming soon
            </span>
          )}
        </span>

        <h3 className="mt-2.5 font-display text-[2rem] font-bold leading-none tracking-[-0.02em] text-charcoal">
          MERV {t.merv}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-mid text-pretty">
          {t.positioning}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {t.handles.map(({ icon, label }) => {
            const Icon = HANDLED[icon];
            return (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-charcoal-soft ring-1 ring-inset ring-charcoal/[0.09]"
              >
                <Icon className="h-3.5 w-3.5" style={{ color: t.deepHex }} aria-hidden="true" />
                {label}
              </li>
            );
          })}
        </ul>

        <Link
          href={`/merv-${t.merv}`}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            backgroundImage: `radial-gradient(130% 160% at 88% -12%, ${t.gradient.glow}CC 0%, ${t.gradient.glow}00 58%), linear-gradient(158deg, ${t.gradient.base} 0%, ${t.gradient.deep} 88%)`,
            color: t.onHex,
            outlineColor: t.gradient.deep,
            boxShadow: `0 14px 30px -14px ${t.gradient.deep}B3, inset 0 1px 0 rgba(255,255,255,0.4)`,
          }}
        >
          {t.comingSoon ? `${t.name} is coming soon` : `Shop ${t.name}`}
          {!t.comingSoon && <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />}
        </Link>
      </div>
    </article>
  );
}



export type ShopByAirTierId = TierId;
