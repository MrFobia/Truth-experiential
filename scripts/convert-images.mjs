// T082 — generates .webp (primary) + .jpg q=78 mozjpeg (fallback) siblings
// for every photographic PNG in src/assets. Skips transparent/logo assets
// (JPEG has no alpha channel) — those stay PNG.
import sharp from "sharp";
import { readdirSync } from "fs";
import { join, basename, extname } from "path";

const ASSETS_DIR = join(import.meta.dirname, "..", "src", "assets");

// Wordmark/logo — needs transparency, excluded from JPG fallback.
const SKIP = new Set(["98f47f672c0670dfc5a28bcf3104f8b7e6a9e062.png"]);

const files = readdirSync(ASSETS_DIR).filter(
  (f) => f.endsWith(".png") && !SKIP.has(f)
);

for (const file of files) {
  const src = join(ASSETS_DIR, file);
  const name = basename(file, extname(file));

  const webpOut = join(ASSETS_DIR, `${name}.webp`);
  const jpgOut = join(ASSETS_DIR, `${name}.jpg`);

  await sharp(src).webp({ quality: 82 }).toFile(webpOut);
  await sharp(src)
    .flatten({ background: "#0a0a0a" }) // PNG alpha -> JPEG has none
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(jpgOut);

  console.log(`${file} -> ${name}.webp + ${name}.jpg`);
}

console.log(`\nDone: ${files.length} images converted (skipped: ${SKIP.size} logo/transparent asset).`);
