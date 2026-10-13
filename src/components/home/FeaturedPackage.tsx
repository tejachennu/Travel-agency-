import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Heart, Plane } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { formatINR, getDestination } from "@/data/destinations";
import { whatsappLink } from "@/lib/whatsapp";

const stays = [
  { nights: "5N", hotel: "Fairfield by Marriott Bali Legian", room: "Deluxe Room" },
  { nights: "2N", hotel: "Dedary Resort & Spa Ubud", room: "One-bedroom private-pool villa with bathtub" },
];

const inclusions = [
  "Daily breakfast",
  "Airport pick-up & drop",
  "Inter-hotel transfer",
  "North Bali: Ulun Danu Beratan, Gitgit Waterfalls, Handara Gate",
  "South Bali: water sports, Uluwatu temple, Dreamland",
  "Kintamani–Ubud: Tegalalang rice terrace, coffee plantation, Ubud market",
  "Bali Swing & Tanah Lot temple",
];

export function FeaturedPackage() {
  const bali = getDestination("bali");
  if (!bali?.price) return null;

  return (
    <section className="bg-sand pb-24 sm:pb-32">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2.25rem] bg-brand-950 text-white shadow-lift">
          <div className="absolute -top-32 -right-24 size-[28rem] rounded-full bg-coral/25 blur-[110px]" />
          <div className="absolute -bottom-40 left-1/3 size-[26rem] rounded-full bg-teal-500/20 blur-[110px]" />

          <div className="relative grid lg:grid-cols-[1.05fr_1fr]">
            {/* Visual */}
            <div className="relative isolate flex min-h-[30rem] items-center justify-center overflow-hidden px-6 pt-20 pb-12 sm:min-h-[36rem]">
              {/* Soft, blurred backdrop so resolution never shows */}
              <Image
                src="/images/destinations/bali.webp"
                alt=""
                fill
                sizes="50vw"
                className="-z-20 scale-125 object-cover opacity-70 blur-2xl"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-coral/30 via-brand-950/40 to-brand-950 lg:bg-gradient-to-r lg:from-coral/25 lg:via-brand-950/30 lg:to-brand-950" />

              <div className="relative w-full max-w-md">
                <div className="relative ml-auto w-[68%] rotate-[4deg] rounded-2xl bg-white p-2 shadow-[0_40px_70px_-20px_rgb(0_0_0/0.7)] transition-transform duration-500 hover:rotate-[2deg]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <Image
                      src="/instagram/DSUw1ERCrZM.webp"
                      alt="Valentines in Bali package poster: Fairfield by Marriott Legian and Dedary Ubud pool villa, from ₹73,499 per person"
                      fill
                      sizes="(min-width: 1024px) 320px, 60vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute bottom-[-8%] left-0 w-[50%] -rotate-[7deg] rounded-2xl bg-white p-2 pb-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] transition-transform duration-500 hover:-rotate-[4deg]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <Image src="/instagram/Dapzr9kgLzF.webp" alt="Unforgettable Bali trip poster with our travellers" fill sizes="(min-width: 1024px) 240px, 45vw" className="object-cover" />
                  </div>
                  <p className="px-1 pt-2 font-script text-xl leading-none text-brand-700">Our Bali crew!</p>
                </div>
              </div>

              <span className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-xs font-bold tracking-wider uppercase shadow-lg">
                <Heart className="size-3.5 fill-current" /> Signature package
              </span>
            </div>

            {/* Details */}
            <div className="relative p-7 sm:p-10 lg:p-12">
              <p className="font-script text-3xl text-coral">Romance in</p>
              <h2 className="font-display text-5xl font-medium tracking-tight sm:text-6xl">Bali</h2>
              <p className="mt-3 flex items-center gap-2 text-sm text-white/70">
                <Plane className="size-4 text-teal-300" /> 7 nights / 8 days · Ex Ahmedabad / Mumbai
              </p>

              <div className="mt-7 space-y-3">
                {stays.map((s) => (
                  <div key={s.hotel} className="flex gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-500/15 font-display text-lg font-semibold text-teal-200">
                      {s.nights}
                    </span>
                    <div>
                      <p className="font-semibold">{s.hotel}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/65">
                        <BedDouble className="size-3.5" /> {s.room}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <ul className="mt-6 grid gap-2.5 text-sm text-white/80 sm:grid-cols-2">
                {inclusions.map((inc) => (
                  <li key={inc} className="flex gap-2.5">
                    <Heart className="mt-0.5 size-4 shrink-0 text-coral" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.16em] text-white/60 uppercase">Starting at</p>
                  <p className="font-display text-5xl font-semibold">
                    {formatINR(bali.price.amount)}
                    <span className="ml-1 align-top text-base text-coral">*</span>
                  </p>
                  <p className="text-sm text-white/60">per person</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappLink("Hi MJ Holidays! I'm interested in the Bali package (Fairfield by Marriott Legian + Dedary Ubud pool villa). Please share dates and price.")}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    <WhatsAppIcon size={18} /> Enquire now
                  </a>
                  <Link href="/destinations/bali" className="btn btn-ghost-light">
                    Itinerary <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <p className="mt-5 text-xs text-white/45">* {bali.price.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
