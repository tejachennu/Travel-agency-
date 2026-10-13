import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatINR, type Destination } from "@/data/destinations";
import { cn } from "@/lib/cn";

type Props = {
  destination: Destination;
  className?: string;
  size?: "default" | "large";
  sizes?: string;
};

/** Photo card with overlaid title — used in grids of destinations. */
export function DestinationCard({ destination: d, className, size = "default", sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" }: Props) {
  const large = size === "large";
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-[1.75rem] bg-brand-900 p-5 text-white shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-6",
        className,
      )}
    >
      <Image
        src={d.image}
        alt={d.imageAlt}
        fill
        sizes={sizes}
        className="-z-20 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent transition-opacity duration-500 group-hover:from-brand-950/95" />

      <div className="absolute top-4 left-4 flex flex-wrap gap-2 sm:top-5 sm:left-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
          <Clock className="size-3.5" /> {d.duration}
        </span>
        {d.price && (
          <span className="inline-flex items-center rounded-full bg-coral px-3 py-1.5 text-xs font-bold shadow-lg">
            from {formatINR(d.price.amount)}
          </span>
        )}
      </div>
      <span className="absolute top-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-brand-700 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:top-5 sm:right-5">
        <ArrowUpRight className="size-5" />
      </span>

      <p className="text-xs font-semibold tracking-[0.16em] text-teal-200 uppercase">{d.country}</p>
      <h3 className={cn("mt-1 font-display font-medium tracking-tight", large ? "text-4xl sm:text-5xl" : "text-3xl")}>{d.name}</h3>
      {large && <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-white/80 lg:block">{d.summary}</p>}
      <p
        className={cn(
          "mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-white/80",
          large
            ? "lg:hidden"
            : "sm:max-h-0 sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:max-h-16 sm:group-hover:opacity-100",
        )}
      >
        {d.tagline}
      </p>
    </Link>
  );
}
