"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DiaryCard } from "@/components/DiaryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { indiaDestinations } from "@/data/destinations";

export function IndiaDiaries() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-page flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="India holidays"
          title={
            <>
              Incredible India, <em className="text-gradient font-normal">lived by our travellers</em>
            </>
          }
          intro="Tea hills in Kerala, high passes in Spiti, Goa's beaches and Maharashtra's monsoon magic — straight from the diaries we share on Instagram."
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="grid size-12 place-items-center rounded-full bg-sand text-brand-700 ring-1 ring-sand-200 transition hover:bg-brand-600 hover:text-white"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="grid size-12 place-items-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-80rem)/2+2rem))] pb-4"
      >
        {indiaDestinations.map((d) => (
          <DiaryCard key={d.slug} destination={d} className="w-[78vw] max-w-[20rem] shrink-0 snap-start sm:w-[20rem]" />
        ))}
      </div>
    </section>
  );
}
