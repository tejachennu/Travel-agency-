"use client";

import Image from "next/image";
import Link from "next/link";
import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  animate,
  motion,
  motionValue,
  useDragControls,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, MoveHorizontal, PlaneTakeoff } from "lucide-react";
import { cn } from "@/lib/cn";

export type DeckSlide = { src: string; name: string; note: string; slug: string };
type PauseReason = "hover" | "focus" | "drag";
type Pose = { x: number; y: number; rotate: number; scale: number; opacity: number };

// Resting pose of each visible card, front (0) to back (2). The others wait, invisible, behind the deck.
const POSES: Pose[] = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: -26, y: 6, rotate: -6, scale: 0.95, opacity: 1 },
  { x: 30, y: 12, rotate: 7, scale: 0.9, opacity: 0.85 },
];
const HIDDEN: Pose = { x: 30, y: 26, rotate: 7, scale: 0.82, opacity: 0 };

// One spring drives every pose change so the stack moves as a single system.
const SPRING = { type: "spring", stiffness: 260, damping: 30, mass: 0.9, restDelta: 0.01 } as const;
const FADE = { duration: 0.28, ease: "easeOut" } as const;
const SNAP_BACK = { type: "spring", stiffness: 500, damping: 34 } as const;

const AUTOPLAY_MS = 4800;
const THROW_DISTANCE = 460; // how far a dismissed card travels while it fades
const SWIPE_DISTANCE = 70; // px of drag that commits a swipe…
const SWIPE_VELOCITY = 450; // …or px/s of flick
const LIFT_DISTANCE = 160; // drag needed for the next card to fully rise

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const poseFor = (depth: number) => POSES[depth] ?? HIDDEN;

/** Every animated property of a card, as motion values driven directly — never through React renders. */
type CardValues = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  zIndex: MotionValue<number>;
  pointerEvents: MotionValue<string>;
  offset: MotionValue<number>; // drag / throw
  lift: MotionValue<number>; // 0..1, how far this card has risen towards the front
};

function createCard(depth: number, n: number): CardValues {
  const p = poseFor(depth);
  return {
    x: motionValue(p.x),
    y: motionValue(p.y),
    rotate: motionValue(p.rotate),
    scale: motionValue(p.scale),
    opacity: motionValue(p.opacity),
    zIndex: motionValue(n - depth),
    pointerEvents: motionValue(depth < POSES.length ? "auto" : "none"),
    offset: motionValue(0),
    lift: motionValue(0),
  };
}

type Props = {
  slides: DeckSlide[];
  /** Receives the front card's index, so the hero backdrop can follow without re-rendering the hero. */
  active?: MotionValue<number>;
};

