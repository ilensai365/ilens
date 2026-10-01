// Contact sheets for choosing portfolio shots.
// Usage: node contact.mjs "<folder>" <label> [count]  → sheets/<label>.jpg + sheets/<label>.json (index → file path)
import fs from "fs";
import path from "path";
import sharp from "sharp";

const [dir, label, countArg] = process.argv.slice(2);
const COUNT = Number(countArg || 48);
const RAW_DIR = /(^|[\\/])(surowe|sur|raw\d|raw[\d.]*|surowe do edycji|import2)([\\/]|$)/i;

function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.jpe?g$/i.test(e.name)) out.push(p);
  }
  return out;
}

let files = walk(dir);
const edited = files.filter((f) => !RAW_DIR.test(path.relative(dir, f)));
if (edited.length >= 12) files = edited;
// de-duplicate by file name (exports are often copied into several folders)
const seen = new Set();
files = files.filter((f) => { const k = path.basename(f).toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
files.sort();
const step = Math.max(1, files.length / COUNT);
const pick = [];
for (let i = 0; i < files.length && pick.length < COUNT; i += step) pick.push(files[Math.floor(i)]);

const COLS = COUNT > 48 ? 10 : 8, W = COUNT > 48 ? 240 : 300, H = COUNT > 48 ? 160 : 200;
const rows = Math.ceil(pick.length / COLS);
const tiles = [];
for (let i = 0; i < pick.length; i++) {
  try {
    const img = await sharp(pick[i]).rotate().resize(W, H, { fit: "cover" }).jpeg({ quality: 70 }).toBuffer();
    const tag = Buffer.from(`<svg width="${W}" height="${H}"><rect width="34" height="24" fill="#000"/><text x="5" y="18" font-size="16" font-family="Arial" fill="#ff0">${i}</text></svg>`);
    const withTag = await sharp(img).composite([{ input: tag }]).toBuffer();
    tiles.push({ input: withTag, left: (i % COLS) * W, top: Math.floor(i / COLS) * H });
  } catch (e) { console.error("skip", pick[i], e.message); }
}
fs.mkdirSync("sheets", { recursive: true });
await sharp({ create: { width: COLS * W, height: rows * H, channels: 3, background: "#222" } })
  .composite(tiles).jpeg({ quality: 75 }).toFile(`sheets/${label}.jpg`);
fs.writeFileSync(`sheets/${label}.json`, JSON.stringify(pick, null, 1));
console.log(label, "total", files.length, "sheet", pick.length);
