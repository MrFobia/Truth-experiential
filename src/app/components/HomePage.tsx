import { motion, useScroll, useSpring } from "motion/react";
import { HeroSection } from "./HeroSection";
import { BrandMarquee } from "./BrandMarquee";
import { RecentWorkSection } from "./RecentWorkSection";
import { StatsRowSection } from "./StatsRowSection";
import { CaseStudiesSection } from "./CaseStudiesSection";
import { ProcessSection } from "./ProcessSection";
import { TechSection } from "./TechSection";
import { WhyTruthSection } from "./WhyTruthSection";
import { TestimonialSection } from "./TestimonialSection";
import { TeamSection } from "./TeamSection";
import { FooterSection } from "./FooterSection";

export function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#968ab6] z-[60] origin-left"
        style={{ scaleX }}
      />

      <HeroSection />
      <BrandMarquee />
      <ProcessSection />
      <RecentWorkSection />
      <StatsRowSection />
      <TechSection />
      <WhyTruthSection />
      <TestimonialSection />
      <TeamSection />
      <FooterSection />
    </>
  );
}
