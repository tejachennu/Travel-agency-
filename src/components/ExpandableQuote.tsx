"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/** Quote clamped to a fixed number of lines with a Read more toggle for long reviews. */
export function ExpandableQuote({ text, className, threshold = 200 }: { text: string; className?: string; threshold?: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const long = text.length > threshold;

  return (
    <div className={cn("flex-1", className)}>
      <blockquote id={id} className={cn("text-[0.97rem] leading-relaxed text-ink/80", long && !open && "line-clamp-6")}>
        “{text}”
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="mt-2 text-sm font-semibold text-teal-600 hover:text-teal-700"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
