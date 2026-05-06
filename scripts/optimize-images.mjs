#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

const targets = [
  { dir: path.join(PUBLIC_DIR, "imagery"), formats: ["avif", "webp"], avifQ: 50, webpQ: 78 },
  { dir: path.join(PUBLIC_DIR, "logos"), formats: ["avif", "webp"], avifQ: 55, webpQ: 80 },
];

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) continue;
    yield path.join(dir, entry.name);
  }
}

async function processFile(filePath, formats, avifQ, webpQ) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;
  const base = filePath.slice(0, -ext.length);

  for (const format of formats) {
    const out = `${base}.${format}`;
    try {
      await fs.access(out);
      continue;
    } catch {}
    const pipeline = sharp(filePath, { failOn: "none" });
    if (format === "avif") {
      await pipeline.avif({ quality: avifQ, effort: 6 }).toFile(out);
    } else if (format === "webp") {
      await pipeline.webp({ quality: webpQ, effort: 6 }).toFile(out);
    }
    const before = (await fs.stat(filePath)).size;
    const after = (await fs.stat(out)).size;
    const pct = ((1 - after / before) * 100).toFixed(0);
    console.log(`${path.relative(ROOT, out)}  ${(after / 1024).toFixed(1)} KB  (-${pct}% vs source)`);
  }
}

async function compressLogoIso() {
  const src = path.join(PUBLIC_DIR, "logo-iso.png");
  try {
    await fs.access(src);
  } catch {
    return;
  }
  const meta = await sharp(src).metadata();
  const orig = (await fs.stat(src)).size;
  const optimized = await sharp(src)
    .png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 })
    .toBuffer();
  if (optimized.length < orig) {
    await fs.writeFile(src, optimized);
    console.log(
      `logo-iso.png  ${(optimized.length / 1024).toFixed(1)} KB  (was ${(orig / 1024).toFixed(1)} KB, ${meta.width}x${meta.height})`,
    );
  }
  for (const format of ["avif", "webp"]) {
    const out = path.join(PUBLIC_DIR, `logo-iso.${format}`);
    const pipeline = sharp(src);
    if (format === "avif") await pipeline.avif({ quality: 60, effort: 6 }).toFile(out);
    else await pipeline.webp({ quality: 85, effort: 6 }).toFile(out);
    const size = (await fs.stat(out)).size;
    console.log(`logo-iso.${format}  ${(size / 1024).toFixed(1)} KB`);
  }
}

async function main() {
  await compressLogoIso();
  for (const { dir, formats, avifQ, webpQ } of targets) {
    try {
      for await (const file of walk(dir)) {
        await processFile(file, formats, avifQ, webpQ);
      }
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
