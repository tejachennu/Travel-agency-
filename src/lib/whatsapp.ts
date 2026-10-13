import { primaryOffice } from "@/data/site";

/** Builds a wa.me deep link that opens a chat with the India office, pre-filled. */
export function whatsappLink(message?: string, number: string = primaryOffice.whatsapp) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultEnquiry =
  "Hi MJ Holidays! I'd like help planning a trip. Could you share some options?";
