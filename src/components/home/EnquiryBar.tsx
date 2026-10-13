"use client";

import { useState, type FormEvent } from "react";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/whatsapp";

// Plain month names keep the statically rendered markup stable whatever the build date.
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const travellerOptions = ["1 traveller", "2 travellers", "3 travellers", "4 travellers", "5 travellers", "6–10 travellers", "10+ (group)"];

export type DestinationOption = { name: string; region: "international" | "india" };

export function EnquiryBar({ options }: { options: DestinationOption[] }) {
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [travellers, setTravellers] = useState(travellerOptions[1]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const when = month ? `in ${month}` : "with flexible dates";
    const msg = `Hi MJ Holidays! I'm planning a trip to ${destination || "a destination you recommend"} ${when} for ${travellers}. Please share an itinerary and quote.`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full appearance-none bg-transparent text-[0.95rem] font-semibold text-ink outline-none placeholder:text-ink/40";

  return (
    <form
      onSubmit={submit}
      aria-label="Quick trip enquiry"
      className="relative grid gap-2 rounded-[1.75rem] bg-white p-2.5 text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-black/5 md:grid-cols-[1.3fr_1fr_1fr_auto] md:rounded-full"
    >
      <label className="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition hover:bg-sand md:rounded-full">
        <MapPin className="size-5 shrink-0 text-teal-500" />
        <span className="flex w-full flex-col">
          <span className="text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">Where to?</span>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className={field}>
            <option value="">Anywhere — inspire me</option>
            <optgroup label="International">
              {options
                .filter((d) => d.region === "international")
                .map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </optgroup>
            <optgroup label="India">
              {options
                .filter((d) => d.region === "india")
                .map((d) => (
                  <option key={d.name} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition hover:bg-sand md:rounded-full md:border-l md:border-sand-200">
        <CalendarDays className="size-5 shrink-0 text-teal-500" />
        <span className="flex w-full flex-col">
          <span className="text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">When?</span>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className={field} aria-label="Travel month">
            <option value="">I&apos;m flexible</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition hover:bg-sand md:rounded-full md:border-l md:border-sand-200">
        <Users className="size-5 shrink-0 text-teal-500" />
        <span className="flex w-full flex-col">
          <span className="text-[0.68rem] font-bold tracking-[0.14em] text-muted uppercase">Who?</span>
          <select value={travellers} onChange={(e) => setTravellers(e.target.value)} className={field}>
            {travellerOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </span>
      </label>
      <button type="submit" className="btn btn-primary !py-4 md:!px-7">
        <WhatsAppIcon size={18} /> Get my itinerary
      </button>
    </form>
  );
}
