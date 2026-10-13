"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, Headphones, PlaneTakeoff, Star } from "lucide-react";
import { FlagCA, FlagIN, WhatsAppIcon } from "@/components/icons";
import { EnquiryBar } from "./EnquiryBar";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";

const slides = [
  { src: "/images/destinations/maldives.webp", name: "Maldives", note: "Overwater villas", slug: "maldives" },
  { src: "/images/destinations/kerala.webp", name: "Kerala", note: "God's Own Country", slug: "kerala" },
  { src: "/images/destinations/dubai.webp", name: "Dubai", note: "City of dreams", slug: "dubai" },
  { src: "/images/destinations/thailand.webp", name: "Thailand", note: "Golden temples", slug: "thailand" },
  { src: "/images/destinations/singapore.webp", name: "Singapore", note: "Gardens by the Bay", slug: "singapore" },
  { src: "/images/destinations/vietnam.webp", name: "Vietnam", note: "The Golden Bridge", slug: "vietnam" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 4800);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = slides[index];
  const next = slides[(index + 1) % slides.length];
  const after = slides[(index + 2) % slides.length];

  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pb-28 text-white sm:pb-32">
      {/* Ambient background that follows the active postcard */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.42 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0 -z-20"
        >
          <Image src={current.src} alt="" fill sizes="100vw" className="scale-110 object-cover blur-2xl" priority={index === 0} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/70 via-brand-950/80 to-brand-950" />
      <div className="absolute -top-40 -left-40 -z-10 size-[42rem] animate-aurora rounded-full bg-brand-600/50 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 -z-10 size-[36rem] animate-aurora rounded-full bg-teal-500/30 blur-[120px] [animation-delay:-6s]" />
      <div className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="grain absolute inset-0 -z-10" />

      {/* Flight path */}
      <svg
        aria-hidden
        viewBox="0 0 800 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden h-full w-[58%] opacity-60 lg:block"
      >
        <path
          id="hero-route"
          d="M0 880 C 160 830, 250 720, 300 560 S 520 150, 820 40"
          fill="none"
          stroke="url(#route-grad)"
          strokeWidth="1.5"
          strokeDasharray="6 14"
          className="animate-dash"
        />
        <defs>
          <linearGradient id="route-grad" x1="0" x2="1">
            <stop offset="0" stopColor="#6370d4" stopOpacity="0" />
            <stop offset="0.4" stopColor="#8f98e2" />
            <stop offset="1" stopColor="#52cdc5" />
          </linearGradient>
        </defs>
        <g fill="#c5efec">
          <path d="M0 -6 L16 0 L0 6 L4 0 Z">
            <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
              <mpath href="#hero-route" />
            </animateMotion>
          </path>
        </g>
      </svg>

      <div className="container-page relative grid items-center gap-14 pt-32 sm:pt-40 lg:grid-cols-12 lg:gap-8 lg:pt-44">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-3 rounded-full bg-white/[0.07] py-1.5 pr-4 pl-1.5 text-sm text-white/80 ring-1 ring-white/15 backdrop-blur"
          >
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
              <FlagIN size={14} />
              <FlagCA size={14} />
            </span>
            Gandhinagar · Canada · Worldwide
          </motion.div>

          <h1 className="mt-7 font-display text-[3.1rem] leading-[0.98] font-medium tracking-tight sm:text-7xl xl:text-[5.6rem]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Discover your
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <em className="text-gradient-light pr-2 font-normal">world,</em>
            </motion.span>
            <motion.span
              className="block text-white/90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              perfectly planned.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/75"
          >
            From Bali pool villas to Kerala houseboats — we plan tailor-made holidays, book your flights and hotels, and
            take care of passport, visa &amp; OCI paperwork. One team, from the first idea to the final stamp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href={whatsappLink(defaultEnquiry)} target="_blank" rel="noreferrer" className="btn btn-primary">
              <WhatsAppIcon size={18} /> Plan my trip
            </a>
            <Link href="/destinations" className="btn btn-ghost-light">
              Explore destinations <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-white/70"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["R", "K", "A", "P"].map((l, i) => (
                  <span
                    key={l}
                    className="grid size-9 place-items-center rounded-full text-xs font-bold text-white ring-2 ring-brand-950"
                    style={{ background: ["#3d48b8", "#00a19b", "#e2475b", "#e8a23a"][i] }}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-sun">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-0.5 text-xs">5-star reviews from Dubai, Bali, Kerala &amp; more</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="size-5 text-teal-300" /> 24/7 support on WhatsApp
            </div>
          </motion.div>
        </div>

        {/* Postcard stack */}
        <div
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:col-span-5 lg:max-w-none lg:pl-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto aspect-[4/5] w-[82%] lg:w-[80%]">
            {/* back cards */}
            <div className="absolute inset-0 translate-x-8 translate-y-3 rotate-[8deg] rounded-[1.75rem] bg-white/90 p-2.5 opacity-70 shadow-lift">
              <div className="relative h-full overflow-hidden rounded-[1.25rem]">
                <Image src={after.src} alt="" fill sizes="320px" className="object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 -translate-x-6 translate-y-1 -rotate-[6deg] rounded-[1.75rem] bg-white/95 p-2.5 opacity-90 shadow-lift">
              <div className="relative h-full overflow-hidden rounded-[1.25rem]">
                <Image src={next.src} alt="" fill sizes="320px" className="object-cover" />
              </div>
            </div>

            {/* front card */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.9, rotate: -6, x: -24 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                exit={{ opacity: 0, x: 140, rotate: 14, scale: 0.95 }}
                transition={{ duration: 0.75, ease }}
                className="absolute inset-0 rounded-[1.75rem] bg-white p-2.5 pb-16 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.6)]"
              >
                <Link href={`/destinations/${current.slug}`} className="group relative block h-full overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={current.src}
                    alt={`${current.name} — ${current.note}`}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 400px, 80vw"
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </Link>
                <div className="absolute inset-x-5 bottom-3 flex items-end justify-between text-ink">
                  <div>
                    <p className="font-script text-[2rem] leading-none text-brand-700">{current.name}</p>
                    <p className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">{current.note}</p>
                  </div>
                  <span className="mb-1 rounded-full bg-teal-50 px-3 py-1 text-[0.7rem] font-semibold text-teal-700">
                    MJ Holidays
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* floating chips */}
            <div className="absolute top-10 -left-10 z-10 hidden animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 text-ink shadow-lift backdrop-blur sm:flex lg:-left-16">
              <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <PlaneTakeoff className="size-5" />
              </span>
              <div className="text-xs">
                <p className="font-semibold">AMD → DXB</p>
                <p className="text-muted">Flights booked</p>
              </div>
            </div>
            <div className="absolute -right-6 bottom-24 z-10 hidden animate-float-delayed items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 text-ink shadow-lift backdrop-blur sm:flex lg:-right-10">
              <span className="grid size-9 place-items-center rounded-xl bg-teal-50 text-teal-600">
                <BadgeCheck className="size-5" />
              </span>
              <div className="text-xs">
                <p className="font-semibold">Visa approved</p>
                <p className="text-muted">Docs handled for you</p>
              </div>
            </div>
          </div>

          {/* slide indicators */}
          <div className="mt-10 flex items-center justify-center gap-2" role="tablist" aria-label="Featured destinations">
            {slides.map((s, i) => (
              <button
                key={s.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.name}
                onClick={() => setIndex(i)}
                className="group relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-all"
                style={{ width: i === index ? 36 : 12 }}
              >
                {i === index && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-300 to-teal-300"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: paused ? 0 : 4.8, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page relative mt-16 lg:mt-20">
        <EnquiryBar />
      </div>
    </section>
  );
}
