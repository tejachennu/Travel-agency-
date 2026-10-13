import { getAllPosts } from "@/lib/blog";
import { abs } from "@/lib/schema";
import { site } from "@/data/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${abs(`/blog/${p.slug}`)}</link>
      <guid>${abs(`/blog/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} Travel Guides</title>
    <link>${abs("/blog")}</link>
    <atom:link href="${abs("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>Itineraries, visa explainers and travel tips from ${esc(site.name)}.</description>
    <language>en-in</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
