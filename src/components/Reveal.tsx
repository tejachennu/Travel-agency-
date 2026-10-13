import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades and lifts its children in as they scroll into view — pure CSS (scroll-driven
 * animations), so it costs no JavaScript. Browsers without support simply show the content.
 */
export function Reveal({ delay = 0, className, children }: { delay?: number; className?: string; children: ReactNode }) {
  return (
    <div className={cn("reveal", className)} style={delay ? ({ "--reveal-delay": delay } as React.CSSProperties) : undefined}>
      {children}
    </div>
  );
}
