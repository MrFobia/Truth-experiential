import { useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { AnimatedSection } from "./AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Crosshair, Globe, Users, Gem, Linkedin, Twitter, Instagram, Github } from "lucide-react";
import svgPaths from "../../imports/svg-8zp67e2zbv";

/* ─── Spec Block — shows CSS properties for developers ─── */
function SpecBlock({ specs }: { specs: [string, string][] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
      {specs.map(([prop, val]) => (
        <span key={prop} className="font-['Poppins',sans-serif] text-[10px] leading-[16px]">
          <span style={{ color: "rgba(150,138,182,0.5)" }}>{prop}: </span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>{val}</span>
        </span>
      ))}
    </div>
  );
}

/* ─── Helpers ─── */
function ColorSwatch({ color, name, hex, usage }: { color: string; name: string; hex: string; usage: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -4 }}
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
    >
      <div className="w-full aspect-[4/3] rounded-xl mb-3 relative overflow-hidden" style={{ backgroundColor: color }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <span className="font-['Poppins',sans-serif] text-white text-[11px]">{copied ? "Copied!" : "Copy"}</span>
        </div>
      </div>
      <p className="font-['Poppins',sans-serif] text-white text-[14px] mb-0.5">{name}</p>
      <p className="font-['Poppins',sans-serif] text-white/40 text-[12px] tracking-[1px] uppercase mb-1">{hex}</p>
      <p className="font-['Poppins',sans-serif] text-white/25 text-[11px] leading-[16px]">{usage}</p>
    </motion.div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(150,138,182,0.2)] to-transparent my-24" />;
}

/* ─── Section Label (replicating the exact pattern from every section) ─── */
function SectionBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px bg-[#968ab6]" />
      <span className="text-[#968ab6] text-[12px] tracking-[3.6px] uppercase font-['Poppins',sans-serif] font-semibold">{label}</span>
    </div>
  );
}

/* ─── Centered Badge (from WhyTruth/Team) ─── */
function CenteredBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <div className="h-px w-10" style={{ background: "rgba(150,138,182,0.5)" }} />
      <span className="text-[11px] tracking-[5px] uppercase font-['Poppins',sans-serif]" style={{ color: "rgba(150,138,182,1)" }}>{label}</span>
      <div className="h-px w-10" style={{ background: "rgba(150,138,182,0.5)" }} />
    </div>
  );
}

/* ─── Section Heading (Playfair, white + purple italic) ─── */
function SectionHeading({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <h2 className="font-['Fustat',sans-serif] font-bold text-[clamp(36px,5vw,52px)] leading-[1.1] tracking-[-0.02em] mb-12">
      <span className="text-white">{line1} </span>
      <span className="italic text-[#968ab6]">{line2}</span>
    </h2>
  );
}

/* ─── Floating Particles (exact copy from Hero/WhyTruth/Team) ─── */
function FloatingParticles({ count = 10 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, dur: Math.random() * 7 + 5, del: Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: `rgba(150,138,182,${0.15 + Math.random() * 0.25})` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─── Stat Card (exact from WhyTruth with 3D tilt) ─── */
function StatCard({ value, suffix, label, icon: Icon, index }: { value: number; suffix: string; label: string; icon: React.ElementType; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });
  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);
  const handleLeave = useCallback(() => { mouseX.set(0); mouseY.set(0); }, [mouseX, mouseY]);

  return (
    <motion.div
      className="relative group cursor-default" style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative rounded-2xl p-6 md:p-8 text-center overflow-hidden"
        style={{ rotateX, rotateY, background: "rgba(255,255,255,0.03)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(150,138,182,0.15)", backdropFilter: "blur(10px)" }}
        onMouseMove={handleMouse} onMouseLeave={handleLeave}
        whileHover={{ borderColor: "rgba(150,138,182,0.4)", background: "rgba(150,138,182,0.08)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(150,138,182,0.12) 0%, transparent 70%)" }} />
        <div className="mb-3 flex justify-center">
          <Icon size={28} style={{ color: "rgba(150,138,182,0.7)" }} strokeWidth={1.5} />
        </div>
        <p className="font-['Poppins',sans-serif] text-[40px] md:text-[52px] leading-none tracking-tight" style={{ color: "rgba(150,138,182,1)" }}>{value}{suffix}</p>
        <p className="mt-2 text-[13px] tracking-[1px] uppercase font-['Poppins',sans-serif]" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Process Card (exact from ProcessSection) ─── */
function ProcessCardDemo({ num, title, desc, isFeatured }: { num: string; title: string; desc: string; isFeatured?: boolean }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl shrink-0 group cursor-pointer ${isFeatured ? "w-[340px] h-[440px]" : "w-[280px] h-[360px]"}`}
      whileHover={{ scale: 0.98 }} transition={{ duration: 0.4 }}
    >
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80"
        alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.95)] via-[rgba(17,17,17,0.4)] to-transparent" />
      <div className="absolute top-6 right-6 pointer-events-none">
        <span className="font-['Fustat',sans-serif] font-black text-[100px] leading-[100px] text-white/[0.06]">{num}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-6 pt-6 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className="font-['Poppins',sans-serif] font-bold text-[#968ab6] text-[12px] leading-[18px]">Step {num}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <h3 className={`font-['Fustat',sans-serif] font-bold text-white leading-[1] ${isFeatured ? "text-[26px]" : "text-[22px]"}`}>{title}</h3>
        <p className={`font-['Poppins',sans-serif] text-white/60 ${isFeatured ? "text-[14px] leading-[22px]" : "text-[12px] leading-[19px]"}`}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Dot Indicators (exact from ProcessSection) ─── */
function DotIndicators({ activeIndex, total }: { activeIndex: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-[24px] h-[8px] bg-[#968ab6]" : "w-[8px] h-[8px] bg-[#e5e5ea]"}`} />
      ))}
    </div>
  );
}

/* ─── Arrow Button (exact from ProcessSection) ─── */
function ArrowButton({ direction, onClick }: { direction: "left" | "right"; onClick?: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="size-10 rounded-full border border-[#e5e5ea] flex items-center justify-center cursor-pointer bg-transparent"
      whileHover={{ borderColor: "#968ab6", scale: 1.05 }} whileTap={{ scale: 0.95 }}
    >
      <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
        {direction === "left" ? (
          <path d="M11.25 13.5L6.75 9L11.25 4.5" stroke="#968ab6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        ) : (
          <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#968ab6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
        )}
      </svg>
    </motion.button>
  );
}

