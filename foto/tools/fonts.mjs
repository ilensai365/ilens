// Renders the hero + clients strip with alternative heading fonts for comparison → sheets/fonts.jpg
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import sharp from "sharp";

const SITE = path.join("..", "site");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const SETS = {
  a: [
  { name: "1 · Lato", family: "Lato", q: "Lato:wght@300;400;700;900", h1: "font-weight:900;letter-spacing:-0.02em" },
  { name: "2 · Inter Tight", family: "Inter Tight", q: "Inter+Tight:wght@300;600;700", h1: "font-weight:600;letter-spacing:-0.04em" },
  { name: "3 · Montserrat", family: "Montserrat", q: "Montserrat:wght@400;600;700;800", h1: "font-weight:700;letter-spacing:-0.03em" },
  { name: "4 · DM Sans", family: "DM Sans", q: "DM+Sans:wght@400;500;700", h1: "font-weight:500;letter-spacing:-0.045em" },
  { name: "5 · Playfair Display (serif)", family: "Playfair Display", q: "Playfair+Display:ital,wght@0,500;0,600;1,500", h1: "font-weight:500;letter-spacing:-0.02em", glow: "font-style:italic" },
  { name: "6 · Cormorant (luxury serif)", family: "Cormorant Garamond", q: "Cormorant+Garamond:ital,wght@0,500;0,600;1,500", h1: "font-weight:500;letter-spacing:-0.01em;font-size:clamp(46px,min(7.6vw,10vh),112px)", glow: "font-style:italic" },
  ],
  b: [
  { name: "7 · Instrument Serif", family: "Instrument Serif", q: "Instrument+Serif:ital@0;1", h1: "font-weight:400;letter-spacing:-0.025em;font-size:clamp(48px,min(8vw,10.5vh),118px);line-height:.95", glow: "font-style:italic" },
  { name: "8 · Bodoni Moda (fashion)", family: "Bodoni Moda", q: "Bodoni+Moda:ital,opsz,wght@0,6..96,500;1,6..96,500", h1: "font-weight:500;letter-spacing:-0.02em", glow: "font-style:italic" },
  { name: "9 · Fraunces", family: "Fraunces", q: "Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300", h1: "font-weight:300;letter-spacing:-0.035em", glow: "font-style:italic" },
  { name: "10 · Bricolage Grotesque", family: "Bricolage Grotesque", q: "Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700", h1: "font-weight:600;letter-spacing:-0.04em" },
  { name: "11 · Space Grotesk", family: "Space Grotesk", q: "Space+Grotesk:wght@400;500;700", h1: "font-weight:500;letter-spacing:-0.045em" },
  { name: "12 · Plus Jakarta Sans", family: "Plus Jakarta Sans", q: "Plus+Jakarta+Sans:wght@300;500;700", h1: "font-weight:500;letter-spacing:-0.045em" },
  ],
};
const SET = process.argv[2] || "a";
const FONTS = SETS[SET];

const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");
const tiles = [];
for (let i = 0; i < FONTS.length; i++) {
  const f = FONTS[i];
  const extra = `<link href="https://fonts.googleapis.com/css2?family=${f.q}&display=swap" rel="stylesheet" />
<style>:root{--display:"${f.family}",serif}.hero h1{${f.h1}}.glow{${f.glow || ""}}
.slide{transition:none!important;transform:none!important}#work,#why,#services,#process,#about,#faq,#contact,.footer{display:none!important}</style>
<script>window.setInterval=function(){}</script></head>`;
  fs.writeFileSync(path.join(SITE, `_f${i}.html`), html.replace("</head>", extra));
  const out = path.resolve("sheets", `font-${i}.png`);
  try { execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,1080", "--virtual-time-budget=5000", `--screenshot=${out}`, `http://localhost:8090/_f${i}.html`], { stdio: "ignore" }); } catch {}
  fs.rmSync(path.join(SITE, `_f${i}.html`));
  const img = await sharp(out).resize(720).toBuffer();
  const label = Buffer.from(`<svg width="720" height="44"><rect width="720" height="44" fill="#000"/><text x="16" y="30" font-size="22" font-family="Arial" font-weight="700" fill="#fff">${f.name}</text></svg>`);
  tiles.push(await sharp({ create: { width: 720, height: 584, channels: 3, background: "#000" } }).composite([{ input: label, top: 0, left: 0 }, { input: img, top: 44, left: 0 }]).png().toBuffer());
}
await sharp({ create: { width: 720 * 2 + 12, height: 584 * 3 + 24, channels: 3, background: "#333" } })
  .composite(tiles.map((t, i) => ({ input: t, left: (i % 2) * 732, top: Math.floor(i / 2) * 596 })))
  .jpeg({ quality: 85 }).toFile(`sheets/fonts-${SET}.jpg`);
console.log("done");
