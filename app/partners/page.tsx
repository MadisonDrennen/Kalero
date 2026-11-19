import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, CalendarClock, Flag, Ruler } from "lucide-react";
import { purchasableTiers } from "@/lib/tiers";
import { partnerConfig, confirmedPartnerTerms } from "@/lib/business";
import { PartnerRequestForm } from "@/components/partners/PartnerRequestForm";
import { CartonPhoto } from "@/components/ui/CartonPhoto";

export const metadata: Metadata = {
  title: "HVAC Trade Program | Wholesale Air Filters for Contractors",
  description:
    "Become a KALERO preferred supplier. MERV 8 and MERV 13 residential air filters in every standard size, made in the USA, delivered on your schedule. Request trade pricing.",
  alternates: { canonical: "/partners" },
  keywords: [
    "wholesale air filters",
    "HVAC contractor filters",
    "bulk air filters",
    "trade pricing air filters",
    "preferred filter supplier",
    "MERV 8 wholesale",
  ],
};

const REASONS = [
  {
    Icon: Boxes,
    title: "Two levels, not twenty",
    body: "MERV 8 for routine service and MERV 13 when a customer wants the most filtration. One short line covers almost every call, so the van carries less and the order sheet is simple.",
  },
  {
    Icon: Ruler,
    title: "Every standard size",
    body: "All the common residential sizes, plus custom cuts when a return does not match a stock dimension.",
  },
  {
    Icon: Flag,
    title: "Made in the USA",
    body: "Something your techs can say on the doorstep, printed on the carton where the homeowner can see it.",
  },
  {
    Icon: CalendarClock,
    title: "Delivered on a schedule",
    body: "The same scheduled delivery that runs our subscriptions, pointed at your shop so stock arrives before you run out.",
  },
];

const STEPS = [
  { n: "01", t: "Tell us what you move", b: "Sizes, rough monthly volume, and the brands you stock today." },
  { n: "02", t: "We quote your rate", b: "Trade pricing against your actual mix, not a generic sheet." },
  { n: "03", t: "Stock and reorder", b: "A first order to try, then a standing schedule once it is working." },
];

