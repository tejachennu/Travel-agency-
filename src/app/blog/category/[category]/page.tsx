import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { categories, getCategory, getPostsByCategory } from "@/lib/blog";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/category/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return {
    title: `${c.name} — Travel Guides`,
    description: `${c.blurb} Practical ${c.name.toLowerCase()} from the MJ Holidays travel desk in Gandhinagar.`,
    alternates: { canonical: `/blog/category/${c.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/blog/category/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const posts = getPostsByCategory(c.slug);

  return (
    <>
      <PageHero
        eyebrow="Travel guides"
        title={c.name}
        intro={c.blurb}
        crumbs={[{ href: "/", label: "Home" }, { href: "/blog", label: "Travel guides" }, { label: c.name }]}
      />
      <section className="bg-sand py-16 sm:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
          {!posts.length && <p className="text-muted">New guides in this category are on their way.</p>}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
