// Portfolio entries from the Parallax Studio archive (realised client work, 2018–2019):
// Sportowa Platforma, Auto Batex, Kancelaria dr Chodań, KS Gminy Psary.
// Builds gallery boards (dark presentation, headless Chrome) + graded single covers.
// Usage: node scripts/portfolio-parallax.mjs <archive-dir> <pdf-render-dir>
//   archive-dir:    D:/AAAAAA PORTFOLIO Z PULPITU/PARALLAX ZREALIZOWANE
//   pdf-render-dir: PNG renders of the Karina card PDF (…adwokat_1/_2.png) and logo_gradient_1.png
// Auto Batex exists only as low-res Affinity screenshots, so its cards are redrawn here 1:1 in HTML.
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

// ——— Auto Batex: business cards redrawn from the final Affinity artboards ———
const ICON = {
  phone: '<rect x="7" y="3" width="10" height="18" rx="2" fill="none" stroke="#fff" stroke-width="2"/><circle cx="12" cy="17.5" r="1.2" fill="#fff"/>',
  mail: '<rect x="3" y="6" width="18" height="12" fill="#fff"/><path d="M3 6l9 7 9-7" fill="none" stroke="#e53935" stroke-width="1.6"/>',
  pin: '<path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7z" fill="#fff"/><circle cx="12" cy="9" r="2.6" fill="#e53935"/>',
  clock: '<circle cx="12" cy="12" r="9" fill="#fff"/><path d="M12 7v5l3 2" fill="none" stroke="#e53935" stroke-width="2"/>',
};
// The back side has no top-right lines (they would cross the logo), like the original artboard.
const deco = (top = true) => `<svg class="deco" viewBox="0 0 900 500" preserveAspectRatio="none">
  <polygon points="0,0 232,0 232,92 0,226" fill="#d92b2b"/><polygon points="0,0 170,0 0,98" fill="#e8413c"/>
  <line x1="0" y1="262" x2="190" y2="152" stroke="#e53935" stroke-width="6"/><line x1="205" y1="143" x2="250" y2="117" stroke="#e53935" stroke-width="6"/>
  ${top ? '<line x1="690" y1="118" x2="900" y2="-3" stroke="#e53935" stroke-width="6"/><line x1="740" y1="150" x2="900" y2="58" stroke="#e53935" stroke-width="6"/>' : ""}
  <polygon points="665,500 900,364 900,500" fill="#d92b2b"/><polygon points="760,500 900,419 900,500" fill="#e8413c"/>
  <line x1="705" y1="345" x2="900" y2="232" stroke="#e53935" stroke-width="6"/><line x1="640" y1="382" x2="690" y2="353" stroke="#e53935" stroke-width="6"/>
  <line x1="180" y1="500" x2="260" y2="454" stroke="#e53935" stroke-width="6"/></svg>`;
const batexCss = `
.card{position:absolute;width:900px;height:500px;background:#232326;overflow:hidden;font-family:Montserrat,sans-serif;color:#fff;border-radius:6px}
.card.light{background:#f1f1f1;color:#2d2d2f}
.deco{position:absolute;inset:0;width:100%;height:100%}
.logo{font-weight:800;font-style:italic;font-size:70px;letter-spacing:.01em;line-height:1}
.logo span{color:#e53935}
.tag{font-weight:600;font-size:18px;letter-spacing:.04em;margin-top:10px}
.front .mid{position:absolute;left:0;right:0;top:188px;text-align:center}
.front .svc{position:absolute;left:60px;right:60px;bottom:52px;text-align:center;font-size:12.5px;font-weight:600;letter-spacing:.03em;line-height:1.55;opacity:.9}
.back .mid{position:absolute;right:52px;top:92px;text-align:center}
.back .logo{font-size:56px}
.back ul{position:absolute;left:112px;top:238px;list-style:none}
.back li{display:flex;align-items:center;gap:22px;height:48px;margin-bottom:6px;font-size:19px;font-weight:600;line-height:1.2}
.back li i{width:42px;height:42px;background:#e53935;display:grid;place-items:center;flex:none}
.back li svg{width:24px;height:24px}`;
const front = (cls, style) => `<div class="card front shadow ${cls}" style="${style}">${deco()}
  <div class="mid"><div class="logo">AUTO <span>BATEX</span></div><div class="tag">CZĘŚCI NOWE I UŻYWANE</div></div>
  <div class="svc">CZĘŚCI NOWE I UŻYWANE DO SAMOCHODÓW FRANCUSKICH | SPRZEDAŻ ORAZ WYMIANA SILNIKÓW HDI/TDCI<br>CZĘŚCI BLACHARSKIE I MECHANICZNE | DIAGNOSTYKA KOMPUTEROWA | WYMIANA OPON</div></div>`;
