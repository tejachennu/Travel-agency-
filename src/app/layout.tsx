import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/data/site";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap", weight: ["500", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MJ Holidays — Tailor-made Holidays, Flights, Hotels & OCI Services",
    template: "%s · MJ Holidays",
  },
  description: site.description,
  keywords: [
    "MJ Holidays",
    "travel agency Gandhinagar",
    "travel agent Kudasan",
    "tour packages from Ahmedabad",
    "Dubai package",
    "Bali honeymoon package",
    "Kerala tour",
    "OCI application Canada",
    "Indian PCC Canada",
    "passport surrender Canada",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: "MJ Holidays — Discover Your World",
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: "MJ Holidays — Discover Your World", description: site.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#11143d",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  email: site.email,
  logo: `${site.url}/brand/mj-logo.png`,
  sameAs: [site.instagram.url],
  location: site.offices.map((o) => ({
    "@type": "Place",
    name: `${site.name} — ${o.label}`,
    telephone: o.phone,
    address: { "@type": "PostalAddress", streetAddress: o.lines.slice(0, 2).join(", "), addressLocality: o.city },
  })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-white px-4 py-2 font-semibold text-brand-700 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
