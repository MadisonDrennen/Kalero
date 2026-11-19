"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Send } from "lucide-react";
import { SilkGradient } from "@/components/ui/SilkGradient";

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

  return (
    <section aria-labelledby="email-capture-title" className="relative isolate py-16 sm:py-20">
      <div className="container-x">
        <div className="relative grid overflow-hidden rounded-[2rem] bg-sky-500 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <SilkGradient />
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
            <p className="mt-4 text-[11px] text-charcoal/60">No spam. Unsubscribe any time.</p>
          </div>

          <div className="relative h-72 overflow-hidden sm:h-96 lg:h-[440px]">
            <Image
              src="/images/products/install-overhead.webp"
              alt="A technician fitting a KALERO filter into a return duct"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
