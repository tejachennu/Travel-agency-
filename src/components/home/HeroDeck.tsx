"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, MoveHorizontal, PlaneTakeoff } from "lucide-react";
import { cn } from "@/lib/cn";

export type DeckSlide = { src: string; name: string; note: string; slug: string };
export type PauseReason = "hover" | "focus" | "drag";

type Props = {
  slides: DeckSlide[];
  index: number;
  /** +1 when moving forward, -1 when going back, 0 on first render. */
  direction: number;
  paused: boolean;
  interval: number;
  onPaginate: (dir: 1 | -1) => void;
  onSelect: (i: number) => void;
  onPause: (reason: PauseReason, active: boolean) => void;
};

// Resting pose of each card in the stack, front (0) to back (2).
const depthPose = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: -26, y: 6, rotate: -6, scale: 0.95, opacity: 1 },
  { x: 30, y: 12, rotate: 7, scale: 0.9, opacity: 0.8 },
];

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 450;
const ease = [0.22, 1, 0.36, 1] as const;

// Forward: the front card is thrown left and a new card fades in at the back.
// Back: the previous card returns from the left and the back card fades away.
const variants = {
  enter: (dir: number) =>
    dir < 0 ? { x: -460, y: 0, rotate: -16, scale: 1, opacity: 0 } : { x: 30, y: 40, rotate: 7, scale: 0.8, opacity: 0 },
  exit: (dir: number) =>
    dir > 0
      ? { x: -460, rotate: -16, opacity: 0, transition: { duration: 0.45, ease } }
      : { scale: 0.8, y: 40, opacity: 0, transition: { duration: 0.3 } },
};

export function HeroDeck({ slides, index, direction, paused, interval, onPaginate, onSelect, onPause }: Props) {
  const n = slides.length;
  const stack = [0, 1, 2].map((d) => ({ depth: d, slide: slides[(index + d) % n] }));

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onPaginate(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onPaginate(-1);
    }
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured destinations"
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:col-span-5 lg:max-w-none lg:pl-6"
      // Only a real mouse pauses on hover — touch screens never send a matching "leave".
      onPointerEnter={(e) => e.pointerType === "mouse" && onPause("hover", true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onPause("hover", false)}
      onFocus={() => onPause("focus", true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onPause("focus", false);
      }}
      onKeyDown={onKeyDown}
    >
      <div className="relative mx-auto aspect-[4/5] w-[82%] lg:w-[80%]">
        <AnimatePresence initial={false} custom={direction}>
          {stack
            .slice()
            .reverse()
            .map(({ depth, slide }) => (
              <DeckCard
                key={slide.src}
                slide={slide}
                depth={depth}
                direction={direction}
                priority={depth === 0 && index === 0}
                onSwipe={onPaginate}
                onDragStateChange={(dragging) => onPause("drag", dragging)}
              />
            ))}
        </AnimatePresence>

        {/* floating chips */}
        <div className="pointer-events-none absolute top-10 -left-10 z-10 hidden animate-float items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 text-ink shadow-lift backdrop-blur sm:flex lg:-left-16">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <PlaneTakeoff className="size-5" />
          </span>
          <div className="text-xs">
            <p className="font-semibold">AMD → DXB</p>
            <p className="text-muted">Flights booked</p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-6 bottom-24 z-10 hidden animate-float-delayed items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 text-ink shadow-lift backdrop-blur sm:flex lg:-right-10">
          <span className="grid size-9 place-items-center rounded-xl bg-teal-50 text-teal-600">
            <BadgeCheck className="size-5" />
          </span>
          <div className="text-xs">
            <p className="font-semibold">Visa approved</p>
            <p className="text-muted">Docs handled for you</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => onPaginate(-1)}
          aria-label="Previous destination"
          className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.name}
              type="button"
              aria-label={`Show ${s.name}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => onSelect(i)}
              className="relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-all duration-300"
              style={{ width: i === index ? 36 : 12 }}
            >
              {i === index && (
                <motion.span
                  key={`${index}-${paused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-300 to-teal-300"
                  initial={{ width: paused ? "100%" : "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: paused ? 0 : interval / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onPaginate(1)}
          aria-label="Next destination"
          className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-white/55">
        <MoveHorizontal className="size-4 animate-[nudge_2.4s_ease-in-out_infinite]" aria-hidden />
        <span className="sm:hidden">Swipe the cards to explore</span>
        <span className="hidden sm:inline">Drag the cards or use the arrows</span>
      </p>
      <p className="sr-only" aria-live={paused ? "polite" : "off"} aria-atomic="true">
        {slides[index].name}, {index + 1} of {n}
      </p>
    </div>
  );
}

type CardProps = {
  slide: DeckSlide;
  depth: number;
  direction: number;
  priority: boolean;
  onSwipe: (dir: 1 | -1) => void;
  onDragStateChange: (dragging: boolean) => void;
};

function DeckCard({ slide, depth, direction, priority, onSwipe, onDragStateChange }: CardProps) {
  const isTop = depth === 0;
  // Drag offset lives on an inner layer so it never fights the stack pose animation.
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-260, 0, 260], [-14, 0, 14]);
  const dragged = useRef(false);

  function handleDragEnd(_: unknown, info: PanInfo) {
    onDragStateChange(false);
    const { offset, velocity } = info;
    const swipedLeft = offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY;
    const swipedRight = offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY;
    if (swipedLeft) {
      // Keep the offset: the exit animation carries the card on from where it was let go.
      onSwipe(1);
      return;
    }
    animate(dragX, 0, { type: "spring", stiffness: 420, damping: 32 });
    if (swipedRight) onSwipe(-1);
  }

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate={depthPose[depth]}
      exit="exit"
      transition={{ duration: 0.6, ease }}
      className="absolute inset-0"
      style={{ zIndex: 3 - depth }}
      aria-hidden={!isTop}
    >
      <motion.div
        drag={isTop ? "x" : false}
        dragMomentum={false}
        dragElastic={0.9}
        onDragStart={() => {
          dragged.current = true;
          onDragStateChange(true);
        }}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.03 }}
        style={{ x: dragX, rotate: dragRotate }}
        className={cn(
          "relative h-full rounded-[1.75rem] bg-white p-2.5 pb-16",
          isTop ? "cursor-grab shadow-[0_40px_80px_-24px_rgb(0_0_0/0.6)] active:cursor-grabbing" : "shadow-lift",
        )}
      >
        <Link
          href={`/destinations/${slide.slug}`}
          draggable={false}
          tabIndex={isTop ? 0 : -1}
          onPointerDown={() => {
            dragged.current = false;
          }}
          onClick={(e) => {
            // A drag that ends over the card must not count as a click.
            if (dragged.current) e.preventDefault();
          }}
          className="group relative block h-full overflow-hidden rounded-[1.25rem]"
        >
          <Image
            src={slide.src}
            alt={isTop ? `${slide.name} — ${slide.note}` : ""}
            fill
            draggable={false}
            priority={priority}
            sizes="(min-width: 1024px) 400px, 80vw"
            className="pointer-events-none object-cover transition-transform duration-[2s] select-none group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute inset-x-5 bottom-3 flex items-end justify-between text-ink">
          <div>
            <p className="font-script text-[2rem] leading-none text-brand-700">{slide.name}</p>
            <p className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">{slide.note}</p>
          </div>
          <span className="mb-1 rounded-full bg-teal-50 px-3 py-1 text-[0.7rem] font-semibold text-teal-700">MJ Holidays</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
