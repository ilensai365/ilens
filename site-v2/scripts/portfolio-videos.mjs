// AI video projects for /studio (Google Flow / Veo renders + edits from the 2026 AI portfolio).
// Compresses each film to a light 720p web MP4 (faststart) and grabs a dark-graded poster/cover frame.
// ffmpeg: the binary that ships with Remotion (ilens/remotion), since ffmpeg isn't installed system-wide.
// Usage: node scripts/portfolio-videos.mjs → public/images/work/video/*.mp4 + covers/*.webp
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { fileURLToPath } from "url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FFMPEG = path.join(ROOT, "..", "remotion", "node_modules", "@remotion", "compositor-win32-x64-msvc", "ffmpeg.exe");
const SRC = "C:/Users/Agnieszka/Desktop/AA NOWE PORTFOLIO AI 2026/VIDEO AI";
const WORK = path.join(ROOT, "public", "images", "work");
const VIDEO = path.join(WORK, "video");
const COVERS = path.join(WORK, "covers");
fs.mkdirSync(VIDEO, { recursive: true });

// [id, source file, poster time (s), cover keeps top fraction (edits burn captions in bottom-left, under the card title)]
const FILMS = [
  ["luxe-rest", "PUFFY/Luxury_Bed_Promo_45s_PRO.mp4", 37, 0.8],
  ["penthouse-tour", "PUFFY/Touring_luxury_penthouse_apartment_1080p_20260918120521.mp4", 5],
  ["penthouse-interior", "PUFFY/gemini_generated_video_FA44A15B (1).mp4", 5],
];

const ff = (args) => execFileSync(FFMPEG, ["-v", "error", "-y", ...args], { stdio: "inherit" });
for (const [id, file, t, keep = 1] of FILMS) {
  const src = path.join(SRC, file);
  const mp4 = path.join(VIDEO, id + ".mp4");
  ff(["-i", src, "-vf", "scale=-2:720", "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", mp4]);
  const frame = path.join(VIDEO, id + "-frame.png");
  ff(["-ss", String(t), "-i", src, "-frames:v", "1", frame]);
  await sharp(frame).resize({ width: 1600 }).webp({ quality: 84 }).toFile(path.join(VIDEO, id + ".webp")); // modal poster
  const { width: fw, height: fh } = await sharp(frame).metadata();
  await sharp(frame).extract({ left: 0, top: 0, width: fw, height: Math.round(fh * keep) }).resize({ width: 1600 }).modulate({ brightness: 0.62, saturation: 0.7 }).linear(1.12, -10).webp({ quality: 82 }).toFile(path.join(COVERS, id + ".webp"));
  fs.rmSync(frame);
  console.log(id, (fs.statSync(mp4).size / 1e6).toFixed(1) + " MB");
}
