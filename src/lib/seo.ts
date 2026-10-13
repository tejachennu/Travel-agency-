import { site } from "@/data/site";

/** Google shows roughly 60 characters of a title, so the brand suffix is added only when it fits. */
const MAX_TITLE = 60;

export function pageTitle(title: string): { absolute: string } {
  const branded = `${title} | ${site.name}`;
  return { absolute: title.includes(site.name) || branded.length > MAX_TITLE ? title : branded };
}
