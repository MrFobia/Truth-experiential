import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Case hero images — same assets used on the RecentWorkSection cards ─── */
import imgRemitly from "figma:asset/72d5143b59aca6a252f105769f282767f825563c.png";
import imgPizzaPatron from "figma:asset/c68a082d14a52f51bdee72313afb87a0cba6cb7c.png";
import imgTakis from "figma:asset/ed776bb7e8812966cee11f81432de5b02c8ca1d5.png";
import imgBufalo from "figma:asset/8af3d1c873fa74ecfe44a06409ba8519daf56674.png";

/* ─── Project data ─── */
export interface ProjectData {
  id: string;
  slug: string;
  category: string;
  heroImage: string;
  title: string;
  tagline: string;
  description: string;
  stats: { value: string; label: string }[];
  deliverables: {
    num: string;
    title: string;
    description: string;
    image: string;
  }[];
}

/* Only facts already confirmed in the feedback tracker / RecentWorkSection \u2014
   no invented deliverables until Truad provides the Final Copy v2 breakdown per case. */
export const projectsData: ProjectData[] = [
  {
    id: "project1",
    slug: "remitly-glass-mobile-truck",
    category: "Fintech \u00b7 Mobile activation",
    heroImage: imgRemitly,
    title: "Remitly Glass Mobile Truck",
    tagline: "A transparent storefront on wheels.",
    description:
      "A transparent storefront on wheels \u2014 built to earn trust, one block at a time. The truck ran three cities through a hurricane and didn't miss a market.",
    stats: [
      { value: "3,311", label: "App Downloads" },
      { value: "4.17M+", label: "Impressions" },
    ],
    deliverables: [],
  },
  {
    id: "project2",
    slug: "los-tigres-del-norte-pizza-patron",
    category: "Music \u00b7 Cultural moment",
    heroImage: imgPizzaPatron,
    title: "Los Tigres del Norte for Pizza Patr\u00f3n",
    tagline: "30 years on, the brand threw a party.",
    description:
      "30 years on, the brand threw a party the community wanted to be at \u2014 and brought a legend to headline it.",
    stats: [
      { value: "17,258", label: "Attendees" },
      { value: "500K+", label: "Paid Impressions" },
      { value: "60%", label: "Cost Recovery" },
    ],
    deliverables: [],
  },
  {
    id: "project3",
    slug: "takis-nitro-nfl",
    category: "Sports \u00b7 Sampling at scale",
    heroImage: imgTakis,
    title: "Takis Nitro at the NFL",
    tagline: "A new flavor needed a national debut.",
    description:
      "A new flavor needed a national debut \u2014 so we built one inside the loudest stadiums in America.",
    stats: [
      { value: "480K+", label: "Samples" },
      { value: "+20%", label: "Sales Lift" },
    ],
    deliverables: [],
  },
  {
    id: "project4",
    slug: "bufalo-vr-drums-experience",
    category: "Immersive tech \u00b7 Festival",
    heroImage: imgBufalo,
    title: "B\u00fafalo VR Drums Experience",
    tagline: "A bottled-sauce brand earned the mic.",
    description:
      "A bottled-sauce brand earned a moment at the loudest stage in music \u2014 and gave fans the mic.",
    stats: [
      { value: "50K+", label: "Per Show" },
      { value: "4", label: "Marquee Shows" },
    ],
    deliverables: [],
  },
];

/* ═══════════════════════════════════════════════════
   OFFCANVAS COMPONENT
   ═══════════════════════════════════════════════════ */
