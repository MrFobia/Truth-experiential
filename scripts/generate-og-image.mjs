// T086 — placeholder OG image (1200x630, brand background + wordmark
// bottom-right). Not final design, but a real functional social-share
// asset until a designed one is provided.
import sharp from "sharp";
import { join } from "path";

const ASSETS_DIR = join(import.meta.dirname, "..", "src", "assets");
const logoPath = join(ASSETS_DIR, "98f47f672c0670dfc5a28bcf3104f8b7e6a9e062.png");
const outPath = join(ASSETS_DIR, "og-image.jpg");

const W = 1200;
const H = 630;

const bg = Buffer.from(
  `<svg width="${W}" height="${H}">
    <defs>
      <radialGradient id="g" cx="30%" cy="35%" r="75%">
        <stop offset="0%" stop-color="#1a1a2e"/>
        <stop offset="45%" stop-color="#0f0d17"/>
        <stop offset="100%" stop-color="#0a0a0a"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
  </svg>`
);

const logoW = 480;
const logo = await sharp(logoPath).resize({ width: logoW }).toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp(bg)
  .composite([
    {
      input: logo,
      left: W - logoW - 80,
      top: H - (logoMeta.height ?? 190) - 70,
    },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outPath);

console.log(`OG image written: ${outPath} (${W}x${H})`);
