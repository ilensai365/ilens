// Example-concept mockups for ilens.co/shops industry cards: a browser window + phone per industry.
// Fictional brands, drawn in HTML/CSS (no client work implied). Usage: node scripts/industry-mockups.mjs
// → public/images/shops/<id>.webp (1200x750)
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import sharp from "sharp";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "images", "shops");
const TMP = path.join(ROOT, ".build-mockups");
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(TMP, { recursive: true });
const url = (p) => "file:///" + p.split(path.sep).join("/");
const EBOOK = url(path.join(ROOT, "public", "images", "dark", "product-chatgpt-visibility.jpg"));

const W = 1200, H = 750;
const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">`;

// Each theme: palette + browser body + phone body.
const prod = (bg, h = 120) => `<div class="p" style="height:${h}px;background:${bg}"></div>`;
const themes = {
  ecommerce: {
    bg: "#F4EFE6", ink: "#1B1814", accent: "#C8873A", brand: "NORA HOME",
    nav: ["New", "Living", "Kitchen", "Gifts"],
    body: () => `
      <div class="hero" style="background:linear-gradient(120deg,#E7D9C3,#CBB08A)"><div><p class="k">Autumn edit</p><h1>Slow living,<br><em>delivered.</em></h1><span class="b">Shop the edit</span></div></div>
      <div class="grid4">${[["#D9C6A8","Linen throw","€59"],["#BFA07A","Oak tray","€34"],["#E9DFCF","Stone mug","€18"],["#A88560","Candle set","€26"]].map(([c,n,p])=>`<div>${prod(`linear-gradient(160deg,${c},#fff3)`,110)}<p class="n">${n}</p><p class="pr">${p}</p></div>`).join("")}</div>`,
    phone: () => `<p class="k">Basket · 2 items</p>${prod("linear-gradient(160deg,#D9C6A8,#fff4)",90)}<p class="n">Linen throw</p><p class="pr">€59</p><div class="pay">Apple Pay</div><div class="pay alt">Card · Google Pay</div>`,
  },
  "beauty-salon": {
    bg: "#F7EEEC", ink: "#2A1E1E", accent: "#B7686A", brand: "MAISON LUMI",
    nav: ["Treatments", "Prices", "Gift cards", "Book"],
    body: () => `
      <div class="hero" style="background:linear-gradient(120deg,#F1D9D4,#D9A9A3)"><div><p class="k">Beauty salon · Sliema</p><h1>Glow, <em>booked in<br>30 seconds.</em></h1><span class="b">Book now</span></div></div>
      <div class="rows">${[["Signature facial","60 min","€75"],["Gel manicure","45 min","€35"],["Lash lift","50 min","€55"]].map(([a,b,c])=>`<div class="row"><span>${a}</span><span class="m">${b}</span><span class="pr">${c}</span></div>`).join("")}</div>`,
    phone: () => `<p class="k">Choose a time · Fri 16 Oct</p><div class="slots">${["10:00","11:30","13:00","14:30","16:00","17:30"].map((t,i)=>`<span class="${i===3?"on":""}">${t}</span>`).join("")}</div><div class="pay">Confirm booking</div><p class="m" style="margin-top:10px">★★★★★ on Google</p>`,
  },
  cosmetics: {
    bg: "#EEF0EA", ink: "#1C211C", accent: "#6E8B6A", brand: "AUREA SKIN",
    nav: ["Skincare", "Body", "Sets", "Skin quiz"],
    body: () => `
      <div class="pdp"><div class="shot" style="background:radial-gradient(circle at 50% 40%,#fff,#D7DFD2 60%,#B9C7B3)"><div class="bottle"></div></div>
      <div class="info"><p class="k">Serum · dry skin</p><h2>Hydra Serum</h2><p class="pr big">€34</p><p class="m">Size</p><div class="chips"><span class="on">30 ml</span><span>50 ml</span></div><p class="m">Ingredients (INCI)</p><p class="tiny">Aqua, Glycerin, Sodium Hyaluronate, Niacinamide, Squalane…</p><span class="b">Add to basket</span><p class="m" style="margin-top:8px">Subscribe & save 10%</p></div></div>`,
    phone: () => `<p class="k">AI assistant</p><div class="bub me">Best serum for dry skin?</div><div class="bub ai">Hydra Serum 30 ml (€34). Friday delivery in Sliema ✓</div><div class="pay">Add to basket</div>`,
  },
  electronics: {
    bg: "#101418", ink: "#E9EEF3", accent: "#3FA3FF", brand: "VOLT & CO", dark: true,
    nav: ["Laptops", "Phones", "Audio", "Deals"],
    body: () => `
      <div class="cat"><div class="filters"><p class="k">Filters</p>${["Brand","Screen size","RAM","Price","In stock"].map(f=>`<div class="f"><span>${f}</span><span>›</span></div>`).join("")}</div>
      <div class="grid3">${[["Laptop Pro 14","16 GB · 512 GB","€1,299"],["Ultrabook Air","8 GB · 256 GB","€899"],["Studio 16","32 GB · 1 TB","€2,149"],["Tab S","128 GB · Wi-Fi","€499"],["Buds X","ANC · 30 h","€149"],["Watch 5","GPS · 44 mm","€279"]].map(([n,s,p])=>`<div class="card">${prod("linear-gradient(160deg,#2A3542,#16202A)",70)}<p class="n">${n}</p><p class="m">${s}</p><p class="pr">${p}</p></div>`).join("")}</div></div>`,
    phone: () => `<p class="k">Compare</p><div class="cmp"><span></span><span>Pro 14</span><span>Air</span><span>RAM</span><span>16 GB</span><span>8 GB</span><span>SSD</span><span>512</span><span>256</span><span>Battery</span><span>18 h</span><span>15 h</span></div><div class="pay">Add Pro 14</div>`,
  },
  fashion: {
    bg: "#EDE9E4", ink: "#151311", accent: "#151311", brand: "ORA ATELIER",
    nav: ["New in", "Dresses", "Knitwear", "Lookbook"],
    body: () => `
      <div class="look"><div class="tall" style="background:linear-gradient(170deg,#CDBFAE,#8D7A66)"><p class="k on-img">Lookbook · AW26</p><h1 class="on-img">The quiet<br><em>season.</em></h1></div>
      <div class="stack">${[["#BBA996","Wool coat","€189"],["#D8CCBD","Knit dress","€129"]].map(([c,n,p])=>`<div>${prod(`linear-gradient(170deg,${c},#0001)`,150)}<p class="n">${n}</p><p class="pr">${p}</p></div>`).join("")}</div></div>`,
    phone: () => `${prod("linear-gradient(170deg,#D8CCBD,#8D7A66)",120)}<p class="n">Knit dress</p><p class="m">Size</p><div class="chips">${["XS","S","M","L"].map((s,i)=>`<span class="${i===2?"on":""}">${s}</span>`).join("")}</div><p class="m" style="color:#B5543C">Only 2 left in M</p><div class="pay">Add to bag</div>`,
  },
  restaurant: {
    bg: "#16120E", ink: "#F3E9DA", accent: "#E0A15A", brand: "IL-BAJJA KITCHEN", dark: true,
    nav: ["Menu", "Book a table", "Events", "Find us"],
    body: () => `
      <div class="hero" style="background:linear-gradient(120deg,#3A2A1C,#7A4E2A)"><div><p class="k">Seafront · open today 12–23</p><h1>Fresh from the<br><em>Mediterranean.</em></h1><span class="b">Book a table</span></div></div>
      <div class="rows">${[["Grilled octopus, lemon & capers","€16"],["Ftira with tuna & olives","€11"],["Rabbit stew, house style","€19"]].map(([a,c])=>`<div class="row"><span>${a}</span><span></span><span class="pr">${c}</span></div>`).join("")}</div>`,
    phone: () => `<p class="k">Book a table</p><div class="slots">${["2 guests","Fri 16","20:00"].map((t)=>`<span class="on">${t}</span>`).join("")}</div><div class="pay">Confirm</div><div class="pay alt">Order on Wolt · Bolt Food</div>`,
  },
  digital: {
    bg: "#0E0D0B", ink: "#F5F1E8", accent: "#E2B464", brand: "YOUR GUIDES", dark: true,
    nav: ["Guides", "Free pack", "About", "Shop"],
    body: () => `
      <div class="pdp"><div class="shot" style="background:radial-gradient(circle at 50% 40%,#3a2f1c,#0E0D0B 70%)"><img src="${EBOOK}" class="ebook"></div>
      <div class="info"><p class="k">Ebook · 34 pages</p><h2>Your business in ChatGPT</h2><p class="pr big">€39</p><p class="m">Instant PDF download</p><span class="b">Buy now</span><p class="m" style="margin-top:14px">Free: 10 AI prompts → email</p></div></div>`,
    phone: () => `<p class="k">Welcome email · 1/5</p><div class="bub ai">Here are your 10 free prompts. Tomorrow: the #1 mistake…</div><div class="pay">Get the guide</div>`,
  },
};

