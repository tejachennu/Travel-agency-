import { Quote, Star } from "lucide-react";
import { ExpandableQuote } from "./ExpandableQuote";
import { GoogleIcon, InstagramIcon } from "./icons";
import type { Review } from "@/data/reviews";
import { cn } from "@/lib/cn";

const palette = ["#3d48b8", "#00a19b", "#e2475b", "#e8a23a", "#7b4bc4", "#2b6cb0"];

type Props = {
  review: Review;
  className?: string;
  /** Clamp long quotes behind a Read more toggle (used in the mobile carousel). */
  collapsible?: boolean;
};

export function ReviewCard({ review, className, collapsible = false }: Props) {
  const initials = review.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  const color = palette[review.name.length % palette.length];

  return (
    <figure className={cn("relative flex flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/[0.04]", className)}>
      <div className="flex items-center justify-between gap-3">
        <div role="img" className="flex gap-0.5 text-sun" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sand px-2.5 py-1 text-[0.7rem] font-semibold text-muted">
          {review.source === "Google review" ? <GoogleIcon size={13} /> : <InstagramIcon size={13} />}
          {review.source === "Google review" ? "Google" : "Instagram"}
        </span>
      </div>
      {collapsible ? (
        // Fixed minimum height keeps collapsed cards level; an expanded card grows on its own.
        <ExpandableQuote text={review.quote} className="mt-4 min-h-[11.25rem]" />
      ) : (
        <blockquote className="mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink/80">“{review.quote}”</blockquote>
      )}
      <figcaption className="mt-6 flex items-center gap-3 border-t border-sand-200 pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ background: color }}>
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-brand-900">{review.name}</p>
          <p className="truncate text-sm text-muted">{review.trip}</p>
        </div>
        <Quote className="size-7 shrink-0 text-brand-100" aria-hidden />
      </figcaption>
    </figure>
  );
}
