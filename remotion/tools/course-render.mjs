// Render every lesson of a module (PL + EN) plus covers into Documents/ilens-course/wideo/<module>/.
//   node tools/course-render.mjs M01
// Skips files that already exist, so an interrupted run can simply be restarted.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const mod = (process.argv[2] || 'M01').toUpperCase();
const out = join(root, '..', '..', 'ilens-course', 'wideo', `modul-${mod.slice(1)}`);
mkdirSync(out, { recursive: true });

const ids = readdirSync(join(root, 'src/Course/lessons'))
  .filter((f) => f.startsWith(mod.toLowerCase()) && !f.includes('.audio'))
  .map((f) => f.replace('.json', '').toUpperCase());

const run = (...args) => execFileSync('npx', ['remotion', ...args], { cwd: root, stdio: 'inherit', shell: true });
for (const id of ids) {
  for (const lang of ['PL', 'EN']) {
    const comp = `Course-${id}-${lang}`;
    const mp4 = join(out, `${id}-${lang}.mp4`), png = join(out, `${id}-${lang}-cover.png`);
    if (!existsSync(png)) run('still', 'src/index.ts', `${comp}-Cover`, `"${png}"`);
    if (!existsSync(mp4)) {
      run('render', 'src/index.ts', comp, `"${mp4}.part.mp4"`);
      execFileSync('cmd', ['/c', 'move', '/y', `${mp4}.part.mp4`, mp4]);
    }
    console.log(`done ${comp}`);
  }
}
console.log('ALL DONE', out);
