import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";

const stats = [
  { number: "20+",    label: "Years in experiential" },
  { number: "4,000+", label: "Activations delivered" },
  { number: "50+",    label: "Cities · 4 countries" },
  { number: "300M+",  label: "Earned impressions" },
];

/* Parse "4,000+" → { value: 4000, suffix: "+", hasComma: true }
   Parse "300M+" → { value: 300,  suffix: "M+", hasComma: false } */
function parseStat(raw: string) {
  const hasComma = raw.includes(",");
  const mMatch  = raw.match(/^([\d,]+)(M\+|\+)$/);
  if (!mMatch) return { value: 0, suffix: "", hasComma };
  const value = parseInt(mMatch[1].replace(/,/g, ""), 10);
  return { value, suffix: mMatch[2], hasComma };
}

function formatCount(n: number, hasComma: boolean) {
  if (hasComma) return Math.round(n).toLocaleString("en-US");
  return String(Math.round(n));
}

const DURATION = 800; // ms
const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* easeOutQuart */
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function useCountUp(target: number, trigger: boolean) {
  const [count, setCount] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!trigger || prefersReduced) return;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / DURATION, 1);
      setCount(target * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target]);

  return count;
}

function StatItem({ number, label, index }: { number: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { value, suffix, hasComma } = parseStat(number);
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center gap-3 py-10 flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {index > 0 && (
        <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-[rgba(150,138,182,0.4)]" />
      )}

      <span className="font-['Fustat',sans-serif] font-bold text-white text-[clamp(48px,6vw,80px)] leading-[1] tracking-[-0.02em] tabular-nums">
        {formatCount(count, hasComma)}{suffix}
      </span>
      <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] leading-[1.5] tracking-[0.6px] uppercase text-center">
        {label}
      </span>
    </motion.div>
  );
}

export function StatsRowSection() {
  return (
    <section className="bg-[#111] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(150,138,182,0.25)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(150,138,182,0.25)] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-[97px]">
        <div className="grid grid-cols-2 sm:flex sm:flex-row">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} number={stat.number} label={stat.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
