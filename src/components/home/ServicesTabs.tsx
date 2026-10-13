"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { FlagCA, FlagIN } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { documentPromises, documentServices, travelServices } from "@/data/services";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "travel", label: "Travel services", items: travelServices },
  { id: "documents", label: "Passport, Visa & OCI", items: documentServices },
] as const;

export function ServicesTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("travel");
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <section id="services" className="relative isolate overflow-hidden bg-brand-950 py-24 text-white sm:py-32">
      <div className="absolute top-0 left-1/2 -z-10 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-brand-600/30 blur-[130px]" />
      <div className="dot-grid absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="container-page">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow="BLS services partner"
          title={
            <>
              Your one-stop <em className="text-gradient-light font-normal">travel &amp; paperwork</em> partner
            </>
          }
          intro="We don't just book flights and tours — we take care of your entire journey, from planning to paperwork, in India and Canada."
        />

        <div className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Service categories" className="inline-flex rounded-full bg-white/[0.06] p-1.5 ring-1 ring-white/10">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                onClick={() => setActive(t.id)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:px-7",
                  active === t.id ? "text-brand-900" : "text-white/70 hover:text-white",
                )}
              >
                {active === t.id && (
                  <motion.span layoutId="service-tab" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-12"
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tab.items.map((s, i) => (
                <motion.article
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative overflow-hidden rounded-3xl bg-white/[0.04] p-7 ring-1 ring-white/10 transition hover:bg-white/[0.07] hover:ring-teal-400/40"
                >
                  <div className="absolute -top-16 -right-16 size-40 rounded-full bg-teal-400/0 blur-3xl transition group-hover:bg-teal-400/20" />
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 shadow-[0_10px_30px_-10px_rgb(0_161_155/0.8)]">
                    <s.icon className="size-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{s.blurb}</p>
                  <ul className="mt-5 space-y-2 text-sm text-white/80">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5">
                        <Check className="size-4 shrink-0 text-teal-300" /> {p}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>

            {tab.id === "documents" && (
              <div className="mt-6 grid gap-6 rounded-3xl bg-gradient-to-br from-teal-500/15 to-brand-500/15 p-7 ring-1 ring-white/10 lg:grid-cols-[1fr_auto] lg:items-center">
                <ul className="grid gap-3 text-[0.95rem] text-white/85 md:grid-cols-3">
                  {documentPromises.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 rounded-full bg-teal-400/20 p-0.5 text-teal-200" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <FlagIN size={20} /> <FlagCA size={20} /> Help in India &amp; Canada
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center">
          <Link href={active === "documents" ? "/services#documents" : "/services"} className="btn btn-light">
            Explore all services <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
