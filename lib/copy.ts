/**
 * Four questions, no more. Each answer sticks to what is verifiable: the MERV
 * scale is an ASHRAE 52.2 rating, the size is printed on the customer's own
 * frame, and the range is two levels. Nothing here promises a delivery window,
 * a saving or a health outcome.
 */
export const faqs = [
  {
    q: "What is the difference between MERV 8 and MERV 13?",
    a: "MERV is the industry scale for how small a particle a filter is built to capture, and a higher number means a finer capture. MERV 8 is the everyday choice for household dust and lint. MERV 13 captures finer particles, which is what you want when pollen, smoke or air quality is the reason you are changing the filter. Both are built to run in standard residential systems.",
  },
  {
    q: "How often should I change my filter?",
    a: "Every 30 to 90 days for most homes. Pets, nearby construction, wildfire season and a system that runs hard all push you toward the shorter end. If you would rather not track it, a standing order arrives on the cadence you pick and you can pause or change it at any time.",
  },
  {
    q: "How do I find my filter size?",
    a: "Slide out the filter you have now and read the frame. The size is almost always printed on the edge, like 20 × 25 × 1. Order that same size. If yours is not one we stock, tell us the measurements and we will confirm whether we can cut it.",
  },
  {
    q: "Do you work with HVAC contractors?",
    a: "Yes, and that is who we are building for first. Tell us the sizes you fit most and roughly what you move in a month, and we will come back with a trade rate against your actual mix rather than a generic wholesale sheet.",
  },
];

export const testimonials = [
  {
    quote:
      "I finally know which filter my house is supposed to have. That alone was worth it.",
    author: "Priya M.",
    detail: "MERV 13 subscriber",
    category: "allergy" as const,
  },
  {
    quote:
      "Two goldens, one toddler. Pet Defense actually keeps the vents from looking like fur sweaters.",
    author: "Cameron & Alex",
    detail: "MERV 13 subscriber",
    category: "pet" as const,
  },
  {
    quote:
      "During fire season I don't have to think about it anymore. The box just shows up.",
    author: "J. Ortega",
    detail: "Smoke Defense subscriber",
    category: "smoke" as const,
  },
  {
    quote:
      "The packaging honestly convinced me. Then the reminder emails kept me.",
    author: "Riya S.",
    detail: "MERV 8 subscriber",
    category: "everyday" as const,
  },
  {
    quote:
      "Our kitchen opens to the living room. Carbon Defense makes the whole floor feel less lingering.",
    author: "The Duquette House",
    detail: "Carbon Defense subscriber",
    category: "carbon" as const,
  },
  {
    quote:
      "The Fall Dust drop is a genuine home ritual now. Nobody warned me a filter would do that.",
    author: "Halley T.",
    detail: "Seasonal Defense subscriber",
    category: "seasonal" as const,
  },
];

export const seasonalDrops = [
  {
    slug: "spring-pollen",
    name: "Pollen Season",
    tagline: "Peak tree, grass, and weed pollen at MERV 13.",
    palette: "from-sky-100 via-white to-blush-soft",
    image: "/images/Spring pollen new.png",
  },
  {
    slug: "summer-smoke",
    name: "Wildfire Season",
    tagline: "Wildfire smoke and urban haze. Fine particulate capture.",
    palette: "from-smoke-soft via-white to-sky-100",
    image: "/images/Summer Smoke.png",
  },
  {
    slug: "fall-dust",
    name: "Dust Season",
    tagline: "Fall dust and heavier HVAC load.",
    palette: "from-gold-soft via-white to-sky-100",
    image: "/images/Fall Dust.png",
  },
  {
    slug: "winter-fresh",
    name: "Cold Season",
    tagline: "Sealed-up homes and forced-air heating.",
    palette: "from-canvas via-white to-sky-100",
    image: "/images/Winter Smog.png",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Tell us what you move",
    body: "The sizes you fit most, rough monthly volume, and what you stock today.",
  },
  {
    step: "02",
    title: "We quote your rate",
    body: "Trade pricing against your actual mix, not a generic wholesale sheet.",
  },
  {
    step: "03",
    title: "Stock and reorder",
    body: "A first order to try, then a standing schedule once it is working.",
  },
];

export const particleReference = [
  { name: "Lint & carpet fibers", size: "Large", key: "lint" as const },
  { name: "Household dust", size: "Medium", key: "dust" as const },
  { name: "Pet dander", size: "Medium", key: "dander" as const },
  { name: "Pollen", size: "Medium", key: "pollen" as const },
  { name: "Mold spores", size: "Small", key: "mold" as const },
  { name: "Fine smoke particles", size: "Very small", key: "smoke" as const },
];

export const filterPerformanceMatrix: Record<
  "everyday" | "pet" | "allergy" | "smoke" | "carbon",
  Partial<Record<"lint" | "dust" | "dander" | "pollen" | "mold" | "smoke", 1 | 2 | 3>>
> = {
  everyday: { lint: 3, dust: 3, pollen: 2, dander: 1, mold: 1 },
  pet: { lint: 3, dust: 3, dander: 3, pollen: 2, mold: 2 },
  allergy: { lint: 3, dust: 3, pollen: 3, dander: 3, mold: 3, smoke: 2 },
  smoke: { lint: 3, dust: 3, pollen: 3, dander: 3, mold: 3, smoke: 3 },
  carbon: { lint: 3, dust: 3, dander: 2, pollen: 2, mold: 2, smoke: 2 },
};

export const quizConcerns = [
  { id: "pets", label: "I have pets", suggests: ["pet"] as const },
  { id: "allergies", label: "I deal with seasonal allergies", suggests: ["allergy"] as const },
  { id: "smoke", label: "I live near wildfire smoke", suggests: ["smoke"] as const },
  { id: "odors", label: "My home holds onto odors", suggests: ["carbon"] as const },
  { id: "everyday", label: "I mainly need everyday protection", suggests: ["everyday"] as const },
  { id: "seasonal", label: "I rotate with the seasons", suggests: ["seasonal"] as const },
];
