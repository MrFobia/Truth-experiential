import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Crosshair, Globe, Users, Gem } from "lucide-react";

/* ── data ───────────────────────────────────────────────────────── */

const stats = [
  { value: 21.6, suffix: "%", prefix: "+", label: "YoY appointment lift (Liberty Tax, 2024)", icon: Crosshair },
  { value: 670, suffix: "%", prefix: "", label: "ROAS across channels (TGI Friday's)", icon: Globe },
  { value: 15, suffix: "M+", prefix: "", label: "First-party datapoints", icon: Users },
  { value: 98, suffix: "%", prefix: "", label: "Positive sentiment (avg.)", icon: Gem },
];

const reasons = [
  {
    num: "01",
    title: "Cultural Intelligence.",
    short: "In-language, in-culture, in-community",
    detail:
      "In-language, in-culture, in-community. Bilingual ambassadors, on-the-ground research, and collaborations with renowned media partners and promoters across multiple cultural platforms.",
    gradient: "from-[#968ab6] to-[#6c5ce7]",
    image: "https://images.unsplash.com/photo-1758873271761-6cfe9b4f000c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMHN0cmF0ZWd5JTIwY3JlYXRpdmUlMjBicmFpbnN0b3JtJTIwZGl2ZXJzZSUyMHRlYW18ZW58MXx8fHwxNzcyMTMzMzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    num: "02",
    title: "Coast-to-Coast Reach.",
    short: "Teams on the ground in every market we activate",
    detail:
      "Dallas, CDMX, Bogotá, Vancouver — plus 50+ cities in between. Teams on the ground in every market we activate.",
    gradient: "from-[#6c5ce7] to-[#a29bfe]",
    image: "https://images.unsplash.com/photo-1651908584750-63944825feb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBjaXR5JTIwc2t5bGluZSUyMHBhbm9yYW1pYyUyMG11bHRpcGxlJTIwY2l0aWVzfGVufDF8fHx8MTc3MjEzMzM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    num: "03",
    title: "Immersive Technology.",
    short: "Spatial, generative, reactive — chosen for the story",
    detail:
      "Spatial, generative, reactive — chosen for the story, not the spec sheet.",
    gradient: "from-[#a29bfe] to-[#968ab6]",
    image: "https://images.unsplash.com/photo-1687389806477-22be64a5480f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwaW1tZXJzaXZlJTIwdGVjaG5vbG9neSUyMGV4aGliaXRpb258ZW58MXx8fHwxNzcyMTMzMzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    num: "04",
    title: "Data-Driven Results.",
    short: "Every dollar accounted for. Every moment, measured.",
    detail:
      "Every dollar accounted for. Every moment, measured against the goal it was built for.",
    gradient: "from-[#968ab6] to-[#7c6fb0]",
    image: "https://images.unsplash.com/photo-1578070581071-d9b52bf80993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwZ2xvd2luZyUyMHNjcmVlbnN8ZW58MXx8fHwxNzcyMTMzMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    num: "05",
    title: "Community-Embedded Teams.",
    short: "Our crews live where they work",
    detail:
      "Our crews live where they work. The local nuance shows up in the work — and the post-event data.",
    gradient: "from-[#7c6fb0] to-[#6c5ce7]",
    image: "https://images.unsplash.com/photo-1767274101063-a735a6849afc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwY29tbXVuaXR5JTIwZmVzdGl2YWwlMjBvdXRkb29yJTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc3MjEzMzM4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

/* ── animated counter ───────────────────────────────────────────── */

function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      if (current !== start) {
        start = current;
        setCount(current);
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
}

/* ── floating particles ─────────────────────────────────────────── */

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(150, 138, 182, ${0.15 + Math.random() * 0.25})`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ── stat card ──────────────────────────────────────────────────── */

function StatCard({
  value,
  suffix,
  prefix,
  label,
  icon: Icon,
  index,
}: {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
  icon: React.ElementType;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, isInView);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouse = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );
  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-default h-full"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative h-full flex flex-col items-center rounded-2xl p-6 md:p-8 text-center overflow-hidden"
        style={{
          rotateX,
          rotateY,
          background: "rgba(255,255,255,0.03)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(150,138,182,0.15)",
          backdropFilter: "blur(10px)",
        }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        whileHover={{
          borderColor: "rgba(150,138,182,0.4)",
          background: "rgba(150,138,182,0.08)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(150,138,182,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="mb-3 flex justify-center">
          <Icon size={28} style={{ color: "rgba(150,138,182,0.7)" }} strokeWidth={1.5} />
        </div>

        <motion.p
          className="font-['Poppins',sans-serif] text-[40px] md:text-[52px] leading-none tracking-tight"
          style={{ color: "rgba(150,138,182,1)" }}
        >
          {prefix}{Number.isInteger(value) ? count : value}{suffix}
        </motion.p>

        <p
          className="mt-auto pt-2 text-[13px] tracking-[1px] uppercase font-['Poppins',sans-serif]"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {label}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ── reason row (expandable) ────────────────────────────────────── */

function ReasonRow({
  reason,
  index,
  isActive,
  onClick,
  onKeyDown,
  buttonRef,
}: {
  reason: (typeof reasons)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const [focused, setFocused] = useState(false);
  const panelId = `reason-panel-${reason.num}`;
  const headerId = `reason-header-${reason.num}`;

  return (
    <motion.div
      /* Ring lives here — outside overflow:hidden card — so it's never clipped */
      className={[
        "group rounded-xl transition-shadow duration-150",
        focused
          ? "ring-2 ring-[#968ab6] ring-offset-4 ring-offset-[rgb(10,8,20)]"
          : "",
      ].join(" ")}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: isActive
            ? "rgba(150,138,182,0.1)"
            : "rgba(255,255,255,0.02)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: isActive
            ? "rgba(150,138,182,0.3)"
            : "rgba(255,255,255,0.06)",
        }}
        whileHover={{
          background: "rgba(150,138,182,0.08)",
          borderColor: "rgba(150,138,182,0.25)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress bar on active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(150,138,182,1), rgba(108,92,231,1))",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        <div className="px-6 py-5 md:px-8 md:py-6">
          {/* Semantic button — handles Enter, Space, and receives focus */}
          <button
            ref={buttonRef}
            id={headerId}
            aria-expanded={isActive}
            aria-controls={panelId}
            onClick={onClick}
            onKeyDown={onKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full text-left focus-visible:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-5">
              {/* Number */}
              <span
                className="font-['Poppins',sans-serif] text-[14px] tracking-[2px] shrink-0 transition-colors duration-300"
                style={{
                  color: isActive
                    ? "rgba(150,138,182,1)"
                    : "rgba(255,255,255,0.25)",
                }}
              >
                {reason.num}
              </span>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-['Fustat',sans-serif] text-[20px] md:text-[24px] leading-tight tracking-[-0.01em] transition-colors duration-300"
                  style={{
                    color: isActive
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.7)",
                  }}
                >
                  {reason.title}
                </h3>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: "rgba(150,138,182,0.6)" }}
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7 4L13 10L7 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </button>

          {/* Expanded panel */}
          <div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pl-[40px] md:pl-[52px]">
                    <p
                      className="font-['Poppins',sans-serif] text-[15px] leading-[1.75] max-w-[520px]"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {reason.detail}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── main section ───────────────────────────────────────────────── */

export function WhyTruthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeReason, setActiveReason] = useState(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown =
    (index: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = (index + 1) % reasons.length;
        setActiveReason(next);
        buttonRefs.current[next]?.focus();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (index - 1 + reasons.length) % reasons.length;
        setActiveReason(prev);
        buttonRefs.current[prev]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveReason(0);
        buttonRefs.current[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const last = reasons.length - 1;
        setActiveReason(last);
        buttonRefs.current[last]?.focus();
      }
    };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const headingY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  // Auto-cycle reasons
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReason((prev) => (prev + 1) % reasons.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeReason]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "rgb(10, 8, 20)" }}
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 opacity-[0.07]"
        style={{ y: bgY }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1748737665628-6837e30ea0cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBhZXJpYWwlMjBwdXJwbGUlMjBsaWdodHMlMjBldmVudHxlbnwxfHx8fDE3NzIxMzI4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(150,138,182,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(108,92,231,0.06) 0%, transparent 50%)",
        }}
      />

      <FloatingParticles />

      <div className="relative z-10 py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* ── Top: Badge + Heading ─────────────────────────── */}
          <div className="text-center mb-20 md:mb-28">
            <motion.div
              className="inline-flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className="h-px w-8"
                style={{ background: "rgba(150,138,182,0.5)" }}
              />
              <span
                className="text-[11px] tracking-[3.6px] uppercase font-['Poppins',sans-serif]"
                style={{ color: "rgba(150,138,182,1)" }}
              >
                Every moment is a dataset.
              </span>
              <div
                className="h-px w-8"
                style={{ background: "rgba(150,138,182,0.5)" }}
              />
            </motion.div>

            <motion.h2
              className="font-['Fustat',sans-serif] font-bold text-[clamp(40px,4.5vw,64px)] leading-[1.1] tracking-[-0.02em] max-w-[800px] mx-auto"
              style={{
                y: headingY,
                opacity: headingOpacity,
                color: "rgba(255,255,255,1)",
              }}
            >Intelligence <span className="italic" style={{ color: "rgba(150,138,182,1)" }}>matters.</span></motion.h2>

            <motion.p
              className="mt-6 max-w-[600px] mx-auto font-['Poppins',sans-serif] text-[16px] md:text-[17px] leading-[1.8]"
              style={{ color: "rgba(255,255,255,0.45)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We design for the room and the read-out. Every activation comes back with the data to prove it worked — and the shape of what to do next.
            </motion.p>
          </div>

          {/* ── Stats Grid ───────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>

          {/* ── Two-column: Image + Reasons ──────────────────── */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left: sticky image */}
            <motion.div
              className="lg:w-[45%] lg:sticky lg:top-32"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReason}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <ImageWithFallback
                      src={reasons[activeReason].image}
                      alt={reasons[activeReason].title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,8,20,0.8) 0%, rgba(10,8,20,0.1) 50%, transparent 100%)",
                  }}
                />

                {/* Active reason overlay text */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReason}
                    className="absolute bottom-0 left-0 right-0 p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span
                      className="text-[12px] font-['Poppins',sans-serif] tracking-[3px] uppercase"
                      style={{ color: "rgba(150,138,182,0.8)" }}
                    >
                      {reasons[activeReason].num}
                    </span>
                    <p
                      className="font-['Fustat',sans-serif] text-[24px] md:text-[28px] mt-1 leading-tight"
                      style={{ color: "rgba(255,255,255,0.95)" }}
                      aria-hidden="true"
                    >
                      {reasons[activeReason].title}
                    </p>
                    <p
                      className="font-['Poppins',sans-serif] text-[14px] leading-[1.6] mt-2 max-w-[360px]"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      {reasons[activeReason].short}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "rgba(150,138,182,0.15)",
                  }}
                  animate={{
                    borderColor: [
                      "rgba(150,138,182,0.1)",
                      "rgba(150,138,182,0.25)",
                      "rgba(150,138,182,0.1)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-6">
                {reasons.map((_, i) => (
                  <motion.button
                    key={i}
                    aria-label={`View reason ${i + 1}: ${reasons[i].title}`}
                    className="relative h-1.5 rounded-full overflow-hidden cursor-pointer"
                    style={{
                      width: i === activeReason ? 32 : 12,
                      background: "rgba(255,255,255,0.1)",
                    }}
                    animate={{
                      width: i === activeReason ? 32 : 12,
                    }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setActiveReason(i)}
                  >
                    {i === activeReason && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "rgba(150,138,182,1)",
                        }}
                        initial={{ scaleX: 0, transformOrigin: "left" }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 5, ease: "linear" }}
                        key={`progress-${activeReason}-${i}`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right: expandable reasons */}
            <div className="lg:w-[55%] space-y-3">
              <motion.p
                className="font-['Poppins',sans-serif] text-[15px] leading-[1.8] mb-8 max-w-[500px]"
                style={{ color: "rgba(255,255,255,0.4)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                We design for the room and the read-out. Every activation comes back with the data to prove it worked — and the insight to shape what comes next.
              </motion.p>

              <div role="list">
                {reasons.map((reason, i) => (
                  <div key={reason.num} role="listitem">
                    <ReasonRow
                      reason={reason}
                      index={i}
                      isActive={activeReason === i}
                      onClick={() => setActiveReason(i)}
                      onKeyDown={handleKeyDown(i)}
                      buttonRef={(el) => { buttonRefs.current[i] = el; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(10,8,20,1), transparent)",
        }}
      />
    </section>
  );
}