import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f0",
    theme_color: "#11143d",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
