import { CtaBand } from "@/components/CtaBand";
import { DestinationMarquee } from "@/components/home/DestinationMarquee";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedPackage } from "@/components/home/FeaturedPackage";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { IndiaDiaries } from "@/components/home/IndiaDiaries";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { LatestGuides } from "@/components/home/LatestGuides";
import { InternationalGrid } from "@/components/home/InternationalGrid";
import { Reels } from "@/components/home/Reels";
import { Reviews } from "@/components/home/Reviews";
import { ServicesTabs } from "@/components/home/ServicesTabs";
import { WhyUs } from "@/components/home/WhyUs";
import { destinations } from "@/data/destinations";

export default function HomePage() {
  return (
    <>
      {/* Only names cross to the client — not the whole destinations data file. */}
      <Hero destinationOptions={destinations.map((d) => ({ name: d.name, region: d.region }))} />
      <DestinationMarquee />
      {/* Below the fold: the browser skips rendering these until they near the viewport (see .lazy-sections). */}
      <div className="lazy-sections">
        <WhyUs />
        <InternationalGrid />
        <FeaturedPackage />
        <IndiaDiaries />
        <ServicesTabs />
        <Reviews />
        <Reels />
        <HowItWorks />
        <LatestGuides />
        <InstagramFeed />
        <FaqSection />
        <CtaBand />
      </div>
    </>
  );
}
