// Card "motifs" for the /studio portfolio grid: one tight detail per project (logo, product, face…),
// toned into the same black-and-gold duotone so the grid reads as one calm, dark set.
// The full visuals stay in each project's modal gallery.
// Usage: node scripts/portfolio-motifs.mjs → public/images/work/motifs/<id>.webp
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG = path.join(ROOT, "public", "images");
const OUT = path.join(IMG, "work", "motifs");
fs.mkdirSync(OUT, { recursive: true });

// [project id, source (relative to public/images), crop x0, y0, x1, y1 as fractions]
const MOTIFS = [
  ["luxe-rest", "work/video/luxe-rest-bed.webp", 0.2, 0.3, 0.82, 0.98],
  ["penthouse-tour", "work/video/penthouse-tour.webp", 0.3, 0.08, 0.98, 0.85],
  ["lumiere", "work/covers/lumiere.webp", 0.34, 0.0, 0.95, 0.44],
  ["centrum-seo", "work/covers/centrum-seo.webp", 0.02, 0.14, 0.36, 0.64],
  ["cube-casino", "work/covers/cube-casino.webp", 0.18, 0.3, 0.62, 0.64],
  ["flamart", "work/covers/flamart.webp", 0.1, 0.12, 0.56, 0.97],
  ["summerhill", "work/covers/summerhill.webp", 0.32, 0.12, 0.67, 0.97],
  ["property-developer", "work/covers/property-developer.webp", 0.08, 0.04, 0.82, 0.72],
  ["tech-webinar", "work/covers/tech-webinar.webp", 0.1, 0.02, 0.62, 0.72],
  ["g-volt", "work/covers/g-volt.webp", 0.28, 0.24, 0.82, 0.86],
  ["finik-family", "work/covers/finik-family.webp", 0.33, 0.08, 0.82, 0.52],
  ["ilens-guides", "ebooks/bundle.webp", 0.12, 0.2, 0.88, 0.76],
  ["block-street", "work/covers/block-street.webp", 0.05, 0.33, 0.62, 0.97],
  ["immersive", "work/covers/immersive.webp", 0.2, 0.12, 0.76, 0.9],
];

for (const [id, src, x0, y0, x1, y1] of MOTIFS) {
  const file = path.join(IMG, src);
  const { width: W, height: H } = await sharp(file).metadata();
  // sharp runs one fixed pipeline per instance (a second modulate overrides the first), so tone in passes.
  const mono = await sharp(file)
    .extract({ left: Math.round(x0 * W), top: Math.round(y0 * H), width: Math.round((x1 - x0) * W), height: Math.round((y1 - y0) * H) })
    .resize({ width: 1200, withoutEnlargement: true })
    .greyscale()
    .normalise() // even out the already-darkened covers
    .toBuffer();
  // Contrast curve: blacks crush, light backdrops drop to ~110, highlights stay ~150 → a dark motif, not a poster.
  const dark = await sharp(mono).linear(0.76, -42).toColourspace("srgb").toBuffer();
  await sharp(dark)
    .tint("#B39C7A") // warm low-chroma tone (luminance kept): black-and-ivory with a hint of gold
    .webp({ quality: 84 })
    .toFile(path.join(OUT, id + ".webp"));
  console.log(id);
}
