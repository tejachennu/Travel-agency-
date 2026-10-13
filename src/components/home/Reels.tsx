import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { ReelPlayer } from "@/components/ReelPlayer";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function Reels() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-teal-700 py-24 text-white sm:py-32">
      <div className="dot-grid absolute inset-0 -z-10 opacity-40" />
      <div className="absolute -bottom-40 -left-20 -z-10 size-[30rem] rounded-full bg-teal-400/30 blur-[120px]" />

      <div className="container-page grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <span className="eyebrow eyebrow-light">Watch &amp; wander</span>
          <h2 className="mt-4 font-display text-[2.1rem] leading-[1.08] font-medium tracking-tight sm:text-5xl">
            Feel the trip <em className="text-gradient-light font-normal">before you take it</em>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
            Misty tea hills and palm-lined backwaters in Kerala. A shikara gliding over a frozen Dal Lake in Kashmir.
            Follow our reels for daily doses of wanderlust — then let us make it real.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.instagram.url} target="_blank" rel="noreferrer" className="btn btn-light">
              <InstagramIcon size={18} /> Follow @{site.instagram.handle}
            </a>
            <Link href="/destinations/kerala" className="btn btn-ghost-light">
              Kerala itinerary <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="relative mx-auto flex w-full max-w-lg items-center justify-center gap-5 sm:gap-8">
          <Reveal className="w-1/2 sm:mt-0" delay={0.05}>
            <ReelPlayer
              src="/reels/kerala.mp4"
              poster="/reels/kerala-poster.webp"
              label="Kerala"
              caption="Welcome to God's Own Country"
              className="rotate-[-4deg]"
            />
          </Reveal>
          <Reveal className="mt-24 w-1/2" delay={0.15}>
            <ReelPlayer
              src="/reels/kashmir.mp4"
              poster="/reels/kashmir-poster.webp"
              label="Kashmir"
              caption="The frozen beauty of Dal Lake"
              className="rotate-[4deg]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
