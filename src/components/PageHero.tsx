import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { cn } from "@/lib/cn";
import { breadcrumbList, type Crumb } from "@/lib/schema";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

/** Dark hero used at the top of every inner page (keeps the transparent header legible). */
export function PageHero({ eyebrow, title, intro, image, crumbs, children, aside, className }: Props) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-brand-950 pt-36 pb-20 text-white sm:pt-44 sm:pb-28", className)}>
      {image && (
        <Image src={image} alt="" fill loading="eager" sizes="96px" className="-z-20 scale-110 object-cover opacity-45 blur-2xl" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/60 via-brand-950/80 to-brand-950" />
      <div className="absolute -top-32 -left-32 -z-10 size-[34rem] animate-aurora rounded-full bg-brand-600/40 blur-[120px]" />
      <div className="absolute -right-32 -bottom-40 -z-10 size-[30rem] animate-aurora rounded-full bg-teal-500/25 blur-[120px] [animation-delay:-8s]" />
      <div className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="grain absolute inset-0 -z-10" />
      {!aside && (
        <div aria-hidden className="pointer-events-none absolute top-1/2 right-[-6rem] -z-10 hidden h-[130%] w-[34rem] -translate-y-1/2 opacity-[0.06] lg:block">
          <Image src="/brand/mj-mark-white.png" alt="" fill sizes="544px" className="object-contain" />
        </div>
      )}

      <div className={cn("container-page", aside && "grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]")}>
        <div>
          {crumbs && <JsonLd data={breadcrumbList(crumbs)} />}
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {crumbs.map((c, i) => (
                <span key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5" />}
                  {c.href ? (
                    <Link href={c.href} className="transition hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-white/90" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
          <h1 className="mt-4 max-w-4xl font-display text-[2.75rem] leading-[1.02] font-medium tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
