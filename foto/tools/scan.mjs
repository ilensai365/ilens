// Lists every folder (all drives) holding photos, with counts of JPGs and RAWs.
// Usage: node scan.mjs → sheets/scan.tsv sorted by count
import fs from "fs";
import path from "path";

const ROOTS = ["C:\\Users", "D:\\", "E:\\"];
const SKIP = /node_modules|\\AppData\\|\\Windows|Program Files|\\\$|MASTER COLLECTION|\\\.git|site-v2|\\foto\\|FileHistory|envato|\\ilens\\/i;
const rows = [];
function walk(d, depth = 0) {
  if (SKIP.test(d + "\\") || depth > 9) return;
  let ents;
  try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
  let jpg = 0, raw = 0, big = 0;
  for (const e of ents) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, depth + 1);
    else if (/\.jpe?g$/i.test(e.name)) {
      jpg++;
      try { if (fs.statSync(p).size > 1.5e6) big++; } catch {}
    } else if (/\.(nef|cr2|cr3|arw|raf|dng)$/i.test(e.name)) raw++;
  }
  if (jpg + raw >= 15) rows.push([jpg, big, raw, d]);
}
for (const r of ROOTS) walk(r);
rows.sort((a, b) => b[0] + b[2] - (a[0] + a[2]));
fs.mkdirSync("sheets", { recursive: true });
fs.writeFileSync("sheets/scan.tsv", rows.map((r) => r.join("\t")).join("\n"));
console.log(rows.length, "folders");
