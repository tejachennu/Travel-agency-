// Single source of truth for company details. Everything below is taken from
// mjholidays.in, the @mj_holidays_india Instagram profile and its posts.

// Absolute base URL for metadata, sitemap and share images. On Vercel this
// follows the deployment's production domain until mjholidays.in points here.
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://mjholidays.in");

export const site = {
  name: "MJ Holidays",
  legalName: "MJHolidays",
  tagline: "Discover Your World",
  promise: "Your Dream Trip, Our Promise!",
  description:
    "MJ Holidays is a Gandhinagar-based travel company with an office in Canada. We plan tailor-made holidays across India and the world, book flights and hotels, and handle passport, visa, OCI and BLS paperwork end to end.",
  url: baseUrl,
  email: "info@mjholidays.in",
  contactPerson: "Jatin Patel",
  instagram: {
    handle: "mj_holidays_india",
    url: "https://www.instagram.com/mj_holidays_india/",
  },
  offices: [
    {
      id: "india",
      label: "India Office",
      city: "Gandhinagar, Gujarat",
      lines: ["B-326, Pramukh Arcade", "Nr. Reliance Cross Road, Kudasan", "Gandhinagar, Gujarat 382421, India"],
      address: {
        street: "B-326, Pramukh Arcade, Nr. Reliance Cross Road, Kudasan",
        locality: "Gandhinagar",
        region: "Gujarat",
        postalCode: "382421",
        country: "IN",
      },
      phone: "+91 97129 83753",
      phoneHref: "tel:+919712983753",
      whatsapp: "919712983753",
      mapQuery: "Pramukh Arcade, Reliance Cross Road, Kudasan, Gandhinagar, Gujarat 382421",
      flag: "IN",
    },
    {
      id: "canada",
      label: "Canada Office",
      city: "Chester, Nova Scotia",
      lines: ["3974 North Street, Unit 3", "Chester, NS B0J 1J0", "Canada"],
      address: {
        street: "3974 North Street, Unit 3",
        locality: "Chester",
        region: "NS",
        postalCode: "B0J 1J0",
        country: "CA",
      },
      phone: "+1 (647) 552-3753",
      phoneHref: "tel:+16475523753",
      whatsapp: "16475523753",
      mapQuery: "3974 North Street, Chester, NS B0J 1J0, Canada",
      flag: "CA",
    },
  ],
} as const;

export const primaryOffice = site.offices[0];

export const nav = [
  { href: "/destinations", label: "Destinations" },
  { href: "/services", label: "Services" },
  { href: "/services#documents", label: "Passport & OCI" },
  { href: "/blog", label: "Travel Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