export function HeroDeck({ slides, active }: Props) {
  const n = slides.length;
  const reduceMotion = useReducedMotion();

  // React state only feeds the dots and screen-reader text; gestures and poses bypass it entirely.
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const [cards] = useState(() => slides.map((_, i) => createCard(i, slides.length)));
  const [progress] = useState(() => motionValue(0)); // autoplay progress for the active dot
  const indexRef = useRef(0);
  const flying = useRef(new Set<number>());
  const throwIds = useRef(slides.map(() => 0));
  const pauses = useRef<Record<PauseReason, boolean>>({ hover: false, focus: false, drag: false });
  const timer = useRef<number | undefined>(undefined);
  const progressAnim = useRef<AnimationPlaybackControls | null>(null);
  const reduceRef = useRef(reduceMotion);
  const nextRef = useRef<(velocity?: number) => void>(() => {});

  const isPaused = () => pauses.current.hover || pauses.current.focus || pauses.current.drag;

  /** Send every card to the pose for its depth on the shared spring. */
  const settle = useCallback(() => {
    const top = indexRef.current;
    cards.forEach((c, i) => {
      const depth = (i - top + n) % n;
      const p = poseFor(depth);
      animate(c.x, p.x, SPRING);
      animate(c.y, p.y, SPRING);
      animate(c.rotate, p.rotate, SPRING);
      animate(c.scale, p.scale, SPRING);
      animate(c.opacity, p.opacity, FADE);
      c.pointerEvents.set(depth < POSES.length ? "auto" : "none");
      if (!flying.current.has(i)) c.zIndex.set(n - depth);
    });
  }, [cards, n]);

  /** Restart (or stop) the autoplay timer and its progress bar. */
  const schedule = useCallback(() => {
    window.clearTimeout(timer.current);
    progressAnim.current?.stop();
    if (isPaused() || reduceRef.current) {
      progress.set(1);
      return;
    }
    progress.set(0);
    progressAnim.current = animate(progress, 1, { duration: AUTOPLAY_MS / 1000, ease: "linear" });
    timer.current = window.setTimeout(() => nextRef.current(-700), AUTOPLAY_MS);
  }, [progress]);

  const commit = useCallback(
    (i: number) => {
      indexRef.current = i;
      active?.set(i);
      settle();
      schedule();
      // Low priority: the animation is already running before React touches the dots.
      startTransition(() => setIndex(i));
    },
    [active, settle, schedule],
  );

  const setPause = useCallback(
    (reason: PauseReason, on: boolean) => {
      if (pauses.current[reason] === on) return;
      const was = isPaused();
      pauses.current[reason] = on;
      if (isPaused() === was) return;
      schedule();
      startTransition(() => setPaused(isPaused()));
    },
    [schedule],
  );

  const next = useCallback(
    (velocity = -900) => {
      const top = indexRef.current;
      const below = (top + 1) % n;
      const card = cards[top];
      const id = ++throwIds.current[top];
      flying.current.add(top);
      card.zIndex.set(n + 10); // stay above the stack while flying away
      // Carry the finger's speed into the throw; buttons and autoplay use a gentle default.
      animate(card.offset, -THROW_DISTANCE, {
        type: "spring",
        stiffness: 180,
        damping: 26,
        velocity: Math.min(velocity, -700),
        restDelta: 1,
      }).then(() => {
        if (throwIds.current[top] !== id) return;
        flying.current.delete(top);
        card.offset.jump(0);
        card.zIndex.set(n - ((top - indexRef.current + n) % n));
      });
      // The card underneath was already rising with the drag; finish on the shared spring.
      animate(cards[below].lift, 0, SPRING);
      commit(below);
    },
    [cards, n, commit],
  );

  const prev = useCallback(
    (velocity = 900) => {
      const top = indexRef.current;
      const target = (top - 1 + n) % n;
      const card = cards[target];
      throwIds.current[target]++; // cancel any pending reset from an earlier throw
      flying.current.delete(target);
      // A card at rest waits invisibly behind the deck: start it off to the left so it slides in with the finger.
      if (Math.abs(card.offset.get()) < 1) card.offset.jump(-THROW_DISTANCE);
      animate(card.offset, 0, { ...SPRING, velocity: Math.max(velocity, 700) });
      animate(cards[top].offset, 0, SPRING);
      animate(cards[(top + 1) % n].lift, 0, SPRING);
      commit(target);
    },
    [cards, n, commit],
  );

  const select = useCallback(
    (i: number) => {
      const top = indexRef.current;
      if (i === top) return;
      if (i === (top + 1) % n) return next();
      if (i === (top - 1 + n) % n) return prev();
      commit(i); // longer jumps reshuffle the stack on the shared spring
    },
    [n, next, prev, commit],
  );

  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    reduceRef.current = reduceMotion;
    schedule();
    return () => {
      window.clearTimeout(timer.current);
      progressAnim.current?.stop();
    };
  }, [reduceMotion, schedule]);

  const onDrag = useCallback(
    (info: PanInfo) => {
      cards[(indexRef.current + 1) % n].lift.set(clamp01(-info.offset.x / LIFT_DISTANCE));
    },
    [cards, n],
  );

  const onDragEnd = useCallback(
    (info: PanInfo) => {
      setPause("drag", false);
      const { offset, velocity } = info;
      if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) return next(velocity.x);
      if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) return prev(velocity.x);
      const top = indexRef.current;
      animate(cards[top].offset, 0, SNAP_BACK);
      animate(cards[(top + 1) % n].lift, 0, SNAP_BACK);
    },
    [cards, n, next, prev, setPause],
  );

  const isFront = useCallback((i: number) => indexRef.current === i, []);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured destinations"
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:col-span-5 lg:max-w-none lg:pl-6"
      // Only a real mouse pauses on hover — touch screens never send a matching "leave".
      onPointerEnter={(e) => e.pointerType === "mouse" && setPause("hover", true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPause("hover", false)}
      onFocus={() => setPause("focus", true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPause("focus", false);
      }}
      onKeyDown={onKeyDown}
    >
      <div className="relative mx-auto aspect-[4/5] w-[82%] lg:w-[80%]">
        {slides.map((slide, i) => (
          <DeckCard
            key={slide.src}
            index={i}
            slide={slide}
            values={cards[i]}
            isTop={i === index}
            isFront={isFront}
            onSelect={select}
            onPause={setPause}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
          />
        ))}

        {/* Floating chips — solid backgrounds, no backdrop blur over the moving cards. */}
        <div className="pointer-events-none absolute top-10 -left-10 z-30 hidden animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-ink shadow-lift sm:flex lg:-left-16">
          <span className="grid size-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <PlaneTakeoff className="size-5" />
          </span>
          <div className="text-xs">
            <p className="font-semibold">AMD → DXB</p>
            <p className="text-muted">Flights booked</p>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-6 bottom-24 z-30 hidden animate-float-delayed items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-ink shadow-lift sm:flex lg:-right-10">
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
          onClick={() => prev()}
          aria-label="Previous destination"
          className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
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
              onClick={() => select(i)}
              className="relative h-1.5 overflow-hidden rounded-full bg-white/20 transition-[width] duration-300"
              style={{ width: i === index ? 36 : 12 }}
            >
              {i === index && (
                // scaleX runs on the compositor; animating width would re-layout every frame.
                <motion.span
                  className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-brand-300 to-teal-300"
                  style={{ scaleX: progress }}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => next()}
          aria-label="Next destination"
          className="grid size-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white/20"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium tracking-wide text-white/55">
        <MoveHorizontal className="size-4 animate-[nudge_2.4s_ease-in-out_infinite]" aria-hidden />
        <span className="sm:hidden">Swipe the cards to explore</span>
        <span className="hidden sm:inline">Drag the cards or use the arrows</span>
      </p>
      <p className="sr-only" aria-live={paused || reduceMotion ? "polite" : "off"} aria-atomic="true">
        {slides[index].name}, {index + 1} of {n}
      </p>
    </div>
  );
}

