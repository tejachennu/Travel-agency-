import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { reviews } from "@/data/reviews";
import { ReviewsCarousel } from "./ReviewsCarousel";

export function Reviews() {
  const rowA = reviews.filter((_, i) => i % 2 === 0);
  const rowB = reviews.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Traveller stories"
          title={
            <>
              Memories made. <em className="text-gradient font-normal">Smiles captured.</em>
            </>
          }
          intro="Real words from real travellers — thank you for trusting us with your holidays."
        />
      </div>

      {/* Small screens: swipeable cards */}
      <div className="mt-10 md:hidden">
        <ReviewsCarousel reviews={reviews} />
      </div>

      {/* Larger screens: two drifting rows */}
      <div className="mt-14 hidden space-y-5 md:block">
        {[rowA, rowB].map((row, r) => (
          <div key={r} className="mask-fade-x flex">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 animate-marquee items-stretch gap-5 pr-5 hover:[animation-play-state:paused]"
                style={{ animationDirection: r === 1 ? "reverse" : "normal", animationDuration: `${row.length * 14}s` }}
              >
                {row.map((review) => (
                  <ReviewCard key={`${copy}-${review.name}`} review={review} className="w-[20rem] sm:w-[24rem]" />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
