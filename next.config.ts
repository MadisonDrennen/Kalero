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
      { source: "/account", destination: "/cart", permanent: false },
      { source: "/air-filters", destination: "/shop", permanent: false },
      { source: "/air-filters/:slug", destination: "/shop", permanent: false },
      { source: "/custom-filters", destination: "/find-your-filter", permanent: false },
    ];
  },
};

export default nextConfig;
