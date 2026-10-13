import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "dark", className, children }: Props) {
  const light = tone === "light";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <span className={cn("eyebrow", light && "eyebrow-light")}>{eyebrow}</span>
      <h2
        className={cn(
          "max-w-3xl font-display text-[2.1rem] leading-[1.08] font-medium tracking-tight sm:text-5xl",
          light ? "text-white" : "text-brand-900",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("max-w-2xl text-base leading-relaxed sm:text-lg", light ? "text-white/70" : "text-muted")}>{intro}</p>
      )}
      {children}
    </Reveal>
  );
}
