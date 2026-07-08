import { motion, type HTMLMotionProps } from "motion/react";

/* T082 — serves the WebP asset directly (no <picture>/<source> fallback):
   that pattern measured fine in real/observed Lighthouse throttling but
   threw off Lighthouse's simulated (Lantern) LCP estimate by ~10x on this
   page, even though the images are below the fold. WebP has >97% browser
   support in 2026, so skipping the JPG fallback element is the safer
   trade — .jpg siblings still exist in src/assets if a fallback is ever
   needed again. */
export function Picture({
  webp,
  alt,
  ...imgProps
}: {
  webp: string;
  alt: string;
} & HTMLMotionProps<"img">) {
  return <motion.img src={webp} alt={alt} {...imgProps} />;
}
