import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Facebook, Instagram, Send } from "lucide-react";
import { socialProfiles } from "@/lib/business";

const shopLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/merv-8", label: "Standard · MERV 8" },
  { href: "/merv-13", label: "Max · MERV 13" },
  { href: "/shop", label: "Shop by Size" },
  { href: "/custom-filters", label: "Custom Filters" },
];

const helpLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/learn/filter-size-guide", label: "Size Guide" },
  { href: "/learn/merv-guide", label: "MERV Guide" },
];

const brandLinks = [
  { href: "/why-kalero", label: "Our Story" },
  { href: "/why-kalero", label: "Why KALERO" },
  { href: "/learn/air-quality-guide", label: "Air Guides" },
];

const accountLinks = [
  { href: "/account", label: "Sign In" },
  { href: "/account/orders", label: "Order History" },
  { href: "/account/subscriptions", label: "Manage Auto Delivery" },
];

/* Icons live here; the URLs come from lib/business so the schema and the
   footer cannot disagree about where the accounts are. */
const socialIcons = { Instagram, Facebook } as const;
const socials = socialProfiles.map((p) => ({
  ...p,
  Icon: socialIcons[p.label as keyof typeof socialIcons],
}));

export function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-charcoal text-white">
      {/* The wave bitmap used to sit here at h-56, and it cut straight through
          the last row of links — "Air Guides" and "Manage Auto Delivery" were
          reading on top of it. A radial ground carries the blue instead, with
          nothing crossing the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 6%, #050708 46%, rgba(0,71,179,0.38) 78%, rgba(53,178,230,0.28) 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[70vw] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="container-x relative pb-12 pt-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Logo variant="light" size="lg" />
            <p className="mt-6 text-eyebrow font-semibold uppercase tracking-[0.28em] text-sky-300">
              Cleaner Air. Better Living.
            </p>
            <p className="mt-3 text-2xl font-display font-medium leading-snug text-white">
              Premium filters, delivered.
            </p>
            <form className="mt-6 flex items-center gap-2 rounded-pill bg-white/8 p-1.5 ring-1 ring-white/15 backdrop-blur">
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Email address"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-pill bg-sky-500 px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-sky-400"
              >
                Subscribe <Send size={14} />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white ring-1 ring-white/15 transition-colors hover:bg-white/15"
                >
                  <Icon size={16} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Shop" links={shopLinks} />
            <FooterColumn title="Help" links={helpLinks} />
            <FooterColumn title="KALERO" links={brandLinks} />
            <FooterColumn title="Account" links={accountLinks} />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} KALERO Air, Inc.</p>
          <div className="flex flex-wrap gap-4">
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-eyebrow text-sky-300">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((l) => (
          <li key={`${title}-${l.label}`}>
            <Link
              href={l.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
