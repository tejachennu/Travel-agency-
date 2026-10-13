import { InstagramIcon } from "@/components/icons";
import { InstagramGrid } from "@/components/InstagramGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getPost, type InstagramPost } from "@/data/instagram";
import { site } from "@/data/site";

const featured = ["Dbx5Voxg2Uv", "DSKbpjlin92", "DQmBdArigyQ", "DSUw1ERCrZM", "DKwoxC5yGXa", "DSSImffivjf", "DKRCsiYSsep", "DKmtsbdSP61"];

export function InstagramFeed() {
  const posts = featured.map(getPost).filter((p): p is InstagramPost => Boolean(p));
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="On Instagram"
            title={
              <>
                Follow the journey <em className="text-gradient font-normal">@{site.instagram.handle}</em>
              </>
            }
            intro="Trip diaries, happy customers and fresh offers — straight from our feed."
          />
          <Reveal>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="btn bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-[0_12px_30px_-10px_rgb(221_42_123/0.7)] hover:-translate-y-0.5"
            >
              <InstagramIcon size={18} /> Follow us
            </a>
          </Reveal>
        </div>
        <Reveal className="mt-12">
          <InstagramGrid posts={posts} />
        </Reveal>
      </div>
    </section>
  );
}
