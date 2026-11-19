import { KaleroEverydayHero } from "@/components/hero/KaleroEverydayHero";
import { PopularSizes } from "@/components/home/PopularSizes";
import { ShopByAir } from "@/components/home/ShopByAir";
import { UpClose } from "@/components/home/UpClose";
import { BrandBento } from "@/components/home/BrandBento";
import { Subscription } from "@/components/home/Subscription";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
// import { Testimonials } from "@/components/home/Testimonials"; // held back — see below
import { AirGuidesTeaser } from "@/components/home/AirGuidesTeaser";
import { FAQ } from "@/components/home/FAQ";
import { EmailCapture } from "@/components/home/EmailCapture";

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <KaleroEverydayHero />

      {/* 2 — The range (MERV 8 / MERV 13 tier cards) */}
      <ShopByAir />

      {/* 3 — Popular filter sizes */}
      <PopularSizes />

      {/* The product up close */}
      <UpClose />

      {/* 6 — Brand story as colour tiles */}
      <BrandBento />

      {/* 8 — Subscription */}
      <Subscription />

      {/* The compatibility strip sits here rather than between the tier cards
          and the product shots: "fits every major system" answers the question
          a standing order raises — whether this will keep fitting — and it was
          interrupting the run of product imagery further up. */}
      <HvacCompatibility />

      {/* Testimonials are held back until there are real ones. The six in
          lib/copy.ts are invented names and quotes under a heading that calls
          them "reviews from real households" -- publishing those on a live
          commercial site is a straightforward consumer-deception problem, and
          the FTC's rule on fake reviews and testimonials carries penalties.
          Put this back the day there are genuine customers to quote. */}
      {/* <Testimonials /> */}

      {/* 10 — Air Guides */}
      <AirGuidesTeaser />

      {/* FAQ */}
      <FAQ />

      {/* 11 — Email capture */}
      <EmailCapture />
    </>
  );
}
