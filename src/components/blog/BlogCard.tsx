import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate, getCategory, type PostMeta } from "@/lib/blog";
import { cn } from "@/lib/cn";

export function BlogCard({ post, featured = false, className }: { post: PostMeta; featured?: boolean; className?: string }) {
  const category = getCategory(post.category);
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-black/[0.04] transition hover:-translate-y-1 hover:shadow-lift", featured && "lg:flex-row", className)}>
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-brand-100", featured && "lg:aspect-auto lg:w-[55%]")}>
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes={featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:p-10")}>
        <p className="text-xs font-bold tracking-[0.16em] text-teal-600 uppercase">{category?.name}</p>
        <h3 className={cn("mt-2 font-display font-medium tracking-tight text-brand-900", featured ? "text-3xl lg:text-4xl" : "text-xl")}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-2 text-muted", featured ? "line-clamp-3 text-base" : "line-clamp-2 text-sm")}>{post.description}</p>
        <p className="mt-auto flex items-center gap-2 pt-5 text-xs font-medium text-muted">
          <time dateTime={post.updated}>{formatDate(post.updated)}</time>
          <span aria-hidden>·</span>
          <Clock className="size-3.5" /> {post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
