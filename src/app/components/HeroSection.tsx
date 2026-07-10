import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import heroBanner from "../../assets/hero-banner.avif";
import svgPaths from "../../imports/svg-8zp67e2zbv";

const VIDEO_ID = "nOvG2vvTn04";

const YT_EMBED =
  `https://www.youtube.com/embed/${VIDEO_ID}` +
  "?autoplay=1&rel=0&modestbranding=1&playsinline=1";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/* T002 — dynamic rotating hero H1 */
const ROTATING_WORDS: [string, string][] = [
  ["Experiences", "matter."],
  ["Details", "matter."],
  ["Intelligence", "matters."],
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const [reelOpen, setReelOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Close on Escape */
  useEffect(() => {
    if (!reelOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setReelOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reelOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = mq.matches;
    setPrefersReducedMotion(reduced);
    if (reduced) setVideoPlaying(false);
    const onChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setVideoPlaying(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Load YouTube IFrame API and init background player */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const initPlayer = () => {
      if (ytPlayerRef.current) return;
      ytPlayerRef.current = new window.YT.Player("yt-bg-player", {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1, mute: 1, loop: 1,
          playlist: VIDEO_ID,
          controls: 0, rel: 0, modestbranding: 1,
          playsinline: 1, disablekb: 1, fs: 0,
        },
        events: {
          onReady: (e: any) => { e.target.mute(); e.target.playVideo(); },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer(); };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }

    return () => { ytPlayerRef.current?.destroy(); ytPlayerRef.current = null; };
  }, [prefersReducedMotion]);

  /* T002/T080 — rotate hero H1 word set every ~3s, paused under reduced motion.
     Crossfades in place (same DOM node, style-only tween) instead of unmount/
     remount via AnimatePresence+key: a full remount every 3s forever kept
     re-triggering a new LCP paint candidate on the page's largest element,
     so Lighthouse's LCP metric never settled (measured ~23s). */
  const [wordsVisible, setWordsVisible] = useState(true);
  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setWordsVisible(false);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setWordsVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  const [line1, line2] = ROTATING_WORDS[wordIndex];

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background: YouTube IFrame API player (muted autoplay loop) */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: bgY }}>
        {/* YT API mounts into this div — always in DOM so the player isn't destroyed */}
        <div
          id="yt-bg-player"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            width: "100vw",
            height: "56.25vw",
            minWidth: "177.78vh",
            minHeight: "100vh",
            transform: "translate(-50%, -50%) scale(1.3)",
            opacity: videoPlaying ? 0.5 : 0,
            transition: "opacity 0.6s",
          }}
        />
        {/* Poster shown when video is paused or reduced-motion */}
        <img
          src={heroBanner}
          alt=""
          fetchPriority="high"
          className="w-full h-[130%] object-cover transition-opacity duration-700"
          style={{
            objectPosition: "center 35%",
            opacity: videoPlaying ? 0 : 0.5,
          }}
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Purple glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(150,138,182,1) 0%, transparent 70%)",
            right: "10%",
            top: "10%",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Floating particles */}
      {!prefersReducedMotion && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[rgba(150,138,182,0.3)]"
          style={{
            width: 3 + Math.random() * 4,
            height: 3 + Math.random() * 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-end h-full px-6 md:px-20 pb-24 md:pb-32 max-w-[1400px] mx-auto"
        style={{ y: textY, opacity }}
      >
        <motion.p
          className="text-[#968ab6] text-[11px] tracking-[3.9px] uppercase font-['Poppins',sans-serif] mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          — Est. 2005 · Experiential Marketing · Dallas · CDMX · Bogotá
        </motion.p>

        <motion.p
          className="text-white/70 text-[18px] italic font-['Sofia_Sans_Condensed',sans-serif] mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Where culture becomes a moment.
        </motion.p>

        <h1 className="leading-[0.9]">
          <div className="overflow-hidden pb-[0.18em]">
            <motion.span
              className="block font-['Fustat',sans-serif] text-white text-[clamp(40px,10vw,140px)] leading-[0.9] tracking-[-0.03em] font-extrabold"
              animate={{ y: wordsVisible ? 0 : -60, opacity: wordsVisible ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >{line1}</motion.span>
          </div>
          <div className="overflow-hidden pb-[0.18em]">
            <motion.span
              className="block font-['Sofia_Sans_Condensed',sans-serif] italic text-[#968ab6] text-[clamp(40px,10vw,140px)] leading-[0.9] tracking-[-0.03em] font-bold"
              animate={{ y: wordsVisible ? 0 : -60, opacity: wordsVisible ? 1 : 0 }}
              transition={{ duration: 0.4, delay: wordsVisible ? 0.08 : 0, ease: [0.25, 0.46, 0.45, 0.94] }}
            >{line2}</motion.span>
          </div>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-12 gap-8">
          <motion.p
            className="text-white/70 text-[16px] md:text-[18px] leading-[1.6] font-['Poppins',sans-serif] font-light max-w-[520px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            A force for good — built on integrity, fueled by intelligence.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.button
              className="px-7 py-3.5 rounded-full bg-[#7a6fa0] text-white text-[13px] font-['Poppins',sans-serif] font-bold cursor-pointer w-full sm:w-auto"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(150,138,182,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start something →
            </motion.button>

            <motion.button
              className="flex items-center justify-center sm:justify-start gap-3 cursor-pointer group"
              whileHover={{ x: 5 }}
              onClick={() => setReelOpen(true)}
            >
              <motion.div
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
                whileHover={{ borderColor: "rgba(150,138,182,0.6)", scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d={svgPaths.p11c20100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </motion.div>
              <span className="text-white/60 text-[13px] tracking-[1.3px] uppercase font-['Poppins',sans-serif] group-hover:text-white transition-colors">
                Watch the Reel
              </span>
            </motion.button>

            {/* Video pause/play */}
            <motion.button
              type="button"
              onClick={() => {
                const next = !videoPlaying;
                setVideoPlaying(next);
                if (next) ytPlayerRef.current?.playVideo();
                else ytPlayerRef.current?.pauseVideo();
              }}
              aria-label={videoPlaying ? "Pause background video" : "Play background video"}
              className="w-12 h-12 rounded-full border border-white/20 bg-black/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#968ab6]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {videoPlaying
                ? <span className="text-[10px] tracking-widest">❚❚</span>
                : <span className="text-[12px]">▶</span>
              }
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Fullscreen reel modal */}
      <AnimatePresence>
        {reelOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setReelOpen(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-[13px] tracking-[2px] uppercase font-['Poppins',sans-serif] cursor-pointer z-10 flex items-center gap-2"
              onClick={() => setReelOpen(false)}
            >
              <span>Close</span>
              <span className="text-[18px] leading-none">×</span>
            </button>

            {/* Video — stop propagation so clicking iframe doesn't close modal */}
            <div
              className="w-full max-w-[1280px] px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={YT_EMBED}
                  title="Truth — the reel"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-xl"
                  style={{ border: "none" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
      </motion.div>
    </section>
  );
}
