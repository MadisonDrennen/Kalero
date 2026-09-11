"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { formatActualSize, formatSize, type FilterSize } from "@/lib/sizes";

type Props = {
  sizes: FilterSize[];
  /** Slug of the chosen catalogue size, or null while a custom size is in use. */
  value: string | null;
  onChange: (size: FilterSize) => void;
  /** Shown in the trigger when the customer typed their own dimensions. */
  customLabel?: string | null;
  labelledBy?: string;
};

/**
 * Size picker with search. KALERO will carry far more sizes than a dropdown can
 * be scanned for, and a native <select> can't be typed into, so this is the
 * listbox pattern: a trigger, a filter field, and arrow-key navigation.
 */
export function SizeCombobox({
  sizes,
  value,
  onChange,
  customLabel,
  labelledBy,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const selected = useMemo(
    () => sizes.find((s) => s.slug === value) ?? null,
    [sizes, value],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/[\s×x]+/g, "");
    if (!q) return sizes;
    return sizes.filter((s) =>
      `${s.nominalWidth}${s.nominalHeight}${s.nominalDepth}`.includes(q),
    );
  }, [sizes, query]);

  // Open on the current choice, so the list starts where the customer left off.
  useEffect(() => {
    if (!open) return;
    const i = results.findIndex((s) => s.slug === value);
    setActive(i >= 0 ? i : 0);
    inputRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (active >= results.length) setActive(0);
  }, [results, active]);

  // Keep the highlighted row visible while arrowing through a long list.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (s: FilterSize) => {
    onChange(s);
    setOpen(false);
    setQuery("");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const s = results[active];
      if (s) choose(s);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  const triggerLabel = selected
    ? formatSize(selected)
    : (customLabel ?? "Select a size");

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelledBy}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 text-left transition-colors ${
          open
            ? "border-sky-400 ring-2 ring-sky-400/30"
            : "border-[#E8EEF3] hover:border-sky-300"
        }`}
        style={{ minHeight: 52 }}
      >
        <span className="min-w-0">
          <span className="block font-display text-base font-semibold text-charcoal">
            {triggerLabel}
          </span>
          {selected && formatActualSize(selected) && (
            <span className="block text-[11px] text-charcoal-mid">
              Actual {formatActualSize(selected)}&Prime;
            </span>
          )}
        </span>
        <ChevronDown
          size={18}
          strokeWidth={2}
          className={`shrink-0 text-charcoal-mid transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-2xl border border-[#E8EEF3] bg-white shadow-card">
          <div className="flex items-center gap-2 border-b border-[#E8EEF3] px-3.5 py-2.5">
            <Search size={15} className="shrink-0 text-charcoal-light" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={open}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-label="Search filter sizes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search sizes, e.g. 20x25"
              className="w-full bg-transparent py-1 text-sm text-charcoal placeholder:text-charcoal-light focus:outline-none"
            />
          </div>
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Filter sizes"
            className="max-h-64 overflow-y-auto py-1"
          >
            {results.length === 0 && (
              <li className="px-4 py-3 text-sm text-charcoal-mid">
                No catalogue size matches that. Try a custom size below.
              </li>
            )}
            {results.map((s, i) => {
              const isSelected = s.slug === value;
              return (
                <li key={s.slug}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    data-index={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => choose(s)}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      i === active ? "bg-sky-50" : "bg-white"
                    }`}
                  >
                    <span
                      className={
                        isSelected
                          ? "font-semibold text-charcoal"
                          : "text-charcoal"
                      }
                    >
                      {formatSize(s)}
                    </span>
                    <span className="flex items-center gap-2">
                      {s.popular && !isSelected && (
                        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-charcoal-light">
                          Popular
                        </span>
                      )}
                      {isSelected && (
                        <Check size={15} strokeWidth={2.5} className="text-sky-600" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