export function ProjectOffcanvas({
  projectId,
  onClose,
  onNavigate,
}: {
  projectId: string | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const project = projectId ? projectsData.find((p) => p.id === projectId) ?? null : null;

  /* Lock body scroll when open */
  useEffect(() => {
    if (projectId) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [projectId]);

  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-[rgba(17,17,17,0.7)] backdrop-blur-[7.5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            className="fixed right-0 top-0 z-[101] h-full w-[640px] max-w-[90vw] bg-[#111] overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Hero Image */}
            <div className="relative w-full h-[400px] overflow-hidden">
              <img
                src={project.heroImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[rgba(17,17,17,0.4)] to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,17,17,0.3)] to-transparent" />

              {/* Capability badge */}
              <div className="absolute top-5 left-6 flex items-center gap-2 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] rounded-full px-[13px] py-[6px]">
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <path
                    d="M8.66667 11.375V10.2917C8.66667 9.71703 8.43839 9.16593 8.03206 8.7596C7.62574 8.35327 7.07464 8.125 6.5 8.125H3.25C2.67536 8.125 2.12426 8.35327 1.71794 8.7596C1.31161 9.16593 1.08333 9.71703 1.08333 10.2917V11.375"
                    stroke="#968AB6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.083}
                  />
                  <path
                    d="M4.875 5.95833C6.07162 5.95833 7.04167 4.98828 7.04167 3.79167C7.04167 2.59505 6.07162 1.625 4.875 1.625C3.67838 1.625 2.70833 2.59505 2.70833 3.79167C2.70833 4.98828 3.67838 5.95833 4.875 5.95833Z"
                    stroke="#968AB6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.083}
                  />
                  <path
                    d="M11.9167 11.375V10.2917C11.9163 9.8116 11.7565 9.34525 11.4624 8.96584C11.1683 8.58642 10.7565 8.31543 10.2917 8.19542"
                    stroke="#968AB6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.083}
                  />
                  <path
                    d="M8.66667 1.69542C9.13273 1.81475 9.54581 2.0858 9.8408 2.46583C10.1358 2.84587 10.2959 3.31328 10.2959 3.79437C10.2959 4.27547 10.1358 4.74288 9.8408 5.12291C9.54581 5.50295 9.13273 5.774 8.66667 5.89333"
                    stroke="#968AB6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.083}
                  />
                </svg>
                <span className="font-['Poppins',sans-serif] font-semibold text-[10px] text-[rgba(255,255,255,0.7)] tracking-[1.5px] uppercase">
                  Capability
                </span>
              </div>

              {/* Close button */}
              <motion.button
                className="absolute top-5 right-6 size-[44px] rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center cursor-pointer"
                whileHover={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
              >
                <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                  <path
                    d="M13.5 4.5L4.5 13.5"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                  <path
                    d="M4.5 4.5L13.5 13.5"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                  />
                </svg>
              </motion.button>

              {/* Title block */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-2">
                <h2 className="font-['Fustat',sans-serif] font-bold text-[40px] leading-[44px] text-white">
                  {project.title}
                </h2>
                <p className="font-['Sofia_Sans_Condensed',sans-serif] italic text-[15px] leading-[22.5px] text-[#968ab6]">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 pt-6 pb-8 flex flex-col gap-6">
              {/* Description */}
              <p className="font-['Poppins',sans-serif] text-[15px] leading-[27px] text-[rgba(255,255,255,0.5)]">
                {project.description}
              </p>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                {project.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-[14px] px-[17px] pt-[17px] pb-[13px] flex flex-col gap-1"
                  >
                    <p className="font-['Fustat',sans-serif] font-bold text-[24px] leading-[28.8px] text-[#968ab6] text-center">
                      {stat.value}
                    </p>
                    <p className="font-['Poppins',sans-serif] font-semibold text-[10px] leading-[15px] text-[rgba(255,255,255,0.35)] tracking-[0.5px] text-center">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* What We Deliver — only when we have real per-case deliverables */}
              {project.deliverables.length > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-[#968ab6]" />
                  <span className="font-['Poppins',sans-serif] font-bold text-[10px] text-[#968ab6] tracking-[2.5px] uppercase">
                    What We Deliver
                  </span>
                  <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
                </div>
              )}

              {/* Deliverable cards */}
              <div className="flex flex-col gap-4">
                {project.deliverables.map((item) => (
                  <div
                    key={item.num}
                    className="relative h-[140px] rounded-[14px] overflow-hidden"
                  >
                    {/* Background image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[rgba(17,17,17,0.75)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(17,17,17,0.5)] to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex gap-4 items-start pt-5 px-5">
                      {/* Number badge */}
                      <div className="size-10 shrink-0 rounded-[10px] bg-[rgba(150,138,182,0.1)] border border-[rgba(150,138,182,0.2)] flex items-center justify-center">
                        <span className="font-['Fustat',sans-serif] font-bold text-[14px] text-[#968ab6]">
                          {item.num}
                        </span>
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <h4 className="font-['Poppins',sans-serif] font-semibold text-[16px] leading-[20.8px] text-white">
                          {item.title}
                        </h4>
                        <p className="font-['Poppins',sans-serif] text-[13px] leading-[21.45px] text-[rgba(255,255,255,0.4)] max-w-[460px]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-[2px] left-0 w-0 h-[2px] bg-gradient-to-r from-[#968ab6] to-transparent group-hover:w-full transition-all" />
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <motion.button
                  className="size-10 rounded-full border border-[#e5e5ea] flex items-center justify-center cursor-pointer bg-transparent"
                  whileHover={{ borderColor: "#968ab6", scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("prev")}
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M11.25 13.5L6.75 9L11.25 4.5"
                      stroke="#968AB6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                  </svg>
                </motion.button>
                <motion.button
                  className="size-10 rounded-full border border-[#e5e5ea] flex items-center justify-center cursor-pointer bg-transparent"
                  whileHover={{ borderColor: "#968ab6", scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("next")}
                >
                  <svg
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M6.75 13.5L11.25 9L6.75 4.5"
                      stroke="#968AB6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}