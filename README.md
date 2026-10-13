# MJ Holidays — website

A redesigned website for **MJ Holidays** (mjholidays.in, Instagram [@mj_holidays_india](https://www.instagram.com/mj_holidays_india/)), a travel company in Kudasan, Gandhinagar, with an office in Chester, Nova Scotia.

Built with **Next.js 16** (App Router, static generation), **React 19**, **Tailwind CSS v4** and **Motion**.

## What's inside

| Route | What it shows |
| --- | --- |
| `/` | Hero with rotating destination postcards and a quick WhatsApp enquiry bar, destination marquee, why-us + stats, bento grid of international packages, the Bali signature package (real price and inclusions), India "diaries" carousel, Travel / Passport-Visa-OCI services tabs, a marquee of real traveller reviews, Kerala & Kashmir reels, the 4-step booking flow, Instagram feed, FAQ and CTA |
| `/destinations` | All 17 trips, filterable: International (photo cards) / India (Instagram diary cards) |
| `/destinations/[slug]` | Per-trip page: quick facts, highlights, day-by-day itinerary, inclusions, visa notes, sticky WhatsApp quote form, reviews and Instagram posts from that trip, related trips |
| `/services` | Travel services, plus passport, visa, OCI, PCC, passport surrender and Purolator pickup for BLS / IRCC Ottawa |
| `/about` | Story, values, both offices, reviews, Instagram posts |
| `/contact` | Enquiry form that sends via WhatsApp or email, office cards with maps |

You can reach WhatsApp from every page: the floating button, the hero enquiry bar, the trip quote forms and the contact form all open a chat with the message already filled in.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically generated)
npm start
npm run lint
npm run typecheck
```

## Deploy

On **Vercel**, import the repo and deploy; no environment variables are needed. Share links use the Vercel production domain until you set `NEXT_PUBLIC_SITE_URL=https://mjholidays.in` after the domain moves over. You can also run it on any Node host with `npm run build && npm start`.

## Editing content

All copy lives in `src/data/`, so you don't need to touch the components:

- `site.ts`: company name, email, phone numbers, both office addresses, Instagram handle, navigation.
- `destinations.ts`: every trip (summary, duration, best time, highlights, itinerary, inclusions, visa note, optional price). To add a trip, add an object and drop its photo in `public/images/destinations/`.
- `reviews.ts`: traveller reviews, transcribed from the review cards in the Instagram posts.
- `instagram.ts`: the Instagram posts shown on the site. Images live in `public/instagram/<shortcode>.webp`, and each tile links to `instagram.com/p/<shortcode>`.
- `services.ts` and `faqs.ts`: the services and FAQ.

## Where the content came from

- **Company details, services, destination list and destination photos** come from the current mjholidays.in homepage.
- **Logo** is the MJ Holidays logo, cut out to transparent PNGs (`public/brand/`).
- **Trip posters, reviews, the Bali package and reels** come from the @mj_holidays_india Instagram posts.
- Itineraries are suggested starting points written for this site. Every trip says it can be customised.

## Before going live

- [ ] Confirm the **Bali price (₹73,499 per person)**. It is shown as the price from the Valentine's departure, so update or remove it once that offer has ended.
- [ ] The **Kerala reel** carries a third-party creator watermark ("Sarkeet Ajmal"). Confirm you have permission to use it, or swap `public/reels/kerala.mp4` for your own footage.
- [ ] Check the visa notes in `destinations.ts`. Visa rules change often, and the site already tells visitors the team confirms them before booking.
- [ ] Optional: connect the contact form to an email or CRM service (it currently opens WhatsApp or the visitor's email app).
