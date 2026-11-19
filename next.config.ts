import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Routes the header and footer link to that were never built. Redirecting
   * beats a 404 while the pages are outstanding. Temporary on purpose — these
   * are 307s, so search engines will not cache them once the real pages land.
   */
  async redirects() {
    return [
      { source: "/why-kalero", destination: "/#why-kalero", permanent: false },
      { source: "/learn", destination: "/shop", permanent: false },
      // The three homepage guide cards link here and the articles are not written yet.
      { source: "/learn/:slug", destination: "/shop", permanent: false },
      { source: "/account", destination: "/cart", permanent: false },
      /* MERV 11 was removed from the line; its routes point at the shop. */
      { source: "/merv-11", destination: "/shop", permanent: false },
      { source: "/products/pet-defense", destination: "/shop", permanent: false },
      { source: "/shop/pets-and-dander", destination: "/shop", permanent: false },
      /* The quiz and the scent-strip line are out of the launch range; the old
         product slugs were renamed to the MERV levels they actually sell. */
      { source: "/find-your-filter", destination: "/shop", permanent: false },
      { source: "/scent-strips", destination: "/shop", permanent: false },
      { source: "/products/everyday-defense", destination: "/products/merv-8", permanent: false },
      { source: "/products/allergy-defense", destination: "/products/merv-13", permanent: false },
      { source: "/air-filters", destination: "/shop", permanent: false },
      { source: "/air-filters/:slug", destination: "/shop", permanent: false },
      { source: "/custom-filters", destination: "/shop", permanent: false },
      /* The header, the footer and the Shop-by-air buttons have all pointed at
         these since before there was a tier page, and all three 404'd. Send
         each tier to its product until the tier pages exist. */
      { source: "/merv-8", destination: "/products/merv-8", permanent: false },
      { source: "/merv-13", destination: "/products/merv-13", permanent: false },
      /* Held back for launch -- the range is the three MERV tiers only.
         307s, not 404s, so anything already pointing here still lands, and the
         pages come back by flipping `live` in lib/categories.ts. */
      { source: "/hotel-property", destination: "/shop", permanent: false },
      { source: "/shop/smoke-and-pollution", destination: "/shop", permanent: false },
      { source: "/products/smoke-defense", destination: "/shop", permanent: false },
      { source: "/shop/odors-and-vocs", destination: "/shop", permanent: false },
      { source: "/products/carbon-defense", destination: "/shop", permanent: false },
      { source: "/shop/hotel-collection", destination: "/shop", permanent: false },
      { source: "/products/hotel-collection", destination: "/shop", permanent: false },
    ];
  },
};

export default nextConfig;
