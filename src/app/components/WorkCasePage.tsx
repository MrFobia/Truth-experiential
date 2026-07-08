import { Link, useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { projectsData } from "./ProjectOffcanvas";

/* T090 — real, shareable, crawlable /work/[slug] route for each case,
   alongside the existing offcanvas modal (fast in-page preview stays;
   this gives every case a real URL for SEO/sharing/testimonial linking). */
export function WorkCasePage() {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24">
      <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[rgba(10,10,10,0.4)] to-transparent" />
      </div>

      <div className="max-w-[840px] mx-auto px-6 md:px-0 -mt-24 relative pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[12px] tracking-[2.4px] uppercase">
            {project.category}
          </span>
          <h1 className="font-['Fustat',sans-serif] font-extrabold text-white text-[clamp(36px,6vw,64px)] leading-[1.05] tracking-[-0.03em] mt-4 mb-6">
            {project.title}
          </h1>
          <p className="font-['Poppins',sans-serif] text-white/70 text-[18px] leading-[1.6] max-w-[640px] mb-10">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-8 mb-16 pb-10 border-b border-white/10">
            {project.stats.map((s) => (
              <div key={s.label}>
                <div className="font-['Fustat',sans-serif] font-bold text-white text-[32px] leading-[1]">
                  {s.value}
                </div>
                <div className="font-['Poppins',sans-serif] text-white/40 text-[12px] tracking-[1.2px] uppercase mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/#work"
            className="inline-flex items-center gap-2 font-['Poppins',sans-serif] text-[14px] text-white/50 hover:text-white/90 transition-colors"
          >
            ← Back to all work
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
