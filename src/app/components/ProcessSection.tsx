import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import imgStrategy from "figma:asset/ad9caca250501eb48a33224a6b5b136a61a152d6.png";
import imgConcept from "figma:asset/1d1a86636f36b66cbe175eb2b835e3b9c99d577b.png";
import imgPlanning from "figma:asset/f5037801468cee0249e81d4dbfc0105ecaba6db1.png";

const steps = [
  {
    num: "01",
    step: "Insight · Segmentation · Cultural read",
    title: "Strategy & Research.",
    desc: "We start with what people actually do. Audience truths, cultural signals, and category gaps shape every brief before a single asset moves.",
    image: imgStrategy,
  },
  {
    num: "02",
    step: "Creative · Design · Narrative",
    title: "Concept & Creation.",
    desc: "Ideas built to live in the real world. We translate strategy into design, narrative, and craft you can stand inside.",
    image: imgConcept,
  },
  {
    num: "03",
    step: "Production · Logistics · Measurement",
    title: "Planning & Execution.",
    desc: "Permits, pixels, production — plus the brand ambassadors, mobile builds, and logistics that get it on the ground. We run the full operation.",
    image: imgPlanning,
  },
];

const TOTAL_PAGES = 3;

/* ─── Process Card ─── */
function ProcessCard({
  step,
  className = "shrink-0 w-[520px] h-full max-lg:w-[75vw]",
}: {
  step: (typeof steps)[0];
  className?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src={step.image}
        alt={step.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.95)] via-[rgba(17,17,17,0.4)] to-transparent" />

      <div className="absolute top-6 right-6 pointer-events-none">
        <span className="font-['Fustat',sans-serif] font-black text-[140px] leading-[140px] text-white/[0.06]">
          {step.num}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-8 pt-8 pb-8 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="font-['Poppins',sans-serif] font-bold text-[#968ab6] text-[14px] leading-[21px]">
            {step.step}
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <h3 className="font-['Fustat',sans-serif] font-bold text-white text-[28px] leading-[1]">
          {step.title}
        </h3>
        <p className="font-['Poppins',sans-serif] text-white/60 text-[14px] leading-[23.8px] max-w-[460px]">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Dot indicators ─── */
function DotIndicators({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === activeIndex
              ? "w-[24px] h-[8px] bg-[#968ab6]"
              : "w-[8px] h-[8px] bg-[#e5e5ea]"
          }`}
        />
      ))}
    </div>
  );
}

/* ─── Arrow buttons ─── */
function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className="size-10 rounded-full border border-[#e5e5ea] flex items-center justify-center cursor-pointer bg-transparent"
      whileHover={{ borderColor: "#968ab6", scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        {direction === "left" ? (
          <path
            d="M11.25 13.5L6.75 9L11.25 4.5"
            stroke="#968ab6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        ) : (
          <path
            d="M6.75 13.5L11.25 9L6.75 4.5"
            stroke="#968ab6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        )}
      </svg>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN SECTION — wheel-hijack carousel
   ═══════════════════════════════════════════════════ */
export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // We keep translateX in a ref for instant access inside event handlers,
  // and mirror it to state to trigger React renders.
  const xRef = useRef(0);
  const [xState, setXState] = useState(0);
  const [maxX, setMaxX] = useState(0);
  const lockedRef = useRef(false);

  const activeIndex =
    maxX > 0
      ? Math.min(
          TOTAL_PAGES - 1,
          Math.round((Math.abs(xState) / maxX) * (TOTAL_PAGES - 1))
        )
      : 0;

  /* ── Measure total track overflow ── */
  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const trackW = trackRef.current.scrollWidth;
    const vpW = window.innerWidth;
    setMaxX(Math.max(0, trackW - vpW));
  }, []);

  useEffect(() => {
    measure();
    const t = setTimeout(measure, 600); // re-measure after images settle
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ── Scroll-hijack via wheel + touch ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || maxX <= 0) return;

    const SPEED = 1.2; // multiplier for smoother feel

    /* Helper: is the section covering the viewport? */
    const isSectionInView = () => {
      const r = section.getBoundingClientRect();
      // Section top is at or above viewport top, and still covers most of the viewport
      return r.top <= 5 && r.bottom >= window.innerHeight * 0.5;
    };

    /* Helper: apply a delta (positive = scroll-down = move carousel left) */
    const applyDelta = (delta: number): "consumed" | "passthrough" => {
      const x = xRef.current;

      if (delta > 0) {
        // Scrolling DOWN → carousel moves LEFT
        if (x <= -maxX) {
          // Already at the end → let page scroll
          lockedRef.current = false;
          return "passthrough";
        }
        const newX = Math.max(-maxX, x - delta * SPEED);
        xRef.current = newX;
        setXState(newX);
        lockedRef.current = true;
        return "consumed";
      } else if (delta < 0) {
        // Scrolling UP → carousel moves RIGHT
        if (x >= 0) {
          // Already at the start → let page scroll
          lockedRef.current = false;
          return "passthrough";
        }
        const newX = Math.min(0, x - delta * SPEED);
        xRef.current = newX;
        setXState(newX);
        lockedRef.current = true;
        return "consumed";
      }
      return "passthrough";
    };

    /* ── Wheel handler ── */
    const onWheel = (e: WheelEvent) => {
      if (!isSectionInView() && !lockedRef.current) return;

      // If we were locked but the section scrolled away (e.g. momentum), unlock
      if (lockedRef.current && !isSectionInView()) {
        lockedRef.current = false;
        return;
      }

      const result = applyDelta(e.deltaY);
      if (result === "consumed") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    /* ── Touch handlers ── */
    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (!isSectionInView() && !lockedRef.current) return;
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isSectionInView() && !lockedRef.current) return;

      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY; // positive = finger moved up = scroll down
      touchStartY = touchY;

      const result = applyDelta(delta);
      if (result === "consumed") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    /* ── Scroll handler: snap section to viewport top on entry ── */
    const onScroll = () => {
      if (lockedRef.current) return;
      const r = section.getBoundingClientRect();

      // Scrolling down: section top just crossed viewport top
      if (r.top <= 0 && r.top > -60 && xRef.current > -maxX) {
        window.scrollTo({ top: window.scrollY + r.top, behavior: "instant" as ScrollBehavior });
        lockedRef.current = true;
      }
      // Scrolling up: section bottom approaching viewport bottom (coming back from below)
      if (
        r.bottom >= window.innerHeight &&
        r.bottom < window.innerHeight + 60 &&
        xRef.current < 0
      ) {
        window.scrollTo({
          top: window.scrollY + (r.bottom - window.innerHeight),
          behavior: "instant" as ScrollBehavior,
        });
        lockedRef.current = true;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [maxX]);

  /* ── Manual arrow navigation ── */
  const scrollToPage = useCallback(
    (page: number) => {
      if (maxX <= 0) return;
      const clamped = Math.max(0, Math.min(page, TOTAL_PAGES - 1));
      const target = -(clamped / (TOTAL_PAGES - 1)) * maxX;
      xRef.current = target;
      setXState(target);
    },
    [maxX]
  );

  const goNext = () => scrollToPage(activeIndex + 1);
  const goPrev = () => scrollToPage(activeIndex - 1);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen overflow-hidden bg-[#111] flex flex-col"
    >
      {/* ─── Header ─── */}
      <div className="shrink-0 px-[97px] pt-[100px] pb-6 z-10 max-lg:px-6 max-lg:pt-16">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#968ab6]" />
            <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] leading-[18px] tracking-[3.6px] uppercase">How we work.</span>
          </div>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">
          <AnimatedSection delay={0.1}>
            <h2 className="font-['Fustat',sans-serif] font-bold text-white text-[clamp(40px,4.5vw,64px)] leading-[1.1] tracking-[-0.02em]">Details <span className="italic font-['Sofia_Sans_Condensed',sans-serif] text-[#968ab6]">matter.</span></h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-3 lg:mt-1 max-w-[442px]">
            <p className="font-['Poppins',sans-serif] text-white/50 text-[16px] leading-[27.2px]">
              Every great experience is engineered. From the first insight to the last breakdown, the details are where culture lives — and where the work earns its keep.
            </p>
          </AnimatedSection>
        </div>

        {/* Controls — desktop carousel only */}
        <div className="hidden lg:flex items-center justify-between mt-6 max-w-[719px] ml-auto">
          <DotIndicators activeIndex={activeIndex} />
          <div className="flex items-center gap-2">
            <ArrowButton direction="left" onClick={goPrev} />
            <ArrowButton direction="right" onClick={goNext} />
          </div>
        </div>
      </div>

      {/* ─── Carousel track — desktop/tablet ─── */}
      <div className="hidden lg:block shrink-0 relative overflow-hidden h-[690px]">
        <motion.div
          ref={trackRef}
          className="absolute bottom-[50px] left-0 flex items-end gap-[30px] pl-10 pr-10 h-[calc(100%-50px)]"
          animate={{ x: xState }}
          transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        >
          {steps.map((step) => (
            <ProcessCard
              key={step.num}
              step={step}
            />
          ))}
        </motion.div>
      </div>

      {/* ─── T022 — mobile: 1-up stack, 16px gap, no carousel ─── */}
      <div className="lg:hidden flex flex-col gap-4 px-6 pb-16">
        {steps.map((step) => (
          <ProcessCard
            key={step.num}
            step={step}
            className="w-full h-[480px]"
          />
        ))}
      </div>
    </section>
  );
}
