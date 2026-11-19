import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Pre-launch bar. Always shown.
 *
 * The window is a season, not a date — it carried a day counter beside it for
 * a while, which put a precise-looking number on something deliberately
 * imprecise. It was also dismissible, which meant anyone who closed it once
 * never saw it again, since the choice persisted in their browser.
 *
 * With neither, there is no state and no storage here, so this stays a server
 * component and ships no client JavaScript.
 */
export const LAUNCH_WINDOW = "spring 2027";

export function LaunchBanner() {
  return (
    /* No z-index. The sticky header sets z-40, which creates a stacking
       context, so the search overlay nested inside it can never paint above a
       sibling that claims a higher z — this bar used to punch straight through
       the open search panel. */
    <div className="relative bg-[linear-gradient(100deg,#35B2E6_0%,#4ABCEA_50%,#2693D8_100%)] text-charcoal">
      <div className="container-x flex items-center justify-center gap-x-4 py-2.5 text-center text-[13px]">
        <p className="font-semibold uppercase tracking-[0.14em] text-charcoal">
          Launching {LAUNCH_WINDOW}
        </p>
        <Link
          href="/partners"
          className="group hidden shrink-0 items-center gap-1.5 font-semibold text-charcoal underline-offset-4 hover:underline sm:inline-flex"
        >
          Get trade pricing
          <ArrowRight
            size={14}
            strokeWidth={2.25}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
