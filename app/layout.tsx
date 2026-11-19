import type { Metadata } from "next";
import { Instrument_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { LaunchBanner } from "@/components/ui/LaunchBanner";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "@/components/commerce/CartDrawer";

/* Brand kit type: Instrument Sans × Poppins.
   Poppins is the display face -- it is geometric like the wordmark, whose A is
   a triangle and whose O is a circle. Instrument Sans carries body and UI,
   where it is the more legible of the two at small sizes. */
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "KALERO, Quality Air Filters | MERV 8 & 13 for HVAC Pros and Homes",
    template: "%s | KALERO Air Filters",
  },
  description:
    "MERV 8 and MERV 13 residential air filters in every standard size (16x25x1, 20x20x1, 20x25x1 and more), made in the USA. Trade pricing for HVAC contractors, and scheduled delivery for homes.",
  keywords: [
    "air filters",
    "home air filters",
    "HVAC air filter",
    "furnace filter",
    "MERV 8 filter",
    "wholesale air filters",
    "HVAC contractor filters",
    "20x25x1 air filter",
    "16x25x1 air filter",
    "20x20x1 air filter",
    "14x20x1 air filter",
    "16x20x1 air filter",
    "20x30x1 air filter",
    "pet dander air filter",
    "allergy air filter",
    "smoke air filter",
    "wildfire air filter",
    "pollen air filter",
    "carbon activated filter",
    "air filter subscription",
    "air filter delivery",
    "HVAC filter for pets",
    "high MERV filter",
    "residential air filter",
    "premium air filter",
    "KALERO",
  ],
  metadataBase: new URL("https://kalero.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KALERO, Premium Home Air Filters, Delivered",
    description:
      "MERV 8 and MERV 13 air filters in every standard size, made in the USA. Trade pricing for HVAC contractors. Skip or cancel anytime.",
    type: "website",
    siteName: "KALERO",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KALERO, Premium Home Air Filters, Delivered",
    description:
      "MERV 8, 11, and 13 air filters for pets, allergies, smoke, and dust. Every standard size. Delivered on your schedule.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Home Improvement",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KALERO",
  url: "https://kalero.com",
  logo: "https://kalero.com/kalero-logo.png",
  description:
    "Premium residential air filters in MERV 8 and MERV 13, made in the USA. Trade pricing for HVAC contractors, and delivery on a schedule for homes.",
  sameAs: [] as string[],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KALERO",
  url: "https://kalero.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://kalero.com/shop?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${instrumentSans.variable}`}>
      <body className="min-h-screen bg-canvas text-charcoal">
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <LaunchBanner />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
