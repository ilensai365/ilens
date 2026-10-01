// Renders the site in alternative colour schemes for comparison.
// Writes temporary site/_p<n>.css + _p<n>.html, screenshots them with headless Edge, builds sheets/palettes.jpg.
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import sharp from "sharp";

const SITE = path.join("..", "site");
const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE_RGB = "226,180,100";

const PALETTES = [
  { name: "1 · Champagne gold", accent: "#E2B464", rgb: "226,180,100", accent2: "#F3D9A4", btnText: "#1a1206" },
  { name: "2 · Electric violet", accent: "#9B7BFF", rgb: "155,123,255", accent2: "#FF5FD2", btnText: "#ffffff" },
  { name: "3 · Emerald iGaming", accent: "#2BE38F", rgb: "43,227,143", accent2: "#B8FF5C", btnText: "#04160d" },
  { name: "4 · Casino red", accent: "#FF4545", rgb: "255,69,69", accent2: "#FF9A3D", btnText: "#ffffff" },
  { name: "5 · Monochrome luxe", accent: "#F2F0EA", rgb: "242,240,234", accent2: "#9A968C", btnText: "#0a0a0c" },
  {
    name: "6 · Light editorial", accent: "#FF5A1F", rgb: "255,90,31", accent2: "#111111", btnText: "#ffffff",
    light: `:root{--bg:#F4F1EB;--surface:#FFFFFF;--line:#E2DDD3;--text:#141414;--muted:#6B665E}
      .proof,.card,.why article,.occasions li{background:#fff}.client-list li{color:#141414}
      .strip .proof-label{background:#fff;box-shadow:16px 0 16px #fff}
      .card-feature{background:linear-gradient(135deg,rgba(255,90,31,.08),#fff 60%)}.card-feature p,.about-copy p{color:#3a3732}
      .nav.is-solid{background:rgba(244,241,235,.95)}.nav.is-solid .logo-name,.nav.is-solid nav a{color:#141414}
      .btn-ghost{color:#fff}.hero h1,.hero .lede,.hero .logo-name{color:#fff}.nav:not(.is-solid) .logo-name{color:#fff}`,
  },
];

const css = fs.readFileSync(path.join(SITE, "style.css"), "utf8");
const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");
const shotCss = ".hero{min-height:900px!important}#work,#why,#process,#about,#faq,#contact,.footer{display:none!important}";
const tiles = [];
for (let i = 0; i < PALETTES.length; i++) {
  const p = PALETTES[i];
  let c = css.replaceAll(BASE_RGB, p.rgb).replace("--accent: #E2B464;", `--accent: ${p.accent};`).replace("--accent-2: #F3D9A4;", `--accent-2: ${p.accent2};`)
    .replaceAll("#1a1206", p.btnText);
  c += "\n" + (p.light || "") + "\n" + shotCss;
  fs.writeFileSync(path.join(SITE, `_p${i}.css`), c);
  fs.writeFileSync(path.join(SITE, `_p${i}.html`), html.replace('href="style.css"', `href="_p${i}.css"`));
  const out = path.resolve("sheets", `palette-${i}.png`);
  try {
    execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1440,2350", "--virtual-time-budget=4000", `--screenshot=${out}`, `http://localhost:8090/_p${i}.html`], { stdio: "ignore" });
  } catch {}
  fs.rmSync(path.join(SITE, `_p${i}.css`));
  fs.rmSync(path.join(SITE, `_p${i}.html`));
  const img = await sharp(out).extract({ left: 0, top: 0, width: 1440, height: 2350 }).resize(640).toBuffer();
  const label = Buffer.from(`<svg width="640" height="56"><rect width="640" height="56" fill="#000"/><text x="20" y="37" font-size="26" font-family="Arial" font-weight="700" fill="#fff">${p.name}</text></svg>`);
  tiles.push(await sharp({ create: { width: 640, height: 1100, channels: 3, background: "#000" } }).composite([{ input: label, top: 0, left: 0 }, { input: img, top: 56, left: 0 }]).png().toBuffer());
}
const W = 640, H = 1100, GAP = 16;
await sharp({ create: { width: W * 3 + GAP * 2, height: H * 2 + GAP, channels: 3, background: "#333" } })
  .composite(tiles.map((t, i) => ({ input: t, left: (i % 3) * (W + GAP), top: Math.floor(i / 3) * (H + GAP) })))
  .jpeg({ quality: 85 }).toFile("sheets/palettes.jpg");
console.log("done");
