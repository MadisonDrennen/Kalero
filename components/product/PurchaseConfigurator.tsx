"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Check, Minus, Plus, Sparkles } from "lucide-react";
import { SizeCombobox } from "@/components/product/SizeCombobox";
import { MervShield } from "@/components/ui/MervShield";
import type { ProductConfig } from "@/components/product/useProductConfig";
import { businessConfig } from "@/lib/business";
import { formatPrice } from "@/lib/pricing";
import type { Product } from "@/lib/products";
import { scentStripPrice, scents, type ScentKey } from "@/lib/scentStrips";
import { tierById, tiers } from "@/lib/tiers";
import {
  BEST_VALUE_PACK,
  MOST_POPULAR_PACK,
  PACK_QUANTITIES,
  PDP_CADENCES,
  QUICK_PACK_QUANTITIES,
} from "@/lib/variants";

/** The hairline used throughout the card. Quiet enough to group, not to box in. */
const LINE = "#E8EEF3";

type Props = {
  product: Product;
  config: ProductConfig;
  onAdded?: () => void;
};

export function PurchaseConfigurator({ product, config, onAdded }: Props) {
  const { quote } = config;
  const tier = tierById(config.tierId);
  const subscribing = config.purchaseType === "subscribe";

  return (
    <div
      className="rounded-2xl border bg-white shadow-[0_2px_24px_-12px_rgba(11,90,148,0.18)]"
      style={{ borderColor: LINE }}
    >
      <div className="divide-y" style={{ borderColor: LINE }}>
        {/* 1 — SIZE */}
        <Step n={1} title="Choose your filter size" id="step-size">
          <SizeCombobox
            sizes={config.availableSizes}
            value={config.size?.slug ?? null}
            onChange={config.setSize}
            customLabel={config.customSize}
            labelledBy="step-size"
          />
          <CustomSize onApply={config.setCustomSize} />
        </Step>

        {/* 2 — FILTRATION LEVEL */}
        <Step n={2} title="Choose your filtration level" id="step-merv">
          <RadioGroup labelledBy="step-merv" className="grid grid-cols-3 gap-2.5">
            {tiers.map((t) => {
              const selected = t.id === config.tierId;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => config.setTier(t.id)}
                  className="group relative flex flex-col items-center rounded-xl border px-2 pb-3 pt-4 text-center transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    borderColor: selected ? t.hex : LINE,
                    boxShadow: selected
                      ? `inset 0 0 0 1px ${t.hex}, 0 10px 24px -16px ${t.deepHex}`
                      : undefined,
                    background: selected
                      ? `linear-gradient(180deg, ${t.softHex}66 0%, #FFFFFF 78%)`
                      : "#FFFFFF",
                  }}
                >
                  {/* The packaging shield, not a plain number — the same badge
                      printed on the box the customer will unwrap. */}
                  <MervShield
                    rating={String(t.merv)}
                    size="sm"
                    color={t.deepHex}
                    showLabel={false}
                    decorative
                    className={`transition-transform duration-200 ${
                      selected
                        ? "scale-105"
                        : "opacity-90 group-hover:scale-105 group-hover:opacity-100"
                    }`}
                  />
                  <span className="sr-only">MERV {t.merv}</span>
                  <span
                    className="mt-2.5 block text-[11px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: t.deepHex }}
                  >
                    {t.name}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-charcoal-mid">
                    {t.shortBenefit}
                  </span>
                  {t.comingSoon && (
                    <span
                      className="absolute left-1/2 top-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-charcoal px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white"
                    >
                      Coming soon
                    </span>
                  )}
                  {selected && (
                    <span
                      className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: t.hex }}
                    >
                      <Check size={10} strokeWidth={3.5} aria-hidden="true" />
                      <span className="sr-only">Selected</span>
                    </span>
                  )}
                </button>
              );
            })}
          </RadioGroup>
          <Link
            href="/find-your-filter"
            className="mt-3 inline-block text-xs font-medium text-sky-700 underline-offset-2 hover:underline"
          >
            Compare MERV levels
          </Link>
        </Step>

        {/* 3 — QUANTITY */}
        <Step n={3} title="Choose quantity" id="step-qty">
          <RadioGroup labelledBy="step-qty" className="grid grid-cols-4 gap-2.5">
            {QUICK_PACK_QUANTITIES.map((q) => {
              const selected = q === config.packQty;
              const packTotal =
                quote.perFilter == null ? null : quote.perFilter * q;
              const chip =
                q === MOST_POPULAR_PACK
                  ? "Most popular"
                  : q === BEST_VALUE_PACK
                    ? "Best value"
                    : null;
              return (
                <button
                  key={q}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => config.setPack(q)}
                  className={`relative rounded-xl border px-2 py-3 text-center transition-all hover:-translate-y-px ${
                    selected
                      ? "border-sky-500 bg-sky-50 ring-1 ring-sky-500"
                      : "bg-white hover:border-sky-300"
                  }`}
                  style={selected ? undefined : { borderColor: LINE }}
                >
                  {chip && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-charcoal px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
                      {chip}
                    </span>
                  )}
                  <span className="block font-display text-lg font-bold leading-none text-charcoal">
                    {q}
                  </span>
                  <span className="mt-0.5 block text-[11px] text-charcoal-mid">
                    {q === 1 ? "filter" : "filters"}
                  </span>
                  {packTotal != null && (
                    <span className="mt-1.5 block text-[11px] font-medium text-charcoal">
                      {formatPrice(packTotal)}
                    </span>
                  )}
                  {selected && (
                    <span className="sr-only">Selected</span>
                  )}
                </button>
              );
            })}
          </RadioGroup>

          {/* Secondary: reaches the pack sizes the cards don't show. */}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-charcoal-mid">
              Other amounts
            </span>
            <div
              className="flex items-center rounded-full border"
              style={{ borderColor: LINE }}
            >
              <StepperButton
                label="Fewer filters"
                onClick={() => config.stepPack(-1)}
                disabled={config.packQty === PACK_QUANTITIES[0]}
              >
                <Minus size={13} strokeWidth={2.5} />
              </StepperButton>
              <span
                className="min-w-[4.5rem] text-center text-xs font-semibold tabular-nums text-charcoal"
                aria-live="polite"
              >
                {config.packQty} {config.packQty === 1 ? "filter" : "filters"}
              </span>
              <StepperButton
                label="More filters"
                onClick={() => config.stepPack(1)}
                disabled={
                  config.packQty === PACK_QUANTITIES[PACK_QUANTITIES.length - 1]
                }
              >
                <Plus size={13} strokeWidth={2.5} />
              </StepperButton>
            </div>
          </div>
        </Step>

        {/* 4 — DELIVERY */}
        <Step n={4} title="Choose delivery" id="step-delivery">
          <RadioGroup labelledBy="step-delivery" className="grid grid-cols-2 gap-2.5">
            <DeliveryOption
              selected={!subscribing}
              onClick={() => config.setPurchaseType("onetime")}
              title="One-time"
              sub="Just this order"
            />
            <DeliveryOption
              selected={subscribing}
              onClick={() => config.setPurchaseType("subscribe")}
              title="Subscribe"
              sub={
                quote.subscriptionPercent != null
                  ? `Save ${quote.subscriptionPercent}% · skip anytime`
                  : "Skip or cancel anytime"
              }
              highlight
            />
          </RadioGroup>

          {subscribing && (
            <div className="mt-3.5">
              <p className="text-xs font-medium text-charcoal-mid">
                Deliver every
              </p>
              <RadioGroup
                label="Delivery frequency"
                className="mt-2 grid grid-cols-3 gap-2.5"
              >
                {PDP_CADENCES.map((d) => {
                  const selected = d === config.cadence;
                  return (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => config.setCadence(d)}
                      className={`rounded-xl border py-2.5 text-center text-sm font-medium transition-all ${
                        selected
                          ? "border-sky-500 bg-sky-50 text-charcoal ring-1 ring-sky-500"
                          : "bg-white text-charcoal-mid hover:border-sky-300"
                      }`}
                      style={selected ? undefined : { borderColor: LINE }}
                    >
                      {d} days
                      {selected && <span className="sr-only">Selected</span>}
                    </button>
                  );
                })}
              </RadioGroup>
            </div>
          )}
        </Step>

        {/* 5 — SCENT STRIP (deliberately quieter than the four decisions above) */}
        {config.scentEligible && (
          <ScentRow
            scentKey={config.scentKey}
            onChange={config.setScent}
            packQty={config.packQty}
          />
        )}

        {/* SUMMARY + CTA */}
        <div className="bg-[#FBFDFE] p-4 sm:p-5">
          <dl className="space-y-1.5 text-[13px]">
            <SummaryRow label="Size" value={config.sizeLabel} />
            <SummaryRow
              label="Filtration"
              value={`MERV ${tier.merv} ${tier.name}`}
            />
            <SummaryRow
              label="Quantity"
              value={`${config.packQty} ${config.packQty === 1 ? "filter" : "filters"}`}
            />
            <SummaryRow
              label="Delivery"
              value={
                subscribing ? `Every ${config.cadence} days` : "One-time order"
              }
            />
            {config.scentKey && (
              <SummaryRow
                label="Scent strip"
                value={
                  scents.find((s) => s.key === config.scentKey)?.name ?? "Added"
                }
              />
            )}
          </dl>

          <div
            className="mt-3.5 flex items-end justify-between border-t pt-3.5"
            style={{ borderColor: LINE }}
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-charcoal-mid">
                Total
              </p>
              <p className="font-display text-2xl font-bold leading-tight text-charcoal">
                {formatPrice(quote.total)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[13px] text-charcoal-mid">
                {formatPrice(quote.perFilter)}{" "}
                <span className="text-charcoal-mid">/ filter</span>
              </p>
              {quote.subscriptionSavings != null &&
                quote.subscriptionSavings > 0 && (
                  <p className="text-[12px] font-medium text-merv-pro-700">
                    You save {formatPrice(quote.subscriptionSavings)}
                  </p>
                )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              config.addToCart();
              onAdded?.();
            }}
            disabled={!config.canAddToCart}
            /* Carbon on KALERO Blue, not white: white on this blue is 2.45:1 and fails. */
            className="mt-4 flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 text-[15px] font-semibold tracking-[0.01em] text-charcoal shadow-[0_8px_24px_-10px_rgba(0,71,179,0.55)] transition-all hover:bg-sky-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-charcoal-light disabled:text-charcoal disabled:shadow-none"
          >
            {config.tierComingSoon ? (
              `MERV ${tier.merv} is coming soon`
            ) : config.canAddToCart ? (
              <>
                Add to cart
                {quote.total != null && (
                  <span aria-hidden="true" className="opacity-60">
                    ·
                  </span>
                )}
                {quote.total != null && <span>{formatPrice(quote.total)}</span>}
              </>
            ) : (
              "Choose a size to continue"
            )}
          </button>

          {config.tierComingSoon && (
            <p className="mt-2 text-center text-[12px] text-charcoal-mid">
              Launching with MERV 8 and MERV 13. Pick one of those to order today.
            </p>
          )}

          {!config.tierComingSoon && !quote.confirmed && quote.total != null && (
            <p className="mt-2 text-center text-[11px] text-charcoal-mid">
              Pricing shown is indicative while variants are being finalized.
            </p>
          )}

          <ul className="mt-3.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-charcoal-mid">
            {[
              businessConfig.manufacturingMessage ?? "Made in USA",
              "Fast shipping",
              "Easy replacements",
            ].map((t) => (
              <li key={t} className="flex items-center gap-1">
                <Check size={12} strokeWidth={2.5} className="text-sky-500" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


/**
 * A radiogroup of buttons.
 *
 * role="radio" sets the expectation that the arrow keys move between options,
 * which a plain row of buttons doesn't do. This wires that up once for all four
 * groups: arrows move focus and select, Tab moves past the group.
 */
function RadioGroup({
  label,
  labelledBy,
  className,
  children,
}: {
  label?: string;
  labelledBy?: string;
  className: string;
  children: ReactNode;
}) {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(e.key)) return;
    const options = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>(
        ':scope > [role="radio"]',
      ),
    );
    const i = options.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const next = options[(i + step + options.length) % options.length];
    next.focus();
    next.click();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-labelledby={labelledBy}
      className={className}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}

/** One numbered decision. The number does the guiding so the copy doesn't have to. */
function Step({
  n,
  title,
  id,
  children,
}: {
  n: number;
  title: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <section className="p-4 sm:p-5">
      <h3 id={id} className="flex items-center gap-2.5">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-50 text-[11px] font-bold text-sky-700">
          {n}
        </span>
        <span className="font-display text-[15px] font-semibold text-charcoal">
          {title}
        </span>
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-charcoal-mid">{label}</dt>
      <dd className="text-right font-medium text-charcoal">{value}</dd>
    </div>
  );
}

function StepperButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal-mid transition-colors hover:text-charcoal disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function DeliveryOption({
  selected,
  onClick,
  title,
  sub,
  highlight,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`relative rounded-xl border px-3 py-3 text-left transition-all ${
        selected
          ? "border-sky-500 bg-sky-50 ring-1 ring-sky-500"
          : "bg-white hover:border-sky-300"
      }`}
      style={selected ? undefined : { borderColor: LINE }}
    >
      <span className="flex items-center gap-1.5">
        <span
          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
            selected ? "border-sky-500 bg-sky-500" : "border-charcoal-light"
          }`}
          aria-hidden="true"
        >
          {selected && <Check size={10} strokeWidth={3.5} className="text-white" />}
        </span>
        <span className="font-display text-sm font-semibold text-charcoal">
          {title}
        </span>
      </span>
      <span
        className={`mt-1 block pl-[22px] text-[11px] leading-snug ${
          highlight && selected ? "text-sky-700" : "text-charcoal-mid"
        }`}
      >
        {sub}
      </span>
    </button>
  );
}

/**
 * Compact add-on. Collapsed by default and visually lighter than the steps
 * above it, so an optional upsell never reads as a required decision.
 */
function ScentRow({
  scentKey,
  onChange,
  packQty,
}: {
  scentKey: ScentKey | null;
  onChange: (k: ScentKey | null) => void;
  packQty: number;
}) {
  const [open, setOpen] = useState(false);
  const available = scents.filter((s) => s.available);
  const chosen = scents.find((s) => s.key === scentKey);

  return (
    <section className="px-4 py-3 sm:px-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 text-left"
      >
        <Sparkles size={15} className="shrink-0 text-sky-500" aria-hidden="true" />
        <span className="flex-1 text-[13px] font-medium text-charcoal">
          {chosen ? `Scent strip: ${chosen.name}` : "Add a scent strip"}
        </span>
        <span className="text-[11px] text-charcoal-mid">
          {chosen
            ? `+${formatPrice(scentStripPrice * packQty)}`
            : `Optional · +${formatPrice(scentStripPrice)} each`}
        </span>
        <Plus
          size={14}
          strokeWidth={2.5}
          className={`shrink-0 text-charcoal-mid transition-transform ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <RadioGroup label="Scent strip" className="mt-3 grid gap-1.5">
          <ScentChoice
            selected={scentKey === null}
            title="No scent"
            sub="Filter only"
            onClick={() => onChange(null)}
          />
          {available.map((s) => (
            <ScentChoice
              key={s.key}
              selected={scentKey === s.key}
              title={s.name}
              sub={s.description}
              onClick={() => onChange(s.key)}
            />
          ))}
          <p className="mt-1 text-[11px] leading-relaxed text-charcoal-mid">
            One strip per filter. Peel, slide it in, and airflow does the rest.
          </p>
        </RadioGroup>
      )}
    </section>
  );
}

