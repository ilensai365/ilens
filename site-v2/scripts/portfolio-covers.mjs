// One strong single-shot "cover" per project (the card image); the full collages stay in the project gallery.
// Covers get one shared dark grade (darker, desaturated, a touch more contrast) so light mockups sit
// calmly on the black site; the card lifts the grade on hover.
// Usage: node scripts/portfolio-covers.mjs <folder-with-pNN.png>  → public/images/work/covers/<id>.webp
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "images", "work", "covers");
const SRC = process.argv[2];
if (!SRC) throw new Error("Pass the folder with the pNN.png page renders");

// [project id, page, x0, y0, x1, y1] as fractions of the page
const COVERS = [
  ["g-volt", 9, 0.6, 0.06, 0.99, 0.5],
  ["lumiere", 11, 0.36, 0.06, 0.99, 0.58],
  ["centrum-seo", 3, 0.3, 0.07, 0.99, 0.52],
  ["cube-casino", 14, 0.4, 0.07, 0.99, 0.62],
  ["flamart", 16, 0.5, 0.06, 0.99, 0.47],
  ["property-developer", 4, 0.44, 0.07, 0.99, 0.62],
  ["tech-webinar", 19, 0.62, 0.06, 0.99, 0.58],
  ["block-street", 8, 0.44, 0.07, 0.99, 0.56],
  ["immersive", 18, 0.585, 0.06, 0.99, 0.6],
  ["finik-family", 12, 0.33, 0.06, 0.8, 0.62],
  ["summerhill", 13, 0.32, 0.06, 0.99, 0.55],
];

fs.mkdirSync(OUT, { recursive: true });
for (const [id, page, x0, y0, x1, y1] of COVERS) {
  const img = sharp(path.join(SRC, `p${String(page).padStart(2, "0")}.png`));
  const { width, height } = await img.metadata();
  await img
    .extract({ left: Math.round(x0 * width), top: Math.round(y0 * height), width: Math.round((x1 - x0) * width), height: Math.round((y1 - y0) * height) })
    .resize({ width: 1600, withoutEnlargement: true })
    .modulate({ brightness: 0.62, saturation: 0.7 })
    .linear(1.12, -10)
    .webp({ quality: 82 })
    .toFile(path.join(OUT, `${id}.webp`));
  console.log(id);
}
