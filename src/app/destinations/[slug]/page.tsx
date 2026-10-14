import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, Clock, Users, Sparkles, Stamp } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { DestinationCard } from "@/components/DestinationCard";
import { InstagramTile } from "@/components/InstagramGrid";
import { PageHero } from "@/components/PageHero";
import { ReelPlayer } from "@/components/ReelPlayer";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { TripEnquiryCard } from "@/components/TripEnquiryCard";
import { WhatsAppIcon } from "@/components/icons";
import { destinations, formatINR, getDestination } from "@/data/destinations";
import { getPost, type InstagramPost } from "@/data/instagram";
import { reviewsFor } from "@/data/reviews";
import { whatsappLink } from "@/lib/whatsapp";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { getPostsForDestination } from "@/lib/blog";
import { faqPage, touristTrip } from "@/lib/schema";
import { pageTitle } from "@/lib/seo";

const reels: Record<string, { src: string; poster: string; caption: string }> = {
  kerala: { src: "/reels/kerala.mp4", poster: "/reels/kerala-poster.webp", caption: "Welcome to God's Own Country" },
  kashmir: { src: "/reels/kashmir.mp4", poster: "/reels/kashmir-poster.webp", caption: "The frozen beauty of Dal Lake" },
};

/** Where most travellers for this trip start — used in titles to match how people search. */
function originFor(d: { slug: string; region: string }) {
  if (d.slug === "punta-cana") return "from Canada";
  if (d.slug === "statue-of-unity") return "from Ahmedabad & Gandhinagar";
  return "from Ahmedabad";
}