const css = (t) => `
*{margin:0;padding:0;box-sizing:border-box}html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0A0907;font-family:Inter,sans-serif}
.stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(ellipse at 70% 20%,rgba(226,180,100,.22),transparent 60%),#0A0907}
.win{position:absolute;left:60px;top:70px;width:860px;height:600px;border-radius:16px;overflow:hidden;background:${t.bg};color:${t.ink};box-shadow:0 50px 100px -20px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.08)}
.bar{height:34px;display:flex;align-items:center;gap:7px;padding:0 14px;background:${t.dark ? "#00000055" : "#00000010"}}
.bar i{width:10px;height:10px;border-radius:50%;background:${t.dark ? "#ffffff30" : "#00000025"}}
.url{margin-left:14px;flex:0 0 300px;height:20px;border-radius:6px;background:${t.dark ? "#ffffff12" : "#ffffff90"};font:500 11px/20px Inter;padding-left:10px;color:${t.dark ? "#fff8" : "#0007"}}
.top{display:flex;align-items:center;justify-content:space-between;padding:16px 28px}
.logo{font:600 15px/1 Inter;letter-spacing:.28em}.nv{display:flex;gap:22px;font:500 12px Inter;opacity:.75}
.hero{margin:0 28px;height:250px;border-radius:12px;display:flex;align-items:center;padding:0 36px}
.k{font:500 10px/1 'JetBrains Mono',monospace;letter-spacing:.2em;text-transform:uppercase;color:${t.accent};margin-bottom:10px}
h1{font:400 40px/1.02 Fraunces,serif;letter-spacing:-.02em}h1 em,h2 em{font-style:italic;color:${t.accent}}
h2{font:500 30px/1.05 Fraunces,serif}
.b{display:inline-block;margin-top:16px;padding:10px 18px;border-radius:999px;background:${t.accent};color:${t.dark ? "#111" : "#fff"};font:600 12px Inter}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:18px 28px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;flex:1}
.p{border-radius:10px}
.n{font:600 12px/1.3 Inter;margin-top:8px}.pr{font:600 12px Inter;color:${t.accent}}.pr.big{font-size:22px;margin:6px 0 10px}
.m{font:500 11px/1.4 Inter;opacity:.6;margin-top:6px}.tiny{font:400 10px/1.4 Inter;opacity:.55;margin-top:4px;max-width:300px}
.rows{margin:18px 28px;display:grid;gap:8px}.row{display:grid;grid-template-columns:1fr 80px 60px;padding:12px 16px;border-radius:10px;background:${t.dark ? "#ffffff0d" : "#ffffffaa"};font:500 13px Inter}
.pdp{display:grid;grid-template-columns:1.1fr 1fr;gap:28px;margin:6px 28px}.shot{height:500px;border-radius:12px;display:grid;place-items:center}
.bottle{width:90px;height:220px;border-radius:24px 24px 14px 14px;background:linear-gradient(90deg,#f7f7f2,#dfe6da 60%,#c7d2c1);box-shadow:0 30px 50px -10px #0004;position:relative}
.bottle:before{content:"";position:absolute;left:28px;top:-40px;width:34px;height:44px;border-radius:8px;background:#2b322b}
.ebook{width:230px;border-radius:4px 10px 10px 4px;box-shadow:0 40px 70px -10px #000}
.info{padding-top:40px}.chips{display:flex;gap:8px;margin-top:6px}.chips span,.slots span{padding:6px 12px;border-radius:999px;border:1px solid ${t.dark ? "#ffffff30" : "#00000025"};font:500 11px Inter}
.chips .on,.slots .on{background:${t.accent};border-color:${t.accent};color:${t.dark ? "#111" : "#fff"}}
.cat{display:flex;gap:16px;margin:6px 28px}.filters{width:170px}.f{display:flex;justify-content:space-between;padding:10px 12px;border-radius:8px;background:#ffffff0c;margin-bottom:6px;font:500 12px Inter}
.card{padding:10px;border-radius:10px;background:#ffffff08}
.look{display:grid;grid-template-columns:1.3fr 1fr;gap:16px;margin:6px 28px}.tall{height:500px;border-radius:12px;padding:30px;display:flex;flex-direction:column;justify-content:flex-end}
.on-img{color:#fff}.stack{display:grid;gap:14px}
.phone{position:absolute;right:70px;top:150px;width:250px;height:520px;border-radius:38px;background:#050505;padding:10px;box-shadow:0 60px 110px -20px rgba(0,0,0,.95),0 0 0 2px #2a2722,0 0 70px rgba(226,180,100,.2)}
.scr{width:100%;height:100%;border-radius:30px;overflow:hidden;background:${t.bg};color:${t.ink};padding:46px 18px 18px;position:relative}
.scr:before{content:"";position:absolute;left:50%;top:12px;transform:translateX(-50%);width:80px;height:22px;border-radius:99px;background:#000}
.pay{margin-top:12px;padding:11px;border-radius:12px;text-align:center;background:${t.accent};color:${t.dark ? "#111" : "#fff"};font:600 12px Inter}.pay.alt{background:transparent;border:1px solid ${t.dark ? "#ffffff30" : "#00000025"};color:inherit}
.slots{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}
.bub{margin-top:10px;padding:10px 12px;border-radius:14px;font:500 12px/1.4 Inter}.bub.me{margin-left:30px;background:${t.dark ? "#ffffff14" : "#0000000d"}}.bub.ai{margin-right:20px;border:1px solid ${t.accent}66;background:${t.accent}1f}
.cmp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px 6px;font:500 11px Inter;margin-top:6px}.cmp span:nth-child(3n+1){opacity:.55}
.tag{position:absolute;left:60px;bottom:28px;font:500 11px 'JetBrains Mono',monospace;letter-spacing:.22em;text-transform:uppercase;color:rgba(245,241,232,.45)}
`;

for (const [id, t] of Object.entries(themes)) {
  const html = `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${css(t)}</style></head><body><div class="stage">
  <div class="win"><div class="bar"><i></i><i></i><i></i><span class="url">${t.brand.toLowerCase().replace(/[^a-z]+/g, "")}.com.mt</span></div>
    <div class="top"><span class="logo">${t.brand}</span><span class="nv">${t.nav.map((n) => `<span>${n}</span>`).join("")}</span></div>${t.body()}</div>
  <div class="phone"><div class="scr">${t.phone()}</div></div>
  <span class="tag">Example concept · iLens</span></div></body></html>`;
  const tmp = path.join(TMP, id + ".html");
  const png = path.join(TMP, id + ".png");
  fs.writeFileSync(tmp, html);
  execFileSync(CHROME, ["--headless=new", "--hide-scrollbars", "--force-device-scale-factor=1", `--user-data-dir=${path.join(TMP, "chrome")}`,
    `--window-size=${W},${H}`, "--virtual-time-budget=8000", "--allow-file-access-from-files", `--screenshot=${png}`, url(tmp)], { stdio: "ignore" });
  await sharp(png).webp({ quality: 82 }).toFile(path.join(OUT, id + ".webp"));
  console.log("ok", id);
}
