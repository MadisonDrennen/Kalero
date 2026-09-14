import { KaleroEverydayHero } from "@/components/hero/KaleroEverydayHero";
import { PopularSizes } from "@/components/home/PopularSizes";
import { ShopByAir } from "@/components/home/ShopByAir";
import { TierComparison } from "@/components/home/TierComparison";
import { BrandBento } from "@/components/home/BrandBento";
import { AirStories } from "@/components/home/AirStories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Subscription } from "@/components/home/Subscription";
// import { Testimonials } from "@/components/home/Testimonials"; // held back — see below
import { AirGuidesTeaser } from "@/components/home/AirGuidesTeaser";
import { EmailCapture } from "@/components/home/EmailCapture";
import { HvacCompatibility } from "@/components/shared/HvacCompatibility";
import { IridescentWave } from "@/components/ui/IridescentWave";

export default function Home() {
  return (
    <>
      {/* 1 — Hero */}
      <KaleroEverydayHero />

      {/* 2 — Popular Filter Sizes */}
      <PopularSizes />

      {/* 4 — Shop by what's in your air (tier cards + concern chips) */}
      <ShopByAir />

      {/* HVAC brands trust strip */}
      <HvacCompatibility />

      {/* 5 — Which KALERO is right for you? (Standard vs Pro vs Max) */}
      <TierComparison />

      <IridescentWave intensity="subtle" className="relative h-28 w-full sm:h-36" />

      {/* Photographic break: each tier in the air it is made for */}
      <AirStories />

      {/* 6 — Brand story as colour tiles */}
      <BrandBento />

      {/* 7 — How KALERO works */}
      <HowItWorks />

      {/* 8 — Subscription */}
      <Subscription />

      {/* Testimonials are held back until there are real ones. The six in
          lib/copy.ts are invented names and quotes under a heading that calls
          them "reviews from real households" -- publishing those on a live
          commercial site is a straightforward consumer-deception problem, and
          the FTC's rule on fake reviews and testimonials carries penalties.
          Put this back the day there are genuine customers to quote. */}
      {/* <Testimonials /> */}

      <IridescentWave intensity="subtle" className="relative h-28 w-full sm:h-36" flip />

      {/* 10 — Air Guides */}
      <AirGuidesTeaser />

      {/* 11 — Email capture */}
      <EmailCapture />
    </>
  );
}
