import { Quote, Star } from "lucide-react";
import { GoogleIcon, InstagramIcon } from "./icons";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

const palette = ["#3d48b8", "#00a19b", "#e2475b", "#e8a23a", "#7b4bc4", "#2b6cb0"];

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  const initials = review.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  const color = palette[review.name.length % palette.length];

  return (
    <figure className={cn("relative flex flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/[0.04]", className)}>
      <Quote className="absolute top-6 right-6 size-9 text-brand-100" aria-hidden />
      <div className="flex gap-0.5 text-sun" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink/80">“{review.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-200 pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ background: color }}>
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-brand-900">{review.name}</p>
          <p className="truncate text-sm text-muted">{review.trip}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sand px-2.5 py-1 text-[0.7rem] font-semibold text-muted">
          {review.source === "Google review" ? <GoogleIcon size={13} /> : <InstagramIcon size={13} />}
          {review.source === "Google review" ? "Google" : "Instagram"}
        </span>
      </figcaption>
    </figure>
  );
}
