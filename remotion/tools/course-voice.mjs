// Course voiceover: one audio file per scene + a durations manifest the CourseLesson composition reads.
//
//   node tools/course-voice.mjs m01-l01            → draft voice (Windows SAPI: Paulina PL / Zira EN) for scenes without audio
//   node tools/course-voice.mjs m01-l01 --force    → regenerate every draft file
//   node tools/course-voice.mjs m01-l01 --manifest → only re-measure files already in public/ (after dropping in pro .mp3s)
//
// Pro voice: put s01.mp3, s02.mp3… (ElevenLabs / Higgsfield) in public/course/<ID>/<lang>/ and run --manifest.
// An .mp3 always wins over the draft .wav for the same scene.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
if (!slug) throw new Error('usage: node tools/course-voice.mjs <lesson-slug> [--force|--manifest]');
const force = process.argv.includes('--force');
const onlyManifest = process.argv.includes('--manifest');

const lesson = JSON.parse(readFileSync(join(root, 'src/Course/lessons', `${slug}.json`), 'utf8'));
const ffprobe = join(root, 'node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe');
const VOICES = { pl: 'Microsoft Paulina Desktop', en: 'Microsoft Zira Desktop' };

// Text goes through a UTF-8 file: piping stdin into Windows PowerShell 5 mangles Polish letters.
const sapi = (text, voice, out) => {
  const txt = join(tmpdir(), `ilens-say-${process.pid}.txt`);
  writeFileSync(txt, text, 'utf8');
  const ps = `Add-Type -AssemblyName System.Speech
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer
$s.SelectVoice('${voice}'); $s.Rate = 0
$s.SetOutputToWaveFile('${out.replace(/'/g, "''")}')
$s.Speak((Get-Content -Raw -Encoding UTF8 '${txt}')); $s.Dispose()`;
  execFileSync('powershell', ['-NoProfile', '-Command', ps]);
  rmSync(txt);
};

const duration = (file) =>
  Number(execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], { encoding: 'utf8' }).trim());

const manifest = {};
for (const lang of ['pl', 'en']) {
  const dir = join(root, 'public/course', lesson.id, lang);
  mkdirSync(dir, { recursive: true });
  manifest[lang] = lesson[lang].scenes.map((scene, i) => {
    const name = `s${String(i + 1).padStart(2, '0')}`;
    const mp3 = join(dir, `${name}.mp3`), wav = join(dir, `${name}.wav`);
    if (!onlyManifest && !existsSync(mp3) && (force || !existsSync(wav))) {
      sapi(scene.say, VOICES[lang], wav);
      console.log(`draft ${lang}/${name}.wav`);
    }
    const file = existsSync(mp3) ? mp3 : existsSync(wav) ? wav : null;
    if (!file) return null;
    return { src: `course/${lesson.id}/${lang}/${file.endsWith('.mp3') ? `${name}.mp3` : `${name}.wav`}`, seconds: duration(file) };
  });
}
writeFileSync(join(root, 'src/Course/lessons', `${slug}.audio.json`), JSON.stringify(manifest, null, 2) + '\n');
console.log('manifest written');
