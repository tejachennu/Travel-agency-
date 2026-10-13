import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { WhatsAppIcon } from "@/components/icons";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";

export function FaqSection() {
  return (
    <section className="bg-sand pt-24 sm:pt-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="Good to know"
            title={
              <>
                Questions, <em className="text-gradient font-normal">answered</em>
              </>
            }
            intro="Can't find what you're looking for? Our experts are a message away."
          />
          <Reveal className="mt-8 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/[0.04]">
            <div className="relative h-40">
              <Image src="/images/lifestyle/support.webp" alt="Smiling travel expert on a phone call" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover object-[50%_25%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            </div>
            <div className="space-y-3 p-6 pt-0">
              <p className="font-display text-2xl text-brand-900">Talk with an expert</p>
              <p className="text-sm text-muted">Speak directly with {site.contactPerson} and the MJ Holidays team.</p>
              <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                <a href={whatsappLink(defaultEnquiry)} target="_blank" rel="noreferrer" className="btn btn-whatsapp flex-1 !py-3 text-sm">
                  <WhatsAppIcon size={16} /> WhatsApp
                </a>
                <a href={site.offices[0].phoneHref} className="btn btn-outline flex-1 !py-3 text-sm">
                  <Phone className="size-4" /> Call
                </a>
                <a href={`mailto:${site.email}`} className="btn btn-outline flex-1 !py-3 text-sm">
                  <Mail className="size-4" /> Email
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <Faq items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
