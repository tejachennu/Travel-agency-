import { ScrollButtons } from "@/components/ScrollButtons";
import { DiaryCard } from "@/components/DiaryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { indiaDestinations } from "@/data/destinations";

export function IndiaDiaries() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-page flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="India holidays"
          title={
            <>
              Incredible India, <em className="text-gradient font-normal">lived by our travellers</em>
            </>
          }
          intro="Tea hills in Kerala, high passes in Spiti, Goa's beaches and Maharashtra's monsoon magic — straight from the diaries we share on Instagram."
        />
        <ScrollButtons target="india-diaries" />
      </div>

      <div
        id="india-diaries"
        className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-80rem)/2+2rem))] pb-4"
      >
        {indiaDestinations.map((d) => (
          <DiaryCard key={d.slug} destination={d} className="w-[78vw] max-w-[20rem] shrink-0 snap-start sm:w-[20rem]" />
        ))}
      </div>
    </section>
  );
}
