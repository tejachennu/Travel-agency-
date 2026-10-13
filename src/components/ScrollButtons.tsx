"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

/** Prev/next buttons that scroll a horizontal track (found by id) — the only JS a carousel needs. */
export function ScrollButtons({ target }: { target: string }) {
  const scroll = (dir: 1 | -1) => {
    const el = document.getElementById(target);
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        aria-controls={target}
        className="grid size-12 place-items-center rounded-full bg-sand text-brand-700 ring-1 ring-sand-200 transition hover:bg-brand-600 hover:text-white"
      >
        <ArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        aria-controls={target}
        className="grid size-12 place-items-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700"
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}
