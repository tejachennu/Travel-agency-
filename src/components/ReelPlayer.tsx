"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { InstagramIcon } from "./icons";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  poster: string;
  label: string;
  caption: string;
  className?: string;
};

/** Phone-framed, muted looping reel that only plays while on screen. */
export function ReelPlayer({ src, poster, label, caption, className }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused) {
          el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [userPaused]);

  const toggle = () => {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      setUserPaused(false);
      el.play().catch(() => undefined);
    } else {
      setUserPaused(true);
      el.pause();
    }
  };

  return (
    <figure className={cn("relative", className)}>
      <div className="relative rounded-[2.6rem] bg-gradient-to-b from-zinc-700 to-zinc-900 p-[0.6rem] shadow-[0_40px_80px_-24px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-black">
          <video
            ref={video}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            className="h-full w-full object-cover"
            aria-label={label}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="absolute top-3 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute top-10 left-4 flex items-center gap-2 text-white">
            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]">
              <InstagramIcon size={14} />
            </span>
            <span className="text-xs font-semibold drop-shadow">mj_holidays_india</span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-16 text-white">
            <p className="font-script text-3xl leading-none">{label}</p>
            <p className="mt-1 text-xs text-white/80">{caption}</p>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause ${label} reel` : `Play ${label} reel`}
            className="absolute right-3 bottom-4 grid size-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
          >
            {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
          </button>
        </div>
      </div>
    </figure>
  );
}
