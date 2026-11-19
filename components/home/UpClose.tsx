import Image from "next/image";

/**
 * Three photographs of the product up close: what is inside it, what it
 * holds, and where it goes.
 *
 * The captions describe what is in each frame and nothing more — no capture
 * percentages, no health outcomes. The kit rules out invented numbers, and a
 * macro of caught pollen is persuasive on its own without one attached.
 */
const frames = [
  {
    src: "/images/products/filter-layers.webp",
    alt: "A KALERO filter separated into its layers: frame, support grid and pleated media",
    title: "Inside the frame",
    body: "A pleated media pack behind a diamond support grid, held in a sealed frame.",
    ratio: [1448, 1086] as const,
  },
  {
    src: "/images/products/fiber-macro.webp",
    alt: "Macro photograph of filter fibres with pollen grains and dust caught between them",
    title: "What it holds",
    body: "Pollen, dust and mould spores held in the fibres instead of moving through the house.",
    ratio: [1254, 1254] as const,
  },
  {
    src: "/images/products/install-front.webp",
    alt: "A technician sliding a KALERO filter into a furnace return",
    title: "Where it goes",
    body: "Into the return, airflow arrow pointing toward the furnace. A two-minute job.",
    ratio: [1100, 1375] as const,
  },
];

export function UpClose() {
  return (
    <section aria-labelledby="up-close-title" className="py-16 sm:py-20">
      <div className="container-x">
        <p className="text-eyebrow text-sky-700">Up close</p>
        <h2
          id="up-close-title"
          className="mt-2.5 max-w-xl font-display text-3xl font-semibold text-charcoal text-balance sm:text-4xl"
        >
          A filter is a simple thing, done properly.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {frames.map((f) => (
            <figure
              key={f.src}
              className="group overflow-hidden rounded-2xl bg-white ring-1 ring-charcoal/[0.07] shadow-[0_2px_4px_rgba(5,7,8,0.03),0_16px_36px_-24px_rgba(5,7,8,0.16)] transition-shadow duration-500 hover:shadow-[0_4px_8px_rgba(5,7,8,0.04),0_26px_52px_-26px_rgba(0,71,179,0.28)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-glacier-soft">
                <Image
                  src={f.src}
                  alt={f.alt}
                  width={f.ratio[0]}
                  height={f.ratio[1]}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="p-5">
                <p className="font-display text-base font-semibold text-charcoal">
                  {f.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal-mid text-pretty">
                  {f.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
