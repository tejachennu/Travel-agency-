import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock, ListTree, Plus, RefreshCw } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBand } from "@/components/CtaBand";
import { DestinationCard } from "@/components/DestinationCard";
import { WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { getDestination } from "@/data/destinations";
import { site } from "@/data/site";
import { formatDate, getAllPosts, getCategory, getPost, getRelatedPosts } from "@/lib/blog";
import { abs, faqPage, ids } from "@/lib/schema";
import { whatsappLink } from "@/lib/whatsapp";
import { pageTitle } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: pageTitle(meta.seoTitle),
    description: meta.description,
    keywords: [meta.primaryKeyword, ...meta.tags].filter(Boolean) as string[],
    alternates: { canonical: `/blog/${meta.slug}` },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      modifiedTime: meta.updated,
      section: getCategory(meta.category)?.name,
      tags: meta.tags,
      images: [{ url: meta.cover, alt: meta.coverAlt }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [meta.cover] },
  };
}

export default async function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, html, toc } = post;
  const category = getCategory(meta.category)!;
  const destination = meta.destination ? getDestination(meta.destination) : undefined;
  const related = getRelatedPosts(meta, 3);
  const url = abs(`/blog/${meta.slug}`);
  const enquiry = destination
    ? `Hi MJ Holidays! I read your guide "${meta.title}" and would like a quote for a ${destination.name} trip.`
    : `Hi MJ Holidays! I read your guide "${meta.title}" and have a question.`;

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={meta.title}
        intro={meta.description}
        image={meta.cover}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Travel guides" },
          { href: `/blog/category/${category.slug}`, label: category.name },
          { label: meta.title },
        ]}
      >
        <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/70">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" /> Published <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          </span>
          {meta.updated !== meta.date && (
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw className="size-4" /> Updated <time dateTime={meta.updated}>{formatDate(meta.updated)}</time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" /> {meta.readingMinutes} min read
          </span>
          <span>By the {site.name} travel desk</span>
        </p>
      </PageHero>

      <section className="bg-sand py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:gap-14">
          <article className="min-w-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-brand-100 shadow-soft">
              <Image src={meta.cover} alt={meta.coverAlt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
            </div>

            {toc.length > 2 && (
              <details className="group mt-8 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/[0.04] lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-brand-900">
                  <span className="inline-flex items-center gap-2">
                    <ListTree className="size-4 text-teal-500" /> In this guide
                  </span>
                  <Plus className="size-4 transition group-open:rotate-45" />
                </summary>
                <TocList toc={toc} />
              </details>
            )}

            <div className="prose-mj mt-10 rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-black/[0.04] sm:p-10" dangerouslySetInnerHTML={{ __html: html }} />

            {meta.faqs.length > 0 && (
              <section aria-labelledby="faqs" className="mt-10">
                <h2 id="faqs" className="font-display text-3xl font-medium text-brand-900">
                  Frequently asked questions
                </h2>
                <div className="mt-5 divide-y divide-sand-200 rounded-3xl bg-white px-6 shadow-soft ring-1 ring-black/[0.04]">
                  {meta.faqs.map((f) => (
                    <details key={f.q} className="group py-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-brand-900">
                        <h3 className="text-lg font-semibold">{f.q}</h3>
                        <Plus className="mt-1 size-5 shrink-0 text-teal-500 transition group-open:rotate-45" />
                      </summary>
                      <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {meta.sources.length > 0 && (
              <section aria-labelledby="sources" className="mt-10 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/[0.04]">
                <h2 id="sources" className="text-sm font-bold tracking-[0.14em] text-muted uppercase">
                  Sources &amp; official links
                </h2>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {meta.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-teal-700 underline decoration-teal-200 underline-offset-2 hover:decoration-teal-500">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted">
                  Rules, fees and timings change. We check them before every booking — always confirm with us or the official source before you travel.
                </p>
              </section>
            )}

            <aside className="mt-10 flex flex-col gap-4 rounded-3xl bg-brand-950 p-7 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-2xl">Want this trip planned for you?</p>
                <p className="mt-1 text-sm text-white/70">Share your dates — we&apos;ll send a personalised itinerary and quote.</p>
              </div>
              <a href={whatsappLink(enquiry)} target="_blank" rel="noreferrer" className="btn btn-whatsapp shrink-0">
                <WhatsAppIcon size={18} /> Ask on WhatsApp
              </a>
            </aside>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            {toc.length > 2 && (
              <nav aria-label="Table of contents" className="hidden rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/[0.04] lg:block">
                <p className="flex items-center gap-2 font-semibold text-brand-900">
                  <ListTree className="size-4 text-teal-500" /> In this guide
                </p>
                <TocList toc={toc} />
              </nav>
            )}
            {destination && (
              <div>
                <p className="mb-3 text-xs font-bold tracking-[0.14em] text-muted uppercase">Our {destination.name} package</p>
                <DestinationCard destination={destination} className="h-80" sizes="320px" />
              </div>
            )}
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-medium text-brand-900 sm:text-4xl">Keep reading</h2>
              <Link href="/blog" className="btn btn-outline">
                All guides <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          mainEntityOfPage: url,
          url,
          headline: meta.title,
          description: meta.description,
          image: [abs(meta.cover)],
          datePublished: meta.date,
          dateModified: meta.updated,
          wordCount: meta.words,
          inLanguage: "en-IN",
          articleSection: category.name,
          keywords: [meta.primaryKeyword, ...meta.tags].filter(Boolean).join(", "),
          author: { "@type": "Organization", name: `${site.name} travel desk`, url: abs("/about") },
          publisher: { "@id": ids.org },
          ...(destination ? { about: { "@type": "Place", name: destination.name } } : {}),
        }}
      />
      {meta.faqs.length > 0 && <JsonLd data={faqPage(meta.faqs)} />}
    </>
  );
}

function TocList({ toc }: { toc: { id: string; text: string; level: 2 | 3 }[] }) {
  return (
    <ol className="mt-4 space-y-2 text-sm">
      {toc.map((t) => (
        <li key={t.id} className={t.level === 3 ? "pl-4" : ""}>
          <a href={`#${t.id}`} className="text-muted transition hover:text-brand-700">
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
