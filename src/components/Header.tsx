"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div
        className={cn(
          "hidden overflow-hidden bg-brand-950/60 text-[0.78rem] text-white/80 backdrop-blur transition-all duration-300 md:block",
          solid ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
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
          "transition-all duration-300",
          solid ? "bg-white/85 shadow-[0_1px_0_rgb(13_17_48/0.06)] backdrop-blur-xl" : "bg-transparent",
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
                  "relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors",
                  solid ? "text-ink/75 hover:bg-brand-50 hover:text-brand-700" : "text-white/85 hover:bg-white/10 hover:text-white",
                  isActive(item.href) && (solid ? "text-brand-700" : "text-white"),
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-teal-400"
                  />
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
                solid ? "bg-brand-50 text-brand-700" : "bg-white/10 text-white backdrop-blur",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex flex-col gap-1 pt-4">
              {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-brand-50 py-4 font-display text-2xl text-brand-800"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-teal-500" />
                  </Link>
                </motion.div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
