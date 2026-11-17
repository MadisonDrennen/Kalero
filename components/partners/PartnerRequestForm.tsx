"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  half?: boolean;
};

const FIELDS: Field[] = [
  { name: "company", label: "Company", required: true, placeholder: "Acme Heating & Air" },
  { name: "name", label: "Your name", required: true, half: true },
  { name: "role", label: "Role", half: true, placeholder: "Owner, purchasing, service manager" },
  { name: "email", label: "Work email", type: "email", required: true, half: true },
  { name: "phone", label: "Phone", type: "tel", half: true },
  { name: "territory", label: "Where you work", placeholder: "City, metro or counties covered" },
];

/**
 * Trade enquiry form.
 *
 * Submission is local only, the same as the storefront's email capture: there
 * is no backend yet, so it must not look like a message was delivered when it
 * was not. The confirmation says the details are ready to send and shows the
 * address to use.
 */
export function PartnerRequestForm({ partnerEmail }: { partnerEmail: string | null }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl bg-white p-8 ring-1 ring-sky-100 sm:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700">
          <Check size={20} strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">
          Thanks — we have your details.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-mid">
          {partnerEmail
            ? `Someone will come back to you within two business days. If it is urgent, email ${partnerEmail}.`
            : "Someone will come back to you within two business days."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire to the CRM or inbox once the trade programme has an owner.
        setSent(true);
      }}
      className="rounded-2xl bg-white p-6 ring-1 ring-sky-100 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label
              htmlFor={`partner-${f.name}`}
              className="block text-[13px] font-medium text-charcoal"
            >
              {f.label}
              {f.required && <span className="text-sky-700"> *</span>}
            </label>
            <input
              id={`partner-${f.name}`}
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              placeholder={f.placeholder}
              className="mt-1.5 h-11 w-full rounded-xl border border-sky-100 bg-air px-3.5 text-sm text-charcoal placeholder:text-charcoal-light focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <label
            htmlFor="partner-volume"
            className="block text-[13px] font-medium text-charcoal"
          >
            Roughly how many filters a month?
          </label>
          <select
            id="partner-volume"
            name="volume"
            defaultValue=""
            className="mt-1.5 h-11 w-full rounded-xl border border-sky-100 bg-air px-3.5 text-sm text-charcoal focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          >
            <option value="">Not sure yet</option>
            <option>Under 100</option>
            <option>100 to 500</option>
            <option>500 to 2,000</option>
            <option>Over 2,000</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="partner-notes"
            className="block text-[13px] font-medium text-charcoal"
          >
            Anything else
          </label>
          <textarea
            id="partner-notes"
            name="notes"
            rows={3}
            placeholder="Sizes you move most, brands you stock today, how you'd want this to work."
            className="mt-1.5 w-full rounded-xl border border-sky-100 bg-air p-3.5 text-sm text-charcoal placeholder:text-charcoal-light focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 text-sm font-semibold text-charcoal transition-colors hover:bg-sky-400 sm:w-auto sm:px-10"
      >
        Request trade pricing
        <ArrowRight size={16} strokeWidth={2.25} />
      </button>
      <p className="mt-3 text-[12px] text-charcoal-light">
        No obligation. We will not add you to a consumer mailing list.
      </p>
    </form>
  );
}
