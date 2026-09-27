// Portfolio entries from the Parallax Studio archive (realised client work, 2018–2019):
// Kancelaria dr Chodań (Sportowa Platforma, Auto Batex and KS Gminy Psary were added, then removed at the owner's request).
// Builds gallery boards (dark presentation, headless Chrome) + graded single covers.
// Usage: node scripts/portfolio-parallax.mjs <archive-dir> <pdf-render-dir>
//   archive-dir:    D:/AAAAAA PORTFOLIO Z PULPITU/PARALLAX ZREALIZOWANE
//   pdf-render-dir: PNG render of the Karina card PDF (…adwokat_2.png)
import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import sharp from "sharp";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const WORK = path.join(ROOT, "public", "images", "work");
const COVERS = path.join(WORK, "covers");
const [SRC, PDF] = process.argv.slice(2);
if (!SRC || !PDF) throw new Error("Pass <archive-dir> <pdf-render-dir>");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "parallax-"));
const src = (...p) => path.join(SRC, ...p);
const uri = (f) => "data:image/" + (f.endsWith(".png") ? "png" : "jpeg") + ";base64," + fs.readFileSync(f).toString("base64");

const W = 1600, H = 1000;
const base = `*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0B0A08}
.stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(ellipse at 50% 40%,#1d1b18 0%,#0B0A08 70%)}
.shadow{box-shadow:0 2px 4px rgba(0,0,0,.5),0 40px 80px -20px rgba(0,0,0,.9)}`;

function shoot(name, css, body) {
  const html = path.join(TMP, name + ".html");
  const png = path.join(TMP, name + ".png");
  fs.writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,800&display=block" rel="stylesheet">
<style>${base}${css}</style></head><body><div class="stage">${body}</div></body></html>`);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--window-size=${W},${H}`, "--force-device-scale-factor=1.5",
    "--virtual-time-budget=6000", `--screenshot=${png}`, "file:///" + html.split(path.sep).join("/")], { stdio: "ignore" });
  return png;
}

const gallery = (input, id) => sharp(input).resize({ width: 2000, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(WORK, id + ".webp"));
// Same dark grade as scripts/portfolio-covers.mjs so every card sits in one colour world.
const cover = (input, id, extract) => {
  let img = sharp(input);
  if (extract) img = img.extract(extract);
  return img.resize({ width: 1600, withoutEnlargement: true }).modulate({ brightness: 0.62, saturation: 0.7 }).linear(1.12, -10).webp({ quality: 82 }).toFile(path.join(COVERS, id + ".webp"));
};

// ——— Kancelaria Adwokacka dr Karina Chodań: monogram + business card ———
const trim = async (f) => { const m = await sharp(f).metadata(); const b = Math.round(m.width * 2 / 94); return sharp(f).extract({ left: b, top: b, width: m.width - 2 * b, height: m.height - 2 * b }).png().toBuffer(); };
const kFront = await trim(path.join(PDF, "Projekt_wizytówki_dr_Karina_Chodan_adwokat_2.png"));
const b64 = (buf) => "data:image/png;base64," + buf.toString("base64");
const kancelaria = shoot("kancelaria", `.stage{background:radial-gradient(ellipse at 45% 35%,#16241d 0%,#0B0A08 68%)}.c{position:absolute;width:860px;border-radius:6px}`,
  // Monogram side only: the back carries personal contact details.
  `<img class="c shadow" style="left:370px;top:250px;transform:rotate(-4deg)" src="${b64(kFront)}">`);
await gallery(kancelaria, "kancelaria");
await cover(kancelaria, "kancelaria");


fs.rmSync(TMP, { recursive: true, force: true });
console.log("done");
