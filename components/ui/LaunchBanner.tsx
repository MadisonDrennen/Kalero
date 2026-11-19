/**
 * Pre-launch bar. Always shown.
 *
 * The window is a season, not a date — it carried a day counter beside it for
 * a while, which put a precise-looking number on something deliberately
 * imprecise. It was also dismissible, which meant anyone who closed it once
 * never saw it again, since the choice persisted in their browser.
 *
 * It is now the launch window and nothing else: no counter, no dismiss, no
 * trade link. So there is no state and no storage here, and this stays a
 * server component that ships no client JavaScript.
 */
export const LAUNCH_WINDOW = "spring 2027";

export function LaunchBanner() {
  return (
    /* No z-index. The sticky header sets z-40, which creates a stacking
       context, so the search overlay nested inside it can never paint above a
       sibling that claims a higher z — this bar used to punch straight through
       the open search panel. */
    <div className="relative bg-[linear-gradient(100deg,#35B2E6_0%,#4ABCEA_50%,#2693D8_100%)] text-charcoal">
      <div className="container-x flex items-center justify-center py-2.5 text-center text-[13px]">
        <p className="font-semibold uppercase tracking-[0.14em] text-charcoal">
          Launching {LAUNCH_WINDOW}
        </p>
      </div>
    </div>
  );
}
