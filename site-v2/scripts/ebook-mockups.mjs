// Ebook mockups for the studio page (hero cards, "iLens Guides" project, ebook service card).
// Source: ilens-ebooks/covers (store-dark/*.png = dark 4:5 store images, *-mockup-*.png = 1200² scenes).
// Usage: node scripts/ebook-mockups.mjs → public/images/ebooks/*.webp
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "..", "..", "ilens-ebooks", "covers");
const OUT = path.join(ROOT, "public", "images", "ebooks");
fs.mkdirSync(OUT, { recursive: true });

const FILES = [
  ["store-dark/build-launch-sell.png", "bundle", 1000],
  ["store-dark/ai-content-system.png", "ai-content-system", 800],
  ["store-dark/the-24-hour-ebook.png", "24-hour-ebook", 800],
  ["build-launch-sell-mockup-collection.png", "collection", 1200],
  ["build-launch-sell-mockup-stack.png", "stack", 1200],
  ["ai-content-system-mockup-devices.png", "devices", 1200],
  ["ai-content-system-mockup-spread.png", "spread", 1200],
];
for (const [src, id, w] of FILES) {
  await sharp(path.join(SRC, src)).resize({ width: w, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(OUT, id + ".webp"));
  console.log(id);
}
