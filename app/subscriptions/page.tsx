import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  PackageOpen,
  PauseCircle,
  RefreshCw,
  Truck,
} from "lucide-react";
import { PlanBuilder } from "@/components/subscriptions/PlanBuilder";

export const metadata: Metadata = {
  title: "Air Filter Subscription, Delivered on Your Schedule | KALERO",
  description:
    "Build an air filter subscription around your HVAC. Pick your MERV 8 or MERV 13 filter, size (20x25x1, 16x25x1, and more), quantity, and delivery cadence, every 30, 60, or 90 days. Skip, pause, or cancel anytime.",
  alternates: { canonical: "/subscriptions" },
  keywords: [
    "air filter subscription",
    "furnace filter subscription",
    "HVAC filter delivery",
    "monthly air filter delivery",
    "recurring air filter",
    "air filter auto delivery",
    "air filter replacement plan",
  ],
};

const benefits = [
  {
    Icon: RefreshCw,
    title: "Delivery every 30, 60, or 90 days",
    body: "Choose the schedule that fits each filter in your home.",
  },
  {
    Icon: PauseCircle,
    title: "Pause or cancel anytime",
    body: "No phone calls, contracts, or cancellation fees.",
  },
  {
    Icon: Truck,
    /* Was "Every KALERO subscription shipment ships free" under a heading
       about changing the plan — a mismatched card, and a shipping promise
       with nothing behind it: businessConfig.shippingThreshold is still null.
       The rest of the site had these removed already. */
    title: "Change it anytime",
    body: "Swap the size or the level between shipments, as often as you need.",
  },
  {
    Icon: Bell,
    title: "Heads-up before every shipment",
    body: "Adjust, swap, skip, or delay directly from your reminder.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Choose your filters",
    body: "Add the products, sizes, and quantities used throughout your home.",
  },
  {
    step: "02",
    title: "Set each schedule",
    body: "Choose delivery every 30, 60, or 90 days based on your household.",
  },
  {
    step: "03",
    title: "We deliver automatically",
    body: "Get a reminder before every order goes out.",
  },
];

const faqs = [
  {
    q: "Can I use different filter sizes in one plan?",
    a: "Yes. Add each size used in your home and manage them together under one KALERO subscription.",
  },
  {
    q: "Can different filters have different delivery schedules?",
    a: "Yes. Each filter can follow the cadence that makes sense for where and how it is used.",
  },
  {
    q: "Can I skip or delay a shipment?",
    a: "Yes. You can skip, pause, or move an upcoming shipment before it is processed.",
  },
  {
    q: "Can I swap a filter product?",
    a: "Yes. Change products, sizes, quantities, or delivery schedules without creating a new plan.",
  },
  {
    q: "Is subscription shipping free?",
    a: "Shipping terms are being finalised and will be shown at checkout.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. There are no long-term contracts or cancellation fees.",
  },
  {
    q: "When will I be charged?",
    a: "You are charged when each scheduled shipment is processed. We send a reminder before the order is finalized.",
  },
];

