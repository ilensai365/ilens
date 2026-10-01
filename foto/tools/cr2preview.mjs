// Pulls the full-size 8-bit JPEG preview embedded in Canon CR2 raws (IFD0 StripOffsets/StripByteCounts).
// Usage: node cr2preview.mjs "<folder with .CR2>" <outDir>
import fs from "fs";
import path from "path";

const [dir, outDir] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const files = fs.readdirSync(dir).filter((f) => /\.cr2$/i.test(f)).sort();
let n = 0;
for (const f of files) {
  const fd = fs.openSync(path.join(dir, f), "r");
  const head = Buffer.alloc(4096);
  fs.readSync(fd, head, 0, 4096, 0);
  const le = head.toString("latin1", 0, 2) === "II";
  const u16 = (o) => (le ? head.readUInt16LE(o) : head.readUInt16BE(o));
  const u32 = (o) => (le ? head.readUInt32LE(o) : head.readUInt32BE(o));
  const ifd = u32(4);
  const count = u16(ifd);
  let off = 0, len = 0;
  for (let i = 0; i < count; i++) {
    const e = ifd + 2 + i * 12;
    const tag = u16(e);
    if (tag === 0x0111) off = u32(e + 8);
    if (tag === 0x0117) len = u32(e + 8);
  }
  if (off && len) {
    const jpg = Buffer.alloc(len);
    fs.readSync(fd, jpg, 0, len, off);
    fs.writeFileSync(path.join(outDir, f.replace(/\.cr2$/i, ".jpg")), jpg);
    n++;
  }
  fs.closeSync(fd);
}
console.log("previews", n, "of", files.length);
