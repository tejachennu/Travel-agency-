"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DestinationCard } from "./DestinationCard";
import { DiaryCard } from "./DiaryCard";
import type { Destination, Region } from "@/data/destinations";
import { cn } from "@/lib/cn";

const filters: { id: "all" | Region; label: string }[] = [
  { id: "all", label: "All trips" },
  { id: "international", label: "International" },
  { id: "india", label: "India" },
];

const groups: { id: Region; title: string; blurb: string }[] = [
  { id: "international", title: "International holidays", blurb: "Visas, flights and stays — sorted end to end." },
  { id: "india", title: "India diaries", blurb: "Straight from the trips we share on Instagram." },
];

export function DestinationExplorer({ destinations }: { destinations: Destination[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visible = groups.filter((g) => filter === "all" || g.id === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Filter destinations" className="inline-flex rounded-full bg-white p-1.5 shadow-soft ring-1 ring-black/[0.04]">
          {filters.map((f) => {
            const count = f.id === "all" ? destinations.length : destinations.filter((d) => d.region === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6",
                  filter === f.id ? "text-white" : "text-muted hover:text-brand-700",
                )}
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="dest-filter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-600 to-teal-500"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {f.label} <span className="opacity-60">({count})</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted">Every itinerary is fully customisable.</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-16"
        >
          {visible.map((g) => {
            const items = destinations.filter((d) => d.region === g.id);
            return (
              <div key={g.id} className="mt-12">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-sand-200 pb-4">
                  <h2 className="font-display text-3xl font-medium text-brand-900">{g.title}</h2>
                  <p className="text-sm text-muted">{g.blurb}</p>
                </div>
                {g.id === "international" ? (
                  <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((d) => (
                      <DestinationCard
                        key={d.slug}
                        destination={d}
                        className="h-[24rem]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((d) => (
                      <DiaryCard key={d.slug} destination={d} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
