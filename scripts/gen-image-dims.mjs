// Records the pixel size of every image under /public so pages can reserve space
// for them (no layout shift), and writes a tiny pre-blurred copy of every photo to
// /public/blur for soft backdrops — so phones never run a live blur() filter.
// Run after adding images: npm run images:dims
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public");
const blurRoot = path.join(root, "blur");
const exts = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);
const blurDirs = ["images", "instagram"]; // photos that can appear as backdrops

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (full === blurRoot) continue;
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const dims = {};
let blurred = 0;
for (const file of (await walk(root)).sort()) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const { width, height } = await sharp(file).metadata();
  dims["/" + rel] = [width, height];

  if (blurDirs.includes(rel.split("/")[0])) {
    const out = path.join(blurRoot, rel.replace(/\.[^.]+$/, ".webp"));
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(file).resize({ width: 64 }).blur(2.5).webp({ quality: 70 }).toFile(out);
    blurred++;
  }
}
await writeFile(path.join(process.cwd(), "src/data/image-dims.json"), JSON.stringify(dims, null, 2) + "\n");
console.log(`Recorded ${Object.keys(dims).length} images, wrote ${blurred} blurred backdrops`);
