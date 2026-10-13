import type { Metadata } from "next";
import Image from "next/image";
import { Compass, Gauge, Headphones, Lock, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FlagCA, FlagIN } from "@/components/icons";
import { InstagramGrid } from "@/components/InstagramGrid";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ReviewCard } from "@/components/ReviewCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getPost, type InstagramPost } from "@/data/instagram";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MJ Holidays is a travel company from Kudasan, Gandhinagar with an office in Chester, Canada — creating unforgettable travel stories with tailor-made holidays and end-to-end travel paperwork.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Gauge, title: "Efficient process", body: "A streamlined booking process that saves you time and hassle." },
  { icon: Lock, title: "Secure payments", body: "Rest easy knowing your payment information is safe and secure." },
  { icon: Headphones, title: "24/7 support", body: "Available around the clock for any question or concern." },
  { icon: Compass, title: "Endless options", body: "A wide range of destinations and experiences to choose from." },
  { icon: Sparkles, title: "Expert guidance", body: "Experienced agents who help you plan the perfect trip." },
  { icon: ShieldCheck, title: "Reliable service", body: "Count on us for dependable service every step of the way." },
];

const collage = ["DKRCsiYSsep", "DKwoxC5yGXa", "DKmtsbdSP61"];

export default function AboutPage() {
  const posts = ["DHTPzrZqz36", "DKe9hERSvAK", "DD8xGWztdma", "DIk7hSzgwzK"].map(getPost).filter((p): p is InstagramPost => Boolean(p));

  return (
    <>
      <PageHero
        eyebrow="About MJ Holidays"
        title={
          <>
            Creating unforgettable <em className="text-gradient-light font-normal">travel stories</em>
          </>
        }
        intro="We're a travel company from Kudasan, Gandhinagar — with a desk in Canada — on a simple mission: make every trip feel effortless, and every traveller feel looked after."
        image="/images/destinations/vietnam.webp"
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="container-page grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative mx-auto h-[30rem] w-full max-w-lg sm:h-[34rem]">
            {collage.map((code, i) => (
              <div
                key={code}
                className="absolute w-[58%] rounded-2xl bg-white p-2 shadow-lift transition-transform duration-500 hover:z-10 hover:scale-[1.03]"
                style={{
                  top: ["0%", "22%", "48%"][i],
                  left: ["0%", "40%", "8%"][i],
                  rotate: ["-6deg", "5deg", "-2deg"][i],
                }}
              >
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image src={`/instagram/${code}.webp`} alt={getPost(code)?.alt ?? ""} fill sizes="300px" className="object-cover" />
                </div>
              </div>
            ))}
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our story"
              title={
                <>
                  Your dream trip, <em className="text-gradient font-normal">our promise</em>
                </>
              }
            />
            <Reveal className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                MJ Holidays began with a belief that great holidays are built on great planning. From our office at
                Pramukh Arcade in Kudasan, our travel experts design trips across India and around the world — Dubai,
                Bali, Singapore, Vietnam, Kerala, Spiti and many more.
              </p>
              <p>
                We take care of the whole journey: flights, hotels, transfers, sightseeing and the paperwork that comes
                with travel. As a BLS services partner with an office in Chester, Nova Scotia, we also help the Indian
                community in Canada with OCI cards, Police Clearance Certificates and passport services.
              </p>
              <p>
                Our travellers remember the little things — a guide who made each place come alive, a driver who went
                the extra mile, a team that answered at any hour. That&apos;s the standard we hold ourselves to.
              </p>
            </Reveal>
            <Reveal className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/[0.04]">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-teal-500 font-display text-xl font-semibold text-white">
                JP
              </span>
              <div>
                <p className="font-semibold text-brand-900">Speak with {site.contactPerson}</p>
                <a href={site.offices[0].phoneHref} className="mt-0.5 flex items-center gap-1.5 text-sm text-muted hover:text-brand-700">
                  <Phone className="size-3.5" /> {site.offices[0].phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Why travellers choose us"
            title={
              <>
                The MJ Holidays <em className="text-gradient font-normal">difference</em>
              </>
            }
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-sand-200 ring-1 ring-sand-200 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <Reveal key={v.title} className="group bg-white p-8 transition hover:bg-sand">
                <v.icon className="size-8 text-teal-500 transition group-hover:scale-110" />
                <h3 className="mt-5 text-xl font-semibold text-brand-900">{v.title}</h3>
                <p className="mt-2 text-muted">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Where to find us"
            title={
              <>
                Two offices, <em className="text-gradient font-normal">one team</em>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {site.offices.map((o) => (
              <Reveal key={o.id} className="card flex flex-col gap-5 p-8">
                <div className="flex items-center gap-3">
                  {o.flag === "IN" ? <FlagIN size={28} /> : <FlagCA size={28} />}
                  <div>
                    <p className="font-display text-2xl text-brand-900">{o.label}</p>
                    <p className="text-sm text-muted">{o.city}</p>
                  </div>
                </div>
                <p className="flex gap-3 text-ink/80">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-teal-500" />
                  <span>
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </p>
                <a href={o.phoneHref} className="btn btn-outline self-start">
                  <Phone className="size-4" /> {o.phone}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews + Instagram */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Happy customers"
            title={
              <>
                Thank you for <em className="text-gradient font-normal">trusting us</em>
              </>
            }
          />
          <div className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
            {reviews.slice(0, 6).map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
          <Reveal className="mt-10">
            <InstagramGrid posts={posts} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
