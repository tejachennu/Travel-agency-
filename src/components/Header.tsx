"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { FlagCA, FlagIN, InstagramIcon, WhatsAppIcon } from "./icons";
import { nav, site } from "@/data/site";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;
  const isActive = (href: string) => {
    const base = href.split("#")[0];
    return base !== "/" && pathname.startsWith(base) && !href.includes("#");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-300",
        // The desktop utility bar slides away with a transform: collapsing its height would re-layout every frame.
        solid && "md:-translate-y-9",
      )}
    >
      {/* Utility bar */}
      <div
        className={cn(
          "hidden bg-brand-950/60 text-[0.78rem] text-white/80 transition-opacity duration-300 md:block",
          solid ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <div className="container-page flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            {site.offices.map((o) => (
              <a key={o.id} href={o.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
                {o.flag === "IN" ? <FlagIN size={15} /> : <FlagCA size={15} />}
                {o.phone}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Mail className="size-3.5" /> {site.email}
            </a>
          </div>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white"
          >
            <InstagramIcon size={14} /> @{site.instagram.handle}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-[background-color,box-shadow] duration-300",
          // Near-opaque instead of backdrop-blur: a blurred sticky bar re-blurs the page under it on every scroll frame.
          solid ? "bg-white/95 shadow-[0_1px_0_rgb(13_17_48/0.06)]" : "bg-transparent",
        )}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <Logo tone={solid ? "dark" : "light"} />

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors xl:px-4",
                  solid ? "text-ink/75 hover:bg-brand-50 hover:text-brand-700" : "text-white/85 hover:bg-white/10 hover:text-white",
                  isActive(item.href) && (solid ? "text-brand-700" : "text-white"),
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-teal-400 xl:inset-x-4" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(defaultEnquiry)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary hidden !px-5 !py-3 text-sm sm:inline-flex"
            >
              Plan my trip <ArrowUpRight className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "grid size-11 place-items-center rounded-full transition-colors lg:hidden",
                solid ? "bg-brand-50 text-brand-700" : "bg-white/15 text-white",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
          <div id="mobile-menu" className="h-[calc(100dvh-4.5rem)] animate-[fade-up_0.25s_ease-out] overflow-y-auto bg-white lg:hidden">
            <nav aria-label="Mobile" className="container-page flex flex-col gap-1 pt-4">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <div key={item.href} className="animate-[fade-up_0.35s_ease-out_both]" style={{ animationDelay: `${i * 40}ms` }}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-brand-50 py-4 font-display text-2xl text-brand-800"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-teal-500" />
                  </Link>
                </div>
              ))}
            </nav>
            <div className="container-page mt-8 space-y-3 pb-10">
              <a
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp w-full"
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </a>
              {site.offices.map((o) => (
                <a key={o.id} href={o.phoneHref} className="btn btn-outline w-full">
                  <Phone className="size-4" /> {o.label}: {o.phone}
                </a>
              ))}
            </div>
          </div>
        )}
    </header>
  );
}
