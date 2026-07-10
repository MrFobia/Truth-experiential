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
  challenge?: string;
  approach?: string;
  outcomes?: string;
  year?: string;
  client?: string;
  services?: string[];
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
    year: "2024",
    client: "Remitly",
    services: ["Experiential Design", "Mobile Tour", "Street-Level Activation"],
    challenge:
      "Remitly needed to build trust with Latino immigrant communities in Dallas, Houston, and San Antonio \u2014 a demographic historically skeptical of digital financial services. Traditional media wasn't cutting through. They needed to show up where people actually were.",
    approach:
      "We designed a fully transparent mobile truck \u2014 glass walls, open floor plan, no hidden corners \u2014 as a literal metaphor for the brand's promise of transparency. Brand ambassadors guided app sign-ups in-person, in Spanish, in the neighborhoods where the community already gathered. The truck ran through a hurricane and still hit every market date.",
    outcomes:
      "3,311 direct app downloads across three cities. 4.17 million total impressions. More than a media buy \u2014 proof that showing up physically, in the right places, with the right message, converts at rates no digital campaign can match.",
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
    year: "2023",
    client: "Pizza Patr\u00f3n",
    services: ["Talent Booking", "Event Production", "Sponsorship Strategy"],
    challenge:
      "Pizza Patr\u00f3n was celebrating 30 years as a brand that grew up alongside the Latino community in Dallas. They needed a moment big enough to honor that history \u2014 something the community would actually want to attend, not just a brand milestone press release.",
    approach:
      "We brought in Los Tigres del Norte \u2014 the norte\u00f1o legends who have soundtracked four decades of Mexican-American life \u2014 as the headline act. The event was designed around the community first: free entry, neighborhood venues, family-friendly format. Sponsorships covered 60% of costs, making the economics work for the brand at scale.",
    outcomes:
      "17,258 people showed up. Over 500,000 paid media impressions extended the reach beyond the venue. 60% cost recovery through sponsorships proved the model is repeatable. Pizza Patr\u00f3n didn't just celebrate their anniversary \u2014 they threw the neighborhood's party.",
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
    year: "2024",
    client: "Takis (Barcel)",
    services: ["Sampling Program", "NFL Partnership Activation", "Field Marketing"],
    challenge:
      "Takis Nitro was a new product entering a crowded snack category. The brand needed trial at scale \u2014 not just awareness, but actual taste experiences with the right demographic at the right emotional temperature. NFL game days are loud, charged, and exactly where snack decisions happen.",
    approach:
      "We built a stadium sampling program across multiple NFL venues, deploying trained brand teams inside the gates during peak foot traffic windows. Product placement was strategic \u2014 entry queues, concourse corridors, tailgate zones \u2014 everywhere fans dwell before the game locks their attention. Every sample came with a QR-to-purchase flow.",
    outcomes:
      "480,000+ samples distributed across the season. 20% tracked sales lift in markets where the activation ran. Takis Nitro didn't just launch \u2014 it earned trial from the people most likely to convert.",
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
    year: "2023",
    client: "B\u00fafalo (Grupo Herdez)",
    services: ["VR Experience Design", "Festival Activation", "Immersive Tech"],
    challenge:
      "B\u00fafalo, a Mexican hot sauce brand, needed to build an emotional connection with younger consumers at music festivals. A booth with samples wasn't going to cut it. They needed something worth stopping for, worth photographing, worth talking about after the music ended.",
    approach:
      "We designed a VR drum experience that put fans behind the kit at a live concert \u2014 their movements synced to actual audio, surrounded by crowd visuals and festival energy. No headset experience had been done at this scale in a Latin music context. The booth became the destination, not an interruption.",
    outcomes:
      "50,000+ interactions per show across four marquee festivals. Dwell time averaged 4+ minutes per person \u2014 orders of magnitude above any traditional booth. B\u00fafalo became the brand people talked about after the show.",
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