const clip = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, "")}…`);

/** FAQs built only from facts already on the page, so they never drift from the itinerary. */
function destinationFaqs(d: NonNullable<ReturnType<typeof getDestination>>) {
  return [
    {
      q: d.region === "india" ? `Do I need any permit or visa for ${d.name}?` : `Do Indian passport holders need a visa for ${d.name}?`,
      a: `${d.visa}${d.region === "international" ? " Rules change often, so we confirm the latest requirements before you book." : ""}`,
    },
    { q: `What is the best time to visit ${d.name}?`, a: `The best time to visit ${d.name} is ${d.bestTime}. We can still plan a great trip outside these months — just ask.` },
    {
      q: `How many days are enough for a ${d.name} trip?`,
      a: `Our suggested ${d.name} itinerary is ${d.duration}, covering ${d.highlights.slice(0, 3).join(", ")}. We can shorten or extend it to suit your dates.`,
    },
    {
      q: `What is included in the ${d.name} tour package?`,
      a: `${d.inclusions.join("; ")}. Flights can be added from Ahmedabad, Mumbai or your nearest airport at the best available fare.`,
    },
    {
      q: `Can I customise this ${d.name} package?`,
      a: `Yes. Every MJ Holidays trip is tailor-made — change hotels, add or remove days and activities, or plan it as a honeymoon, family or group trip. Message us on WhatsApp at ${site.offices[0].phone} for a quote.`,
    },
  ];
}

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  const title = `${d.name} Tour Package ${originFor(d)} (${d.duration})`;
  const shortTitle = `${d.name} Tour Package ${originFor(d).split(" & ")[0]} (${d.duration})`;
  const description = clip(`${d.name} ${d.duration} tour package ${originFor(d)}: ${d.highlights.slice(0, 3).join(", ")}. ${d.price ? `From ${formatINR(d.price.amount)} pp. ` : ""}Customised by MJ Holidays, Gandhinagar.`, 158);
  return {
    title: pageTitle(title.length > 60 ? shortTitle : title),
    description,
    keywords: [`${d.name} tour package ${originFor(d)}`, `${d.name} tour package`, `${d.name} itinerary ${d.duration}`, `${d.name} trip from Gujarat`],
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { title: `${title} | MJ Holidays`, description, url: `/destinations/${d.slug}` },
  };
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const posts = (d.posts ?? []).map(getPost).filter((p): p is InstagramPost => Boolean(p));
  const travellerReviews = reviewsFor(d.slug);
  const related = destinations.filter((x) => x.region === d.region && x.slug !== d.slug).slice(0, 3);
  const reel = reels[d.slug];
  const faqs = destinationFaqs(d);
  const guides = getPostsForDestination(d.slug).slice(0, 3);
  const shape = { landscape: "aspect-[4/3]", portrait: "aspect-[4/5]", square: "aspect-square" }[d.imageShape ?? "landscape"];
  const enquiry = `Hi MJ Holidays! I'm interested in the ${d.name} trip (${d.duration}). Please share the itinerary and price.`;

  const facts = [
    { icon: Clock, label: "Duration", value: d.duration },
    { icon: CalendarDays, label: "Best time", value: d.bestTime },
    { icon: Users, label: "Ideal for", value: d.idealFor.join(" · ") },
  ];

  return (
    <>
      <PageHero
        eyebrow={d.region === "india" ? `India · ${d.tagline}` : `${d.country}`}
        title={d.name}
        intro={d.summary}
        image={d.image}
        crumbs={[{ href: "/", label: "Home" }, { href: "/destinations", label: "Destinations" }, { label: d.name }]}
        aside={
          <Reveal className="relative mx-auto w-full max-w-sm lg:mr-0">
            <div className="rotate-[3deg] rounded-[1.75rem] bg-white p-2.5 pb-14 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.7)]">
              <div className={`relative overflow-hidden rounded-[1.25rem] ${shape}`}>
                <Image src={d.image} alt={d.imageAlt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 380px, 80vw" className="object-cover" />
              </div>
              <p className="absolute bottom-3 left-5 font-script text-3xl text-brand-700">{d.name}</p>
            </div>
            {d.price && (
              <div className="absolute -bottom-6 -left-4 rounded-2xl bg-coral px-5 py-3 text-white shadow-lift sm:-left-10">
                <p className="text-[0.7rem] font-semibold tracking-widest uppercase opacity-80">Starting at</p>
                <p className="font-display text-3xl font-semibold">{formatINR(d.price.amount)}*</p>
              </div>
            )}
          </Reveal>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsappLink(enquiry)} target="_blank" rel="noreferrer" className="btn btn-primary">
            <WhatsAppIcon size={18} /> Enquire on WhatsApp
          </a>
          <a href="#itinerary" className="btn btn-ghost-light">
            View itinerary <ArrowRight className="size-4" />
          </a>
        </div>
      </PageHero>

      {/* Quick facts */}
      <div className="relative z-10 -mt-10">
        <div className="container-page">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-sand-200 shadow-lift ring-1 ring-black/[0.04] sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="flex items-center gap-4 bg-white p-5 sm:p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-50 to-teal-50 text-brand-600">
                  <f.icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{f.label}</p>
                  <p className="mt-0.5 font-semibold text-brand-900">{f.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-sand py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_22rem] xl:grid-cols-[1fr_24rem]">
          <div className="min-w-0 space-y-16">
            {/* Highlights */}
            <Reveal>
              <span className="eyebrow">Trip highlights</span>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-brand-900">Don&apos;t miss</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-black/[0.03]">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600">
                      <Sparkles className="size-4" />
                    </span>
                    <span className="font-medium text-ink/85">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Itinerary */}
            <div id="itinerary" className="scroll-mt-28">
              <Reveal>
                <span className="eyebrow">Suggested itinerary</span>
                <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-brand-900">Day by day</h2>
                <p className="mt-2 text-muted">A proven plan to start from — we&apos;ll adjust pace, hotels and activities to suit you.</p>
              </Reveal>
              <ol className="relative mt-8 space-y-4 before:absolute before:top-4 before:bottom-4 before:left-[1.45rem] before:w-px before:bg-gradient-to-b before:from-brand-200 before:via-teal-300 before:to-brand-200">
                {d.itinerary.map((day, i) => (
                  <li key={day.title} className="relative">
                    <Reveal delay={Math.min(i * 0.05, 0.3)} className="flex gap-5">
                      <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgb(42_47_146/0.8)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/[0.03]">
                        <p className="text-xs font-bold tracking-[0.16em] text-teal-600 uppercase">Day {i + 1}</p>
                        <h3 className="mt-1 text-lg font-semibold text-brand-900">{day.title}</h3>
                        <p className="mt-1.5 leading-relaxed text-muted">{day.detail}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>

            {/* Inclusions & visa */}
            <Reveal className="grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/[0.03]">
                <h2 className="font-display text-2xl text-brand-900">What&apos;s included</h2>
                <ul className="mt-5 space-y-3">
                  {d.inclusions.map((inc) => (
                    <li key={inc} className="flex gap-3 text-ink/85">
                      <Check className="mt-0.5 size-5 shrink-0 rounded-full bg-teal-50 p-0.5 text-teal-600" />
                      {inc}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs text-muted">Flights can be added at the best available fare from your city.</p>
              </div>
              <div className="relative overflow-hidden rounded-3xl bg-brand-950 p-7 text-white">
                <div className="absolute -top-16 -right-16 size-48 glow text-teal-400/25" />
                <Stamp className="relative size-9 text-teal-300" />
                <h2 className="relative mt-4 font-display text-2xl">Visa &amp; documents</h2>
                <p className="relative mt-3 leading-relaxed text-white/75">{d.visa}</p>
                {d.region === "international" && (
                  <p className="relative mt-4 text-xs text-white/50">Rules change often — we confirm the latest requirements before you book.</p>
                )}
                <Link href="/services#documents" className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-200 hover:text-white">
                  Our visa &amp; passport services <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>

            {d.price && (
              <p className="rounded-2xl bg-coral/10 px-5 py-4 text-sm text-ink/75 ring-1 ring-coral/20">
                <strong className="text-coral">* {formatINR(d.price.amount)}</strong> {d.price.note}
              </p>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <TripEnquiryCard destination={d.name} duration={d.duration} />
            {reel && (
              <div className="mx-auto max-w-[15rem]">
                <ReelPlayer src={reel.src} poster={reel.poster} label={d.name} caption={reel.caption} />
              </div>
            )}
          </aside>
        </div>
      </section>

      {(travellerReviews.length > 0 || posts.length > 0) && (
        <section className="bg-white py-20 sm:py-24">
          <div className="container-page">
            <Reveal>
              <span className="eyebrow">From our travellers</span>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-brand-900 sm:text-5xl">
                {d.name}, <em className="text-gradient font-normal">as they lived it</em>
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {travellerReviews.map((r) => (
                <Reveal key={r.name}>
                  <ReviewCard review={r} className="h-full" />
                </Reveal>
              ))}
              {posts.map((p) => (
                <Reveal key={p.code}>
                  <InstagramTile post={p} className="h-full rounded-3xl" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-sand py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <span className="eyebrow">Keep exploring</span>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-brand-900">You might also love</h2>
            </Reveal>
            <Link href="/destinations" className="btn btn-outline">
              All destinations <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Reveal key={r.slug}>
                <DestinationCard destination={r} className="h-[22rem]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-brand-900">{d.name} trip FAQs</h2>
            <p className="mt-3 text-muted">Quick answers before you plan. Anything else — we&apos;re one WhatsApp message away.</p>
          </div>
          <div className="divide-y divide-sand-200 rounded-3xl bg-sand px-6">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-brand-900">{f.q}</h3>
                  <span aria-hidden className="mt-1 text-xl leading-none text-teal-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {guides.length > 0 && (
        <section className="bg-sand py-20 sm:py-24">
          <div className="container-page">
            <span className="eyebrow">Travel guides</span>
            <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-brand-900">Read before you go to {d.name}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <BlogCard key={g.slug} post={g} />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd data={touristTrip(d)} />
      <JsonLd data={faqPage(faqs)} />

      <CtaBand title={`Ready for ${d.name}?`} body="Share your dates and we'll send a personalised plan with the best fares and stays." />
    </>
  );
}
