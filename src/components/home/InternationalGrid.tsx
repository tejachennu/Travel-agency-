import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { DestinationCard } from "@/components/DestinationCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppIcon } from "@/components/icons";
import { getDestination, type Destination } from "@/data/destinations";
import { whatsappLink } from "@/lib/whatsapp";

// Bento layout on large screens: [slug, grid classes]
const layout: [string, string][] = [
  ["dubai", "lg:col-span-2 lg:row-span-2"],
  ["maldives", "lg:col-span-2"],
  ["thailand", ""],
  ["singapore", ""],
  ["bali", "lg:col-span-2"],
  ["vietnam", ""],
  ["malaysia", ""],
  ["hong-kong", ""],
  ["nepal", ""],
  ["bhutan", ""],
];

export function InternationalGrid() {
  const items = layout
    .map(([slug, cls]) => [getDestination(slug), cls] as const)
    .filter((x): x is readonly [Destination, string] => Boolean(x[0]));

  return (
    <section id="international" className="bg-sand pb-24 sm:pb-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="International holiday packages"
            title={
              <>
                Breathtaking places, <em className="text-gradient font-normal">handpicked</em> for you
              </>
            }
            intro="Whether you seek adventure, luxury or relaxation — these destinations promise an unforgettable experience, with visas, flights and stays sorted."
          />
          <Reveal>
            <Link href="/destinations" className="btn btn-outline">
              All destinations <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[18rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4">
          {items.map(([d, cls], i) => (
            <Reveal key={d.slug} delay={(i % 4) * 0.06} className={cls}>
              <DestinationCard
                destination={d}
                size={cls.includes("row-span-2") ? "large" : "default"}
                className="h-full"
                sizes={cls.includes("col-span-2") ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw" : undefined}
              />
            </Reveal>
          ))}
          <Reveal delay={0.18}>
            <a
              href={whatsappLink("Hi MJ Holidays! I can't decide where to go — can you suggest a few holiday ideas for me?")}
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-brand-gradient p-6 text-white shadow-soft"
            >
              <div className="dot-grid absolute inset-0 opacity-50" />
              <Compass className="relative size-10 text-teal-200 transition-transform duration-700 group-hover:rotate-180" />
              <div className="relative">
                <h3 className="font-display text-2xl leading-tight font-medium">Can&apos;t decide where to go?</h3>
                <p className="mt-2 text-sm text-white/80">Tell us your budget and dates — we&apos;ll suggest the perfect fit.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                  <WhatsAppIcon size={16} /> Ask an expert
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
