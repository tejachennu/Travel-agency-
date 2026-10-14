import type { Metadata } from "next";
import Image from "next/image";
import { Check, ClipboardList, FileUp, CalendarCheck, PackageCheck } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { FlagCA, FlagIN, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { documentPromises, documentServices, travelServices } from "@/data/services";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { JsonLd } from "@/components/JsonLd";
import { serviceList } from "@/lib/schema";
import { pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Visa, Passport, OCI & Travel Services — Gandhinagar & Canada"),
  description:
    "Flights, hotels, tour packages and visa help from our Gandhinagar office, plus OCI card, Indian PCC and passport surrender support for NRIs in Canada.",
  alternates: { canonical: "/services" },
};

const ociSteps = [
  { icon: ClipboardList, title: "Checklist", body: "We review your case and send an exact document checklist and timeline." },
  { icon: FileUp, title: "Forms & uploads", body: "We fill the online forms and upload photos, signatures and documents to spec." },
  { icon: CalendarCheck, title: "Appointment", body: "We book your slot and brief you on embassy protocols for the day." },
  { icon: PackageCheck, title: "Submission", body: "Your application bundle is prepared — with Purolator pickup & drop in Canada." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            From planning <em className="text-gradient-light font-normal">to paperwork</em>
          </>
        }
        intro="We don't just book flights and tours — we take care of your entire travel journey. Choose a single service or let us handle it all."
        image="/images/destinations/singapore.webp"
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#travel" className="btn btn-light">
            Travel services
          </a>
          <a href="#documents" className="btn btn-ghost-light">
            Passport, Visa &amp; OCI
          </a>
        </div>
      </PageHero>

      {/* Travel */}
      <section id="travel" className="scroll-mt-20 bg-sand py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Travel services"
            title={
              <>
                Everything for the trip, <em className="text-gradient font-normal">in one place</em>
              </>
            }
            intro="Choose from flights, accommodations, tours and more — with competitive prices that make planning easy and affordable."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {travelServices.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.06} className="group card relative overflow-hidden p-7 transition hover:-translate-y-1 hover:shadow-lift">
                <div className="absolute -top-20 -right-20 size-44 rounded-full bg-teal-100 opacity-0 blur-2xl transition group-hover:opacity-100" />
                <span className="relative grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-teal-500 text-white shadow-[0_10px_30px_-10px_rgb(42_47_146/0.8)]">
                  <s.icon className="size-6" />
                </span>
                <h3 className="relative mt-5 text-xl font-semibold text-brand-900">{s.title}</h3>
                <p className="relative mt-2 leading-relaxed text-muted">{s.blurb}</p>
                <ul className="relative mt-5 space-y-2 text-sm text-ink/80">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <Check className="size-4 shrink-0 text-teal-500" /> {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section id="documents" className="relative isolate scroll-mt-20 overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
        <div className="absolute top-0 right-0 -z-10 size-[36rem] glow text-teal-500/20" />
        <div className="dot-grid absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <SectionHeading
              tone="light"
              eyebrow="BLS services partner"
              title={
                <>
                  Passport, visa &amp; <em className="text-gradient-light font-normal">OCI — sorted</em>
                </>
              }
              intro="Embassy paperwork is confusing. We make it simple — with expert guidance in Gandhinagar and a dedicated desk in Canada for Indian passport services."
            >
              <ul className="mt-2 space-y-3">
                {documentPromises.map((p) => (
                  <li key={p} className="flex gap-3 text-white/85">
                    <Check className="mt-0.5 size-5 shrink-0 rounded-full bg-teal-400/20 p-0.5 text-teal-200" /> {p}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappLink("Hi MJ Holidays! I need help with an OCI / passport / PCC application.", site.offices[1].whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  <WhatsAppIcon size={18} /> Canada desk
                </a>
                <a href={whatsappLink("Hi MJ Holidays! I need help with a visa / passport application.")} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
                  <WhatsAppIcon size={18} /> India desk
                </a>
              </div>
            </SectionHeading>

            <Reveal className="relative">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                <Image src="/instagram/DG6E0Qrxg6P.webp" alt="Passport, boarding passes and a globe — secure your flight today" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_40%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-ink shadow-lift">
                <FlagIN size={22} /> <FlagCA size={22} />
                <p className="text-sm font-semibold">Offices in India &amp; Canada</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documentServices.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.06} className="rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 transition hover:bg-white/[0.07]">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500">
                  <s.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{s.blurb}</p>
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <Check className="size-4 shrink-0 text-teal-300" /> {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          {/* OCI process */}
          <Reveal className="mt-20 rounded-[2rem] bg-gradient-to-br from-brand-600/30 to-teal-500/20 p-8 ring-1 ring-white/10 sm:p-12">
            <h3 className="font-display text-3xl font-medium sm:text-4xl">How an OCI application works with us</h3>
            <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {ociSteps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="font-display text-6xl font-semibold text-white/10">{String(i + 1).padStart(2, "0")}</span>
                  <s.icon className="-mt-6 size-8 text-teal-300" />
                  <p className="mt-4 text-lg font-semibold">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <JsonLd data={serviceList(travelServices, ["IN"])} />
      <JsonLd data={serviceList(documentServices, ["IN", "CA"])} />

      <CtaBand title="Tell us what you need" body="A full holiday, a single flight or an OCI card — one message and our experts take it from there." />
    </>
  );
}
