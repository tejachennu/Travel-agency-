"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GoogleIcon, InstagramIcon } from "@/components/icons";
import { ReviewCard } from "@/components/ReviewCard";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

const GAP = 16;

/** Swipeable, snap-scrolling review cards for small screens. */
export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = reviews.length;

  const measure = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    const i = atEnd ? n - 1 : Math.round(el.scrollLeft / (first.offsetWidth + GAP));
    setActive(Math.max(0, Math.min(n - 1, i)));
  }, [n]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [measure]);

  function goTo(i: number) {
    const el = track.current;
    const card = el?.children[Math.max(0, Math.min(n - 1, i))] as HTMLElement | undefined;
    if (!el || !card) return;
    // The track is `relative`, so offsetLeft is measured from its padding edge.
    el.scrollTo({ left: card.offsetLeft - GAP, behavior: "smooth" });
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Traveller reviews">
      <div className="container-page">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 shadow-soft ring-1 ring-black/[0.04]">
          <span className="flex gap-0.5 text-sun" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </span>
          <span className="text-xs font-semibold text-brand-900">{n} five-star reviews</span>
          <span className="flex items-center gap-1" aria-label="from Google and Instagram">
            <GoogleIcon size={13} />
            <InstagramIcon size={13} className="text-[#dd2a7b]" />
          </span>
        </div>
      </div>

      <div
        ref={track}
        className="scrollbar-none relative mt-6 flex snap-x snap-mandatory items-start gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pt-1 pb-4 scroll-px-4"
      >
        {reviews.map((r, i) => (
          <div
            key={r.name}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${n}`}
            className="w-[86%] max-w-[22rem] shrink-0 snap-start"
          >
            <ReviewCard review={r} collapsible className="p-6" />
          </div>
        ))}
      </div>

      <div className="container-page mt-2 flex items-center justify-between gap-4">
        <p className="w-14 font-display text-sm text-muted tabular-nums" aria-live="polite">
          <span className="text-lg font-semibold text-brand-800">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-1.5">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show review ${i + 1} of ${n}`}
              aria-current={i === active ? "true" : undefined}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-gradient-to-r from-brand-500 to-teal-400" : "w-1.5 bg-brand-200",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous review"
            className="grid size-10 place-items-center rounded-full bg-white text-brand-700 shadow-soft ring-1 ring-black/[0.04] transition disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === n - 1}
            aria-label="Next review"
            className="grid size-10 place-items-center rounded-full bg-brand-600 text-white shadow-soft transition disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
