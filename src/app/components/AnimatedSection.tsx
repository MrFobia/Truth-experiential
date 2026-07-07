import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 60 };
      case "left": return { opacity: 0, x: -60 };
      case "right": return { opacity: 0, x: 60 };
      case "none": return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    if (!isInView) return getInitial();
    switch (direction) {
      case "up": return { opacity: 1, y: 0 };
      case "left": return { opacity: 1, x: 0 };
      case "right": return { opacity: 1, x: 0 };
      case "none": return { opacity: 1 };
    }
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={getAnimate()}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
