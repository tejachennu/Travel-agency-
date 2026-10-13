import Image from "next/image";
import { InstagramIcon } from "./icons";
import { postImage, postUrl, type InstagramPost } from "@/data/instagram";
import { cn } from "@/lib/cn";

/** Grid of real @mj_holidays_india posts, each linking to the post on Instagram. */
export function InstagramGrid({ posts, className }: { posts: InstagramPost[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4", className)}>
      {posts.map((p) => (
        <InstagramTile key={p.code} post={p} />
      ))}
    </div>
  );
}

export function InstagramTile({ post: p, className }: { post: InstagramPost; className?: string }) {
  return (
    <a
      href={postUrl(p.code)}
      target="_blank"
      rel="noreferrer"
      className={cn("group relative block aspect-square overflow-hidden rounded-2xl bg-sand ring-1 ring-black/5", className)}
    >
      <Image
        src={postImage(p.code)}
        alt={p.alt}
        fill
        sizes="(min-width: 768px) 25vw, 50vw"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-950/70 p-4 text-center text-white opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
        <InstagramIcon size={28} />
        <p className="text-sm font-semibold">{p.caption}</p>
      </div>
    </a>
  );
}
