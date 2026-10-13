"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, motionValue, useMotionValueEvent, type MotionValue } from "motion/react";
import { ArrowRight, Headphones, Star } from "lucide-react";
import { FlagCA, FlagIN, WhatsAppIcon } from "@/components/icons";
import { EnquiryBar } from "./EnquiryBar";
import { HeroDeck, type DeckSlide } from "./HeroDeck";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";

const slides: DeckSlide[] = [
  { src: "/images/destinations/maldives.webp", name: "Maldives", note: "Overwater villas", slug: "maldives" },
  { src: "/images/destinations/kerala.webp", name: "Kerala", note: "God's Own Country", slug: "kerala" },
  { src: "/images/destinations/dubai.webp", name: "Dubai", note: "City of dreams", slug: "dubai" },
  { src: "/images/destinations/thailand.webp", name: "Thailand", note: "Golden temples", slug: "thailand" },
  { src: "/images/destinations/singapore.webp", name: "Singapore", note: "Gardens by the Bay", slug: "singapore" },
  { src: "/images/destinations/vietnam.webp", name: "Vietnam", note: "The Golden Bridge", slug: "vietnam" },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Delay the backdrop crossfade until the swipe has had its first frames to itself.
const BACKDROP_DELAY_MS = 350;

export function Hero() {
  // The deck owns the gestures and writes the front card here; only the backdrop listens.
  const [active] = useState(() => motionValue(0));

  return (
    <section className="relative isolate overflow-hidden bg-brand-950 pb-28 text-white sm:pb-32">
      {/* Ambient background that follows the active postcard */}
      <HeroBackdrop active={active} />
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
            Travel agency in Gandhinagar · Canada
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

        {/* Swipeable postcard deck */}
        <HeroDeck slides={slides} active={active} />
      </div>

      <div className="container-page relative mt-16 lg:mt-20">
        <EnquiryBar />
      </div>
    </section>
  );
}

/** Blurred photo of the front card behind the hero. Re-renders on its own, after the swipe is under way. */
function HeroBackdrop({ active }: { active: MotionValue<number> }) {
  const [index, setIndex] = useState(() => active.get());
  const [target, setTarget] = useState(index);
  useMotionValueEvent(active, "change", setTarget);
  useEffect(() => {
    if (target === index) return;
    const id = window.setTimeout(() => setIndex(target), BACKDROP_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [target, index]);

  const src = slides[index].src;
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.42 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-0 -z-20 will-change-[opacity]"
      >
        {/* Heavily blurred, so a tiny source looks identical and is far cheaper to decode and fade. */}
        <Image src={src} alt="" fill sizes="96px" loading="eager" className="scale-110 object-cover blur-2xl" />
      </motion.div>
    </AnimatePresence>
  );
}
