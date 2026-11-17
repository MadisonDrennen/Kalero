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
import { FilterBox } from "@/components/ui/FilterBox";

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
  { Icon: Truck, title: "Fast & free shipping", note: "On all orders" },
  { Icon: ShieldCheck, title: "Premium filtration", note: "Cleaner, healthier air" },
  { Icon: BadgeUSA, title: "Made in the USA", note: "Trusted quality" },
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
          <p className="text-eyebrow text-sky-700">Shop by air</p>
          <h2
            id="shop-by-air-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Shop by what&apos;s in your air.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
            Three levels of filtration. Pick the one that matches your home.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
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
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[#E8EEF3] transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      {/* The product on a stage of its own tier colour. The carton render has
          a transparent background, so it floats on the glow rather than
          sitting in a white box. */}
      <div
        className="relative flex h-72 items-end justify-center overflow-hidden sm:h-80"
        style={{
          background: `radial-gradient(125% 95% at 50% 105%, ${t.hex} 0%, ${t.softHex} 58%, #FFFFFF 100%)`,
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-5 left-4 select-none font-display text-[8.5rem] font-bold leading-none opacity-[0.16] sm:text-[10rem]"
          style={{ color: t.deepHex }}
        >
          {t.merv}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-5 left-1/2 h-8 w-3/5 -translate-x-1/2 rounded-[50%] bg-charcoal/25 blur-2xl"
        />
        <div className="relative mb-4 w-[62%] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:-rotate-2">
          <FilterBox
            name={t.name}
            merv={`MERV ${t.merv}`}
            category="everyday"
            colors={{ base: t.hex, deep: t.deepHex, soft: t.softHex }}
            size="lg"
            floating={false}
            showBadge={false}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit items-center gap-2">
          <span
            className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ backgroundColor: t.softHex, color: t.deepHex }}
          >
            {t.name}
          </span>
          {t.comingSoon && (
            <span className="inline-flex rounded-full bg-charcoal px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
              Coming soon
            </span>
          )}
        </span>
        <h3 className="mt-3 font-display text-3xl font-bold text-charcoal">
          MERV {t.merv}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
          {t.positioning}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {t.handles.map(({ icon, label }) => {
            const Icon = HANDLED[icon];
            return (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-charcoal"
                style={{ backgroundColor: t.softHex }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: t.deepHex }} aria-hidden="true" />
                {label}
              </li>
            );
          })}
        </ul>

        <div className="h-6" aria-hidden="true" />
        <Link
          href={`/merv-${t.merv}`}
          className="mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-[filter] duration-150 hover:brightness-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: t.hex, color: t.onHex, outlineColor: t.deepHex }}
        >
          {t.comingSoon ? `${t.name} is coming soon` : `Shop ${t.name}`}
          {!t.comingSoon && <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />}
        </Link>
      </div>
    </article>
  );
}

export type ShopByAirTierId = TierId;
