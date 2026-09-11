import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
  icon?: ReactNode;
  /** For tier colours, which come from data rather than the Tailwind palette. */
  style?: CSSProperties;
};

export function Chip({ children, className = "", size = "sm", icon, style }: Props) {
  const sizeClass =
    size === "sm" ? "text-[11px] px-2.5 py-1" : "text-xs px-3 py-1.5";
  return (
    <span
      style={style}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium uppercase tracking-[0.14em] ${sizeClass} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