/* ─── Tech Card (exact from TechSection) ─── */
function TechCardDemo({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 group cursor-pointer"
      whileHover={{ borderColor: "rgba(150,138,182,0.3)", backgroundColor: "rgba(255,255,255,0.04)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-12 h-12 rounded-[14px] bg-[rgba(150,138,182,0.1)] border border-[rgba(150,138,182,0.2)] flex items-center justify-center mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d={svgPaths.p24589d80} stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
          <path d={svgPaths.p338e5b80} stroke="#968AB6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83" />
        </svg>
      </motion.div>
      <h3 className="text-white text-[20px] font-['Poppins',sans-serif] font-bold mb-3">{title}</h3>
      <p className="text-[rgba(255,255,255,0.5)] text-[14px] leading-[1.7] font-['Poppins',sans-serif]">{desc}</p>
    </motion.div>
  );
}

/* ─── Team Card (exact from TeamSection) ─── */
function TeamCardDemo({ name, lastName, role, quote, expertise, socials, image, isActive, onHover }: {
  name: string; lastName: string; role: string; quote: string; expertise: string[]; socials: string[]; image: string; isActive: boolean; onHover: () => void;
}) {
  const socialIcons: Record<string, React.ElementType> = { LinkedIn: Linkedin, Twitter: Twitter, Instagram: Instagram, GitHub: Github };
  return (
    <motion.div className="relative group cursor-pointer rounded-2xl overflow-hidden" style={{ height: 440 }} onMouseEnter={onHover}>
      <motion.div className="absolute inset-0" animate={{ y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <motion.div className="absolute inset-[-12px]" animate={{ scale: isActive ? 1.06 : 1 }} transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <ImageWithFallback src={image} alt={name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,20,0.95) 0%, rgba(10,8,20,0.5) 35%, rgba(10,8,20,0.1) 60%, transparent 100%)" }} />
          <motion.div className="absolute inset-0" animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.5 }} style={{ background: "linear-gradient(to top, rgba(150,138,182,0.25) 0%, rgba(108,92,231,0.08) 40%, transparent 70%)" }} />
          <motion.div className="absolute inset-0" animate={{ opacity: isActive ? 0 : 0.3 }} transition={{ duration: 0.5 }} style={{ background: "rgba(10,8,20,1)" }} />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <motion.p className="font-['Poppins',sans-serif] text-[10px] tracking-[3px] uppercase mb-1" style={{ color: isActive ? "rgba(150,138,182,1)" : "rgba(150,138,182,0.5)" }} animate={{ color: isActive ? "rgba(150,138,182,1)" : "rgba(150,138,182,0.5)" }} transition={{ duration: 0.4 }}>{role}</motion.p>
            <h3 className="font-['Fustat',sans-serif] text-[24px] leading-[1.15] tracking-[-0.01em]" style={{ color: "rgba(255,255,255,1)" }}>{name}<span className="block" style={{ color: "rgba(255,255,255,0.45)" }}>{lastName}</span></h3>
            <AnimatePresence>
              {isActive && (
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  <motion.div className="h-px mt-3 mb-3 rounded-full" style={{ background: "linear-gradient(to right, rgba(150,138,182,0.4), transparent)" }} initial={{ scaleX: 0, transformOrigin: "left" }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
                  <p className="font-['Sofia_Sans_Condensed',sans-serif] italic text-[12px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.5)" }}>&ldquo;{quote}&rdquo;</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {expertise.map((tag, ti) => (
                      <motion.span key={tag} className="font-['Poppins',sans-serif] text-[9px] tracking-[0.8px] uppercase px-2.5 py-1 rounded-full" style={{ color: "rgba(150,138,182,0.8)", background: "rgba(150,138,182,0.08)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(150,138,182,0.12)" }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.15 + ti * 0.06 }}>{tag}</motion.span>
                    ))}
                  </div>
                  <div className="flex gap-2.5 mt-3">
                    {socials.map((s, si) => { const Icon = socialIcons[s] || Linkedin; return (
                      <motion.a key={s} href="#" className="flex items-center justify-center w-8 h-8 rounded-full" style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }} whileHover={{ color: "rgba(150,138,182,1)", borderColor: "rgba(150,138,182,0.4)", background: "rgba(150,138,182,0.12)" }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 + si * 0.08 }}><Icon size={13} /></motion.a>
                    ); })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ borderWidth: 1, borderStyle: "solid", borderColor: isActive ? "rgba(150,138,182,0.25)" : "rgba(255,255,255,0.04)" }} animate={{ borderColor: isActive ? "rgba(150,138,182,0.25)" : "rgba(255,255,255,0.04)" }} transition={{ duration: 0.4 }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Expandable Reason Row (exact from WhyTruth) ─── */
function ReasonRowDemo({ num, title, detail, isActive, onClick }: { num: string; title: string; detail: string; isActive: boolean; onClick: () => void }) {
  return (
    <motion.div className="group cursor-pointer" onClick={onClick}>
      <motion.div
        className="relative rounded-xl overflow-hidden"
        style={{ background: isActive ? "rgba(150,138,182,0.1)" : "rgba(255,255,255,0.02)", borderWidth: 1, borderStyle: "solid", borderColor: isActive ? "rgba(150,138,182,0.3)" : "rgba(255,255,255,0.06)" }}
        whileHover={{ background: "rgba(150,138,182,0.08)", borderColor: "rgba(150,138,182,0.25)" }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: "linear-gradient(to bottom, rgba(150,138,182,1), rgba(108,92,231,1))" }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ scaleY: 0 }} transition={{ duration: 0.4 }} />
          )}
        </AnimatePresence>
        <div className="px-6 py-5">
          <div className="flex items-center gap-5">
            <span className="font-['Poppins',sans-serif] text-[14px] tracking-[2px] shrink-0" style={{ color: isActive ? "rgba(150,138,182,1)" : "rgba(255,255,255,0.25)" }}>{num}</span>
            <div className="flex-1 min-w-0">
              <h3 className="font-['Fustat',sans-serif] text-[20px] leading-tight tracking-[-0.01em]" style={{ color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)" }}>{title}</h3>
            </div>
            <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.3 }} style={{ color: "rgba(150,138,182,0.6)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.div>
          </div>
          <AnimatePresence>
            {isActive && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <div className="pt-4 pl-[52px]">
                  <p className="font-['Poppins',sans-serif] text-[14px] leading-[1.75] max-w-[480px]" style={{ color: "rgba(255,255,255,0.55)" }}>{detail}</p>
                  <motion.div className="mt-3 inline-flex items-center gap-2 text-[13px] font-['Poppins',sans-serif] tracking-[0.5px]" style={{ color: "rgba(150,138,182,1)" }} whileHover={{ x: 4 }}>
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STYLE GUIDE PAGE
   ═══════════════════════════════════════════════════════════════════ */
export function StyleGuidePage() {
  const navigate = useNavigate();
  const [activeTeamCard, setActiveTeamCard] = useState(0);
  const [activeReason, setActiveReason] = useState(0);
  const [dotIndex, setDotIndex] = useState(1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <FloatingParticles count={12} />

      {/* ── Back button ── */}
      <div className="relative z-10 px-6 md:px-24 pt-28 mb-16">
        <motion.button className="flex items-center gap-3 cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }} onClick={() => navigate("/")} whileHover={{ x: -4, color: "rgba(255,255,255,0.8)" }}>
          <ArrowLeft size={16} />
          <span className="font-['Poppins',sans-serif] text-[12px] tracking-[2px] uppercase">Back to Home</span>
        </motion.button>
      </div>

      {/* ── Hero ── */}
      <div className="relative z-10 px-6 md:px-24 mb-32">
        <AnimatedSection><SectionBadge label="Brand System" /></AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="font-['Fustat',sans-serif] font-extrabold text-[clamp(48px,8vw,120px)] leading-[0.9] tracking-[-0.03em] mb-8">
            <p className="text-white">Style</p>
            <p className="italic text-[#968ab6]">Guide</p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <p className="text-white/80 text-[18px] leading-[1.6] font-['Poppins',sans-serif] font-light max-w-[500px]">
            Sistema de diseño completo de TRUth — cada componente, color, fuente y patrón de interacción usado en el sitio.
          </p>
        </AnimatedSection>
      </div>

      <div className="relative z-10 px-6 md:px-24">

        {/* ════════════════════════════════════════════════════════════
           1. PALETA DE COLORES
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Color System" /><SectionHeading line1="Color" line2="Palette" /></AnimatedSection>

        {/* Primary */}
        <AnimatedSection delay={0.1}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Primary Purple</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
            <ColorSwatch color="#968ab6" name="Purple Primary" hex="#968AB6" usage="CTAs, acentos, badges, tags" />
            <ColorSwatch color="#7a6fa0" name="Purple Deep" hex="#7A6FA0" usage="Hover state, scrollbar" />
            <ColorSwatch color="#c4b8e0" name="Purple Light" hex="#C4B8E0" usage="CTA italic text" />
            <ColorSwatch color="rgba(150,138,182,0.5)" name="Purple 50%" hex="rgba(150,138,182,0.5)" usage="Badge lines, dot separators" />
            <ColorSwatch color="rgba(150,138,182,0.15)" name="Purple 15%" hex="rgba(150,138,182,0.15)" usage="Card borders, stat borders" />
            <ColorSwatch color="rgba(150,138,182,0.08)" name="Purple 8%" hex="rgba(150,138,182,0.08)" usage="Card hover bg, expertise tags" />
          </div>
        </AnimatedSection>

        {/* Neutrals */}
        <AnimatedSection delay={0.15}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Whites & Transparencies</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-16">
            <ColorSwatch color="#ffffff" name="White 100%" hex="#FFFFFF" usage="Títulos hero, headings" />
            <ColorSwatch color="rgba(255,255,255,0.8)" name="White 80%" hex="rgba(…,0.8)" usage="Body text, descripciones" />
            <ColorSwatch color="rgba(255,255,255,0.6)" name="White 60%" hex="rgba(…,0.6)" usage="Nav links, icon buttons" />
            <ColorSwatch color="rgba(255,255,255,0.5)" name="White 50%" hex="rgba(…,0.5)" usage="Tech card text, labels" />
            <ColorSwatch color="rgba(255,255,255,0.3)" name="White 30%" hex="rgba(…,0.3)" usage="Footer text, year labels" />
            <ColorSwatch color="rgba(255,255,255,0.06)" name="White 6%" hex="rgba(…,0.06)" usage="Card borders, dividers" />
          </div>
        </AnimatedSection>

        {/* Backgrounds */}
        <AnimatedSection delay={0.2}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Backgrounds</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorSwatch color="#000000" name="Black" hex="#000000" usage="Hero, body base" />
            <ColorSwatch color="#0a0a0a" name="Near Black" hex="#0A0A0A" usage="Recent Work, split cards" />
            <ColorSwatch color="rgb(10, 8, 20)" name="Deep Purple-Black" hex="rgb(10,8,20)" usage="WhyTruth, Team sections" />
            <ColorSwatch color="#111111" name="Charcoal" hex="#111111" usage="Process, Footer, Tech" />
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           2. TIPOGRAFÍA
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Type System" /><SectionHeading line1="Typography" line2="Hierarchy" /></AnimatedSection>

        {/* Font families */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
            {/* Playfair Display */}
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] tracking-[3px] uppercase mb-4 block">Display Font</span>
              <p className="font-['Fustat',sans-serif] font-extrabold text-white text-[48px] leading-[1] mb-4">Playfair</p>
              <p className="font-['Poppins',sans-serif] text-white/30 text-[13px] leading-[20px]">Hero titles, section headings, team names, process cards, project titles, watermark numbers.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Bold", "ExtraBold", "Black", "Italic"].map((w) => (
                  <span key={w} className="px-3 py-1 rounded-full bg-[rgba(150,138,182,0.08)] text-[rgba(150,138,182,0.8)] text-[11px] font-['Poppins',sans-serif] tracking-[1px]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(150,138,182,0.12)" }}>{w}</span>
                ))}
              </div>
            </div>
            {/* Inter */}
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] tracking-[3px] uppercase mb-4 block">UI Font</span>
              <p className="font-['Poppins',sans-serif] font-bold text-white text-[48px] leading-[1] mb-4">Inter</p>
              <p className="font-['Poppins',sans-serif] text-white/30 text-[13px] leading-[20px]">Navigation, buttons, section badges, body text, stats, footer links, newsletter, case study links.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Regular", "Medium", "Semibold", "Bold", "ExtraBold"].map((w) => (
                  <span key={w} className="px-3 py-1 rounded-full bg-[rgba(150,138,182,0.08)] text-[rgba(150,138,182,0.8)] text-[11px] font-['Poppins',sans-serif] tracking-[1px]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(150,138,182,0.12)" }}>{w}</span>
                ))}
              </div>
            </div>
            {/* Space Grotesk */}
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] tracking-[3px] uppercase mb-4 block">Accent Font</span>
              <p className="font-['Poppins',sans-serif] font-medium text-white text-[48px] leading-[1] mb-4">Space</p>
              <p className="font-['Poppins',sans-serif] text-white/30 text-[13px] leading-[20px]">Stat counters, reason numbers, brand names, outline buttons, centered badges, hero subtext.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Light", "Regular", "Medium"].map((w) => (
                  <span key={w} className="px-3 py-1 rounded-full bg-[rgba(150,138,182,0.08)] text-[rgba(150,138,182,0.8)] text-[11px] font-['Poppins',sans-serif] tracking-[1px]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(150,138,182,0.12)" }}>{w}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Type Scale — real examples from the site */}
        <AnimatedSection delay={0.15}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-8">Type Scale (Real Usage)</h3>
          <div className="space-y-8 mb-8">
            {[
              { label: "Hero Title", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "clamp(48px, 10vw, 140px)", tracking: "-0.03em", weight: 800, weightName: "ExtraBold", lineHeight: "0.9", color: "#FFFFFF / #968AB6 italic", transform: "none", sample: "We craft experiences", context: "HeroSection" },
              { label: "Section Heading", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "clamp(36px, 5vw, 52px)", tracking: "-0.02em", weight: 700, weightName: "Bold", lineHeight: "1.1", color: "#FFF + italic #968AB6", transform: "none", sample: "Results that speak.", context: "CaseStudies, Process, Tech" },
              { label: "WhyTruth Heading", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "clamp(36px, 5vw, 64px)", tracking: "-0.03em", weight: 400, weightName: "Regular", lineHeight: "1.1", color: "rgba(255,255,255,1)", transform: "none", sample: "We Create Cultural Moments.", context: "WhyTruthSection (centered)" },
              { label: "Project Title (Full)", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "clamp(48px, 9.2vw, 140px)", tracking: "-0.04em", weight: 800, weightName: "ExtraBold", lineHeight: "0.9", color: "#FFF / outline: stroke 2px rgba(255,255,255,0.25)", transform: "none", sample: "Urban Music Festival", context: "RecentWork full-width" },
              { label: "Project Title (Split)", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "clamp(36px, 4.7vw, 72px)", tracking: "-0.03em", weight: 700, weightName: "Bold", lineHeight: "0.95", color: "#FFF / outline: stroke 1.5px rgba(255,255,255,0.2)", transform: "none", sample: "Guerrilla Campaign", context: "RecentWork split cards" },
              { label: "Process Card Title", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "28–34px", tracking: "0", weight: 700, weightName: "Bold", lineHeight: "1.0", color: "#FFFFFF", transform: "none", sample: "Strategy & Research", context: "ProcessSection cards" },
              { label: "Team Name", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "26–28px", tracking: "-0.01em", weight: 400, weightName: "Regular", lineHeight: "1.15", color: "rgba(255,255,255,1) / lastName: rgba(255,255,255,0.45)", transform: "none", sample: "Adriana Reyes", context: "TeamSection" },
              { label: "Case Study Title", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "24–30px", tracking: "0", weight: 400, weightName: "Regular", lineHeight: "1.2", color: "#111111", transform: "none", sample: "Urban Music Festival Activation", context: "CaseStudiesSection (white bg)" },
              { label: "Tech Card Title", font: "'Inter',sans-serif", fontName: "Inter", size: "20px", tracking: "0", weight: 700, weightName: "Bold", lineHeight: "1.5", color: "#FFFFFF", transform: "none", sample: "AR/VR Installations", context: "TechSection" },
              { label: "Body Large", font: "'Inter',sans-serif", fontName: "Inter", size: "18px", tracking: "0", weight: 300, weightName: "Light", lineHeight: "1.6", color: "rgba(255,255,255,0.8)", transform: "none", sample: "We design and produce immersive brand experiences.", context: "HeroSection" },
              { label: "Body", font: "'Inter',sans-serif", fontName: "Inter", size: "16px", tracking: "0", weight: 400, weightName: "Regular", lineHeight: "1.7", color: "rgba(255,255,255,0.5)", transform: "none", sample: "Six interconnected phases that transform brand vision into measurable cultural impact.", context: "ProcessSection, Tech body" },
              { label: "Body Small", font: "'Inter',sans-serif", fontName: "Inter", size: "14–15px", tracking: "0", weight: 400, weightName: "Regular", lineHeight: "1.75", color: "rgba(255,255,255,0.55)", transform: "none", sample: "We embed ourselves in the communities we activate.", context: "WhyTruth expanded detail" },
              { label: "CTA Heading", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "clamp(36px, 5vw, 60px)", tracking: "-0.02em", weight: 400, weightName: "Regular", lineHeight: "1.1", color: "#FFF / italic #C4B8E0", transform: "none", sample: "Let's Build an Experience That Matters", context: "CTASection" },
              { label: "Stat Counter", font: "'Space_Grotesk',sans-serif", fontName: "Space Grotesk", size: "40px / md:52px", tracking: "tight", weight: 400, weightName: "Regular", lineHeight: "1.0", color: "rgba(150,138,182,1)", transform: "none", sample: "500+ / 98%", context: "WhyTruthSection" },
              { label: "Case Study Stat", font: "'Inter',sans-serif", fontName: "Inter", size: "28–32px", tracking: "0", weight: 800, weightName: "ExtraBold", lineHeight: "1.0", color: "#111111", transform: "none", sample: "2.3M+ / 340%", context: "CaseStudiesSection" },
              { label: "Stat Pill", font: "'Space_Grotesk',sans-serif", fontName: "Space Grotesk", size: "12px", tracking: "1.2px", weight: 500, weightName: "Medium", lineHeight: "1.5", color: "#968AB6", transform: "uppercase", sample: "45K+ ATTENDEES", context: "RecentWork offcanvas" },
              { label: "Section Badge (left)", font: "'Inter',sans-serif", fontName: "Inter", size: "12px", tracking: "3.6px", weight: 600, weightName: "Semibold", lineHeight: "1.5", color: "#968AB6", transform: "uppercase", sample: "OUR PROCESS", context: "All section headers" },
              { label: "Section Badge (center)", font: "'Space_Grotesk',sans-serif", fontName: "Space Grotesk", size: "11px", tracking: "5px", weight: 400, weightName: "Regular", lineHeight: "1.5", color: "rgba(150,138,182,1)", transform: "uppercase", sample: "THE COLLECTIVE", context: "WhyTruth, Team" },
              { label: "Project Tag", font: "'Space_Grotesk',sans-serif", fontName: "Space Grotesk", size: "11px", tracking: "3.85px", weight: 500, weightName: "Medium", lineHeight: "1.5", color: "#968AB6", transform: "uppercase", sample: "LIVE EXPERIENCE", context: "RecentWork meta" },
              { label: "Year Label", font: "'Space_Grotesk',sans-serif", fontName: "Space Grotesk", size: "11px", tracking: "2.2px", weight: 400, weightName: "Regular", lineHeight: "1.5", color: "rgba(255,255,255,0.3)", transform: "none", sample: "2025", context: "RecentWork meta" },
              { label: "Nav Item", font: "'Inter',sans-serif", fontName: "Inter", size: "13px", tracking: "1.5px", weight: 400, weightName: "Regular", lineHeight: "1.5", color: "rgba(255,255,255,0.6)", transform: "uppercase", sample: "WORK · SERVICES · ABOUT", context: "Navigation" },
              { label: "Process Step", font: "'Inter',sans-serif", fontName: "Inter", size: "14px", tracking: "0", weight: 700, weightName: "Bold", lineHeight: "1.5", color: "#968AB6", transform: "none", sample: "Step 01", context: "ProcessSection cards" },
              { label: "Footer Link", font: "'Inter',sans-serif", fontName: "Inter", size: "14px", tracking: "0", weight: 400, weightName: "Regular", lineHeight: "1.5", color: "rgba(255,255,255,0.5)", transform: "none", sample: "Brand Activations", context: "FooterSection" },
              { label: "Footer Column Head", font: "'Inter',sans-serif", fontName: "Inter", size: "11px", tracking: "2.2px", weight: 600, weightName: "Semibold", lineHeight: "1.5", color: "rgba(255,255,255,0.3)", transform: "uppercase", sample: "SERVICES", context: "FooterSection" },
              { label: "Watermark Number", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "140px", tracking: "0", weight: 900, weightName: "Black", lineHeight: "1.0", color: "rgba(255,255,255,0.04–0.06)", transform: "none", sample: "01", context: "ProcessSection, RecentWork" },
              { label: "Expertise Tag", font: "'Inter',sans-serif", fontName: "Inter", size: "9px", tracking: "0.8px", weight: 400, weightName: "Regular", lineHeight: "1.5", color: "rgba(150,138,182,0.8)", transform: "uppercase", sample: "BRAND STRATEGY", context: "TeamSection" },
              { label: "Team Role", font: "'Inter',sans-serif", fontName: "Inter", size: "10px", tracking: "3px", weight: 400, weightName: "Regular", lineHeight: "1.5", color: "rgba(150,138,182,0.5–1)", transform: "uppercase", sample: "CREATIVE DIRECTOR", context: "TeamSection" },
              { label: "Team Quote", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "13–14px", tracking: "0", weight: 400, weightName: "Regular italic", lineHeight: "1.6", color: "rgba(255,255,255,0.5)", transform: "none", sample: "\"We create cultural moments.\"", context: "TeamSection" },
              { label: "Marquee Brand", font: "'Playfair_Display',serif", fontName: "Playfair Display", size: "34px", tracking: "-0.02em", weight: "400/700", weightName: "Regular/Bold", lineHeight: "1.0", color: "rgba(255,255,255,0.12)", transform: "none", sample: "Nike · Spotify", context: "BrandMarquee" },
              { label: "Tech Tag", font: "'Inter',sans-serif", fontName: "Inter", size: "12px", tracking: "0.6px", weight: 500, weightName: "Medium", lineHeight: "1.5", color: "rgba(255,255,255,0.4)", transform: "none", sample: "React · Three.js", context: "TechSection" },
              { label: "Copyright", font: "'Inter',sans-serif", fontName: "Inter", size: "12px", tracking: "0", weight: 400, weightName: "Regular", lineHeight: "1.5", color: "rgba(255,255,255,0.3)", transform: "none", sample: "© 2026 TRUth Experiential", context: "FooterSection" },
            ].map((t, i) => (
              <div key={i} className="pb-6" style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "rgba(255,255,255,0.04)" }}>
                <div className="flex flex-col lg:flex-row lg:items-baseline gap-3 mb-2">
                  <div className="lg:w-[200px] shrink-0">
                    <span className="font-['Poppins',sans-serif] text-[#968ab6] text-[11px] tracking-[2px] uppercase block mb-0.5">{t.label}</span>
                    <span className="font-['Poppins',sans-serif] text-white/15 text-[10px] block">{t.context}</span>
                  </div>
                  <p className="text-white flex-1" style={{ fontFamily: t.font, fontSize: typeof t.size === "string" && t.size.includes("clamp") ? t.size : (typeof t.size === "string" && t.size.includes("/") ? t.size.split("/")[0].trim() : t.size), letterSpacing: t.tracking === "tight" ? "-0.025em" : t.tracking, lineHeight: parseFloat(t.lineHeight), fontWeight: typeof t.weight === "number" ? t.weight : 400, fontStyle: t.label.includes("Quote") ? "italic" : "normal", textTransform: t.transform === "uppercase" ? "uppercase" : "none" as React.CSSProperties["textTransform"] }}>{t.sample}</p>
                </div>
                <div className="lg:pl-[200px]">
                  <SpecBlock specs={[
                    ["font-family", t.fontName],
                    ["font-size", t.size],
                    ["font-weight", `${t.weight} (${t.weightName})`],
                    ["line-height", t.lineHeight],
                    ["letter-spacing", t.tracking],
                    ["color", t.color],
                    ...(t.transform !== "none" ? [["text-transform", t.transform] as [string, string]] : []),
                  ]} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           3. SECTION HEADERS
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Components" /><SectionHeading line1="Section" line2="Headers" /></AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Left-aligned badge (used in CaseStudies, Process, Tech) */}
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-6">Left-aligned Badge</span>
              <SectionBadge label="Case Studies" />
              <SpecBlock specs={[["font-family", "Inter"], ["font-size", "12px"], ["font-weight", "600 (Semibold)"], ["letter-spacing", "3.6px"], ["color", "#968AB6"], ["text-transform", "uppercase"]]} />
              <h2 className="font-['Fustat',sans-serif] font-bold text-white text-[clamp(28px,3.5vw,42px)] leading-[1.1] tracking-[-0.02em] mt-4">
                Results that <span className="italic text-[#968ab6]">speak.</span>
              </h2>
              <SpecBlock specs={[["font-family", "Playfair Display"], ["font-size", "clamp(36px, 5vw, 52px)"], ["font-weight", "700 (Bold)"], ["line-height", "1.1"], ["letter-spacing", "-0.02em"], ["color", "#FFF / italic #968AB6"]]} />
            </div>
            {/* Centered badge (used in WhyTruth, Team) */}
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)] text-center" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-6">Centered Badge</span>
              <CenteredBadge label="The Collective" />
              <SpecBlock specs={[["font-family", "Space Grotesk"], ["font-size", "11px"], ["font-weight", "400"], ["letter-spacing", "5px"], ["color", "rgba(150,138,182,1)"], ["text-transform", "uppercase"], ["layout", "line 10px w + gap-3 + text + gap-3 + line 10px w"]]} />
              <h2 className="font-['Fustat',sans-serif] text-[clamp(24px,3vw,36px)] leading-[1.1] tracking-[-0.03em] mt-4" style={{ color: "rgba(255,255,255,1)" }}>
                Visionaries who turn <span className="italic" style={{ color: "rgba(150,138,182,1)" }}>bold ideas</span>
              </h2>
              <SpecBlock specs={[["font-family", "Playfair Display"], ["font-size", "clamp(38px, 5.5vw, 68px)"], ["font-weight", "400"], ["line-height", "1.05"], ["letter-spacing", "-0.03em"], ["color", "#FFF / italic rgba(150,138,182,1)"]]} />
            </div>
            {/* Hero-style (RecentWork) */}
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-6">Selected Work Header</span>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-px bg-[#968ab6]" />
                <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[11px] leading-[16.5px] tracking-[3.85px] uppercase">Selected Work</span>
              </div>
              <SpecBlock specs={[["font-family", "Space Grotesk"], ["font-size", "11px"], ["font-weight", "500 (Medium)"], ["line-height", "16.5px"], ["letter-spacing", "3.85px"], ["color", "#968AB6"], ["text-transform", "uppercase"], ["line", "w-12 h-px bg-#968AB6"]]} />
              <div className="font-['Fustat',sans-serif] font-extrabold text-[clamp(36px,5vw,64px)] leading-[0.9] tracking-[-0.04em] mt-4">
                <p className="text-white">Recently</p>
                <p className="italic text-[#968ab6]">Made</p>
              </div>
              <SpecBlock specs={[["font-family", "Playfair Display"], ["font-size", "clamp(48px, 8vw, 120px)"], ["font-weight", "800 (ExtraBold)"], ["line-height", "0.9"], ["letter-spacing", "-0.04em"], ["color", "line1: #FFF / line2: italic #968AB6"]]} />
            </div>
            {/* Project Tag + Year */}
            <div className="p-8 rounded-2xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-6">Project Meta (Tag + Year)</span>
              <div className="flex items-center gap-4 mb-1">
                <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[11px] leading-[16.5px] tracking-[3.85px] uppercase">Live Experience</span>
                <div className="w-6 h-px bg-[rgba(150,138,182,0.4)]" />
                <span className="font-['Poppins',sans-serif] text-white/30 text-[11px] leading-[16.5px] tracking-[2.2px]">2025</span>
              </div>
              <SpecBlock specs={[["tag", "Space Grotesk 11px/500/3.85px/#968AB6/uppercase"], ["divider", "w-6 h-px rgba(150,138,182,0.4)"], ["year", "Space Grotesk 11px/400/2.2px/rgba(255,255,255,0.3)"]]} />
              <div className="font-['Fustat',sans-serif] font-extrabold text-[48px] leading-[0.9] tracking-[-0.04em] mt-3">
                <p className="text-white">Urban Music</p>
                <p className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.25)" }}>Activation</p>
              </div>
              <SpecBlock specs={[["solid", "Playfair Display 800 / color: #FFF"], ["outline", "-webkit-text-stroke: 2px rgba(255,255,255,0.25)"], ["color", "transparent"], ["font-size", "clamp(48px, 9.2vw, 140px)"], ["line-height", "0.9"], ["letter-spacing", "-0.04em"]]} />
            </div>
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           4. BUTTONS
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Buttons" /><SectionHeading line1="Button" line2="Components" /></AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Primary CTA (from Nav, CTA, Footer) */}
            <div>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-4">Primary CTA</span>
              <div className="flex flex-wrap gap-4 mb-3">
                <motion.button className="px-8 py-3 rounded-full bg-[#968ab6] text-white text-[13px] tracking-[0.5px] font-['Poppins',sans-serif] font-medium cursor-pointer" whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(150,138,182,0.4)" }} whileTap={{ scale: 0.95 }}>
                  Get in Touch
                </motion.button>
                <motion.button className="px-8 py-4 rounded-full bg-[#968ab6] text-white text-[15px] font-['Poppins',sans-serif] font-semibold cursor-pointer" whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(150,138,182,0.5)" }} whileTap={{ scale: 0.95 }}>
                  Start a Conversation
                </motion.button>
                <motion.button className="px-6 py-3 rounded-full bg-[#968ab6] text-white text-[13px] font-['Poppins',sans-serif] font-semibold cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Subscribe
                </motion.button>
              </div>
              <SpecBlock specs={[["font-family", "Inter"], ["font-size", "13–15px"], ["font-weight", "500–600"], ["letter-spacing", "0.5px"], ["color", "#FFF"], ["bg", "#968AB6"], ["border-radius", "9999px (full)"], ["padding", "px-8 py-3 / px-8 py-4"], ["hover", "scale: 1.05 + boxShadow: 0 0 30–40px rgba(150,138,182,0.4–0.5)"], ["tap", "scale: 0.95"]]} />
            </div>

            {/* Ghost / Outline (from CTA, RecentWork) */}
            <div>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-4">Ghost / Outline</span>
              <div className="flex flex-wrap gap-4 mb-3">
                <motion.button className="h-[44px] px-[25px] rounded-full text-[12px] tracking-[1.2px] uppercase font-['Poppins',sans-serif] cursor-pointer" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }} whileHover={{ borderColor: "rgba(150,138,182,0.5)", color: "rgba(255,255,255,0.9)" }} whileTap={{ scale: 0.98 }}>
                  View All Projects
                </motion.button>
                <motion.button className="px-8 py-4 rounded-full text-white text-[15px] font-['Poppins',sans-serif] font-medium cursor-pointer" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.3)" }} whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }} whileTap={{ scale: 0.95 }}>
                  Join Our Team
                </motion.button>
              </div>
              <SpecBlock specs={[["variant-1", "Space Grotesk 12px/uppercase/1.2px tracking"], ["variant-2", "Inter 15px/500"], ["border", "1px solid rgba(255,255,255,0.15–0.3)"], ["bg", "transparent"], ["height", "44px / auto"], ["hover", "borderColor: rgba(150,138,182,0.5) or rgba(255,255,255,0.6)"]]} />
            </div>

            {/* Icon Buttons (from Hero, RecentWork) */}
            <div>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-4">Circle Icon Buttons</span>
              <div className="flex flex-wrap items-center gap-4 mb-3">
                {/* Play Reel button from Hero */}
                <div className="flex items-center gap-3">
                  <motion.div className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.2)" }} whileHover={{ borderColor: "rgba(150,138,182,0.6)", scale: 1.1 }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d={svgPaths.p11c20100} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" /></svg>
                  </motion.div>
                  <span className="text-white/60 text-[13px] tracking-[1.3px] uppercase font-['Poppins',sans-serif]">Play Reel</span>
                </div>
                {/* Arrow from RecentWork */}
                <motion.div className="size-12 rounded-full flex items-center justify-center cursor-pointer" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.2)" }} whileHover={{ borderColor: "rgba(150,138,182,0.6)", scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                    <path d="M5.25 5.25H12.75V12.75" stroke="white" strokeOpacity={0.6} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                    <path d="M5.25 12.75L12.75 5.25" stroke="white" strokeOpacity={0.6} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                  </svg>
                </motion.div>
              </div>
              <SpecBlock specs={[["play-reel", "56x56px circle / border 1px rgba(255,255,255,0.2)"], ["arrow", "48x48px circle / border 1px rgba(255,255,255,0.2)"], ["icon-size", "18x18 svg / stroke-width: 1.5"], ["label", "Space Grotesk 13px/1.3px tracking/uppercase/rgba(255,255,255,0.6)"], ["hover", "borderColor: rgba(150,138,182,0.6) + scale: 1.1"]]} />
            </div>

            {/* Social Icons (from Footer, Team) */}
            <div>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-4">Social Icons</span>
              <div className="flex flex-wrap gap-3">
                {/* Footer style */}
                {["Ig", "X", "Li", "Yt"].map((social) => (
                  <motion.div key={social} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 text-[12px] font-['Poppins',sans-serif] font-medium cursor-pointer" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)" }} whileHover={{ borderColor: "rgba(150,138,182,0.5)", scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    {social}
                  </motion.div>
                ))}
                <div className="w-px h-10 bg-white/10 mx-2" />
                {/* Team style */}
                {[Linkedin, Twitter, Instagram, Github].map((Icon, i) => (
                  <motion.a key={i} href="#" className="flex items-center justify-center w-8 h-8 rounded-full" style={{ color: "rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.04)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }} whileHover={{ color: "rgba(150,138,182,1)", borderColor: "rgba(150,138,182,0.4)", background: "rgba(150,138,182,0.12)" }}>
                    <Icon size={13} />
                  </motion.a>
                ))}
              </div>
              <SpecBlock specs={[["footer-style", "40x40px / bg: white/5 / border: 1px rgba(255,255,255,0.1)"], ["footer-text", "Inter 12px/500 / rgba(255,255,255,0.6)"], ["team-style", "32x32px / bg: rgba(255,255,255,0.04) / border: 1px rgba(255,255,255,0.06)"], ["team-icon", "Lucide 13px / rgba(255,255,255,0.35)"], ["hover", "color/border/bg transition to purple"]]} />
            </div>

            {/* Stat Pill / View Case link (from RecentWork) */}
            <div>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-4">Stat Pills</span>
              <div className="flex flex-wrap gap-4 mb-3">
                {["45K+ Attendees", "12 Cities", "2.1M Impressions", "98% Satisfaction"].map((label) => (
                  <div key={label} className="bg-white/[0.02] rounded-full px-[17px] py-[12px]" style={{ borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(255,255,255,0.08)" }}>
                    <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[12px] tracking-[1.2px] uppercase">{label}</span>
                  </div>
                ))}
              </div>
              <SpecBlock specs={[["font-family", "Space Grotesk"], ["font-size", "12px"], ["font-weight", "500 (Medium)"], ["letter-spacing", "1.2px"], ["color", "#968AB6"], ["text-transform", "uppercase"], ["bg", "rgba(255,255,255,0.02)"], ["border", "1px solid rgba(255,255,255,0.08)"], ["padding", "12px 17px"], ["border-radius", "9999px (full)"]]} />
            </div>

            {/* Text link + arrow (from RecentWork, WhyTruth, CaseStudies) */}
            <div>
              <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-4">Text Links</span>
              <div className="flex flex-col gap-4">
                <motion.a href="#" className="flex items-center gap-2 cursor-pointer" whileHover={{ x: 4 }}>
                  <span className="font-['Poppins',sans-serif] text-white/40 text-[12px] tracking-[2.4px] uppercase">View Case</span>
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
                    <path d="M4.08333 4.08333H9.91667V9.91667" stroke="white" strokeOpacity={0.4} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.167} />
                    <path d="M4.08333 9.91667L9.91667 4.08333" stroke="white" strokeOpacity={0.4} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.167} />
                  </svg>
                </motion.a>
                <motion.div className="inline-flex items-center gap-2 text-[13px] font-['Poppins',sans-serif] font-semibold cursor-pointer" style={{ color: "rgba(150,138,182,1)" }} whileHover={{ x: 5 }}>
                  <span>View Full Case Study</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.33 8H12.67" stroke="#968ab6" strokeLinecap="round" strokeWidth="1.33" /><path d="M8 3.33L12.67 8L8 12.67" stroke="#968ab6" strokeLinecap="round" strokeWidth="1.33" /></svg>
                </motion.div>
                <motion.div className="inline-flex items-center gap-2 text-[13px] font-['Poppins',sans-serif] tracking-[0.5px]" style={{ color: "rgba(150,138,182,1)" }} whileHover={{ x: 4 }}>
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>
              </div>
              <SpecBlock specs={[["view-case", "Space Grotesk 12px/uppercase/2.4px/rgba(255,255,255,0.4)"], ["case-study-link", "Inter 13px/600/#968AB6 + arrow svg 16x16"], ["learn-more", "Inter 13px/400/0.5px tracking/#968AB6 + arrow svg 14x14"], ["hover", "whileHover x: 4–5px"]]} />
            </div>
          </div>
        </AnimatedSection>

        {/* Navigation controls (from ProcessSection) */}
        <AnimatedSection delay={0.15}>
          <span className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2px] uppercase block mb-4">Carousel Controls (ProcessSection)</span>
          <div className="flex items-center gap-8 mb-4">
            <DotIndicators activeIndex={dotIndex} total={4} />
            <div className="flex items-center gap-2">
              <ArrowButton direction="left" onClick={() => setDotIndex(Math.max(0, dotIndex - 1))} />
              <ArrowButton direction="right" onClick={() => setDotIndex(Math.min(3, dotIndex + 1))} />
            </div>
          </div>
          <SpecBlock specs={[["dot-inactive", "8x8px / bg: #E5E5EA / border-radius: full"], ["dot-active", "24x8px / bg: #968AB6 / border-radius: full / transition: 300ms"], ["arrow-btn", "40x40px circle / border: 1px #E5E5EA"], ["arrow-icon", "svg 18x18 / stroke: #968AB6 / stroke-width: 1.5"], ["arrow-hover", "borderColor: #968AB6 + scale: 1.05"], ["gap", "dots gap-2 / arrows gap-2"]]} />
          <div className="mb-16" />
        </AnimatedSection>

        <Divider />

        {/* ═════════════════════════════════════════════════���══════════
           5. CARDS
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Cards" /><SectionHeading line1="Card" line2="Components" /></AnimatedSection>

        {/* Stat Cards */}
        <AnimatedSection delay={0.1}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Stat Cards (WhyTruthSection — 3D tilt)</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            <StatCard value={500} suffix="+" label="Events Executed" icon={Crosshair} index={0} />
            <StatCard value={50} suffix="+" label="Markets Reached" icon={Globe} index={1} />
            <StatCard value={15} suffix="M+" label="Consumer Touchpoints" icon={Users} index={2} />
            <StatCard value={98} suffix="%" label="Client Retention" icon={Gem} index={3} />
          </div>
        </AnimatedSection>

        {/* Tech Cards */}
        <AnimatedSection delay={0.15}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Tech Cards (TechSection)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            <TechCardDemo title="AR/VR Installations" desc="Custom-built augmented and virtual reality experiences that transport audiences beyond the physical." />
            <TechCardDemo title="Interactive Mirrors & Screens" desc="Touch-responsive, gesture-activated displays that create personalized brand interactions." />
          </div>
        </AnimatedSection>

        {/* Process Cards */}
        <AnimatedSection delay={0.2}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Process Cards (ProcessSection)</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 mb-16">
            <ProcessCardDemo num="01" title="Strategy & Research" desc="Deep audience insights and strategic frameworks." isFeatured />
            <ProcessCardDemo num="02" title="Concept & Creation" desc="Bold creative ideation rooted in cultural relevance." />
            <ProcessCardDemo num="03" title="Planning & Execution" desc="End-to-end production management." />
          </div>
        </AnimatedSection>

        {/* Team Cards */}
        <AnimatedSection delay={0.25}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Team Cards (TeamSection — editorial portrait)</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <TeamCardDemo name="Adriana" lastName="Reyes" role="Creative Director" quote="We Don't Just Create Ads. We Create Cultural Moments." expertise={["Brand Strategy", "Art Direction"]} socials={["LinkedIn", "Twitter"]} image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" isActive={activeTeamCard === 0} onHover={() => setActiveTeamCard(0)} />
            <TeamCardDemo name="Marcus" lastName="Chen" role="Head of Strategy" quote="Data-driven strategy meets cultural intelligence." expertise={["Market Research", "Analytics"]} socials={["LinkedIn", "Instagram"]} image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" isActive={activeTeamCard === 1} onHover={() => setActiveTeamCard(1)} />
            <TeamCardDemo name="Priya" lastName="Patel" role="Tech Lead" quote="Building bridges between the digital and physical worlds." expertise={["AR/VR", "Prototyping"]} socials={["LinkedIn", "GitHub"]} image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" isActive={activeTeamCard === 2} onHover={() => setActiveTeamCard(2)} />
            <TeamCardDemo name="Daniel" lastName="Okafor" role="Operations Director" quote="Flawless execution across 50+ markets." expertise={["Logistics", "Vendor Mgmt"]} socials={["LinkedIn", "Twitter"]} image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" isActive={activeTeamCard === 3} onHover={() => setActiveTeamCard(3)} />
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           6. EXPANDABLE COMPONENTS
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Interactive" /><SectionHeading line1="Expandable" line2="Components" /></AnimatedSection>

        {/* Reason Rows */}
        <AnimatedSection delay={0.1}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Expandable Reason Rows (WhyTruthSection)</h3>
          <div className="max-w-[640px] space-y-3 mb-16">
            <ReasonRowDemo num="01" title="Cultural Intelligence" detail="We embed ourselves in the communities we activate — understanding the nuances that make each audience unique." isActive={activeReason === 0} onClick={() => setActiveReason(activeReason === 0 ? -1 : 0)} />
            <ReasonRowDemo num="02" title="Coast-to-Coast Reach" detail="From New York to Los Angeles, Toronto to Miami, our field teams execute with local expertise and national scale." isActive={activeReason === 1} onClick={() => setActiveReason(activeReason === 1 ? -1 : 1)} />
            <ReasonRowDemo num="03" title="Immersive Technology" detail="AR/VR activations, interactive installations, and real-time social amplification." isActive={activeReason === 2} onClick={() => setActiveReason(activeReason === 2 ? -1 : 2)} />
          </div>
        </AnimatedSection>

        {/* Tech Tags */}
        <AnimatedSection delay={0.15}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Tech Tags (TechSection)</h3>
          <div className="flex flex-wrap gap-3 mb-16">
            {["React", "Three.js", "Unity", "ARKit", "WebGL", "RFID/NFC", "IoT Sensors", "Real-time API"].map((tag) => (
              <motion.span key={tag} className="px-4 py-2 rounded-full bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.4)] text-[12px] tracking-[0.6px] font-['Poppins',sans-serif] font-medium cursor-pointer" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.08)" }} whileHover={{ borderColor: "rgba(150,138,182,0.4)", color: "rgba(150,138,182,0.8)", scale: 1.05 }}>
                {tag}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           7. FORM ELEMENTS (Newsletter from Footer)
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Forms" /><SectionHeading line1="Form" line2="Elements" /></AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Newsletter (FooterSection)</h3>
          <div className="max-w-[600px] mb-16">
            <h4 className="text-white text-[16px] font-['Poppins',sans-serif] font-semibold mb-1">Stay in the Loop</h4>
            <p className="text-white/40 text-[13px] font-['Poppins',sans-serif] mb-4">Industry insights, case studies, and event marketing trends.</p>
            <div className="flex gap-3 mb-4">
              <input type="email" placeholder="your@email.com" className="bg-white/5 rounded-full px-5 py-3 text-white/80 text-[14px] font-['Poppins',sans-serif] placeholder-white/30 outline-none focus:border-[#968ab6]/50 transition-colors w-[260px]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.1)" }} />
              <motion.button className="px-6 py-3 rounded-full bg-[#968ab6] text-white text-[13px] font-['Poppins',sans-serif] font-semibold cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Subscribe</motion.button>
            </div>
            <SpecBlock specs={[["input-font", "Inter 14px/400"], ["input-color", "rgba(255,255,255,0.8)"], ["input-placeholder", "rgba(255,255,255,0.3)"], ["input-bg", "rgba(255,255,255,0.05)"], ["input-border", "1px solid rgba(255,255,255,0.1)"], ["input-focus", "border-color: rgba(150,138,182,0.5)"], ["input-radius", "9999px"], ["input-padding", "12px 20px"], ["input-width", "260px"], ["heading", "Inter 16px/600/#FFF"], ["subtext", "Inter 13px/400/rgba(255,255,255,0.4)"]]} />
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           8. MARQUEE + EFFECTS
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Effects" /><SectionHeading line1="Marquee &" line2="Effects" /></AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Brand Marquee (infinite scroll)</h3>
        </AnimatedSection>
      </div>

      {/* Marquee (full-width, exact from BrandMarquee) */}
      <div className="overflow-hidden py-8 mb-8" style={{ borderTopWidth: 1, borderBottomWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="relative flex">
          <motion.div className="flex items-center gap-2 shrink-0" animate={{ x: [0, -2400] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
            {[...["Nike", "Spotify", "Red Bull", "Coca-Cola", "Samsung", "Adidas", "Netflix", "Apple", "Pepsi", "Hennessy", "Jordan", "Meta", "Google", "Amazon", "Uber"], ...["Nike", "Spotify", "Red Bull", "Coca-Cola", "Samsung", "Adidas", "Netflix", "Apple", "Pepsi", "Hennessy", "Jordan", "Meta", "Google", "Amazon", "Uber"]].map((brand, i) => (
              <div key={`${brand}-${i}`} className="flex items-center gap-2 shrink-0">
                <motion.span className="text-[34px] tracking-[-0.02em] text-white/12 font-['Fustat',sans-serif] whitespace-nowrap px-4" style={{ fontStyle: i % 4 === 0 ? "italic" : "normal", fontWeight: i % 3 === 0 ? 700 : 400 }} whileHover={{ color: "rgba(150,138,182,0.5)", scale: 1.05 }} transition={{ duration: 0.3 }}>{brand}</motion.span>
                <div className="w-1.5 h-1.5 rounded-full bg-[rgba(150,138,182,0.2)] shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-24">
        {/* Floating Particles demo */}
        <AnimatedSection delay={0.15}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Floating Particles</h3>
          <div className="relative h-[200px] rounded-2xl overflow-hidden mb-8" style={{ background: "rgb(10, 8, 20)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
            <FloatingParticles count={20} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-['Poppins',sans-serif] text-white/20 text-[12px] tracking-[2px] uppercase">20 particles · rgba(150,138,182) · easeInOut loop</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Purple Glow */}
        <AnimatedSection delay={0.2}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Purple Glow (HeroSection)</h3>
          <div className="relative h-[200px] rounded-2xl overflow-hidden mb-8 bg-black" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(150,138,182,1) 0%, transparent 70%)", right: "20%", top: "-20%", opacity: 0.15 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-['Poppins',sans-serif] text-white/20 text-[12px] tracking-[2px] uppercase">radial-gradient · scale pulse · 8s loop</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Scroll Indicator */}
        <AnimatedSection delay={0.25}>
          <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Scroll Indicator & Progress</h3>
          <div className="flex items-center gap-12 mb-16">
            <div className="flex flex-col items-center gap-2">
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
              </motion.div>
              <span className="font-['Poppins',sans-serif] text-white/20 text-[10px]">Hero scroll hint</span>
            </div>
            <div className="flex flex-col gap-2 flex-1 max-w-[300px]">
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-[#968ab6] origin-left" animate={{ scaleX: [0, 0.6, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />
              </div>
              <span className="font-['Poppins',sans-serif] text-white/20 text-[10px]">Top scroll progress bar</span>
            </div>
            {/* WhyTruth progress dots */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-1.5 rounded-full overflow-hidden" style={{ width: i === 1 ? 32 : 12, background: "rgba(255,255,255,0.1)" }}>
                    {i === 1 && <motion.div className="absolute inset-0 rounded-full" style={{ background: "rgba(150,138,182,1)" }} animate={{ scaleX: [0, 1] }} transition={{ duration: 5, repeat: Infinity }} />}
                  </div>
                ))}
              </div>
              <span className="font-['Poppins',sans-serif] text-white/20 text-[10px]">WhyTruth progress dots</span>
            </div>
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           9. SPACING
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Layout" /><SectionHeading line1="Spacing" line2="System" /></AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Page Margins & Section Padding</h3>
              <div className="space-y-3">
                {[
                  { name: "6px/24px", bar: 24, usage: "Mobile side padding (px-6)" },
                  { name: "10px/40px", bar: 40, usage: "Desktop content padding (px-10)" },
                  { name: "96-97px", bar: 97, usage: "RecentWork side margin" },
                  { name: "120-128px", bar: 128, usage: "Section top padding (pt-[120px])" },
                  { name: "60-80px", bar: 80, usage: "Section bottom padding" },
                  { name: "30px", bar: 30, usage: "Carousel card gap" },
                  { name: "4-6px", bar: 6, usage: "Card grid gap (gap-4/gap-6)" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-4">
                    <span className="font-['Poppins',sans-serif] text-white/30 text-[11px] w-[80px] shrink-0 text-right">{s.name}</span>
                    <div className="h-3 rounded-sm bg-[#968ab6]/30" style={{ width: Math.min(s.bar * 2.5, 300) }} />
                    <span className="font-['Poppins',sans-serif] text-white/20 text-[11px]">{s.usage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-['Poppins',sans-serif] text-white/60 text-[13px] tracking-[2px] uppercase mb-6">Max Widths & Container</h3>
              <div className="space-y-4">
                {[
                  { name: "1400px", usage: "max-w — main content container" },
                  { name: "800px", usage: "max-w — centered headings" },
                  { name: "600px", usage: "max-w — centered subtitles" },
                  { name: "520px", usage: "max-w — reason detail text" },
                  { name: "442px", usage: "max-w — process description" },
                  { name: "387px", usage: "max-w — hero body text" },
                  { name: "373px", usage: "max-w — footer brand text" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center gap-4 py-2" style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "rgba(255,255,255,0.04)" }}>
                    <span className="font-['Poppins',sans-serif] text-[#968ab6] text-[13px] w-[80px] shrink-0">{s.name}</span>
                    <span className="font-['Poppins',sans-serif] text-white/30 text-[13px]">{s.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <Divider />

        {/* ════════════════════════════════════════════════════════════
           10. TONE OF VOICE
           ════════════════════════════════════════════════════════════ */}
        <AnimatedSection><SectionBadge label="Communication" /><SectionHeading line1="Tone of" line2="Voice" /></AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="font-['Poppins',sans-serif] text-white/45 text-[16px] leading-[1.8] max-w-[600px] mb-16">
            Nuestra voz es la intersección entre confianza creativa y precisión estratégica. Cada palabra refleja la misma intencionalidad que ponemos en cada experiencia.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { title: "Confiado", desc: "Seguridad sin arrogancia.", from: "\"We craft experiences that move.\"", fromSource: "Hero" },
              { title: "Evocador", desc: "Lenguaje sensorial que hace sentir.", from: "\"Where brands become moments people remember\"", fromSource: "Offcanvas" },
              { title: "Preciso", desc: "Datos concretos > adjetivos vacíos.", from: "\"2.3M+ Impressions · 340% Social Lift · 8.2x ROI\"", fromSource: "Case Studies" },
              { title: "Inclusivo", desc: "Celebra diversidad, abraza comunidades.", from: "\"Community-Embedded Teams — authentic voices within communities\"", fromSource: "WhyTruth" },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
                <h4 className="font-['Fustat',sans-serif] font-bold text-white text-[22px] mb-2">{v.title}</h4>
                <p className="font-['Poppins',sans-serif] text-white/35 text-[13px] leading-[20px] mb-4">{v.desc}</p>
                <p className="font-['Sofia_Sans_Condensed',sans-serif] italic text-[#968ab6] text-[12px] leading-[18px] mb-1">{v.from}</p>
                <span className="font-['Poppins',sans-serif] text-white/20 text-[10px] tracking-[1px] uppercase">— {v.fromSource}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Voice examples from real copy */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: "Headlines", items: ["We craft experiences that move.", "Results that speak.", "The Experiential Framework", "We Don't Just Create Events. We Create Cultural Moments."] },
              { label: "Subtexts", items: ["Immersive brand experiences that connect people to culture, community, and each other.", "Six interconnected phases that transform brand vision into measurable cultural impact.", "The most powerful marketing happens when brands show up authentically."] },
              { label: "Micro-copy", items: ["Play Reel", "View Case", "View Full Case Study", "Learn more", "Start a Conversation", "Stay in the Loop", "View All Projects"] },
            ].map((block) => (
              <div key={block.label} className="p-6 rounded-xl bg-[rgba(255,255,255,0.02)]" style={{ borderWidth: 1, borderStyle: "solid", borderColor: "rgba(255,255,255,0.06)" }}>
                <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] tracking-[2px] uppercase block mb-4">{block.label}</span>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="font-['Poppins',sans-serif] text-white/40 text-[13px] leading-[20px] flex items-start gap-2">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[rgba(150,138,182,0.4)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 px-6 md:px-24 mt-32 pb-16">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(150,138,182,0.15)] to-transparent mb-12" />
        <div className="flex items-center justify-between">
          <motion.button className="flex items-center gap-3 cursor-pointer" style={{ color: "rgba(255,255,255,0.4)" }} whileHover={{ x: -4, color: "rgba(255,255,255,0.8)" }} onClick={() => navigate("/")}>
            <ArrowLeft size={16} />
            <span className="font-['Poppins',sans-serif] text-[12px] tracking-[2px] uppercase">Back to Home</span>
          </motion.button>
          <span className="font-['Poppins',sans-serif] text-white/15 text-[11px] tracking-[2px] uppercase">TRUth Style Guide v1.0</span>
        </div>
      </div>
    </div>
  );
}
