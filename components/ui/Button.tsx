import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

const variants: Record<Variant, string> = {
  /* KALERO Blue is the accent, so the button is the frame blue rather than the
     navy. White on that blue is 2.4:1 and fails, so the label is Carbon — the
     blue-on-black pairing inverted. The gradient stops short of sky-700,
     which would drop Carbon to 4.3:1; at sky-600 it still reads 5.9:1, and
     8.3:1 across the body. */
  primary:
    "text-charcoal bg-[radial-gradient(130%_160%_at_88%_-12%,rgba(207,232,244,0.85)_0%,rgba(207,232,244,0)_58%),linear-gradient(158deg,#35B2E6_0%,#2693D8_88%)] shadow-[0_14px_34px_-12px_rgba(53,178,230,0.7),inset_0_1px_0_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-12px_rgba(53,178,230,0.85),inset_0_1px_0_0_rgba(255,255,255,0.6)] active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-white text-charcoal ring-1 ring-sky-200 hover:ring-sky-400 hover:shadow-soft",
  ghost:
    "text-charcoal hover:text-sky-600",
  outline:
    "bg-transparent text-charcoal ring-1 ring-charcoal/15 hover:ring-charcoal/40",
  dark:
    "bg-charcoal text-white hover:bg-charcoal-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-6 py-3.5",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", arrow, className = "", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <ArrowRight size={16} strokeWidth={2.25} />}
    </button>
  );
});

export type LinkButtonProps = SharedProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps | "href">;

export function LinkButton({
  variant = "primary",
  size = "md",
  arrow,
  className = "",
  href,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      {arrow && <ArrowRight size={16} strokeWidth={2.25} />}
    </Link>
  );
}