export default function SubscriptionsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-sky-100">
        {/* Was a room shot carrying the retired spectrum wave, then a flat
            gradient. The photograph is light and the copy sits left, so the
            white scrim below is what keeps Carbon type legible over it. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[linear-gradient(112deg,#FFFFFF_0%,#F2F9FC_18%,#CFE8F4_46%,#7ACCEE_72%,#35B2E6_100%)]"
        />
        {/* The photograph is out for now: at 1920 wide it was upscaled past
            its native 1672 and cover cropped 200px a side, straight through
            the carton. A replacement wants to be about 3840x1600 (2.4:1) with
            the product in the right third and real headroom above and below.
            Until then this is the kit gradient, and with no busy photograph
            under the copy the heavy white scrim is no longer needed — it only
            muted the blue. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_38%,transparent_70%)]"
        />

        <div className="container-x relative flex min-h-[520px] flex-col justify-center py-14 sm:min-h-[600px] sm:py-16 lg:min-h-[680px]">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-eyebrow text-sky-700 ring-1 ring-sky-200 backdrop-blur">
              KALERO subscriptions
            </span>
            {/* Was uppercase extrabold at up to 4rem, which ran to four lines
                over a busy photograph. The kit sets page headlines in sentence
                case at SemiBold and keeps caps for packaging and labels; the
                two-tone split added a third thing to read at the same time. */}
            <h1 className="mt-5 max-w-md font-display text-[clamp(2rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-charcoal text-balance">
              Fresh filters, right when your home needs them.
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-charcoal-soft text-pretty">
              One plan for every filter in the house. Set the sizes and the
              cadence, then skip, pause or cancel whenever you like.
            </p>
            <div className="mt-8">
              <Link
                href="#build"
                className="inline-flex h-12 items-center gap-2 rounded-pill bg-[radial-gradient(130%_160%_at_88%_-12%,rgba(207,232,244,0.85)_0%,rgba(207,232,244,0)_58%),linear-gradient(158deg,#35B2E6_0%,#2693D8_88%)] px-7 text-sm font-semibold text-charcoal shadow-[0_14px_34px_-12px_rgba(53,178,230,0.7),inset_0_1px_0_0_rgba(255,255,255,0.45)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Build my filter plan
                <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section aria-labelledby="sub-benefits" className="py-10 sm:py-12">
        <h2 id="sub-benefits" className="sr-only">
          Subscription benefits
        </h2>
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-card bg-white p-6 ring-1 ring-sky-100 shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <p className="mt-4 font-display text-base font-semibold text-charcoal">
                  {title}
                </p>
                <p className="mt-1 text-sm text-charcoal-mid text-pretty">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN BUILDER */}
      <section id="build" aria-labelledby="build-title" className="pb-14 sm:pb-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">Build your plan</p>
            <h2
              id="build-title"
              className="mt-4 font-display text-display-lg font-semibold uppercase text-charcoal text-balance sm:text-display-xl"
            >
              Build the filter plan your home actually needs.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-charcoal-mid text-pretty sm:text-lg">
              Add a filter for every return vent. Different products, sizes,
              quantities, and delivery schedules can all live under one flexible
              plan.
            </p>
          </div>
          <div className="mt-10">
            <PlanBuilder />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-labelledby="how-title" className="border-t border-sky-100/70 py-14 sm:py-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">How it works</p>
            <h2
              id="how-title"
              className="mt-4 font-display text-display-md font-semibold uppercase text-charcoal text-balance sm:text-display-lg"
            >
              Cleaner air, without the calendar reminders.
            </h2>
          </div>

          <div className="relative mt-10 grid gap-4 md:grid-cols-3">
            <div className="pointer-events-none absolute inset-x-10 top-8 hidden h-px md:block">
              <div className="h-full w-full bg-gradient-to-r from-sky-200/0 via-sky-400/60 to-sky-200/0" />
            </div>
            {howItWorks.map((s) => (
              <div
                key={s.step}
                className="relative flex flex-col rounded-card bg-white p-6 ring-1 ring-sky-100 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 font-display text-lg font-semibold text-sky-700">
                    {s.step}
                  </span>
                  <p className="font-display text-base font-semibold text-charcoal">
                    {s.title}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-charcoal-mid text-pretty">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-sky-100/70 py-14 sm:py-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">FAQ</p>
            <h2
              id="faq-title"
              className="mt-4 font-display text-display-md font-semibold uppercase text-charcoal text-balance sm:text-display-lg"
            >
              Subscription questions, answered.
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <ul className="flex flex-col gap-3">
              {faqs.map((item) => (
                <li key={item.q}>
                  <details className="group rounded-2xl bg-white ring-1 ring-sky-100 shadow-soft transition-shadow open:shadow-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left">
                      <span className="font-display text-base font-semibold text-charcoal sm:text-lg">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 text-sky-600 transition-transform duration-300 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-charcoal-mid text-pretty">
                      {item.a}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-labelledby="final-cta" className="pb-16 pt-8 sm:pb-24 sm:pt-10">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700 p-10 text-center shadow-card sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-eyebrow text-white ring-1 ring-white/30 backdrop-blur">
                <PackageOpen size={12} />
                Ready when you are
              </span>
              <h2
                id="final-cta"
                className="mt-5 font-display text-display-lg font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-white text-balance sm:text-display-xl"
              >
                Your home&apos;s filter plan, handled.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/85 text-pretty sm:text-lg">
                Choose every filter your home needs and receive each one on the
                schedule that fits.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
                <Link
                  href="#build"
                  className="inline-flex items-center gap-2 rounded-pill bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.06em] text-sky-700 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  Build my filter plan
                  <ArrowRight size={16} strokeWidth={2.25} />
                </Link>
                <Link
                  href="/shop"
                  className="text-sm font-medium uppercase tracking-[0.08em] text-white/90 underline-offset-4 hover:text-white hover:underline"
                >
                  Shop filters one time →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
