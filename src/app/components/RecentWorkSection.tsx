import { useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { Picture } from "./Picture";
import imgUrbanMusic from "figma:asset/72d5143b59aca6a252f105769f282767f825563c.webp";
import imgGuerrilla from "figma:asset/c68a082d14a52f51bdee72313afb87a0cba6cb7c.webp";
import imgArenaBrand from "figma:asset/ed776bb7e8812966cee11f81432de5b02c8ca1d5.webp";
import imgCommunity from "figma:asset/8af3d1c873fa74ecfe44a06409ba8519daf56674.webp";

import { projectsData } from "./ProjectOffcanvas";

/* ─── Custom circular cursor "View Case" ─── */
function ViewCaseCursor({ x, y, visible }: { x: number; y: number; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed z-50 pointer-events-none flex items-center justify-center size-[100px] rounded-full bg-[#968ab6] mix-blend-difference"
          style={{ left: x - 50, top: y - 50 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <span className="font-['Poppins',sans-serif] font-semibold text-white text-[11px] tracking-[1.1px] uppercase text-center leading-tight">
            View<br />Case
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Arrow icon (top-right) ─── */
function ArrowIcon({ size = 18, opacity = 0.6 }: { size?: number; opacity?: number }) {
  const half = size / 2;
  const q1 = size * 0.292; // ~5.25/18
  const q3 = size * 0.708; // ~12.75/18
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d={`M${q1} ${q1}H${q3}V${q3}`} stroke="white" strokeOpacity={opacity} strokeLinecap="round" strokeLinejoin="round" strokeWidth={size * 0.083} />
      <path d={`M${q1} ${q3}L${q3} ${q1}`} stroke="white" strokeOpacity={opacity} strokeLinecap="round" strokeLinejoin="round" strokeWidth={size * 0.083} />
    </svg>
  );
}

/* ─── Diagonal arrow icon (smaller, for "View Case") ─── */
function SmallArrowIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <path d="M4.08333 4.08333H9.91667V9.91667" stroke="white" strokeOpacity={0.4} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.167} />
      <path d="M4.08333 9.91667L9.91667 4.08333" stroke="white" strokeOpacity={0.4} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.167} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION HEADER — "Selected Work" + "Recently / Made"
   ═══════════════════════════════════════════════════ */
function SectionHeader() {
  return (
    <div className="w-full px-[96px] pt-[128px] pb-0 max-md:px-6 max-md:pt-20">
      {/* Label */}
      <AnimatedSection>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-[#968ab6]" />
          <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[11px] leading-[16.5px] tracking-[3.6px] uppercase">
            Selected work.
          </span>
        </div>
      </AnimatedSection>

      {/* Title + description + View All */}
      <AnimatedSection delay={0.1}>
        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-16">
          <div className="font-['Fustat',sans-serif] font-bold text-[clamp(40px,4.5vw,64px)] leading-[1.1] tracking-[-0.02em] shrink-0">
            <p className="text-white">Clients</p>
            <p className="italic text-[#968ab6]">matter.</p>
          </div>

          <div className="flex flex-col gap-6 pb-2 mt-6 lg:mt-0 flex-1">
            <p className="font-['Poppins',sans-serif] text-white/50 text-[16px] leading-[27.2px] max-w-[442px]">
              Trusted by brands who demand better. Four moments worth re-living — pulled from the last three years of activations.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FULL-WIDTH PROJECT CARD (Projects 1 & 4)
   ═══════════════════════════════════════════════════ */
function FullWidthProject({
  image,
  tag,
  year,
  title,
  subtitle,
  brand,
  description,
  stat,
  number,
  projectId,
  cursorPos,
  onCursorMove,
  onCursorLeave,
}: {
  image: string;
  tag: string;
  year: string;
  title: string;
  subtitle: string;
  brand: string;
  description: string;
  stat: string;
  number: string;
  projectId: string;
  cursorPos: { x: number; y: number; visible: boolean };
  onCursorMove: (e: React.MouseEvent) => void;
  onCursorLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const slug = projectsData.find((p) => p.id === projectId)?.slug ?? "";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`View case study: ${title} ${subtitle} for ${brand}`}
      className="relative w-full h-[clamp(600px,63vw,972px)] max-md:h-auto max-md:flex max-md:flex-col overflow-hidden cursor-none max-md:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#968ab6]"
      onMouseMove={(e) => {
        onCursorMove(e);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        onCursorLeave();
        setIsHovered(false);
      }}
      onClick={() => navigate(`/work/${slug}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/work/${slug}`);
        }
      }}
    >
      {/* Background image with parallax + zoom — full-bleed static block on mobile, absolute cover on desktop */}
      <Picture
        webp={image}
        alt={`${title} ${subtitle} — ${description}`}
        className="md:absolute md:inset-0 w-full h-[110%] max-md:h-[85vw] max-md:relative object-cover transition-transform duration-700"
        style={{ y: imgY, scale: isHovered ? 1.05 : 1 }}
      />
      {/* Gradient overlays — desktop only, text sits on the image there */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 max-md:hidden" />
      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-[rgba(150,138,182,0.4)] to-transparent max-md:hidden" />

      {/* Content — absolute overlay on desktop, reflows below the image on mobile (T033) */}
      <div className="md:absolute md:inset-0 flex flex-col justify-end px-[96px] pb-[80px] max-md:relative max-md:justify-start max-md:bg-black max-md:px-6 max-md:pt-6 max-md:pb-10">
        {/* Tag + Year */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-4">
            <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[11px] leading-[16.5px] tracking-[3.85px] uppercase">
              {tag}
            </span>
            <div className="w-6 h-px bg-[rgba(150,138,182,0.4)]" />
            <span className="font-['Poppins',sans-serif] text-white/30 text-[11px] leading-[16.5px] tracking-[2.2px]">
              {year}
            </span>
          </div>
        </AnimatedSection>

        {/* Big title */}
        <AnimatedSection delay={0.1}>
          <div className="font-['Fustat',sans-serif] font-extrabold text-[clamp(48px,9.2vw,140px)] leading-[0.9] tracking-[-0.04em] mb-4">
            <p className="text-white">{title}</p>
            <p className="text-[#968ab6]">
              {subtitle}
            </p>
          </div>
        </AnimatedSection>

        {/* Brand + Description + Stat */}
        <AnimatedSection delay={0.2}>
          <div className="flex items-end justify-between max-md:flex-col max-md:items-start max-md:gap-6">
            {/* Left: Brand + Description */}
            <div className="flex items-center gap-6">
              <span className="font-['Poppins',sans-serif] text-white/50 text-[14px]">
                {brand}
              </span>
              <div className="w-px h-4 bg-white/10" />
              <p className="font-['Poppins',sans-serif] font-light text-white/30 text-[14px] leading-[22.4px] max-w-[400px]">
                {description}
              </p>
            </div>

            {/* Right: Stat + View case CTA */}
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[13px] tracking-[1.3px] uppercase">
                {stat}
              </span>
              <Link
                to={`/work/${slug}`}
                onClick={(e) => e.stopPropagation()}
                className="font-['Poppins',sans-serif] text-white/40 text-[12px] tracking-[2.4px] uppercase hover:text-white/70 transition-colors"
              >
                View case
              </Link>
              <motion.div
                className="size-12 rounded-full border border-white/20 flex items-center justify-center cursor-pointer"
                whileHover={{ borderColor: "rgba(150,138,182,0.6)", scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowIcon />
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Large number watermark */}
      <div className="absolute right-10 bottom-[60px] pointer-events-none max-md:hidden">
        <span className="font-['Fustat',sans-serif] font-extrabold text-[200px] leading-[200px] text-[#f5b940] opacity-[0.08]">
          {number}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SPLIT PROJECT CARD (Projects 2 & 3)
   ═══════════════════════════════════════════════════ */
function SplitProject({
  image,
  tag,
  title,
  subtitle,
  brandLine,
  description,
  statLabel,
  number,
  reversed,
  projectId,
  onCursorMove,
  onCursorLeave,
}: {
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  brandLine: string;
  description: string;
  statLabel: string;
  number: string;
  reversed?: boolean;
  projectId: string;
  onCursorMove: (e: React.MouseEvent) => void;
  onCursorLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const slug = projectsData.find((p) => p.id === projectId)?.slug ?? "";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const [isImgHovered, setIsImgHovered] = useState(false);

  /* ── Mouse-based parallax ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const imgMouseX = useSpring(mouseX, springConfig);
  const imgMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(((e.clientX - centerX) / (rect.width / 2)) * -20);
    mouseY.set(((e.clientY - centerY) / (rect.height / 2)) * -15);
    onCursorMove(e);
    setIsImgHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onCursorLeave();
    setIsImgHovered(false);
  };

  const textContent = (
    <div className="w-full lg:w-[42%] bg-[#0a0a0a] flex flex-col justify-center px-[80px] py-16 max-md:px-6 max-md:py-12">
      <AnimatedSection direction={reversed ? "right" : "left"}>
        {/* Tag dot + label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="size-2 rounded-full bg-[rgba(150,138,182,0.5)]" />
          <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[11px] tracking-[3.3px] uppercase">
            {tag}
          </span>
        </div>

        {/* Title */}
        <div className="font-['Fustat',sans-serif] font-bold text-[clamp(36px,4.7vw,72px)] leading-[0.95] tracking-[-0.03em] mb-4">
          <p className="text-white">{title}</p>
          <p className="italic text-[rgba(150,138,182,0.7)]">{subtitle}</p>
        </div>

        {/* Brand line */}
        <p className="font-['Poppins',sans-serif] text-white/25 text-[13px] tracking-[1.95px] uppercase mb-6">
          {brandLine}
        </p>

        {/* Description */}
        <p className="font-['Poppins',sans-serif] font-light text-white/80 opacity-80 text-[15px] leading-[25.5px] max-w-[345px] mb-8">
          {description}
        </p>

        {/* Stat pill + View Case */}
        <div className="flex items-center gap-6">
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-full px-[17px] py-[12px]">
            <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[12px] tracking-[1.2px] uppercase">
              {statLabel}
            </span>
          </div>
          <Link
            to={`/work/${slug}`}
            className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:translate-x-1"
          >
            <span className="font-['Poppins',sans-serif] text-white/40 text-[12px] tracking-[2.4px] uppercase">
              View Case
            </span>
            <SmallArrowIcon />
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );

  const imageContent = (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`View case study: ${title} ${subtitle}, ${brandLine}`}
      className="relative w-full lg:w-[58%] h-[600px] lg:h-[800px] overflow-hidden cursor-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#968ab6]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/work/${slug}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/work/${slug}`);
        }
      }}
    >
      <Picture
        webp={image}
        alt={`${title} ${subtitle} — ${description}`}
        className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(110%+40px)] object-cover transition-transform duration-700"
        style={{ y: imgY, x: imgMouseX, translateY: imgMouseY, scale: isImgHovered ? 1.08 : 1 }}
      />
      {/* Fade towards text side */}
      {reversed ? (
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[rgba(10,10,10,0.8)] max-lg:hidden" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(10,10,10,0.8)] max-lg:hidden" />
      )}
      {/* Large number */}
      <div className={`absolute bottom-[60px] pointer-events-none max-md:hidden ${reversed ? "right-10" : "left-10"}`}>
        <span className="font-['Fustat',sans-serif] font-extrabold text-[220px] leading-[220px] text-[#f5b940] opacity-[0.08]">
          {number}
        </span>
      </div>
    </motion.div>
  );

  return (
    <div ref={ref} className={`relative flex max-lg:flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} w-full`}>
      {reversed ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {imageContent}
          {textContent}
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════ */
export function RecentWorkSection() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });

  const handleCursorMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY, visible: true });
  };

  const handleCursorLeave = () => {
    setCursorPos({ x: 0, y: 0, visible: false });
  };

  return (
    <section id="work" className="bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <SectionHeader />

      {/* Spacer matching Figma proportions */}
      <div className="h-[clamp(60px,8vw,128px)]" />

      {/* Case 01 — Remitly Glass Mobile Truck (full-width) */}
      <FullWidthProject
        image={imgUrbanMusic}
        tag="Fintech · Mobile activation"
        year="2024"
        title="Remitly Glass"
        subtitle="Mobile Truck"
        brand="Remitly"
        description="A transparent storefront on wheels — built to earn trust, one block at a time."
        stat="3,311 App Downloads"
        number="01"
        projectId="project1"
        cursorPos={cursorPos}
        onCursorMove={handleCursorMove}
        onCursorLeave={handleCursorLeave}
      />

      <SplitProject
        image={imgGuerrilla}
        tag="Music · Cultural moment"
        title="Los Tigres del Norte"
        subtitle="For Pizza Patron"
        brandLine="Pizza Patron — 2023"
        description="30 years on, the brand threw a party the community wanted to be at — and brought a legend to headline it."
        statLabel="17,258 Attendees"
        number="02"
        projectId="project2"
        onCursorMove={handleCursorMove}
        onCursorLeave={handleCursorLeave}
      />

      <SplitProject
        image={imgArenaBrand}
        tag="Sports · Sampling at scale"
        title="Takis Nitro"
        subtitle="at the NFL"
        brandLine="Takis — 2024"
        description="A new flavor needed a national debut — so we built one inside the loudest stadiums in America."
        statLabel="480K+ Samples"
        number="03"
        reversed
        projectId="project3"
        onCursorMove={handleCursorMove}
        onCursorLeave={handleCursorLeave}
      />

      <FullWidthProject
        image={imgCommunity}
        tag="Immersive tech · Festival"
        year="2023"
        title="Búfalo VR"
        subtitle="Drums Experience"
        brand="Búfalo (Grupo Herdez)"
        description="A bottled-sauce brand earned a moment at the loudest stage in music — and gave fans the mic."
        stat="50K+ Per Show"
        number="04"
        projectId="project4"
        cursorPos={cursorPos}
        onCursorMove={handleCursorMove}
        onCursorLeave={handleCursorLeave}
      />

      <ViewCaseCursor x={cursorPos.x} y={cursorPos.y} visible={cursorPos.visible} />
    </section>
  );
}