const li = (icon, text) => `<li><i><svg viewBox="0 0 24 24">${ICON[icon]}</svg></i><span>${text}</span></li>`;
const back = (cls, style) => `<div class="card back shadow ${cls}" style="${style}">${deco(false)}
  <div class="mid"><div class="logo">AUTO <span>BATEX</span></div><div class="tag">CZĘŚCI NOWE I UŻYWANE</div></div>
  <ul>${li("phone", "(części) 607 566 498<br>(warsztat) 663 170 900")}${li("mail", "biuro@autobatex.pl")}${li("pin", "Hallera 34, 40-321 Katowice<br>NIP 632 179 64 31")}${li("clock", "pon–pt 8.00–17.00<br>sob 8.00–13.00")}</ul></div>`;

const batexHero = shoot("autobatex", batexCss + `.stage{background:radial-gradient(ellipse at 60% 35%,#2a1716 0%,#0B0A08 65%)}`,
  back("", "left:790px;top:430px;transform:rotate(-7deg) scale(.8);transform-origin:0 0") + front("", "left:70px;top:200px;transform:rotate(-7deg) scale(.8);transform-origin:0 0"));
await gallery(batexHero, "autobatex");
await cover(batexHero, "autobatex", { left: 60, top: 180, width: 1340, height: 1000 }); // front card only
const batexSet = shoot("autobatex-set", batexCss + `.card{transform:scale(.78);transform-origin:0 0}`,
  front("", "left:75px;top:95px") + front("light", "left:835px;top:95px") + back("", "left:75px;top:525px") + back("light", "left:835px;top:525px"));
await gallery(batexSet, "autobatex-set");

// ——— Sportowa Platforma: logo system, A5 brochure, social campaign ———
const SP = src("SPORTOWA PLATFORMA");
const hero = path.join(SP, "GRAFIKA NA FB", "NOWA WYSYŁKA", "projekt2OK.jpg");
await cover(hero, "sportowa-platforma"); // full banner: it closes the grid as a full-width card
await gallery(hero, "sportowa-platforma");
await gallery(path.join(PDF, "logo_gradient_1.png"), "sportowa-platforma-logo");
await gallery(path.join(SP, "1 LOGO SPORTOWA PLATFORMA WYBRANE", "logo_makieta.png"), "sportowa-platforma-versions");
await gallery(path.join(SP, "ULOTKA A5", "01ulotka.jpg"), "sportowa-platforma-brochure");
await gallery(path.join(SP, "ULOTKA A5", "02ulotka.jpg"), "sportowa-platforma-brochure-inside");
const posts = [["GRAFIKA 3", "1200x900_dodaj_ogloszenie.jpg"], ["GRAFIKA 2", "1200x900_wyjedz_na_oboz.jpg"], ["grafika 4", "1200x900_kursy_szkolenia.png"], ["grafika 5", "1200x900_znajdz pracę.png"]];
const social = shoot("sportowa-social", `.g{position:absolute;left:100px;top:62px;display:grid;grid-template-columns:repeat(2,640px);gap:20px}.g img{width:640px;height:428px;object-fit:cover;border-radius:10px}`,
  `<div class="g">${posts.map(([d, f]) => `<img class="shadow" src="${uri(path.join(SP, d, f))}">`).join("")}</div>`);
await gallery(social, "sportowa-platforma-social");

// ——— Kancelaria Adwokacka dr Karina Chodań: monogram + business card ———
const trim = async (f) => { const m = await sharp(f).metadata(); const b = Math.round(m.width * 2 / 94); return sharp(f).extract({ left: b, top: b, width: m.width - 2 * b, height: m.height - 2 * b }).png().toBuffer(); };
const kFront = await trim(path.join(PDF, "Projekt_wizytówki_dr_Karina_Chodan_adwokat_2.png"));
const b64 = (buf) => "data:image/png;base64," + buf.toString("base64");
const kancelaria = shoot("kancelaria", `.stage{background:radial-gradient(ellipse at 45% 35%,#16241d 0%,#0B0A08 68%)}.c{position:absolute;width:860px;border-radius:6px}`,
  // Monogram side only: the back carries personal contact details.
  `<img class="c shadow" style="left:370px;top:250px;transform:rotate(-4deg)" src="${b64(kFront)}">`);
await gallery(kancelaria, "kancelaria");
await cover(kancelaria, "kancelaria");

// ——— KS Gminy Psary: club crest + social cover ———
const PS = path.join(SP, "KLUB SPORTOWY PSARY");
const psary = shoot("psary", `.stage{background:radial-gradient(ellipse at 30% 45%,#10261a 0%,#0B0A08 65%)}
  .crest{position:absolute;left:110px;top:150px;height:700px;filter:drop-shadow(0 30px 50px rgba(0,0,0,.8))}
  .fb{position:absolute;left:680px;top:350px;width:820px;border-radius:10px}`,
  `<img class="crest" src="${uri(path.join(PS, "grafikinastroninternetowklubu", "ksgp-znak_kolor.png"))}"><img class="fb shadow" src="${uri(path.join(PS, "fb-tlo_kspsary_nowe.png"))}">`);
await gallery(psary, "psary");
await cover(psary, "psary", { left: 60, top: 150, width: 1000, height: 1200 }); // crest only

fs.rmSync(TMP, { recursive: true, force: true });
console.log("done");
