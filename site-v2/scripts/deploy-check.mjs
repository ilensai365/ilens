// Pre-deploy guard: several Claude sessions share this working folder (no worktrees), and `npm run build`
// bundles whatever is on disk. Before building, make sure site-v2 only contains the changes this session made.
// Usage (from repo root):  node site-v2/scripts/deploy-check.mjs site-v2/src/data/site.ts site-v2/src/components/Shop.tsx …
//   → exit 0 when every changed site-v2 file is in the list (dist/ and tsbuildinfo are ignored)
//   → exit 1 and list the unexpected files otherwise: STOP and ask the owner before building/deploying.
import { execSync } from "child_process";

const mine = new Set(process.argv.slice(2).map((p) => p.replace(/\\/g, "/")));
const out = execSync("git status --porcelain --untracked-files=all -- site-v2", { encoding: "utf8" });
const changed = out
  .split("\n")
  .filter(Boolean)
  .map((l) => l.slice(3).trim().replace(/^"|"$/g, ""))
  .map((p) => (p.includes(" -> ") ? p.split(" -> ")[1] : p))
  .filter((p) => !p.startsWith("site-v2/dist/") && !p.endsWith("tsconfig.tsbuildinfo"));

const foreign = changed.filter((p) => !mine.has(p));
if (foreign.length) {
  console.error("STOP: site-v2 has changes this session did not declare (another session?):");
  for (const f of foreign) console.error("  " + f);
  console.error("Do not build or deploy. Ask the owner which session owns them.");
  process.exit(1);
}
console.log(`OK: ${changed.length} changed site-v2 file(s), all declared.`);
