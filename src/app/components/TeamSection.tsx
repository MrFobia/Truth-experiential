import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import imgTeam from "figma:asset/8a0655156791348c1ff0e51b96e73725655b7977.png";

/* ── Floating particles ─────────────────────────────────────── */
const PARTICLES = [
  { x: 8,  y: 12, s: 2 }, { x: 22, y: 55, s: 3 }, { x: 45, y: 20, s: 2 },
  { x: 68, y: 72, s: 3 }, { x: 82, y: 18, s: 1 }, { x: 91, y: 60, s: 2 },
  { x: 55, y: 88, s: 1 }, { x: 33, y: 40, s: 2 }, { x: 76, y: 35, s: 3 },
];

function Particles() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[rgba(150,138,182,0.2)]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 5 + i * 0.5, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Team photo (single cinematic shot) ─────────────────────── */
function TeamPhoto() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.06]);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: "21 / 9" }}
      initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-40px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with parallax */}
      <motion.div className="absolute inset-[-6%]" style={{ scale: imgScale }}>
        <motion.img
          src={imgTeam}
          alt="The Truth crew"
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>

      {/* Base cinematic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,8,20,0.9) 0%, rgba(10,8,20,0.25) 45%, rgba(10,8,20,0.15) 100%)",
        }}
      />

      {/* Hover: lavender tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background:
            "linear-gradient(to top, rgba(150,138,182,0.20) 0%, rgba(108,92,231,0.06) 55%, transparent 85%)",
        }}
      />

      {/* Hover: border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 0 1px rgba(150,138,182,0.4), 0 0 60px rgba(150,138,182,0.14)"
            : "inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
        <motion.p
          className="font-['Fustat',sans-serif] text-white text-[22px] md:text-[28px] leading-[1.1] font-bold"
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.4 }}
        >
          The crew <span className="text-white/50 font-normal italic">behind every room.</span>
        </motion.p>
        <motion.div
          className="h-px mt-3 mb-3 rounded-full"
          style={{
            background: "linear-gradient(to right, rgba(150,138,182,0.5), transparent)",
            transformOrigin: "left",
          }}
          animate={{ scaleX: hovered ? 1 : 0.25, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.45 }}
        />
        <motion.p
          className="font-['Poppins',sans-serif] text-white/45 text-[13px] md:text-[14px] leading-[1.6] max-w-[560px]"
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.4 }}
        >
          Strategists, producers, technologists, and bilingual ambassadors — together.
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Main Section ───────────────────────────────────────────── */
export function TeamSection() {
  return (
    <section
      id="people"
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: "linear-gradient(to bottom, rgba(150,138,182,0.08) 0%, rgb(10,8,20) 35%, rgb(10,8,20) 100%)" }}
    >
      {/* Radial bg glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 40%, rgba(150,138,182,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 85% 70%, rgba(108,92,231,0.04) 0%, transparent 50%)",
        }}
      />

      <Particles />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-[97px]">

        {/* ── Header (centered) ── */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-px w-10 bg-[rgba(150,138,182,0.5)]" />
            <span className="font-['Poppins',sans-serif] text-[11px] tracking-[3.6px] uppercase text-[#968ab6] font-semibold">
              The crew.
            </span>
            <div className="h-px w-10 bg-[rgba(150,138,182,0.5)]" />
          </motion.div>

          <motion.h2
            className="font-['Fustat',sans-serif] font-bold text-white text-[clamp(40px,4.5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            People{" "}
            <span className="italic text-[#968ab6]">matter.</span>
          </motion.h2>

          <motion.p
            className="font-['Poppins',sans-serif] text-[rgba(255,255,255,0.5)] text-[17px] leading-[1.8] max-w-[540px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Strategists, producers, technologists, and the bilingual ambassadors who keep it all running. The roster behind every room we've ever set foot in.
          </motion.p>
        </div>

        {/* ── Single team photo ── */}
        <TeamPhoto />

        {/* ── Footer link out ── */}
        <motion.div
          className="flex items-center justify-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://truth.agency"
            className="inline-flex items-center gap-2 font-['Poppins',sans-serif] text-[14px] text-white/40 tracking-[0.3px] cursor-pointer"
            whileHover={{ color: "rgba(150,138,182,1)" }}
            transition={{ duration: 0.25 }}
          >
            <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.25 }}>
              See the full team on truth.agency
            </motion.span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(10,8,20,1), transparent)" }}
      />
    </section>
  );
}
