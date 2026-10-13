"use client";

import { useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { primaryOffice } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

const input =
  "w-full rounded-xl border border-sand-200 bg-sand/60 px-4 py-3 text-[0.95rem] text-ink outline-none transition placeholder:text-ink/40 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-400/15";

export function TripEnquiryCard({ destination, duration }: { destination: string; duration: string }) {
  const [name, setName] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [when, setWhen] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const lines = [
      `Hi MJ Holidays! I'd like a quote for the ${destination} trip (${duration}).`,
      name && `Name: ${name}`,
      `Travellers: ${travellers}`,
      when && `Travel dates: ${when}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-lift ring-1 ring-black/[0.04] sm:p-7">
      <p className="font-display text-2xl text-brand-900">Plan this trip</p>
      <p className="mt-1 text-sm text-muted">Get a personalised itinerary &amp; quote on WhatsApp.</p>
      <div className="mt-5 space-y-3">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input className={input} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-muted">Travellers</span>
            <input className={input} type="number" min={1} max={99} value={travellers} onChange={(e) => setTravellers(e.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-muted">When</span>
            <input className={input} placeholder="e.g. Dec 2026" value={when} onChange={(e) => setWhen(e.target.value)} />
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-whatsapp mt-5 w-full">
        <WhatsAppIcon size={18} /> Get my quote
      </button>
      <a href={primaryOffice.phoneHref} className="btn btn-outline mt-2.5 w-full">
        <Phone className="size-4" /> {primaryOffice.phone}
      </a>
    </form>
  );
}
