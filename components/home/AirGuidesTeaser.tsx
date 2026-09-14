import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const guides = [
  {
    image: "/images/products/tiers-cinematic.jpg",
    focus: "object-center",
    title: "What is MERV?",
    body: "Understand filtration ratings without the technical jargon.",
    href: "/learn/merv-guide",
  },
  {
    image: "/images/products/lifestyle-mountains.jpg",
    focus: "object-[60%_center]",
    title: "How often should I change my filter?",
    body: "A simple replacement guide based on your home and your season.",
    href: "/learn/replacement-guide",
  },
  {
    image: "/images/products/merv-8-4pack.jpg",
    focus: "object-[center_42%]",
    title: "What size air filter do I need?",
    body: "Learn how to read the dimensions on your current filter in seconds.",
    href: "/learn/filter-size-guide",
  },
];

/**
 * Homepage §16 — editorial guides teaser. Cleaner than a blog grid.
 */
export function AirGuidesTeaser() {
  return (
    <section
      aria-labelledby="air-guides-title"
      className="relative isolate py-16 sm:py-20"
    >
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-sky-700">Learn</p>
          <h2
            id="air-guides-title"
            className="mt-3 font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
          >
            Air, explained simply.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {guides.map(({ image, focus, title, body, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white transition-all hover:-translate-y-1 hover:border-sky-400 hover:shadow-soft"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sky-50">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className={`object-cover ${focus} transition-transform duration-500 group-hover:scale-[1.04]`}
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
              <h3 className="font-display text-lg font-semibold text-charcoal sm:text-xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-mid text-pretty">
                {body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 transition-transform group-hover:translate-x-0.5">
                Read guide
                <ArrowRight size={12} strokeWidth={2.25} />
              </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            Explore Air Guides
            <ArrowRight size={14} strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