type CardProps = {
  index: number;
  slide: DeckSlide;
  values: CardValues;
  isTop: boolean;
  isFront: (i: number) => boolean;
  onSelect: (i: number) => void;
  onPause: (reason: PauseReason, on: boolean) => void;
  onDrag: (info: PanInfo) => void;
  onDragEnd: (info: PanInfo) => void;
};

// Memoised: a card only re-renders when it gains or loses the front spot (for its a11y attributes).
const DeckCard = memo(function DeckCard({ index, slide, values, isTop, isFront, onSelect, onPause, onDrag, onDragEnd }: CardProps) {
  const controls = useDragControls();
  const dragged = useRef(false);

  // The card tilts with the finger.
  const tilt = useTransform(values.offset, [-260, 0, 260], [-14, 0, 14]);
  // While the front card is dragged away, the card below rises towards the front pose.
  const liftX = useTransform(values.lift, [0, 1], [0, POSES[0].x - POSES[1].x]);
  const liftY = useTransform(values.lift, [0, 1], [0, POSES[0].y - POSES[1].y]);
  const liftRotate = useTransform(values.lift, [0, 1], [0, POSES[0].rotate - POSES[1].rotate]);
  const liftScale = useTransform(values.lift, [0, 1], [1, POSES[0].scale / POSES[1].scale]);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragged.current = false;
    // Checked at event time, so the front card is draggable the instant it arrives — no re-render needed.
    if (!isFront(index)) return;
    controls.start(e);
    onPause("drag", true);
    // Hold autoplay while a finger or button is down, even before a drag starts.
    const release = new AbortController();
    const end = () => {
      onPause("drag", false);
      release.abort();
    };
    window.addEventListener("pointerup", end, { signal: release.signal });
    window.addEventListener("pointercancel", end, { signal: release.signal });
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: values.x,
        y: values.y,
        rotate: values.rotate,
        scale: values.scale,
        opacity: values.opacity,
        zIndex: values.zIndex,
        pointerEvents: values.pointerEvents,
      }}
      aria-hidden={!isTop}
    >
      <motion.div className="h-full" style={{ x: liftX, y: liftY, rotate: liftRotate, scale: liftScale }}>
        <motion.div
          drag="x"
          dragControls={controls}
          dragListener={false}
          dragMomentum={false}
          onPointerDown={onPointerDown}
          onDragStart={() => {
            dragged.current = true;
          }}
          onDrag={(_, info) => onDrag(info)}
          onDragEnd={(_, info) => onDragEnd(info)}
          whileDrag={{ scale: 1.03 }}
          style={{ x: values.offset, rotate: tilt }}
          // Own GPU layer: the photo and its shadow are painted once, then only moved. The shadow is the
          // same at every depth so reaching the front never forces a repaint. pan-y keeps page scrolling.
          className={cn(
            "relative h-full touch-pan-y rounded-[1.75rem] bg-white p-2.5 pb-16 shadow-[0_36px_70px_-24px_rgb(0_0_0/0.55)] will-change-transform select-none",
            isTop && "cursor-grab active:cursor-grabbing",
          )}
        >
          <Link
            href={`/destinations/${slide.slug}`}
            draggable={false}
            tabIndex={isTop ? 0 : -1}
            onClick={(e) => {
              // A drag that ends over the card must not count as a click…
              if (dragged.current) e.preventDefault();
              // …and a peeking back card comes to the front instead of navigating.
              else if (!isFront(index)) {
                e.preventDefault();
                onSelect(index);
              }
            }}
            className="relative block h-full overflow-hidden rounded-[1.25rem] bg-brand-100"
          >
            <Image
              src={slide.src}
              alt={isTop ? `${slide.name} — ${slide.note}` : ""}
              fill
              draggable={false}
              loading="eager" // all six are in the deck already, so none pops in mid-swipe
              fetchPriority={index === 0 ? "high" : "low"}
              sizes="(min-width: 1024px) 400px, 80vw"
              className="pointer-events-none object-cover"
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
    </motion.div>
  );
});
