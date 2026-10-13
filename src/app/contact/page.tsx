import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { FlagCA, FlagIN, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";
import { destinations } from "@/data/destinations";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact MJ Holidays — Travel Agent in Kudasan, Gandhinagar",
  description:
    "Talk with MJ Holidays travel experts — B-326, Pramukh Arcade, Kudasan, Gandhinagar (+91 97129 83753) and Chester, Nova Scotia, Canada (+1 647 552 3753). info@mjholidays.in",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const india = site.offices[0];
  return (
    <>
      <PageHero
        eyebrow="Talk with experts"
        title={
          <>
            Let&apos;s plan something <em className="text-gradient-light font-normal">wonderful</em>
          </>
        }
        intro="Message, call or drop by our Kudasan office. However you reach us, a real travel expert replies."
        image="/images/destinations/maldives.webp"
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={whatsappLink(defaultEnquiry)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon size={18} /> WhatsApp
          </a>
          <a href={india.phoneHref} className="btn btn-light">
            <Phone className="size-4" /> {india.phone}
          </a>
          <a href={`mailto:${site.email}`} className="btn btn-ghost-light">
            <Mail className="size-4" /> {site.email}
          </a>
        </div>
      </PageHero>

      <section className="bg-sand py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <ContactForm destinationNames={destinations.map((d) => d.name)} />
          </Reveal>

          <div className="space-y-5">
            {site.offices.map((o) => (
              <Reveal key={o.id} className="overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-black/[0.04]">
                <div className="p-7">
                  <div className="flex items-center gap-3">
                    {o.flag === "IN" ? <FlagIN size={26} /> : <FlagCA size={26} />}
                    <p className="font-display text-2xl text-brand-900">{o.label}</p>
                  </div>
                  <p className="mt-4 flex gap-3 text-ink/80">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-teal-500" />
                    <span>{o.lines.join(", ")}</span>
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={o.phoneHref} className="btn btn-outline !px-4 !py-2.5 text-sm">
                      <Phone className="size-4" /> {o.phone}
                    </a>
                    <a href={whatsappLink(defaultEnquiry, o.whatsapp)} target="_blank" rel="noreferrer" className="btn btn-outline !px-4 !py-2.5 text-sm">
                      <WhatsAppIcon size={16} /> WhatsApp
                    </a>
                  </div>
                </div>
                <div className="dot-grid-dark relative h-56 bg-sand">
                  <MapPin className="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-brand-200" />
                  <iframe
                    title={`Map — ${o.label}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative h-full w-full border-0 grayscale-[30%]"
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-brand-700 shadow-lift transition hover:bg-brand-50"
                  >
                    <MapPin className="size-3.5" /> Open in Google Maps
                  </a>
                </div>
              </Reveal>
            ))}

            <Reveal className="grid grid-cols-2 gap-4">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] p-6 text-white shadow-soft"
              >
                <InstagramIcon size={26} />
                <p className="mt-6 text-sm opacity-80">Follow us</p>
                <p className="font-semibold">@{site.instagram.handle}</p>
              </a>
              <div className="rounded-3xl bg-brand-950 p-6 text-white shadow-soft">
                <Clock className="size-6 text-teal-300" />
                <p className="mt-6 text-sm opacity-70">Support</p>
                <p className="font-semibold">24/7 on WhatsApp while you travel</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
