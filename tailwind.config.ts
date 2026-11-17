import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ---- KALERO brand kit (Nov 2026) ----
           Six colours: Air, Glacier, KALERO Blue, Navy, Graphite, Carbon.
           The v5 spectrum (teal / mint / lilac / iris) is retired -- there is
           no green and no purple in the brand any more. The old token names
           are kept and re-pointed at kit colours so any straggler that still
           references them renders on-brand instead of off-palette. */

        // KALERO Blue #35B1E6. `sky` keeps its name: it is referenced in
        // hundreds of class names and renaming it would be churn, not change.
        sky: {
          DEFAULT: "#35B1E6",
          soft: "#CFE8F4",
          deep: "#0047B3",
          50: "#EFF9FD",
          100: "#D7EFFA",
          200: "#A4DCF4",
          300: "#7ACCEE",
          400: "#55BDEA",
          500: "#35B1E6",
          600: "#2693D8",
          700: "#1877CA",
          800: "#0C5EBE",
          900: "#0047B3",
        },
        navy: {
          DEFAULT: "#0047B3",
          soft: "#D6E2F3",
          deep: "#022F72",
          50: "#EDF2FA",
          100: "#D6E2F3",
          200: "#A3BDE4",
          300: "#7098D4",
          400: "#386FC4",
          500: "#0047B3",
          600: "#013B94",
          700: "#022F72",
          800: "#03214C",
          900: "#04142A",
        },
        glacier: {
          DEFAULT: "#CFE8F4",
          soft: "#E7F4FA",
          deep: "#A4DCF4",
        },
        air: {
          DEFAULT: "#F4F7FA",
        },

        // Tier tokens. Standard is KALERO Blue, Pro is Navy. Max is kept for
        // the coming-soon Allergy listing and reads as graphite, not lilac.
        "merv-standard": {
          DEFAULT: "#35B1E6",
          soft: "#CFE8F4",
          deep: "#0047B3",
        },
        "merv-pro": {
          DEFAULT: "#0047B3",
          soft: "#D6E2F3",
          deep: "#022F72",
          50: "#EDF2FA",
          100: "#D6E2F3",
          200: "#A3BDE4",
          300: "#7098D4",
          400: "#386FC4",
          500: "#0047B3",
          600: "#013B94",
          700: "#022F72",
          800: "#03214C",
          900: "#04142A",
        },
        "merv-max": {
          DEFAULT: "#283238",
          soft: "#E3E6E8",
          deep: "#050708",
        },

        // Retired spectrum names, re-pointed at kit colours.
        teal: { DEFAULT: "#35B1E6" },
        mint: { soft: "#CFE8F4", DEFAULT: "#35B1E6", deep: "#0047B3" },
        lilac: { soft: "#D6E2F3", DEFAULT: "#0047B3", deep: "#022F72" },
        iris: { soft: "#D6E2F3", DEFAULT: "#0047B3", deep: "#022F72" },
        lavender: {
          DEFAULT: "#35B1E6",
          50: "#EFF9FD",
          100: "#D7EFFA",
          200: "#A4DCF4",
          300: "#7ACCEE",
          400: "#55BDEA",
          500: "#35B1E6",
          600: "#2693D8",
          700: "#1877CA",
          800: "#0C5EBE",
          900: "#0047B3",
        },

        // Carbon #050708, with Graphite #283238 as the soft step.
        charcoal: {
          DEFAULT: "#050708",
          soft: "#283238",
          mid: "#5A6670",
          light: "#AEB8C0",
        },
        neutral: {
          mist: "#F4F7FA",
          line: "#E1E7EB",
          inactive: "#AEB8C0",
          slate: "#5A6670",
        },
        canvas: {
          DEFAULT: "#F4F7FA",
          warm: "#F4F7FA",
          soft: "#CFE8F4",
        },

        // Category identities, all drawn from the kit.
        grass: { DEFAULT: "#0047B3", soft: "#D6E2F3", deep: "#022F72" },
        blush: { DEFAULT: "#283238", soft: "#E3E6E8", deep: "#050708" },
        smoke: { DEFAULT: "#283238", soft: "#E3E6E8", deep: "#050708" },
        graphite: { DEFAULT: "#283238", soft: "#E3E6E8", deep: "#050708" },
        gold: { DEFAULT: "#5A6670", soft: "#E3E6E8", deep: "#283238" },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "Instrument Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 5vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2rem, 3.6vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        eyebrow: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.18em" }],
      },
      borderRadius: {
        card: "0.75rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 20px 60px -30px rgba(0, 71, 179, 0.20)",
        card: "0 30px 80px -40px rgba(0, 71, 179, 0.28)",
        glow: "0 0 120px rgba(53, 177, 230, 0.32)",
      },
      backgroundImage: {
        "sky-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(53,177,230,0.28) 0%, rgba(207,232,244,0) 70%)",
        "lavender-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(53,177,230,0.28) 0%, rgba(207,232,244,0) 70%)",
        "hero-wash":
          "linear-gradient(180deg, #F4F7FA 0%, #CFE8F4 55%, #F4F7FA 100%)",
        /* The kit's one gradient: white → Glacier → KALERO Blue → Navy →
           Graphite → Carbon. `iris-wash` keeps its name for callers. */
        "brand-ramp":
          "linear-gradient(90deg, #FFFFFF 0%, #CFE8F4 22%, #35B1E6 45%, #0047B3 68%, #283238 86%, #050708 100%)",
        "iris-wash":
          "linear-gradient(105deg, rgba(53,177,230,0.18) 0%, rgba(207,232,244,0.22) 45%, rgba(0,71,179,0.14) 100%)",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "50%": { opacity: "0.7" },
          "100%": { transform: "translateX(20px)", opacity: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        drift: "drift 8s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
