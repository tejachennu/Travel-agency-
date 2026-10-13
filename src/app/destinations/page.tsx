import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { DestinationExplorer } from "@/components/DestinationExplorer";
import { PageHero } from "@/components/PageHero";
import { destinations, indiaDestinations, internationalDestinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Tour Packages from Ahmedabad — International & India Holidays",
  description:
    "Explore MJ Holidays tour packages to Dubai, Thailand, Singapore, Malaysia, Maldives, Bali, Vietnam, Hong Kong, Nepal, Bhutan and across India — Kerala, Kashmir, Spiti, Goa and more.",
  alternates: { canonical: "/destinations" },
};

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title={
          <>
            Where will you go <em className="text-gradient-light font-normal">next?</em>
          </>
        }
        intro="From overwater villas to Himalayan monasteries — explore our most-loved trips. Each one is a starting point we shape around you."
        image="/images/destinations/thailand.webp"
        crumbs={[{ href: "/", label: "Home" }, { label: "Destinations" }]}
      >
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">{internationalDestinations.length} international</span>
          <span className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">{indiaDestinations.length} across India</span>
          <span className="rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15">Visas handled in-house</span>
        </div>
      </PageHero>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          <DestinationExplorer destinations={destinations} />
        </div>
      </section>

      <CtaBand title="Don't see your dream destination?" body="We plan trips almost anywhere in the world. Tell us where you'd like to go and we'll build it from scratch." />
    </>
  );
}
