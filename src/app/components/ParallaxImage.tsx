import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  speed?: number;
  overlay?: boolean;
  overlayColor?: string;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt = "",
  className = "",
  speed = 0.3,
  overlay = true,
  overlayColor = "rgba(0,0,0,0.4)",
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-[120%] object-cover pointer-events-none"
        style={{ y }}
      />
      {overlay && (
        <div className="absolute inset-0" style={{ background: overlayColor }} />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
