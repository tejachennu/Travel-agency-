import { destinations } from "@/data/destinations";

export function DestinationMarquee() {
  const names = destinations.map((d) => d.name);
  return (
    <section aria-label="Destinations we cover" className="relative overflow-hidden border-b border-sand-200 bg-sand py-7">
      <div className="mask-fade-x flex">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 animate-marquee-slow items-center gap-10 pr-10 hover:[animation-play-state:paused]"
          >
            {names.map((n) => (
              <li key={`${copy}-${n}`} className="flex items-center gap-10 whitespace-nowrap">
                <span className="font-display text-3xl font-light text-brand-800 italic sm:text-4xl">{n}</span>
                <svg viewBox="0 0 24 24" className="size-4 text-teal-400" aria-hidden>
                  <path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
                </svg>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
