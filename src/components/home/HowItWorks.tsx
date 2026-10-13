import Image from "next/image";
import { FileText, MessageCircle, Plane, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    icon: MessageCircle,
    title: "Share your dream trip",
    body: "WhatsApp, call or fill the form — tell us where, when, who and your budget.",
  },
  {
    icon: FileText,
    title: "Get a personalised plan",
    body: "Receive a tailor-made itinerary and a transparent quote. Tweak it as much as you like.",
  },
  {
    icon: ShieldCheck,
    title: "Confirm securely",
    body: "Book with a secure payment. We handle visas, flights, hotels and transfers.",
  },
  {
    icon: Plane,
    title: "Travel stress-free",
    body: "Vouchers on your phone and a real person on WhatsApp, 24/7, until you're home.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Easy booking"
            title={
              <>
                Four simple steps to <em className="text-gradient font-normal">your next adventure</em>
              </>
            }
            intro="Our booking process is designed to be efficient and streamlined — saving you time and hassle."
          />
          <Reveal className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lift lg:block">
            <Image
              src="/images/lifestyle/planning.webp"
              alt="Travel planner writing an itinerary in a notebook"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/50 to-transparent" />
            <p className="absolute bottom-5 left-6 font-script text-3xl text-white drop-shadow">Your dream trip, our promise!</p>
          </Reveal>
        </div>

        <div className="relative">
          <span aria-hidden className="absolute top-8 bottom-8 left-[2.15rem] w-px bg-gradient-to-b from-brand-200 via-teal-300 to-brand-200" />
          <ol className="relative space-y-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <Reveal delay={i * 0.08} className="group relative flex gap-6 rounded-3xl p-4 transition hover:bg-sand">
                <span className="relative z-10 grid size-[3.3rem] shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-brand-100 transition group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-teal-500 group-hover:text-white">
                  <s.icon className="size-6" />
                </span>
                <div className="pt-1">
                  <p className="text-xs font-bold tracking-[0.18em] text-teal-600 uppercase">Step {i + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold text-brand-900">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
