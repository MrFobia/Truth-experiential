import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import imgUrban from "figma:asset/c15047379626478d91e6ca9ebda62697d72867b9.png";
import imgGuerrilla from "figma:asset/a10bf8b82488a6410c36cde0ac4b1029262ea40e.png";
import imgSports from "figma:asset/0bdd36fc4eb0dc5f05822830c97b12d0176a58c5.png";

const caseStudies = [
  {
    category: "Music & Entertainment",
    title: "Urban Music Festival Activation",
    stats: [
      { value: "2.3M+", label: "Impressions" },
      { value: "340%", label: "Social Lift" },
      { value: "8.2x", label: "ROI" },
    ],
    image: imgUrban,
  },
  {
    category: "Tech Startup Launch",
    title: "City-Wide Guerrilla Campaign",
    stats: [
      { value: "250,000+", label: "App Downloads" },
      { value: "45%", label: "Viral Share Rate" },
      { value: "12x", label: "ROI Multiplier" },
    ],
    image: imgGuerrilla,
  },
  {
    category: "National Retailer",
    title: "Sports Arena Brand Integration",
    stats: [
      { value: "1.8M", label: "Live Impressions" },
      { value: "67%", label: "Brand Recall" },
      { value: "4.5x", label: "Revenue Impact" },
    ],
    image: imgSports,
  },
];

/* ─── Individual Case Study Card with parallax ─── */
function CaseStudyCard({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const cardY = useTransform(scrollYProgress, [0, 0.3, 0.5], [60, 10, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [0, 0.5, 1]);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      style={{ y: reduced ? 0 : cardY, opacity: cardOpacity }}
    >
      <motion.div
        tabIndex={0}
        role="article"
        className={[
          "flex flex-col md:flex-row w-full bg-white rounded-2xl overflow-hidden",
          "shadow-[0_4px_40px_rgba(0,0,0,0.06)] cursor-pointer group",
          /* focus-visible: 2px lavender outline, 4px offset */
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[#968ab6] focus-visible:ring-offset-4",
        ].join(" ")}
        whileHover={reduced ? undefined : { y: -4, boxShadow: "0 8px 60px rgba(0,0,0,0.12)" }}
        transition={{ duration: 0.4 }}
      >
        {/* Image with parallax */}
        <div className="md:w-[40%] h-[240px] md:h-[300px] overflow-hidden relative">
          <motion.img
            src={study.image}
            alt={study.title}
            className="w-full h-[120%] object-cover absolute top-0 left-0"
            style={{ y: imgY }}
            whileHover={reduced ? undefined : { scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          {/* Hover overlay — lavender tint, skipped when reduced motion */}
          {!reduced && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              style={{ background: "rgba(150,138,182,0.12)" }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white md:bg-gradient-to-r md:from-transparent md:to-white" />
        </div>

        {/* Content with staggered entry */}
        <div className="md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
          <motion.span
            className="text-[#968ab6] text-[11px] tracking-[2.2px] uppercase font-['Poppins',sans-serif] font-semibold mb-2 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {study.category}
          </motion.span>

          <motion.h3
            className="font-['Fustat',sans-serif] text-[#111] text-[24px] md:text-[30px] leading-[1.2] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {study.title}
          </motion.h3>

          <div className="flex gap-8 md:gap-12 mb-6">
            {study.stats.map((stat, sIdx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.15 + sIdx * 0.08 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <p className="text-[#111] text-[28px] md:text-[32px] font-['Poppins',sans-serif] font-extrabold leading-none">
                  {stat.value}
                </p>
                <p className="text-[#717182] text-[12px] font-['Poppins',sans-serif] font-medium mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-2 text-[#968ab6] text-[13px] font-['Poppins',sans-serif] font-semibold"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.35 }}
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{ x: 5 }}
          >
            <span>View Full Case Study</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.33 8H12.67" stroke="#968ab6" strokeLinecap="round" strokeWidth="1.33" />
              <path d="M8 3.33L12.67 8L8 12.67" stroke="#968ab6" strokeLinecap="round" strokeWidth="1.33" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section header with parallax title ─── */
function SectionHeaderContent() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["20px", "-30px"]);

  return (
    <div ref={headerRef} className="relative">
      <AnimatedSection>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#968ab6]" />
          <span className="text-[#968ab6] text-[12px] tracking-[3.6px] uppercase font-['Poppins',sans-serif] font-semibold">
            Case Studies
          </span>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <motion.h2
          className="font-['Fustat',sans-serif] text-[#111] text-[clamp(36px,5vw,52px)] leading-[1.1] tracking-[-0.02em] mb-4 max-w-[600px]"
          style={{ y: titleY }}
        >
          Results that <span className="italic text-[#968ab6]">speak.</span>
        </motion.h2>
      </AnimatedSection>
    </div>
  );
}

/* ─── Main section ─── */
export function CaseStudiesSection() {
  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <SectionHeaderContent />

        <div className="mt-12 md:mt-16 space-y-4">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.title} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}