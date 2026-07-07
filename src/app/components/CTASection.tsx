import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import imgBg from "figma:asset/31c0db6f326681053febd75ec86a17afd5ac3709.png";

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  return (
    <section id="contact" ref={ref} className="relative h-[600px] md:h-[700px] overflow-hidden">
      <motion.img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-[120%] object-cover"
        style={{ y: bgY, scale }}
      />
      <div className="absolute inset-0 bg-[rgba(150,138,182,0.3)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(17,17,17,0.6)] via-[rgba(17,17,17,0.4)] to-[rgba(17,17,17,0.7)]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h2
          className="font-['Fustat',sans-serif] text-white text-[clamp(36px,5vw,60px)] leading-[1.1] tracking-[-0.02em] max-w-[666px] mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {`Let's build something `}
          <span className="italic text-[#c4b8e0]">that matters.</span>
        </motion.h2>

        <motion.p
          className="text-white/60 text-[17px] leading-[1.7] font-['Poppins',sans-serif] max-w-[505px] mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          A room, a campaign, a city-wide moment — bring it. We'll meet you with the team that can make it real.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-[#968ab6] text-white text-[15px] font-['Poppins',sans-serif] font-semibold cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(150,138,182,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Start something →
          </motion.button>
          <motion.button
            className="px-8 py-4 rounded-full border border-white/30 text-white text-[15px] font-['Poppins',sans-serif] font-medium cursor-pointer"
            whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            Watch the reel
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
