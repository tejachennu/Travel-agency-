# MJ Holidays — website

A redesigned website for **MJ Holidays** (mjholidays.in, Instagram [@mj_holidays_india](https://www.instagram.com/mj_holidays_india/)), a travel company in Kudasan, Gandhinagar, with an office in Chester, Nova Scotia.

Built with **Next.js 16** (App Router, static generation), **React 19** and **Tailwind CSS v4**. Motion powers only the home hero card deck; every other animation is plain CSS, so inner pages ship close to the Next.js minimum JavaScript.

## What's inside

| Route | What it shows |
| --- | --- |
| `/` | Hero with rotating destination postcards and a quick WhatsApp enquiry bar, destination marquee, why-us + stats, bento grid of international packages, the Bali signature package (real price and inclusions), India "diaries" carousel, Travel / Passport-Visa-OCI services tabs, a marquee of real traveller reviews, Kerala & Kashmir reels, the 4-step booking flow, Instagram feed, FAQ and CTA |
| `/destinations` | All 17 trips, filterable: International (photo cards) / India (Instagram diary cards) |
| `/destinations/[slug]` | Per-trip page: quick facts, highlights, day-by-day itinerary, inclusions, visa notes, sticky WhatsApp quote form, reviews and Instagram posts from that trip, related trips |
| `/services` | Travel services, plus passport, visa, OCI, PCC, passport surrender and Purolator pickup for BLS / IRCC Ottawa |
| `/about` | Story, values, both offices, reviews, Instagram posts |
| `/contact` | Enquiry form that sends via WhatsApp or email, office cards with maps |
| `/blog` | Travel guides: featured post, category filters, RSS at `/blog/rss.xml` |
| `/blog/[slug]` | Long-form guide with table of contents, FAQs, sources, related guides and a link to the matching tour package |
| `/blog/category/[category]` | Destination guides, Itineraries, Visa & documents, Travel tips |

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

On **Vercel**, import the repo and deploy; no environment variables are required. Optional variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain, e.g. `https://mjholidays.in`. Until it's set, links use the Vercel production domain. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag token |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools token |
 You can also run it on any Node host with `npm run build && npm start`.

## Editing content

All copy lives in `src/data/`, so you don't need to touch the components:

- `site.ts`: company name, email, phone numbers, both office addresses, Instagram handle, navigation.
- `destinations.ts`: every trip (summary, duration, best time, highlights, itinerary, inclusions, visa note, optional price). To add a trip, add an object and drop its photo in `public/images/destinations/`.
- `reviews.ts`: traveller reviews, transcribed from the review cards in the Instagram posts.
- `instagram.ts`: the Instagram posts shown on the site. Images live in `public/instagram/<shortcode>.webp`, and each tile links to `instagram.com/p/<shortcode>`.
- `services.ts` and `faqs.ts`: the services and FAQ.

## Writing a blog post

Each post is one Markdown file in `content/blog/`. The file name is the URL (`content/blog/kerala-itinerary-6-days.md` becomes `/blog/kerala-itinerary-6-days`). Copy an existing post and change this frontmatter:

```yaml
---
title: "Kerala Itinerary for 6 Days: Munnar, Thekkady, Alleppey Houseboat and Kochi"  # the H1
seoTitle: "Kerala Itinerary 6 Days: Munnar, Thekkady & Houseboat"  # optional, ≤60 chars, for Google
description: "140–160 characters. This becomes the Google snippet, so make people want to click."
date: 2026-10-08
updated: 2026-11-02            # optional; set it when you refresh facts (Google likes fresh pages)
category: itineraries          # destination-guides | itineraries | visa-and-documents | travel-tips
destination: kerala            # optional; links the post to /destinations/kerala and back
primaryKeyword: "kerala itinerary 6 days"
tags: ["Kerala", "Munnar"]
cover: /images/destinations/kerala.webp   # must exist in public/
coverAlt: "Describe the photo for screen readers and Google Images"
faqs:                          # become FAQ rich-result markup
  - q: "Is 6 days enough for Kerala?"
    a: "Plain-text answer in 1–3 sentences."
sources:
  - title: "Kerala Tourism (official)"
    url: "https://www.keralatourism.org"
---
```

- Start the body with a short intro and a `> **The short version:** …` box that answers the question straight away. Google often lifts it as a featured snippet.
- Use `##` and `###` headings; they build the table of contents automatically. Don't add an H1.
- Link to the matching `/destinations/<slug>` page, 2–3 related guides and `/contact`.
- If you add a new image to `public/`, run `npm run images:dims` so it gets width and height (avoids layout shift).
- The build stops with a clear error if a required field is missing or the cover image doesn't exist.

## SEO: what's built in

- **Static HTML for every page**, with per-page titles, descriptions, canonical URLs, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`, a web manifest and an RSS feed.
- **Structured data (JSON-LD):** TravelAgency with both offices, addresses, phones and Instagram; WebSite; BreadcrumbList on inner pages; TouristTrip and FAQPage on every tour package; BlogPosting and FAQPage on every guide; Service list on `/services`.
- **Local keywords in titles:** "Travel Agency in Gandhinagar", "Tour Package from Ahmedabad", "Travel Agent in Kudasan".
- **Internal linking:** destination pages link to their guides ("Read before you go"), guides link back to the package, the home page shows the latest guides, and every guide links to related guides.
- **Speed:** AVIF/WebP images sized per breakpoint, two self-hosted font families, CSS-only scroll animations, `content-visibility` for below-the-fold sections and long cache headers on static assets.

## SEO playbook: what the team needs to do

The code is the foundation. Rankings for "travel agency in Gandhinagar" and "Dubai tour package from Ahmedabad" mostly come from the steps below. No one can guarantee a #1 position, but these are the steps that move local travel businesses up.

**Week 1 (most important)**

1. **Google Business Profile.** Claim or verify the Kudasan office at business.google.com: category *Travel agency*, plus *Visa consultant* and *Passport agent* as secondary categories. Add hours, phone, WhatsApp, website, 20+ real photos (office, team, trips) and every service. Use exactly the same name, address and phone as the website footer. Then do the same for the Chester, NS office.
2. **Google Search Console.** Add the domain, verify it (or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel to the token and redeploy) and submit `https://mjholidays.in/sitemap.xml`. Do the same in Bing Webmaster Tools (`NEXT_PUBLIC_BING_SITE_VERIFICATION`).
3. **Domain.** Point mjholidays.in at Vercel, set `NEXT_PUBLIC_SITE_URL=https://mjholidays.in` and redeploy, so canonical URLs, the sitemap and structured data use the real domain. Redirect `www` to the bare domain (or the other way), not both.
4. **Analytics.** Turn on Vercel Analytics / Speed Insights or add GA4 to see which guides bring enquiries.

**Every week**

- **Reviews are the #1 local ranking factor you control.** After every trip, send the customer the Google review link on WhatsApp. Aim for a steady flow (5–10 a month) and reply to every review. Ask happy customers to mention the destination ("our Dubai trip").
- **Post on Google Business Profile** (offers, trip photos, new guides). Reuse the Instagram posts.
- **One new guide a week** from the calendar below. Refresh visa posts when rules change and set `updated:`.

**Backlinks and citations (monthly)**

- Consistent listings on JustDial, Sulekha, IndiaMART, TripAdvisor, Yelp Canada and Canada411. Use the same name, address and phone everywhere.
- Gujarati and Indo-Canadian community sites and associations in Halifax/Nova Scotia; temples and cultural associations often list services.
- Partners: hotels and DMCs you book (ask for a "trusted agent" listing), BLS partner listings, local wedding planners (honeymoons).
- Pitch useful guides (OCI in Canada, passport surrender) to Indo-Canadian newspapers and Facebook groups.

## Editorial calendar: next guides to write

| Priority | Working title | Target keyword |
| --- | --- | --- |
| 1 | Dubai Visa for Indians 2026: Types, Fees & Documents | dubai visa for indians |
| 1 | Singapore Visa for Indians: How It Works Through Agents | singapore visa for indians |
| 1 | Bali Visa on Arrival for Indians + Tourist Levy | bali visa for indians |
| 1 | Indian PCC in Canada: BLS Process, Fees & Timeline | pcc canada indian passport |
| 1 | Indian Passport Renewal in Canada (Tatkal vs Normal) | indian passport renewal canada |
| 2 | Thailand Itinerary 5 Nights: Pattaya, Bangkok & Phuket | thailand itinerary 5 nights |
| 2 | Dubai Itinerary 5 Days with Kids | dubai itinerary 5 days family |
| 2 | Nepal Trip from India: Kathmandu, Pokhara & Chitwan | nepal tour package from ahmedabad |
| 2 | Hong Kong & Macau Itinerary for Indians | hong kong itinerary 5 days |
| 2 | Kashmir Itinerary 6 Days: Srinagar, Gulmarg, Pahalgam | kashmir itinerary 6 days |
| 2 | Best Honeymoon Destinations from India Under ₹1.5 Lakh | honeymoon destinations from india |
| 3 | Weekend Getaways from Ahmedabad (Polo Forest, Saputara, Mount Abu) | weekend getaways from ahmedabad |
| 3 | Rann Utsav Guide: Dates, Tent City & How to Reach | rann utsav package |
| 3 | Best International Trips from Ahmedabad Under ₹1 Lakh | international trip under 1 lakh |
| 3 | Leh Ladakh Road Trip Itinerary | leh ladakh itinerary |
| 3 | Andaman Honeymoon Itinerary | andaman honeymoon package |
| 3 | Char Dham Yatra Guide for Gujarati Families | char dham yatra package from ahmedabad |
| 3 | Vande Bharat / Flights: Ahmedabad to Goa Travel Options | ahmedabad to goa |

Destination guides to pair with every package page (`/destinations/<slug>`) still missing a guide: Hong Kong, Nepal, Punta Cana, Malaysia (standalone).

## Where the content came from

- **Company details, services, destination list and destination photos** come from the current mjholidays.in homepage.
- **Logo** is the MJ Holidays logo, cut out to transparent PNGs (`public/brand/`).
- **Trip posters, reviews, the Bali package and reels** come from the @mj_holidays_india Instagram posts.
- Itineraries are suggested starting points written for this site. Every trip says it can be customised.

## Before going live

- [ ] Confirm the **Bali price (₹73,499 per person)**. It is shown as the price from the Valentine's departure, so update or remove it once that offer has ended.
- [ ] The **Kerala reel** carries a third-party creator watermark ("Sarkeet Ajmal"). Confirm you have permission to use it, or swap `public/reels/kerala.mp4` for your own footage.
- [ ] OCI applications in Canada now need an in-person biometrics visit to BLS (since April 2026). The site says so, but confirm how you want to describe the Purolator service for OCI customers.
- [ ] Check the visa notes in `destinations.ts` and the visa guides in `content/blog/`. Visa rules change often, and the site already tells visitors the team confirms them before booking.
- [ ] Send the office opening hours (and a Google Maps pin for each office) so they can go into `site.ts` and the structured data. They must match Google Business Profile exactly.
- [ ] Optional: connect the contact form to an email or CRM service (it currently opens WhatsApp or the visitor's email app).
