import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getAllPosts } from "@/lib/blog";

export function LatestGuides() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="bg-sand py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Travel guides"
            title={
              <>
                Plan smarter with <em className="text-gradient font-normal">our free guides</em>
              </>
            }
            intro="Visa rules for Indian passport holders, day-by-day itineraries and OCI help for NRIs in Canada — kept up to date by our team in Gandhinagar."
          />
          <Link href="/blog" className="btn btn-outline self-start md:self-auto">
            All guides <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
