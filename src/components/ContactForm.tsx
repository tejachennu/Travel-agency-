"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const needs = ["Holiday package", "Flights", "Hotels", "Visa", "Passport", "OCI card", "PCC", "Something else"];

const input =
  "w-full rounded-xl border border-sand-200 bg-sand/50 px-4 py-3.5 text-[0.95rem] text-ink outline-none transition placeholder:text-ink/40 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-400/15";
const label = "mb-1.5 block text-sm font-semibold text-brand-900";

export function ContactForm({ destinationNames }: { destinationNames: string[] }) {
  const [need, setNeed] = useState(needs[0]);
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", destination: "", dates: "", travellers: "2", message: "" });
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function compose() {
    return [
      `Hi MJ Holidays! I'm enquiring about: ${need}.`,
      `Name: ${form.name}`,
      form.phone && `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      form.destination && `Destination: ${form.destination}`,
      form.dates && `Travel dates: ${form.dates}`,
      need === "Holiday package" && `Travellers: ${form.travellers}`,
      form.message && `\n${form.message}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value === "email" ? "email" : "whatsapp";
    if (via === "email") {
      const subject = `Enquiry: ${need}${form.destination ? ` — ${form.destination}` : ""}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose())}`;
    } else {
      window.open(whatsappLink(compose()), "_blank", "noopener,noreferrer");
    }
    setSent(via);
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-lift ring-1 ring-black/[0.04] sm:p-10">
      <p className="font-display text-3xl text-brand-900">Tell us about your trip</p>
      <p className="mt-1.5 text-muted">Fill in what you know — we&apos;ll reply with ideas, an itinerary and a quote.</p>

      <fieldset className="mt-8">
        <legend className={label}>I need help with</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNeed(n)}
              aria-pressed={need === n}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                need === n ? "bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgb(42_47_146/0.8)]" : "bg-sand text-ink/70 hover:bg-brand-50 hover:text-brand-700",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Full name *</span>
          <input required className={input} value={form.name} onChange={set("name")} autoComplete="name" placeholder="Your name" />
        </label>
        <label className="block">
          <span className={label}>Phone / WhatsApp *</span>
          <input required className={input} value={form.phone} onChange={set("phone")} autoComplete="tel" inputMode="tel" placeholder="+91 …" />
        </label>
        <label className="block">
          <span className={label}>Email</span>
          <input type="email" className={input} value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className={label}>Destination</span>
          <input className={input} list="destination-options" value={form.destination} onChange={set("destination")} placeholder="Dubai, Bali, Kerala…" />
          <datalist id="destination-options">
            {destinationNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </label>
        <label className="block">
          <span className={label}>Travel dates</span>
          <input className={input} value={form.dates} onChange={set("dates")} placeholder="e.g. 10–17 Dec, or flexible" />
        </label>
        <label className="block">
          <span className={label}>Travellers</span>
          <input type="number" min={1} max={99} className={input} value={form.travellers} onChange={set("travellers")} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Anything else?</span>
          <textarea rows={4} className={cn(input, "resize-none")} value={form.message} onChange={set("message")} placeholder="Budget, hotel preferences, special occasions…" />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button type="submit" value="whatsapp" className="btn btn-whatsapp flex-1">
          <WhatsAppIcon size={18} /> Send on WhatsApp
        </button>
        <button type="submit" value="email" className="btn btn-outline flex-1">
          <Mail className="size-4" /> Send by email
        </button>
      </div>

      {sent && (
          <p
            role="status"
            className="animate-[fade-up_0.3s_ease-out] mt-5 flex items-center gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-700"
          >
            <CheckCircle2 className="size-4 shrink-0" />
            {sent === "whatsapp" ? "WhatsApp opened with your details — just hit send." : "Your email app opened with your details — just hit send."}
          </p>
        )}
    </form>
  );
}
