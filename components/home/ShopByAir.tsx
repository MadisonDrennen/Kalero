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
  { Icon: Truck, title: "Fast & free shipping", note: "On all orders" },
  { Icon: ShieldCheck, title: "Premium filtration", note: "Cleaner, healthier air" },
  { Icon: BadgeUSA, title: "Made in the USA", note: "Trusted quality" },
];

/** The flag as a drawn mark rather than an emoji, which renders differently on
 *  every platform and at a size the row cannot control. */
function BadgeUSA({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className={className}>
      <rect width="24" height="16" rx="2" fill="#F5F8FA" />
      {[0, 2, 4, 6, 8, 10, 12].map((y) => (
        <rect key={y} y={y} width="24" height="1.25" fill="#B4472C" />
      ))}
      <rect width="10" height="8.75" rx="1" fill="#0C74B0" />
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
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow duration-200 hover:shadow-card"
      style={{ borderColor: "#E8EEF3" }}
    >
      {/* the tier's colour, stated once at the top rather than washed across
          the whole card */}
      <div aria-hidden="true" className="h-1" style={{ backgroundColor: t.hex }} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: t.deepHex }}
            >
              {t.name}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-charcoal">
              MERV {t.merv}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
              {t.positioning}
            </p>
          </div>

          <div className="relative h-28 w-24 shrink-0 sm:h-32 sm:w-28">
            <Image
              src={t.heroImage}
              alt={`KALERO ${t.name}, MERV ${t.merv}, four pack`}
              fill
              sizes="120px"
              className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
        </div>

        <p className="mt-5 text-xs font-semibold text-charcoal">Best for:</p>
        <ul className="mt-2.5 grid grid-cols-4 gap-2">
          {t.handles.map(({ icon, label }) => {
            const Icon = HANDLED[icon];
            return (
              <li key={label} className="flex flex-col items-center text-center">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: t.softHex }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: t.deepHex }}
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 text-[11px] leading-tight text-charcoal-mid">
                  {label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="h-5" aria-hidden="true" />
        <Link
          href={`/merv-${t.merv}`}
          className="mt-auto flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-[filter] duration-150 hover:brightness-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ backgroundColor: t.hex, color: t.onHex, outlineColor: t.deepHex }}
        >
          Shop {t.name}
          <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export type ShopByAirTierId = TierId;
