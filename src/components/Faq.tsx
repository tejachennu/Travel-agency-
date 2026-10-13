import { Plus } from "lucide-react";

/** Native <details> accordion: accessible, zero JavaScript, first item open. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-sand-200 rounded-3xl bg-white px-6 shadow-soft ring-1 ring-black/[0.04] sm:px-8">
      {items.map((item, i) => (
        <details key={item.q} className="group py-6" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-semibold text-brand-900">{item.q}</h3>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand text-brand-600 transition-all duration-300 group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="animate-[fade-up_0.3s_ease-out] pt-4 pr-12 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
