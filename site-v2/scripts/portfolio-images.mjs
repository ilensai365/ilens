// Crops the project visuals out of the portfolio PDF page renders (text column and footers removed)
// and writes web-ready WebP files for the /studio page.
// Usage: node scripts/portfolio-images.mjs <folder-with-pNN.png>  → public/images/work/<name>.webp
// Page renders come from the portfolio PDF (Desktop/AA NOWE PORTFOLIO AI 2026/bet365) via pdf-to-img at scale 2.4.
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "images", "work");
const SRC = process.argv[2];
if (!SRC) throw new Error("Pass the folder with the pNN.png page renders");

// [output name, page, crop box as fractions of the page: x0, y0, x1, y1]
const CROPS = [
  ["centrum-seo", 3, 0.31, 0.07, 0.99, 0.95],
  ["property-developer", 4, 0.33, 0.07, 0.99, 0.93],
  ["block-street", 8, 0.33, 0.07, 0.99, 0.94],
  ["g-volt", 9, 0.335, 0.07, 0.99, 0.95],
  ["g-volt-campaign", 10, 0.33, 0.07, 0.99, 0.95],
  ["lumiere", 11, 0.33, 0.06, 0.99, 0.95],
  ["finik-family", 12, 0.32, 0.06, 0.99, 0.62],
  ["summerhill", 13, 0.29, 0.06, 0.99, 0.95],
  ["cube-casino", 14, 0.33, 0.07, 0.99, 0.93],
  ["flamart-catalogue", 15, 0.31, 0.06, 0.99, 0.95],
  ["flamart", 16, 0.29, 0.06, 0.99, 0.95],
  ["immersive", 18, 0.53, 0.06, 0.99, 0.6],
  ["tech-webinar", 19, 0.36, 0.06, 0.99, 0.95],
];

fs.mkdirSync(OUT, { recursive: true });
for (const [name, page, x0, y0, x1, y1] of CROPS) {
  const file = path.join(SRC, `p${String(page).padStart(2, "0")}.png`);
  const img = sharp(file);
  const { width, height } = await img.metadata();
  const left = Math.round(x0 * width), top = Math.round(y0 * height);
  const w = Math.round((x1 - x0) * width), h = Math.round((y1 - y0) * height);
  await img.extract({ left, top, width: w, height: h }).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, `${name}.webp`));
  const kb = Math.round(fs.statSync(path.join(OUT, `${name}.webp`)).size / 1024);
  console.log(`${name}.webp  ${w}x${h} → ${kb} KB`);
}
