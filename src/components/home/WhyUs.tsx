import Image from "next/image";
import { Headphones, Map as MapIcon, Sparkles, Wallet } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { destinations } from "@/data/destinations";

const features = [
  {
    icon: MapIcon,
    title: "Well-planned itineraries",
    body: "Personalised day-by-day plans built around your pace, preferences and budget.",
  },
  {
    icon: Sparkles,
    title: "Handpicked experiences",
    body: "Hotels, guides and tours we've vetted ourselves — from Marriott stays to private-pool villas.",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    body: "A real person on WhatsApp throughout your trip, checking you've reached safely.",
  },
  {
    icon: Wallet,
    title: "Best deals, no surprises",
    body: "Competitive prices and exclusive offers, with every inclusion spelled out up front.",
  },
];

const stats = [
  { value: destinations.length, suffix: "", label: "Destinations across India & abroad" },
  { value: 2, suffix: "", label: "Offices — Gandhinagar & Canada" },
  { value: 24, suffix: "/7", label: "WhatsApp support while you travel" },
  { value: 100, suffix: "%", label: "Tailor-made, never off-the-shelf" },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="dot-grid-dark pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">
        {/* Collage */}
        <Reveal className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="/images/destinations/kerala-lakes.webp"
              alt="Lakes and green hills seen from above in Kerala"
              fill
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover object-[50%_60%]"
            />
          </div>
          <div className="absolute -bottom-10 -left-4 w-[46%] rotate-[-5deg] rounded-2xl bg-white p-2 shadow-lift sm:-left-10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image src="/images/lifestyle/map-wallet.webp" alt="Map, passport wallet and pen laid out for trip planning" fill sizes="240px" className="object-cover" />
            </div>
            <p className="px-1 pt-2 pb-1 font-script text-xl text-brand-700">Planned to the last detail</p>
          </div>
          <div className="absolute -top-6 -right-2 rounded-2xl bg-white px-5 py-4 shadow-lift sm:-right-8">
            <p className="font-display text-4xl font-semibold text-brand-700">
              <CountUp to={destinations.length} />
            </p>
            <p className="text-xs font-medium text-muted">handpicked destinations</p>
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow">Expertly crafted travel</span>
            <h2 className="mt-4 font-display text-[2.1rem] leading-[1.08] font-medium tracking-tight text-brand-900 sm:text-5xl">
              Travel with ease. <em className="text-gradient font-normal">We handle the details.</em>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              At MJ Holidays we turn travel dreams into well-run trips. Our travel experts plan, book and stay on call — so
              all you have to do is pack, show up and make memories.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="group card p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-teal-50 text-brand-600 transition group-hover:from-brand-600 group-hover:to-teal-500 group-hover:text-white">
                  <f.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-900">{f.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page relative mt-24">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-sand-200 ring-1 ring-sand-200 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8 text-center">
              <p className="font-display text-5xl font-medium text-gradient">
                <CountUp to={s.value} suffix={s.suffix} />
              </p>
              <p className="mx-auto mt-2 max-w-[14rem] text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
