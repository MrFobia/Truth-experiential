import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import imgLogo from "figma:asset/98f47f672c0670dfc5a28bcf3104f8b7e6a9e062.png";

interface NavItem {
  label: string;
  href?: string;
  route?: string;
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /* T067 — sticky nav: hide on scroll-down, reveal on scroll-up */
  useEffect(() => {
    let lastY = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navItems: NavItem[] = [
    { label: "How we work", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Innovation", href: "#innovation" },
    { label: "Intelligence", href: "#about" },
    { label: "People", href: "#people" },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.route) {
      navigate(item.route);
    } else if (item.href) {
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation then scroll
        setTimeout(() => {
          const el = document.querySelector(item.href!);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-colors duration-500"
        initial={{ y: -100 }}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={imgLogo} alt="TRUth" className="h-11 md:h-14 w-auto" />
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => {
            const isActive =
              item.route && location.pathname === item.route;
            return (
              <motion.button
                key={item.label}
                className="text-[13px] tracking-[1.5px] uppercase hover:text-white cursor-pointer font-['Poppins',sans-serif] bg-transparent"
                style={{
                  color: isActive
                    ? "rgba(150,138,182,1)"
                    : "rgba(255,255,255,0.6)",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
                whileHover={{ y: -2 }}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </motion.button>
            );
          })}
          <motion.button
            className="ml-4 px-5 py-2.5 rounded-full bg-[#7a6fa0] text-white text-[13px] tracking-[0.5px] font-['Poppins',sans-serif] font-medium cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(150,138,182,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick({ label: "Get in touch", href: "#contact" })}
          >
            Get in touch →
          </motion.button>
        </div>

        <motion.button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5 w-6">
            <motion.span
              className="block h-0.5 bg-white rounded-full"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 bg-white rounded-full"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 bg-white rounded-full"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </div>
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                className="text-3xl text-white font-['Fustat',sans-serif] cursor-pointer bg-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
