import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";

/* T090 — caseSlug links the quote to its real /work/[slug] case. Liberty Tax
   has no matching case in projectsData, so it falls back to the #work anchor. */
const quotes = [
  {
    text: "Truth treats our activations like product launches — every detail engineered, every dollar accounted for, every market measured. The Glass Mobile Truck didn't just earn downloads — it earned a place in the communities we needed to be in.",
    name: "Remitly",
    logo: "/logos/remitly.svg",
    context: "Glass Mobile Truck · Multi-market activation",
    caseSlug: "remitly-glass-mobile-truck",
  },
  {
    text: "What Truth does that no one else does is treat the room and the spreadsheet with equal respect. The activation moves the audience; the data moves the business.",
    name: "Liberty Tax",
    logo: null,
    context: "Seasonal brand activation",
    caseSlug: null,
  },
];

const AUTOPLAY_MS = 8000;

export function TestimonialSection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { margin: "-20%" });
  const quote = quotes[active];

  const go = useCallback((next: number) => {
    setDir(next > active || (active === quotes.length - 1 && next === 0) ? 1 : -1);
    setActive((next + quotes.length) % quotes.length);
  }, [active]);

  /* Autoplay */
  useEffect(() => {
    if (paused || !inView) return;
    const t = setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, inView, go]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0d0d0d] py-28 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 55% 50% at 50% 30%, rgba(150,138,182,0.10) 0%, transparent 62%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{ background: "radial-gradient(ellipse 40% 40% at 85% 80%, rgba(108,92,231,0.08) 0%, transparent 55%)" }}
      />

      <div className="relative z-10 max-w-[1080px] mx-auto px-6 md:px-[97px]">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-6 h-px bg-[#968ab6]" />
            <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] tracking-[3.6px] uppercase">
              Client trust.
            </span>
            <div className="w-6 h-px bg-[#968ab6]" />
          </motion.div>

          <motion.h2
            className="font-['Fustat',sans-serif] font-bold text-white text-[clamp(40px,4.5vw,64px)] leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            Trust <span className="italic text-[#968ab6]">matters.</span>
          </motion.h2>
        </div>

        {/* Glass card */}
        <motion.div
          className="relative rounded-[28px] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 30px 80px -40px rgba(150,138,182,0.4)",
          }}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(150,138,182,0.5)] to-transparent" />

          {/* Giant watermark quote */}
          <span className="absolute -top-8 left-6 font-['Fustat',sans-serif] text-[#968ab6]/[0.08] text-[220px] leading-none select-none pointer-events-none">
            “
          </span>

          <div className="relative px-8 py-14 md:px-16 md:py-20 min-h-[360px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={active}
                custom={dir}
                className="m-0"
                initial={(d: number) => ({ opacity: 0, x: d * 40 })}
                animate={{ opacity: 1, x: 0 }}
                exit={(d: number) => ({ opacity: 0, x: d * -40 })}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <blockquote className="font-['Fustat',sans-serif] text-white text-center text-[clamp(20px,2.4vw,32px)] leading-[1.5] tracking-[-0.01em] max-w-[820px] mx-auto m-0">
                  {quote.text}
                </blockquote>

                {/* Attribution */}
                <figcaption className="flex flex-col items-center gap-3 mt-10">
                  <div className="w-10 h-px bg-[rgba(150,138,182,0.4)]" />
                  <div className="flex items-center gap-3 h-7">
                    {quote.logo ? (
                      <img
                        src={quote.logo}
                        alt={quote.name}
                        className="h-6 w-auto max-w-[120px] object-contain"
                        style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
                      />
                    ) : (
                      <cite className="font-['Poppins',sans-serif] font-bold text-white text-[16px] tracking-[0.5px] not-italic">
                        {quote.name}
                      </cite>
                    )}
                  </div>
                  <span className="font-['Poppins',sans-serif] text-white/35 text-[12px] tracking-[1px] uppercase">
                    {quote.context}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Autoplay progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              key={`${active}-${paused}-${inView}`}
              className="h-full bg-[#968ab6]"
              initial={{ width: "0%" }}
              animate={{ width: paused || !inView ? "0%" : "100%" }}
              transition={{ duration: paused || !inView ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Controls row */}
        <motion.div
          className="flex items-center justify-between mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Prev/Next */}
          <div className="flex items-center gap-2">
            <NavBtn dir="left" onClick={() => go(active - 1)} />
            <NavBtn dir="right" onClick={() => go(active + 1)} />
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === active ? "w-[24px] h-[8px] bg-[#968ab6]" : "w-[8px] h-[8px] bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* CTA — links to the matching case's real /work/[slug] page when one exists */}
          <Link
            to={quote.caseSlug ? `/work/${quote.caseSlug}` : "/#work"}
            className="inline-flex items-center gap-2 font-['Poppins',sans-serif] text-[14px] text-white/50 tracking-[0.3px] cursor-pointer max-sm:hidden hover:text-[#968ab6] transition-colors"
          >
            <span>{quote.caseSlug ? "View this case" : "View case studies"}</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Nav arrow button ── */
function NavBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="size-11 rounded-full border border-white/15 flex items-center justify-center cursor-pointer bg-white/[0.02]"
      whileHover={{ borderColor: "rgba(150,138,182,0.6)", backgroundColor: "rgba(150,138,182,0.08)", scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        <path
          d={dir === "left" ? "M11.25 13.5L6.75 9L11.25 4.5" : "M6.75 13.5L11.25 9L6.75 4.5"}
          stroke="#968ab6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </svg>
    </motion.button>
  );
}
