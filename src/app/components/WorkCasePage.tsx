import { Link, useParams, Navigate } from "react-router";
import { motion } from "motion/react";
import { projectsData } from "./ProjectOffcanvas";

export function WorkCasePage() {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="bg-[#0a0814] min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0814] via-[rgba(10,8,20,0.5)] to-[rgba(10,8,20,0.2)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,8,20,0.6)] to-transparent" />

        {/* Back nav */}
        <div className="absolute top-24 left-6 md:left-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-['Poppins',sans-serif] text-[12px] tracking-[2px] uppercase text-white/40 hover:text-white/80 transition-colors"
          >
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#968ab6]" />
              <span className="font-['Poppins',sans-serif] font-medium text-[#968ab6] text-[11px] tracking-[3px] uppercase">
                {project.category}
              </span>
              {project.year && (
                <span className="font-['Poppins',sans-serif] text-white/25 text-[11px] tracking-[2px]">
                  · {project.year}
                </span>
              )}
            </div>
            <h1 className="font-['Fustat',sans-serif] font-extrabold text-white text-[clamp(36px,5.5vw,72px)] leading-[1.0] tracking-[-0.03em] max-w-[800px]">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-16 pt-16 pb-32">

        {/* Tagline + meta */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-start lg:gap-24 mb-20 pb-16 border-b border-white/[0.07]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="flex-1 mb-10 lg:mb-0">
            <p className="font-['Sofia_Sans_Condensed',sans-serif] italic text-[#968ab6] text-[clamp(22px,2.8vw,36px)] leading-[1.2] max-w-[600px] mb-6">
              "{project.tagline}"
            </p>
            <p className="font-['Poppins',sans-serif] text-white/60 text-[16px] leading-[1.75] max-w-[580px]">
              {project.description}
            </p>
          </div>

          {/* Meta sidebar */}
          <div className="shrink-0 flex flex-col gap-6 min-w-[200px]">
            {project.client && (
              <div>
                <p className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2.5px] uppercase mb-1">Client</p>
                <p className="font-['Poppins',sans-serif] text-white/80 text-[14px]">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2.5px] uppercase mb-1">Year</p>
                <p className="font-['Poppins',sans-serif] text-white/80 text-[14px]">{project.year}</p>
              </div>
            )}
            {project.services && project.services.length > 0 && (
              <div>
                <p className="font-['Poppins',sans-serif] text-white/25 text-[10px] tracking-[2.5px] uppercase mb-2">Services</p>
                <div className="flex flex-col gap-1.5">
                  {project.services.map((s) => (
                    <span key={s} className="font-['Poppins',sans-serif] text-white/60 text-[13px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {project.stats.map((s, i) => (
            <div
              key={s.label}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-6"
            >
              <div className="font-['Fustat',sans-serif] font-bold text-[#968ab6] text-[clamp(28px,3.5vw,48px)] leading-[1] mb-2">
                {s.value}
              </div>
              <div className="font-['Poppins',sans-serif] text-white/35 text-[11px] tracking-[1.5px] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Challenge / Approach / Outcomes */}
        {(project.challenge || project.approach || project.outcomes) && (
          <div className="flex flex-col gap-0">
            {project.challenge && (
              <ContentSection
                label="The Challenge"
                number="01"
                body={project.challenge}
                delay={0.3}
              />
            )}
            {project.approach && (
              <ContentSection
                label="Our Approach"
                number="02"
                body={project.approach}
                delay={0.35}
              />
            )}
            {project.outcomes && (
              <ContentSection
                label="The Outcome"
                number="03"
                body={project.outcomes}
                delay={0.4}
                accent
              />
            )}
          </div>
        )}

        {/* Footer nav */}
        <motion.div
          className="mt-24 pt-12 border-t border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 font-['Poppins',sans-serif] text-[13px] tracking-[1.5px] uppercase text-white/40 hover:text-white/80 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to all work
          </Link>

          {/* Next case */}
          <NextCaseLink currentSlug={project.slug} />
        </motion.div>
      </div>
    </div>
  );
}

function ContentSection({
  label,
  number,
  body,
  delay,
  accent,
}: {
  label: string;
  number: string;
  body: string;
  delay: number;
  accent?: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col md:flex-row gap-8 md:gap-16 py-14 border-b border-white/[0.07]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay }}
    >
      {/* Label col */}
      <div className="md:w-[220px] shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-['Fustat',sans-serif] font-bold text-[#968ab6]/30 text-[13px]">
            {number}
          </span>
          <span className="font-['Poppins',sans-serif] font-semibold text-[11px] tracking-[2.5px] uppercase text-white/30">
            {label}
          </span>
        </div>
      </div>

      {/* Body col */}
      <p
        className={[
          "font-['Poppins',sans-serif] text-[16px] leading-[1.8] flex-1",
          accent ? "text-white/85" : "text-white/55",
        ].join(" ")}
      >
        {body}
      </p>
    </motion.div>
  );
}

function NextCaseLink({ currentSlug }: { currentSlug: string }) {
  const currentIndex = projectsData.findIndex((p) => p.slug === currentSlug);
  const next = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <Link
      to={`/work/${next.slug}`}
      className="inline-flex items-center gap-3 font-['Poppins',sans-serif] text-[13px] tracking-[1.5px] uppercase text-white/40 hover:text-white/80 transition-colors group"
    >
      Next case
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>
  );
}
