// schema.org structured data shared across pages. Every node points back to the same
// organisation @id, so Google sees one consistent business behind the whole site.
import type { Destination } from "@/data/destinations";
import { site } from "@/data/site";

export const abs = (path = "/") => new URL(path, site.url).toString();

export const ids = {
  org: abs("/#organization"),
  website: abs("/#website"),
  office: (id: string) => abs(`/#office-${id}`),
};

const logo = { "@type": "ImageObject", url: abs("/brand/mj-logo.png"), width: 500, height: 810 };

/** Organisation, both offices and the website — rendered once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["TravelAgency", "Organization"],
        "@id": ids.org,
        name: site.name,
        alternateName: site.legalName,
        slogan: site.tagline,
        description: site.description,
        url: abs("/"),
        email: site.email,
        logo,
        image: abs("/opengraph-image.jpg"),
        sameAs: [site.instagram.url],
        areaServed: ["IN", "CA"],
        priceRange: "₹₹",
        contactPoint: site.offices.map((o) => ({
          "@type": "ContactPoint",
          telephone: o.phone.replace(/[^\d+]/g, ""),
          contactType: "customer service",
          areaServed: o.address.country,
          email: site.email,
        })),
        subOrganization: site.offices.map((o) => ({ "@id": ids.office(o.id) })),
      },
      ...site.offices.map((o) => ({
        "@type": "TravelAgency",
        "@id": ids.office(o.id),
        name: `${site.name} — ${o.label}`,
        parentOrganization: { "@id": ids.org },
        url: abs("/contact"),
        telephone: o.phone.replace(/[^\d+]/g, ""),
        email: site.email,
        image: abs("/opengraph-image.jpg"),
        logo,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: o.address.street,
          addressLocality: o.address.locality,
          addressRegion: o.address.region,
          postalCode: o.address.postalCode,
          addressCountry: o.address.country,
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`,
      })),
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: abs("/"),
        name: site.name,
        description: site.description,
        inLanguage: "en-IN",
        publisher: { "@id": ids.org },
      },
    ],
  };
}

export type Crumb = { href?: string; label: string };

/** The current page is the last crumb and, per Google's guidelines, needs no URL. */
export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: abs(c.href) } : {}),
    })),
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function touristTrip(d: Destination) {
  const url = abs(`/destinations/${d.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${url}#trip`,
    name: `${d.name} tour package (${d.duration})`,
    description: d.summary,
    url,
    image: abs(d.image),
    touristType: d.idealFor,
    provider: { "@id": ids.org },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: d.itinerary.length,
      itemListElement: d.itinerary.map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "TouristAttraction", name: `Day ${i + 1}: ${day.title}`, description: day.detail },
      })),
    },
    ...(d.price
      ? {
          offers: {
            "@type": "Offer",
            price: d.price.amount,
            priceCurrency: "INR",
            url,
            seller: { "@id": ids.org },
            description: `Per person — ${d.price.note}`,
          },
        }
      : {}),
  };
}

export function serviceList(services: { id: string; title: string; blurb: string }[], areaServed: string[]) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      "@id": abs(`/services#${s.id}`),
      name: s.title,
      description: s.blurb,
      provider: { "@id": ids.org },
      areaServed,
    })),
  };
}
