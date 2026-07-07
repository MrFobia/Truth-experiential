import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navigation } from "./Navigation";

export function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.style.backgroundColor = "#000";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      {/* T077 — skip link, first focusable element on the page */}
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[100] -translate-y-20 focus:translate-y-0 transition-transform bg-[#7a6fa0] text-white text-[13px] font-medium px-4 py-2 rounded-full"
      >
        Skip to content
      </a>

      <Navigation />

      {/* Custom cursor glow effect via CSS */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(150,138,182,0.1); }
          50% { box-shadow: 0 0 40px rgba(150,138,182,0.2); }
        }
        html, body { scroll-behavior: smooth; position: relative; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #968ab6; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #7a6fa0; }
        ::selection { background: rgba(150,138,182,0.3); color: white; }
        /* T075 — sitewide focus-visible ring, never suppressed */
        :focus-visible { outline: 2px solid #968ab6; outline-offset: 4px; }
      `}</style>

      <main id="main-content">
        <Outlet />
      </main>
    </div>
  );
}
