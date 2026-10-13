import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { categories, getAllPosts } from "@/lib/blog";
import { abs, ids } from "@/lib/schema";
import { pageTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: pageTitle("Travel Guides, Itineraries & Visa Tips"),
  description:
    "Free travel guides from MJ Holidays: day-by-day itineraries, visa rules for Indian passport holders, OCI and PCC help for NRIs in Canada, and trip tips.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Travel guides"
        title={
          <>
            Plan smarter, <em className="text-gradient-light font-normal">travel happier</em>
          </>
        }
        intro="Honest itineraries, visa explainers and money-saving tips from the MJ Holidays travel desk in Gandhinagar — written for travellers from Gujarat, India and the Indian community in Canada."
        image="/images/destinations/vietnam.webp"
        crumbs={[{ href: "/", label: "Home" }, { label: "Travel guides" }]}
      >
        <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/15 transition hover:bg-white/20">
              {c.name}
            </Link>
          ))}
        </nav>
      </PageHero>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page">
          {featured ? (
            <>
              <BlogCard post={featured} featured />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <BlogCard key={p.slug} post={p} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-muted">New guides are on their way.</p>
          )}
        </div>
      </section>

      <CtaBand title="Rather have us plan it?" body="Tell us where you want to go — we'll turn these guides into your personal itinerary, with flights, stays and visas sorted." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": abs("/blog#blog"),
          url: abs("/blog"),
          name: "MJ Holidays Travel Guides",
          publisher: { "@id": ids.org },
          inLanguage: "en-IN",
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: abs(`/blog/${p.slug}`),
            datePublished: p.date,
            dateModified: p.updated,
          })),
        }}
      />
    </>
  );
}
