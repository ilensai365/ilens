// Card "motifs" for the /studio portfolio grid: one tight detail per project (logo, product, face…),
// toned into the same black-and-gold duotone so the grid reads as one calm, dark set.
// The full visuals stay in each project's modal gallery.
// Usage: node scripts/portfolio-motifs.mjs <folder-with-hi-res-pNN.png>  → public/images/work/motifs/<id>.webp
// The page folder holds the portfolio PDF (Desktop/AA NOWE PORTFOLIO AI 2026/bet365) rendered at scale 7
// (~5900 px wide): the covers are too small for tight crops and looked pixelated on retina screens.
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMG = path.join(ROOT, "public", "images");
const OUT = path.join(IMG, "work", "motifs");
const PAGES = process.argv[2];
if (!PAGES) throw new Error("Pass the folder with the hi-res pNN.png page renders");
fs.mkdirSync(OUT, { recursive: true });

// Cover boxes from scripts/portfolio-covers.mjs: [page, x0, y0, x1, y1] as page fractions.
// Motif crops below are fractions of these covers, mapped back onto the hi-res page.
const COVER_BOX = {
  "work/covers/g-volt.webp": [9, 0.6, 0.06, 0.99, 0.5],
  "work/covers/lumiere.webp": [11, 0.367, 0.089, 0.638, 0.346],
  "work/covers/centrum-seo.webp": [3, 0.3, 0.07, 0.99, 0.52],
  "work/covers/cube-casino.webp": [14, 0.4, 0.07, 0.99, 0.62],
  "work/covers/flamart.webp": [16, 0.5, 0.06, 0.99, 0.47],
  "work/covers/property-developer.webp": [4, 0.44, 0.07, 0.99, 0.62],
  "work/covers/tech-webinar.webp": [19, 0.62, 0.06, 0.99, 0.58],
  "work/covers/block-street.webp": [8, 0.44, 0.07, 0.99, 0.56],
  "work/covers/immersive.webp": [18, 0.585, 0.06, 0.99, 0.6],
  "work/covers/finik-family.webp": [12, 0.33, 0.06, 0.8, 0.62],
  "work/covers/summerhill.webp": [13, 0.32, 0.06, 0.99, 0.55],
};

// [project id, source (relative to public/images, or "page:NN" for a hi-res PDF page), crop x0, y0, x1, y1 as fractions of that image]
const MOTIFS = [
  ["luxe-rest", "work/video/luxe-rest-bed.webp", 0.1, 0.2, 0.9, 1.0],
  ["penthouse-tour", "work/video/penthouse-tour.webp", 0.15, 0.05, 0.98, 0.95],
  ["lumiere", "page:11", 0.44, 0.089, 0.64, 0.222], // lips from the key visual (the campaign panels are low-res JPEGs in the PDF)
  ["centrum-seo", "work/covers/centrum-seo.webp", 0.0, 0.1, 0.38, 0.47], // the S mark only: the wordmark would sit under the card title
  ["cube-casino", "work/covers/cube-casino.webp", 0.18, 0.18, 0.62, 0.8],
  ["flamart", "work/covers/flamart.webp", 0.1, 0.12, 0.56, 0.97],
  ["summerhill", "work/covers/summerhill.webp", 0.32, 0.12, 0.67, 0.97],
  ["property-developer", "work/covers/property-developer.webp", 0.08, 0.04, 0.82, 0.72],
  ["tech-webinar", "work/covers/tech-webinar.webp", 0.1, 0.02, 0.62, 0.72],
  ["g-volt", "work/covers/g-volt.webp", 0.28, 0.24, 0.82, 0.86],
  ["finik-family", "work/covers/finik-family.webp", 0.33, 0.08, 0.82, 0.52],
  ["ilens-guides", "../../../../ilens-ebooks/covers/store-dark/build-launch-sell.png", 0.12, 0.2, 0.88, 0.76], // full-size store image
  ["block-street", "work/covers/block-street.webp", 0.05, 0.33, 0.62, 0.97],
  ["immersive", "work/covers/immersive.webp", 0.2, 0.12, 0.76, 0.9],
];

for (const [id, src, ...box] of MOTIFS) {
  let file = path.join(IMG, src);
  let [x0, y0, x1, y1] = box;
  if (src.startsWith("page:")) file = path.join(PAGES, `p${src.slice(5).padStart(2, "0")}.png`); // box = page fractions
  const cover = COVER_BOX[src];
  if (cover) {
    const [page, cx0, cy0, cx1, cy1] = cover;
    file = path.join(PAGES, `p${String(page).padStart(2, "0")}.png`);
    [x0, x1] = [cx0 + x0 * (cx1 - cx0), cx0 + x1 * (cx1 - cx0)];
    [y0, y1] = [cy0 + y0 * (cy1 - cy0), cy0 + y1 * (cy1 - cy0)];
  }
  const { width: W, height: H } = await sharp(file).metadata();
  // sharp runs one fixed pipeline per instance (a second modulate overrides the first), so tone in passes.
  const mono = await sharp(file)
    .extract({ left: Math.round(x0 * W), top: Math.round(y0 * H), width: Math.round((x1 - x0) * W), height: Math.round((y1 - y0) * H) })
    // Short side to 1100 px: small sources get a smooth Lanczos upscale here instead of the browser's blocky one on retina.
    .resize({ width: 1100, height: 1100, fit: "outside", kernel: "lanczos3" })
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
