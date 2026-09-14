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
      { source: "/learn", destination: "/find-your-filter", permanent: false },
      // The three homepage guide cards link here and the articles are not written yet.
      { source: "/learn/:slug", destination: "/find-your-filter", permanent: false },
      { source: "/account", destination: "/cart", permanent: false },
      { source: "/air-filters", destination: "/shop", permanent: false },
      { source: "/air-filters/:slug", destination: "/shop", permanent: false },
      { source: "/custom-filters", destination: "/find-your-filter", permanent: false },
      /* The header, the footer and the Shop-by-air buttons have all pointed at
         these since before there was a tier page, and all three 404'd. Send
         each tier to its product until the tier pages exist. */
      { source: "/merv-8", destination: "/products/everyday-defense", permanent: false },
      { source: "/merv-11", destination: "/products/pet-defense", permanent: false },
      { source: "/merv-13", destination: "/products/allergy-defense", permanent: false },
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