export default function PartnersPage() {
  const terms = confirmedPartnerTerms();

  return (
    <>
      {/* ---- hero ---- */}
      <section
        aria-labelledby="partners-title"
        className="relative isolate overflow-hidden bg-charcoal text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_78%_18%,#0A57BB_0%,#01399E_32%,#0B1420_68%,#050708_100%)]"
        />
        {/* A glow behind the carton instead of the drawn wave that used to run
            along the base. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-1/2 -z-10 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-sky-500/25 blur-[90px] lg:block"
        />

        <div className="container-x grid min-h-[560px] items-center gap-10 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <p className="text-eyebrow font-semibold uppercase tracking-[0.2em] text-sky-300">
              For HVAC contractors
            </p>
            <h1
              id="partners-title"
              className="mt-4 max-w-xl font-display text-[clamp(2.25rem,4.6vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.025em] text-balance"
            >
              Become a KALERO preferred supplier.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75 text-pretty">
              A filter line built to be stocked, not merchandised. Two MERV
              levels, every standard size, made in the USA and delivered on your
              schedule.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {/* The painted gradient the rest of the site uses, rather than a
                  flat fill. Carbon on it, since white is 2.4:1 on this blue. */}
              <Link
                href="#partner-apply"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-[radial-gradient(130%_160%_at_88%_-12%,rgba(207,232,244,0.85)_0%,rgba(207,232,244,0)_58%),linear-gradient(158deg,#35B2E6_0%,#2693D8_88%)] px-7 text-sm font-semibold text-charcoal shadow-[0_14px_34px_-12px_rgba(53,178,230,0.7),inset_0_1px_0_0_rgba(255,255,255,0.45)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Request trade pricing
                <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-white/90 ring-1 ring-white/25 transition-colors hover:bg-white/10 hover:text-white"
              >
                Shopping for your own home?
              </Link>
            </div>
          </div>

          <div className="relative hidden justify-center lg:flex">
            <Image
              src="/images/products/carton.png"
              alt=""
              aria-hidden="true"
              width={726}
              height={1302}
              priority
              sizes="(min-width: 1024px) 32vw, 0px"
              className="h-[clamp(300px,34vw,440px)] w-auto drop-shadow-[0_34px_60px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>
      </section>

      {/* ---- why ---- */}
      <section aria-labelledby="partners-why" className="py-16 sm:py-20">
        <div className="container-x">
          <h2
            id="partners-why"
            className="max-w-2xl font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Built for the back of the van.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {REASONS.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-2xl bg-gradient-to-b from-white to-glacier-soft/50 p-6 ring-1 ring-charcoal/[0.06] shadow-[0_2px_4px_rgba(5,7,8,0.03),0_16px_34px_-26px_rgba(5,7,8,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(5,7,8,0.04),0_24px_46px_-26px_rgba(0,71,179,0.3)] sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[linear-gradient(150deg,#35B2E6_0%,#0A57BB_100%)] text-white shadow-[0_8px_18px_-8px_rgba(0,71,179,0.7)]">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-charcoal">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A real install between the pitch and the range — the page had no
          photography at all. */}
      <section aria-label="A KALERO filter fitted in a home system" className="relative h-64 overflow-hidden sm:h-80 lg:h-[26rem]">
        <Image
          src="/images/products/furnace-home.webp"
          alt="A KALERO filter seated in a home furnace cabinet"
          fill
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,8,0.62)_0%,rgba(5,7,8,0.3)_46%,rgba(5,7,8,0)_72%)]"
        />
        <div className="container-x relative flex h-full items-end pb-8 sm:pb-10">
          <p className="max-w-sm font-display text-xl font-semibold text-white text-balance sm:text-2xl">
            The filter your customer never has to think about again.
          </p>
        </div>
      </section>

      {/* ---- the range ---- */}
      <section aria-labelledby="partners-range" className="pb-16 sm:pb-20">
        <div className="container-x">
          <h2
            id="partners-range"
            className="font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            The range you would be stocking.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {purchasableTiers.map((t) => (
              <div
                key={t.id}
                className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-sky-100"
              >
                {/* A fixed stage with the carton sized by height. This was a
                    5:3 box — 201px tall at phone width — holding a carton sized
                    by width, which makes it 398px tall and cropped 221px off
                    the top. Portrait artwork cannot be sized by width inside a
                    landscape frame. */}
                <div
                  className="relative flex h-56 items-center justify-center overflow-hidden px-10 pb-6 pt-5 sm:h-64"
                  style={{
                    backgroundImage: [
                      `linear-gradient(168deg, #FFFFFF 0%, ${t.softHex}66 58%, ${t.softHex}B3 100%)`,
                    ].join(","),
                  }}
                >
                  <CartonPhoto
                    alt={`KALERO ${t.name} filter`}
                    fit="height"
                    sizes="(min-width: 640px) 22vw, 45vw"
                  />
                </div>
                <div className="p-6">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{ backgroundColor: t.softHex, color: t.deepHex }}
                  >
                    {t.name}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold text-charcoal">
                    MERV {t.merv}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
                    {t.positioning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- how it works ---- */}
      <section
        aria-labelledby="partners-how"
        className="relative isolate overflow-hidden bg-white py-16 sm:py-20"
      >
        <Image
          src="/images/brand/airflow-waves.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-[0.07]"
        />
        <div className="container-x">
          <h2
            id="partners-how"
            className="font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            How it works.
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {STEPS.map(({ n, t, b }) => (
              <li key={n} className="rounded-2xl bg-air p-6 ring-1 ring-sky-100">
                <span className="font-display text-3xl font-bold text-sky-500">{n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-charcoal">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">{b}</p>
              </li>
            ))}
          </ol>

          {/* Only terms that have actually been agreed appear here. */}
          {terms.length > 0 && (
            <dl className="mt-10 grid gap-4 rounded-2xl bg-air p-6 ring-1 ring-sky-100 sm:grid-cols-2">
              {terms.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal-light">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* ---- apply ---- */}
      <section
        id="partner-apply"
        aria-labelledby="partners-apply-title"
        className="scroll-mt-24 py-16 sm:py-20"
      >
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="max-w-md">
            <h2
              id="partners-apply-title"
              className="font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
            >
              Request trade pricing.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-mid text-pretty">
              Tell us what you move and we will come back with a rate against your
              actual mix.
            </p>
            {partnerConfig.partnerEmail && (
              <p className="mt-6 text-sm text-charcoal-mid">
                Prefer email?{" "}
                <a
                  className="link-underline font-medium text-sky-700"
                  href={`mailto:${partnerConfig.partnerEmail}`}
                >
                  {partnerConfig.partnerEmail}
                </a>
              </p>
            )}
            {partnerConfig.partnerPhone && (
              <p className="mt-1 text-sm text-charcoal-mid">
                Or call{" "}
                <a
                  className="link-underline font-medium text-sky-700"
                  href={`tel:${partnerConfig.partnerPhone.replace(/[^\d+]/g, "")}`}
                >
                  {partnerConfig.partnerPhone}
                </a>
              </p>
            )}
          </div>
          <PartnerRequestForm partnerEmail={partnerConfig.partnerEmail} />
        </div>
      </section>
    </>
  );
}
