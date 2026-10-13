// Records the pixel size of every image under /public so pages can reserve space
// for them (no layout shift). Run after adding images: npm run images:dims
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.join(process.cwd(), "public");
const exts = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (exts.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const dims = {};
for (const file of (await walk(root)).sort()) {
  const { width, height } = await sharp(file).metadata();
  dims["/" + path.relative(root, file).split(path.sep).join("/")] = [width, height];
}
await writeFile(path.join(process.cwd(), "src/data/image-dims.json"), JSON.stringify(dims, null, 2) + "\n");
console.log(`Recorded ${Object.keys(dims).length} images`);
