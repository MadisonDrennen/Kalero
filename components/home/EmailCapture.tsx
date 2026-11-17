"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Send } from "lucide-react";
import { tiers } from "@/lib/tiers";
import { PhotoComingSoon } from "@/components/ui/PhotoComingSoon";
import { IridescentWave } from "@/components/ui/IridescentWave";

/**
 * Homepage close — the email capture as a colour panel with the three cartons
 * fanned across it, so the page ends on the product rather than a form.
 * Local-only submission in development; wire to your ESP later.
 */
export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to Klaviyo / Mailchimp / whatever ESP is chosen.
    setSubmitted(true);
    setEmail("");
  };

  /* fanned left to right: Standard tilted back, Pro upright in front, Max tilted forward */
  const fan = [
    "left-[4%] top-[14%] -rotate-[10deg] z-10",
    "left-1/2 top-[4%] -translate-x-1/2 z-20",
    "right-[4%] top-[14%] rotate-[10deg] z-10",
  ];

  return (
    <section aria-labelledby="email-capture-title" className="relative isolate py-16 sm:py-20">
      <div className="container-x">
        <div
          className="relative grid overflow-hidden rounded-[2rem] lg:grid-cols-[1fr_1.05fr] lg:items-center"
          style={{ background: "linear-gradient(120deg, #35B1E6 0%, #0047B3 100%)" }}
        >
          <IridescentWave className="pointer-events-none absolute inset-0 h-full w-full opacity-45" />

          <div className="relative p-8 sm:p-12 lg:p-14">
            <h2
              id="email-capture-title"
              className="font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
            >
              Stock KALERO in your vans.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-charcoal-soft text-pretty">
              Tell us what you move and we will come back with a trade rate.
            </p>

            {submitted ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-sky-800">
                <Check size={16} strokeWidth={2.25} />
                Thanks — we will be in touch within two business days.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
                <label htmlFor="email-capture-input" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-capture-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-full border border-white/70 bg-white px-5 sm:w-auto sm:flex-1 text-sm text-charcoal placeholder:text-charcoal-mid/60 focus:border-charcoal focus:outline-none focus:ring-2 focus:ring-white/60"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-charcoal px-6 text-sm font-semibold text-white transition-colors hover:bg-charcoal-soft"
                >
                  Request pricing
                  <Send size={14} strokeWidth={2} />
                </button>
              </form>
            )}
            <p className="mt-4 text-[11px] text-charcoal-soft">No spam. Unsubscribe any time.</p>
          </div>

          <div className="relative h-72 sm:h-96 lg:h-[440px]" aria-hidden="true">
            {tiers.map((t, i) => (
              <div key={t.id} className={`absolute w-[38%] ${fan[i]}`}>
                <PhotoComingSoon
                  tint={{ soft: t.softHex, deep: t.deepHex }}
                  className="aspect-[4/5] w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
