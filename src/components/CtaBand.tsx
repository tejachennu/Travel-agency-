import Image from "next/image";
import { Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./icons";
import { primaryOffice } from "@/data/site";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";

export function CtaBand({
  title = "Ready to embark on your next adventure?",
  body = "Talk to our travel experts today and let us plan the trip of a lifetime — flights, stays, visas and all.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-sand py-20 sm:py-24">
      <div className="container-page">
        <Reveal className="relative isolate overflow-hidden rounded-[2.25rem] px-6 py-16 text-center text-white shadow-lift sm:px-12 sm:py-20">
          <Image
            src="/images/lifestyle/paddle.webp"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-900/95 via-brand-700/80 to-teal-600/80" />
          <div className="dot-grid absolute inset-0 -z-10 opacity-40" />
          <p className="font-script text-3xl text-teal-200">Let&apos;s create memories together!</p>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl leading-tight font-medium tracking-tight sm:text-6xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/80">{body}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink(defaultEnquiry)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon size={18} /> WhatsApp us
            </a>
            <a href={primaryOffice.phoneHref} className="btn btn-light">
              <Phone className="size-4" /> {primaryOffice.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
