"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 to `to` the first time the number scrolls into view (no animation library). */
export function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let armed = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        // The real number is rendered on the server (for search engines and no-JS); it only
        // resets to 0 while off-screen, so the count-up never flashes in front of the reader.
        if (!entry.isIntersecting) {
          if (!armed) setValue(0);
          armed = true;
          return;
        }
        io.disconnect();
        if (!armed) return;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000));
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-40px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
