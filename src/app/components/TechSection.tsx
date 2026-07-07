import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import imgAR1 from "figma:asset/a87678d653e5150fc1a162166dfbc51596054e2f.png";
import imgAR2 from "figma:asset/19b8bfea727811f56a529b7788f93b4f538a8d50.png";
import imgDigital from "figma:asset/3c9bac7a71102b3de4c075d9c784320fd36e0af2.png";
import imgGamified from "figma:asset/782e45736cb3284476228acbf91a58175d94b0df.png";
import imgGamified2 from "figma:asset/59f27479d3d1af0b26b4ce3172498ad8336755ec.png";
import svgPaths from "../../imports/svg-8zp67e2zbv";

const techCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d={svgPaths.p24589d80} stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d={svgPaths.p338e5b80} stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
      </svg>
    ),
    title: "AR / VR installations.",
    desc: "Immersive layers that turn a venue into a story you can step inside. Built and deployed for Búfalo across four arena-grade concerts.",
    tag: "Spatial · Generative",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d={svgPaths.p3e29e880} stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M7.33 19.25H14.67" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M11 15.58V19.25" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
      </svg>
    ),
    title: "Interactive mirrors & sensors.",
    desc: "Spaces that respond. Surfaces that talk back — and remember what they heard.",
    tag: "Computer vision · Real-time",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5.5 10.08H9.17" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M7.33 8.25V11.92" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M13.75 11H13.76" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M16.5 9.17H16.51" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
      </svg>
    ),
    title: "Reactive environments.",
    desc: "Lighting, sound, motion — choreographed live, never canned. Engineered for repeatable scale across multi-market tours.",
    tag: "Show control · Lighting · Audio",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d={svgPaths.p3c5d1000} stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M16.5 15.58V8.25" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M11.92 15.58V4.58" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        <path d="M7.33 15.58V12.83" stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
      </svg>
    ),
    title: "Mobile + modular builds.",
    desc: "Trucks, trailers, pop-ups — engineered to travel. The Remitly Glass Mobile Truck ran three cities through a hurricane and didn't miss a market.",
    tag: "Mobile · Modular · Production",
  },
];

const galleryImages = [
  { src: imgAR1, alt: "AR-tracked installation build during load-in" },
  { src: imgAR2, alt: "VR headset fitting on-site before a live activation" },
  { src: imgDigital, alt: "Interactive digital display wall in production" },
  { src: imgGamified, alt: "Gamified touchpoint being calibrated for a mobile tour" },
  { src: imgGamified2, alt: "Reactive lighting rig staged ahead of a show" },
];

export function TechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#111] via-[#0a0a0f] to-[#111] py-24 md:py-32 overflow-hidden relative">
      {/* Background particles */}
      {!reduced && Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[rgba(150,138,182,0.2)]"
          style={{
            width: 3 + Math.random() * 3,
            height: 3 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#968ab6]" />
            <span className="text-[#968ab6] text-[11px] tracking-[3.6px] uppercase font-['Poppins',sans-serif] font-semibold">
              Where craft meets code.
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2 className="font-['Fustat',sans-serif] font-bold text-white text-[clamp(40px,4.5vw,64px)] leading-[1.1] tracking-[-0.02em] max-w-[592px] mb-4">Innovation <span className="italic font-['Sofia_Sans_Condensed',sans-serif] text-[#968ab6]">matters.</span></h2>
          <p className="font-['Poppins',sans-serif] text-white/50 text-[16px] leading-[1.7] max-w-[540px] mb-12">
            The room is the canvas. The tech is the brush. From VR drum stages to glass-walled mobile trucks, we build experiences that work the first time — and scale on the second.
          </p>
        </AnimatedSection>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 items-stretch">
          {techCards.map((card, index) => (
            <AnimatedSection key={card.title} delay={index * 0.1} className="h-full">
              <motion.div
                className="h-full flex flex-col bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 md:p-8 group cursor-pointer"
                whileHover={{
                  borderColor: "rgba(150,138,182,0.3)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-[14px] bg-[rgba(150,138,182,0.1)] border border-[rgba(150,138,182,0.2)] flex items-center justify-center mb-6 shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-white text-[18px] md:text-[20px] font-['Poppins',sans-serif] font-bold mb-3">
                  {card.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.5)] text-[14px] leading-[1.7] font-['Poppins',sans-serif] mb-4 flex-1">
                  {card.desc}
                </p>
                <p className="text-[#968ab6] text-[11px] tracking-[1.1px] font-['Poppins',sans-serif] font-medium mt-auto">
                  {card.tag}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* In-production gallery — separate from the cards above, own eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#968ab6]" />
          <span className="text-[#968ab6] text-[11px] tracking-[3.6px] uppercase font-['Poppins',sans-serif] font-semibold">
            In production.
          </span>
        </div>
        <motion.div className="flex gap-4 mb-16" style={{ x: marqueeX }}>
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="shrink-0 w-[280px] md:w-[430px] h-[200px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
