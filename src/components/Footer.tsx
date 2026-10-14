import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { FlagCA, FlagIN, InstagramIcon, WhatsAppIcon } from "./icons";
import { site } from "@/data/site";
import { indiaDestinations, internationalDestinations } from "@/data/destinations";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";

const explore = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "All destinations" },
  { href: "/services", label: "Travel services" },
  { href: "/services#documents", label: "Passport, Visa & OCI" },
  { href: "/blog", label: "Travel guides" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-950 text-white/70">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 glow text-teal-500/20" />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-page relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed">
              Flights, hotels, tailor-made holidays and passport, visa &amp; OCI services — one trusted team in India and
              Canada, planning every detail of your journey.
            </p>
            <p className="mt-6 font-script text-3xl text-teal-300">{site.promise}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
                aria-label="MJ Holidays on Instagram"
                className="grid size-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/15 transition hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af] hover:text-white"
              >
                <InstagramIcon />
              </a>
              <a
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="grid size-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/15 transition hover:bg-[#25D366] hover:text-white"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email MJ Holidays"
                className="grid size-11 place-items-center rounded-full bg-white/5 ring-1 ring-white/15 transition hover:bg-teal-500 hover:text-white"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {explore.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="transition hover:text-teal-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white">International</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {internationalDestinations.slice(0, 7).map((d) => (
                  <li key={d.slug}>
                    <Link href={`/destinations/${d.slug}`} className="transition hover:text-teal-300">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-white">India</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {indiaDestinations.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/destinations/${d.slug}`} className="transition hover:text-teal-300">
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-4">
            {site.offices.map((o) => (
              <div key={o.id} className="rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  {o.flag === "IN" ? <FlagIN /> : <FlagCA />} {o.label}
                </div>
                <p className="mt-3 flex gap-2.5 text-sm leading-relaxed">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-teal-300" />
                  <span>{o.lines.join(", ")}</span>
                </p>
                <a href={o.phoneHref} className="mt-2 flex items-center gap-2.5 text-sm transition hover:text-teal-300">
                  <Phone className="size-4 text-teal-300" /> {o.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden className="mt-16 select-none font-display text-[13vw] leading-none font-semibold tracking-tight text-white/[0.04] lg:text-[9.5rem]">
          Discover Your World
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Mail className="size-3.5" />
            <a href={`mailto:${site.email}`} className="hover:text-teal-300">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
