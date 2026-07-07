import { useState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MapPin, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import imgLogo from "figma:asset/98f47f672c0670dfc5a28bcf3104f8b7e6a9e062.png";

/* ── Dark input ──────────────────────────────────────────────── */
function Field({
  label,
  type = "text",
  textarea = false,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const base =
    "w-full bg-[rgba(255,255,255,0.03)] border rounded-xl px-5 font-['Poppins',sans-serif] text-[14px] text-white/80 placeholder-white/25 transition-all duration-300";
  const border = focused
    ? "border-[rgba(150,138,182,0.5)] bg-[rgba(150,138,182,0.05)]"
    : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)]";

  return (
    <div>
      {/* T064 — visible label above the input, not placeholder-only */}
      <label
        htmlFor={id}
        className="block font-['Poppins',sans-serif] text-[12px] text-white/40 mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            placeholder={label}
            rows={4}
            className={`${base} ${border} py-4 resize-none`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={label}
            className={`${base} ${border} h-[52px]`}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
          style={{ boxShadow: focused ? "0 0 0 3px rgba(150,138,182,0.12)" : "none" }}
        />
      </div>
    </div>
  );
}

/* ── Social button ───────────────────────────────────────────── */
function SocialBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <motion.a
      href="#"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white/50 cursor-pointer"
      whileHover={{ borderColor: "rgba(150,138,182,0.5)", color: "rgba(150,138,182,1)", scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
    >
      <Icon size={15} />
    </motion.a>
  );
}

/* ── Footer link ─────────────────────────────────────────────── */
function FooterLink({ label }: { label: string }) {
  return (
    <motion.a
      href="#"
      className="block text-white/60 text-[14px] font-['Poppins',sans-serif] leading-[1.5] cursor-pointer"
      whileHover={{ x: 4, color: "rgba(255,255,255,0.9)" }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.a>
  );
}

/* ── Contact form with confirmation ─────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="confirmation"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-start gap-4 py-8"
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-[rgba(150,138,182,0.15)] border border-[rgba(150,138,182,0.3)] flex items-center justify-center shrink-0 mt-0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            >
              <span className="text-[#968ab6] text-[16px]">✓</span>
            </motion.div>
            <div>
              <p className="font-['Fustat',sans-serif] text-white text-[20px] font-bold leading-[1.2] mb-1">
                Sent ✓
              </p>
              <p className="font-['Poppins',sans-serif] text-white/50 text-[14px] leading-[1.6]">
                — we'll be in touch within one business day.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Name" />
              <Field label="Email" type="email" />
            </div>
            <Field label="Company" />
            <Field label="What's on your mind?" textarea />
            <div>
              <motion.button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#7a6fa0] text-white text-[13px] font-['Poppins',sans-serif] font-semibold tracking-[0.5px] cursor-pointer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(150,138,182,0.35)" }}
                whileTap={{ scale: 0.97 }}
              >
                Send →
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main Footer ─────────────────────────────────────────────── */
export function FooterSection() {
  return (
    <footer id="contact" className="bg-[#111] overflow-hidden">
      {/* Top gradient border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(150,138,182,0.2)] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-[97px]">

        {/* ── Full-width header ── */}
        <div className="pt-20 pb-14 border-b border-[rgba(255,255,255,0.06)]">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="w-6 h-px bg-[#968ab6]" />
            <span className="font-['Poppins',sans-serif] font-semibold text-[#968ab6] text-[11px] tracking-[3.6px] uppercase">
              Start something.
            </span>
          </motion.div>

          <motion.h2
            className="font-['Fustat',sans-serif] font-bold text-white text-[clamp(40px,4.5vw,64px)] leading-[1.1] tracking-[-0.02em] mb-5 max-w-[700px]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
          >
            Let's build something{" "}
            <span className="italic text-[#968ab6]">that matters.</span>
          </motion.h2>

          <motion.p
            className="font-['Poppins',sans-serif] text-white/50 text-[16px] leading-[1.7] max-w-[520px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            viewport={{ once: true }}
          >
            A room, a campaign, a city-wide moment — bring it. We'll meet you with the team that can make it real.
          </motion.p>
        </div>

        {/* ── 3-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_auto] gap-14 lg:gap-10 py-16">

          {/* Col 1 — Brand info */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src={imgLogo} alt="TRUth" className="h-11 w-auto self-start" />

            <div>
              <h3 className="font-['Fustat',sans-serif] font-bold text-white text-[22px] leading-[1.2] mb-3">
                Get in touch.
              </h3>
              <p className="font-['Poppins',sans-serif] text-white/40 text-[14px] leading-[1.7] max-w-[320px]">
                Experiential marketing agency building brand activations, mobile tours, and immersive moments that move multicultural audiences.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <Phone size={13} className="text-[#968ab6] shrink-0 mt-0.5" />
                <span className="font-['Poppins',sans-serif] text-[13px] text-white/60">972.848.8686</span>
              </div>
              <a
                href="https://wa.me/19728488686"
                className="flex items-start gap-2.5 group cursor-pointer"
              >
                <MessageCircle size={13} className="text-[#968ab6] shrink-0 mt-0.5" />
                <span className="font-['Poppins',sans-serif] text-[13px] text-white/60 group-hover:text-white/90 transition-colors">
                  Chat on WhatsApp
                </span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin size={13} className="text-[#968ab6] shrink-0 mt-0.5" />
                <span className="font-['Poppins',sans-serif] text-[13px] text-white/60 leading-[1.6]">
                  16803 Dallas Pkwy, Ste 100<br />Addison, TX 75001
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-[13px] h-[13px] shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#968ab6]" />
                </div>
                <span className="font-['Poppins',sans-serif] text-[13px] text-white/60">
                  Dallas · Mexico City · Bogotá
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-3">
              <SocialBtn icon={Instagram} label="Instagram" />
              <SocialBtn icon={Linkedin} label="LinkedIn" />
              <SocialBtn icon={Youtube} label="YouTube" />
            </div>
          </motion.div>

          {/* Col 2 — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>

          {/* Col 3 — Links */}
          <motion.div
            className="flex flex-col gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="font-['Poppins',sans-serif] font-semibold text-[11px] tracking-[2.2px] uppercase text-white/50 mb-4">
                Services
              </p>
              <div className="flex flex-col gap-3">
                {["Live Experiences", "Street & Guerrilla", "Digital & Immersive", "Community & Cultural"].map(l => (
                  <FooterLink key={l} label={l} />
                ))}
              </div>
            </div>

            <div>
              <p className="font-['Poppins',sans-serif] font-semibold text-[11px] tracking-[2.2px] uppercase text-white/50 mb-4">
                About
              </p>
              <div className="flex flex-col gap-3">
                {["About us", "Work", "Intelligence", "People", "Whitepapers"].map(l => (
                  <FooterLink key={l} label={l} />
                ))}
              </div>
            </div>

            <div>
              <p className="font-['Poppins',sans-serif] font-semibold text-[11px] tracking-[2.2px] uppercase text-white/50 mb-4">
                Legal
              </p>
              <div className="flex flex-col gap-3">
                {["Privacy", "Terms", "Cookies"].map(l => (
                  <FooterLink key={l} label={l} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-[rgba(255,255,255,0.06)] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Poppins',sans-serif] text-[12px] text-white/50">
            © 2025 Truth Marketing + Media. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Terms", "Privacy", "Cookies"].map(l => (
              <a
                key={l}
                href="#"
                className="font-['Poppins',sans-serif] text-[12px] text-white/50 hover:text-white/60 transition-colors cursor-pointer"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
