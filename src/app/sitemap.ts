import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { categories, getAllPosts } from "@/lib/blog";
import { abs } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts.reduce((d, p) => (p.updated > d ? p.updated : d), "2026-10-13");
  const page = (path: string, priority: number, lastModified = latest): MetadataRoute.Sitemap[number] => ({
    url: abs(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/destinations", 0.9),
    ...destinations.map((d) => page(`/destinations/${d.slug}`, 0.85)),
    page("/services", 0.8),
    page("/about", 0.6),
    page("/contact", 0.7),
    page("/blog", 0.8),
    ...categories.map((c) => page(`/blog/category/${c.slug}`, 0.5)),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.75, p.updated)),
  ];
}
