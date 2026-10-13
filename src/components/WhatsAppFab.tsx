import { WhatsAppIcon } from "./icons";
import { defaultEnquiry, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(defaultEnquiry)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with MJ Holidays on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex animate-[fab-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)_1.2s_both] items-center gap-3 sm:right-6 sm:bottom-6"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink opacity-0 shadow-lift transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.8)] transition-transform group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 [animation-duration:2.4s]" />
        <WhatsAppIcon size={28} className="relative" />
      </span>
    </a>
  );
}
