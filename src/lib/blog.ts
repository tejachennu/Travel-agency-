// Blog posts are Markdown files in /content/blog with YAML frontmatter. They are parsed
// and rendered to HTML at build time, so readers download no extra JavaScript.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type RendererObject } from "marked";
import imageDims from "@/data/image-dims.json";
import { blurSrc } from "@/lib/blur";

export const BLOG_DIR = path.join(process.cwd(), "content/blog");

export const categories = [
  { slug: "destination-guides", name: "Destination guides", blurb: "When to go, where to stay and what not to miss." },
  { slug: "itineraries", name: "Itineraries", blurb: "Day-by-day plans you can copy or customise." },
  { slug: "visa-and-documents", name: "Visa & documents", blurb: "Visas, OCI, PCC and passports — explained simply." },
  { slug: "travel-tips", name: "Travel tips", blurb: "Budgets, packing and planning advice from our desk." },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export type PostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  updated: string;
  category: CategorySlug;
  tags: string[];
  destination?: string;
  cover: string;
  coverAlt: string;
  primaryKeyword?: string;
  faqs: { q: string; a: string }[];
  sources: { title: string; url: string }[];
  readingMinutes: number;
  words: number;
};

export type TocItem = { id: string; text: string; level: 2 | 3 };
export type Post = { meta: PostMeta; html: string; toc: TocItem[] };

const dims: Record<string, number[]> = imageDims;

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", apos: "'", nbsp: " " };
const decode = (s: string) =>
  s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (entities[e]) return entities[e];
    if (e[0] === "#") return String.fromCodePoint(e[1] === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return m;
  });
const stripTags = (html: string) => decode(html.replace(/<[^>]+>/g, ""));
const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const toISODate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? "").slice(0, 10));

function render(markdown: string) {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();

  const renderer: RendererObject = {
    heading({ tokens, depth }) {
      const inner = this.parser.parseInline(tokens);
      const text = stripTags(inner);
      let id = slugify(text) || "section";
      const n = used.get(id) ?? 0;
      used.set(id, n + 1);
      if (n) id = `${id}-${n}`;
      if (depth === 2 || depth === 3) toc.push({ id, text, level: depth });
      const level = Math.min(Math.max(depth, 2), 4); // the page title is the only h1
      return `<h${level} id="${id}"><a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${level}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.includes("mjholidays.in");
      const t = title ? ` title="${escapeAttr(title)}"` : "";
      return external
        ? `<a href="${escapeAttr(href)}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
        : `<a href="${escapeAttr(href)}"${t}>${text}</a>`;
    },
    image({ href, title, text }) {
      const size = dims[href];
      const wh = size ? ` width="${size[0]}" height="${size[1]}"` : "";
      const caption = title ? `<figcaption>${title}</figcaption>` : "";
      return `<figure><img src="${escapeAttr(href)}" alt="${escapeAttr(text)}"${wh} loading="lazy" decoding="async" />${caption}</figure>`;
    },
  };

  const md = new Marked({ gfm: true, renderer });
  const html = (md.parse(markdown, { async: false }) as string)
    // Wide tables scroll inside their own box instead of stretching the page.
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");
  return { html, toc };
}

function requireField<T>(file: string, name: string, value: T | undefined | null): T {
  if (value === undefined || value === null || value === "") {
    throw new Error(`Blog post ${file} is missing required frontmatter field "${name}"`);
  }
  return value;
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const category = requireField(file, "category", data.category) as CategorySlug;
  if (!categories.some((c) => c.slug === category)) {
    throw new Error(`Blog post ${file} has unknown category "${category}"`);
  }
  const cover = requireField(file, "cover", data.cover) as string;
  if (!fs.existsSync(path.join(process.cwd(), "public", cover))) {
    throw new Error(`Blog post ${file} cover image not found: ${cover}`);
  }
  if (!fs.existsSync(path.join(process.cwd(), "public", blurSrc(cover)))) {
    throw new Error(`Blog post ${file}: no blurred backdrop for ${cover} — run \`npm run images:dims\``);
  }
  const words = content.split(/\s+/).filter(Boolean).length;
  const { html, toc } = render(content);
  const date = toISODate(requireField(file, "date", data.date));
  return {
    html,
    toc,
    meta: {
      slug,
      title: requireField(file, "title", data.title),
      seoTitle: data.seoTitle ?? data.title,
      description: requireField(file, "description", data.description),
      date,
      updated: data.updated ? toISODate(data.updated) : date,
      category,
      tags: data.tags ?? [],
      destination: data.destination || undefined,
      cover,
      coverAlt: requireField(file, "coverAlt", data.coverAlt),
      primaryKeyword: data.primaryKeyword,
      faqs: data.faqs ?? [],
      sources: data.sources ?? [],
      readingMinutes: Math.max(1, Math.round(words / 220)),
      words,
    },
  };
}

let cache: Post[] | null = null;

function loadAll(): Post[] {
  if (cache) return cache;
  const files = fs.existsSync(BLOG_DIR) ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md")) : [];
  cache = files.map(readPost).sort((a, b) => (a.meta.date < b.meta.date ? 1 : a.meta.date > b.meta.date ? -1 : a.meta.title.localeCompare(b.meta.title)));
  return cache;
}

export function getAllPosts(): PostMeta[] {
  return loadAll().map((p) => p.meta);
}

export function getPost(slug: string): Post | undefined {
  return loadAll().find((p) => p.meta.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getPostsByCategory(slug: string) {
  return getAllPosts().filter((p) => p.category === slug);
}

export function getPostsForDestination(destination: string) {
  return getAllPosts().filter((p) => p.destination === destination);
}

/** Related posts: same destination first, then shared tags, then same category. */
export function getRelatedPosts(meta: PostMeta, limit = 3) {
  return getAllPosts()
    .filter((p) => p.slug !== meta.slug)
    .map((p) => ({
      p,
      score:
        (meta.destination && p.destination === meta.destination ? 5 : 0) +
        p.tags.filter((t) => meta.tags.includes(t)).length * 2 +
        (p.category === meta.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
