// Generates the "midnight" edition of the product covers for the dark site:
// one graphite background, ivory type and gold accents, so all covers read as one series.
// Usage: node scripts/dark-covers.mjs [accentHex] [outDirName]  → public/images/dark/*.svg (sources: public/images/*.svg)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "public", "images");
const OUT = path.join(SRC, process.argv[3] || "dark");

const BG = "#1B1914"; // a touch lighter than the page (#0E0D0B) so the book edge still reads
const INK = "#16140F";
const IVORY = "#F5F1E8";
const LIME = process.argv[2] || "#E2B464"; // accent colour (gold)
const ACCENTS = ["#A9967F", "#C9BBA5", "#E4DAC6"];
const DARK_BGS = [INK, "#2B2620"];

const BG_RECT = /<rect width="320" height="460" fill="(#[0-9A-Fa-f]{6})"\/>/;

fs.mkdirSync(OUT, { recursive: true });

for (const file of fs.readdirSync(SRC).filter((f) => f.endsWith(".svg"))) {
  let svg = fs.readFileSync(path.join(SRC, file), "utf8");
  const bg = svg.match(BG_RECT)?.[1]?.toUpperCase();
  if (!bg) throw new Error(`${file}: background rect not found`);

  svg = svg.replace(BG_RECT, '<rect width="320" height="460" fill="__BG__"/>');
  if (!DARK_BGS.includes(bg)) {
    // Light cover: dark type becomes ivory; anything that was ivory (highlight words) becomes lime.
    svg = svg.replaceAll(IVORY, "__LIME__").replaceAll(INK, IVORY);
  }
  for (const a of ACCENTS) svg = svg.replaceAll(a, "__LIME__");
  svg = svg.replaceAll("__LIME__", LIME).replaceAll("__BG__", BG);

  fs.writeFileSync(path.join(OUT, file), svg);
  console.log(`dark/${file}  (was ${bg})`);
}
