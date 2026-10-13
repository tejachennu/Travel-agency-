import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { siteGraph } from "@/lib/schema";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
// Only the weight axis: the optical-size and "soft" axes roughly doubled the font download.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", style: ["normal", "italic"] });
// Handwritten accents only — one weight, and not worth delaying first paint for.
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap", weight: "500", preload: false });

const title = "MJ Holidays — Travel Agency in Gandhinagar | Tour Packages, Flights & Visas";
const description =
  "Travel agency in Kudasan, Gandhinagar with an office in Canada. Customised tour packages from Ahmedabad to Dubai, Bali, Thailand, Kerala & more, plus flights, hotels, visas and OCI help.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | MJ Holidays" },
  description,
  applicationName: site.name,
  keywords: [
    "travel agency in Gandhinagar",
    "travel agent in Kudasan",
    "tour packages from Ahmedabad",
    "international tour packages from Ahmedabad",
    "honeymoon packages from Ahmedabad",
    "Dubai tour package from Ahmedabad",
    "Bali honeymoon package",
    "Kerala tour package from Gujarat",
    "OCI card application Canada",
    "Indian passport surrender Canada",
  ],
  category: "travel",
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", title, description, url: "/" },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Set these in Vercel once the site is added to Google Search Console / Bing Webmaster Tools.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#11143d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <JsonLd data={siteGraph()} />
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