function ScentChoice({
  selected,
  title,
  sub,
  onClick,
}: {
  selected: boolean;
  title: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
        selected ? "border-sky-500 bg-sky-50" : "bg-white hover:border-sky-300"
      }`}
      style={selected ? undefined : { borderColor: LINE }}
    >
      <span className="min-w-0">
        <span className="block text-[13px] font-medium text-charcoal">
          {title}
        </span>
        <span className="block truncate text-[11px] text-charcoal-mid">
          {sub}
        </span>
      </span>
      {selected && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-sky-500 text-charcoal">
          <Check size={10} strokeWidth={3.5} aria-hidden="true" />
          <span className="sr-only">Selected</span>
        </span>
      )}
    </button>
  );
}

/** Tucked behind a link — most people never need it, and it shouldn't look like a step. */
function CustomSize({ onApply }: { onApply: (raw: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState("");
  const [error, setError] = useState(false);

  const apply = () => {
    if (onApply(raw)) {
      setOpen(false);
      setRaw("");
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2.5 text-xs text-charcoal-mid transition-colors hover:text-sky-700"
      >
        Can&apos;t find your size?{" "}
        <span className="font-medium text-sky-700 underline-offset-2 hover:underline">
          Enter a custom size
        </span>
      </button>
    );
  }

  return (
    <div className="mt-2.5">
      <div className="flex gap-2">
        <input
          type="text"
          autoFocus
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              apply();
            }
          }}
          placeholder="e.g. 12 × 24 × 1"
          aria-label="Custom filter size"
          aria-invalid={error}
          className="min-w-0 flex-1 rounded-xl border px-3.5 py-2.5 text-sm text-charcoal placeholder:text-charcoal-light focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
          style={{ borderColor: error ? "#B4472C" : LINE }}
        />
        <button
          type="button"
          onClick={apply}
          className="rounded-xl bg-charcoal px-4 text-xs font-semibold text-white transition-colors hover:bg-charcoal-soft"
        >
          Use
        </button>
      </div>
      <p
        className={`mt-1.5 text-[11px] ${error ? "text-[#B4472C]" : "text-charcoal-light"}`}
      >
        {error
          ? "Enter three numbers: width, height, depth."
          : "Width × height × depth, in inches."}
      </p>
    </div>
  );
}
