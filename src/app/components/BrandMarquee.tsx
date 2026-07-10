import { useState } from "react";

const brands = [
  { name: "Pizza Patrón",     src: "/logos/pizzapatron.png" },
  { name: "Pollo Campero",    src: "/logos/pollocampero.png" },
  { name: "Jefferson Dental", src: "/logos/jeffersondental.png" },
  { name: "Liberty Tax",      src: "/logos/libertytax.png" },
  { name: "El Rio Grande",    src: "/logos/elriograande.png" },
  { name: "Remitly",          src: "/logos/remitly.png" },
  { name: "Takis",            src: "/logos/takis.png" },
  { name: "Búfalo",           src: null },
  { name: "CDC",              src: null },
];

function BrandLogo({ name, src }: { name: string; src: string | null }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex items-center justify-center px-10 shrink-0" style={{ height: 56 }}>
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          style={{ height: 40, width: "auto", maxWidth: 200, objectFit: "contain", opacity: 0.9 }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-['Poppins',sans-serif] font-semibold text-[13px] tracking-[1px] uppercase text-white/70 whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
}

/* Separator dot between items */
function Dot() {
  return <div className="w-1 h-1 rounded-full bg-white/30 shrink-0" />;
}

export function BrandMarquee() {
  return (
    <section
      className="overflow-hidden border-y border-white/10 pt-4 pb-5"
      style={{ backgroundColor: "#968AB6" }}
    >
      <p className="text-center font-['Inter',sans-serif] text-[11px] font-semibold tracking-[3px] uppercase text-white/60 mb-4">
        Trusted by industry leaders.
      </p>

      {/*
        CSS marquee:
        - Two identical sets duplicated so the seam is invisible
        - Pauses on hover via [&:hover_>_div]:pause-animation
        - prefers-reduced-motion: shows static centered row instead
      */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; width: auto; flex-wrap: wrap; justify-content: center; }
          .marquee-set-b { display: none; }
        }
      `}</style>

      <div className="marquee-wrap overflow-hidden">
        <div className="marquee-track">
          {/* Set A */}
          <div className="marquee-set-a" style={{ display: "flex", alignItems: "center" }}>
            {brands.map((brand) => (
              <div key={`a-${brand.name}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <BrandLogo name={brand.name} src={brand.src} />
                <Dot />
              </div>
            ))}
          </div>
          {/* Set B — exact duplicate, makes loop seamless */}
          <div className="marquee-set-b" style={{ display: "flex", alignItems: "center" }} aria-hidden="true">
            {brands.map((brand) => (
              <div key={`b-${brand.name}`} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <BrandLogo name={brand.name} src={brand.src} />
                <Dot />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
