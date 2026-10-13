import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" aria-label="MJ Holidays — home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative block h-10 w-[31px] shrink-0 transition-transform duration-300 group-hover:-rotate-3">
        <Image
          src={light ? "/brand/mj-mark-white.png" : "/brand/mj-mark.png"}
          alt=""
          fill
          sizes="31px"
          loading="eager"
          className="object-contain"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-semibold tracking-tight",
            light ? "text-white" : "text-brand-700",
          )}
        >
          MJ Holidays
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em]",
            light ? "text-teal-200/90" : "text-teal-600",
          )}
        >
          Discover Your World
        </span>
      </span>
    </Link>
  );
}
