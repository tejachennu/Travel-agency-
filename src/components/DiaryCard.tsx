import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { postImage } from "@/data/instagram";
import { cn } from "@/lib/cn";

/** India trips shown as their Instagram "diary" poster, with the title underneath. */
export function DiaryCard({ destination: d, className }: { destination: Destination; className?: string }) {
  const post = d.posts?.[0];
  return (
    <Link href={`/destinations/${d.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand shadow-soft ring-1 ring-black/5">
        <Image
          src={post ? postImage(post) : d.image}
          alt={post ? `${d.name} trip poster from @mj_holidays_india` : d.imageAlt}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 80vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!post && (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-950/85 via-transparent to-transparent p-6 text-white">
            <p className="font-script text-4xl leading-none">{d.name}</p>
            <p className="mt-1 text-sm text-white/80">{d.tagline}</p>
          </div>
        )}
        <span className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/90 text-brand-700 opacity-0 shadow transition group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <h3 className="font-display text-2xl font-medium text-brand-900">{d.name}</h3>
          <p className="text-sm text-muted">{d.tagline}</p>
        </div>
        <span className="mt-1 shrink-0 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">{d.duration}</span>
      </div>
    </Link>
  );
}
