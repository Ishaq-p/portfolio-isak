"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuMenu, LuX, LuChevronDown, LuArrowUpRight } from "react-icons/lu";
import OrbitMark from "./OrbitMark";
import MagneticButton from "./MagneticButton";

export default function Navbar() {
  const pathname = usePathname();

  // Define which routes should hide the global Navbar (because they use SideNav).
  const hideNavbar = 
    pathname === "/portfolio" || 
    pathname.startsWith("/portfolio/project") || 
    pathname.startsWith("/portfolio/experience");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resumes = [
    { label: "English", sub: "CV — EN", path: "/ishaq_cv.pdf" },
    { label: "Türkçe", sub: "CV — TR", path: "/ishaq_cv-turkish.pdf" },
  ];

  // Theme dictionaries driven dynamically by the route
  const fg = "text-ink";
  const fgMuted = "text-graphite";
  const border = "border-ink/10";
  const bgNav = "bg-paper/90";
  const bgDropdown = "bg-paper";
  const btnHover = "hover:bg-ink hover:text-paper hover:border-ink";

  if (hideNavbar) {
    return null;
  }

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 px-6 md:px-10 ${scrolled
        ? `${bgNav} backdrop-blur-md border-b ${border} py-3`
        : "bg-transparent border-b border-transparent py-5"
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <OrbitMark size="xs" tone="ion" />
          <span
            className={`text-[15px] font-semibold tracking-tight ${fg}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Paktinyar
          </span>
        </Link>

        <div className={`hidden md:flex items-center gap-9 text-[13px] font-medium ${fgMuted}`}>
          <Link href="/" className={`${pathname === "/" ? fg : "hover:text-ink"} transition-colors relative flex items-center`}>
            {pathname === "/" && <span className="absolute -left-3 w-1 h-1 rounded-full bg-ion" />}
            Home
          </Link>
          <Link href="/portfolio" className={`${pathname === "/portfolio" ? fg : "hover:text-ink"} transition-colors relative flex items-center`}>
            {pathname === "/portfolio" && <span className="absolute -left-3 w-1 h-1 rounded-full bg-ion" />}
            Work
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setResumeOpen(true)}
            onMouseLeave={() => setResumeOpen(false)}
          >
            <span className={`hover:${fg.replace("text-", "text-")} transition-colors flex items-center gap-1.5 cursor-pointer`}>
              Résumé <LuChevronDown className="text-[11px]" />
            </span>
            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 pt-3 w-44"
                >
                  <div className={`${bgDropdown} border ${border} rounded-none p-1.5 shadow-xl shadow-black/10`}>
                    {resumes.map((res) => (
                      <Link
                        key={res.label}
                        href={res.path}
                        target="_blank"
                        className={`flex items-center justify-between px-3.5 py-2.5 hover:bg-ink/5 rounded-none group/item transition-colors`}
                      >
                        <div className="flex flex-col">
                          <span className={`text-[12px] font-medium ${fg}`}>{res.label}</span>
                          <span className={`text-[10px] ${fgMuted}`}>{res.sub}</span>
                        </div>
                        <LuArrowUpRight
                          size={12}
                          className={`${fgMuted} group-hover/item:text-ion group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all`}
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <MagneticButton href="#contact-section" />
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 -mr-2 ${fg}`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${bgDropdown} border-b ${border}`}
          >
            <div className="flex flex-col pt-6 pb-6 px-6 gap-5">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-[15px] font-medium flex items-center gap-2 ${pathname === "/" ? fg : fgMuted}`}>
                {pathname === "/" && <span className="w-1.5 h-1.5 rounded-full bg-ion" />} Home
              </Link>
              <Link
                href="/portfolio"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[15px] font-medium flex items-center gap-2 ${pathname === "/portfolio" ? fg : fgMuted}`}
              >
                {pathname === "/portfolio" && <span className="w-1.5 h-1.5 rounded-full bg-ion" />} Work
              </Link>
              <a
                href="#contact-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-[15px] font-medium ${fg}`}
              >
                Initialize
              </a>

              <div className={`pt-4 border-t ${border} space-y-2`}>
                <p className={`font-mono text-xs ${fgMuted} mb-3 uppercase`}>Résumé</p>
                {resumes.map((res) => (
                  <Link
                    key={res.label}
                    href={res.path}
                    target="_blank"
                    className={`flex items-center justify-between p-3.5 bg-ink/5 rounded-none border ${border}`}
                  >
                    <div>
                      <p className={`text-[13px] font-medium ${fg}`}>{res.label}</p>
                      <p className={`text-[11px] ${fgMuted}`}>{res.sub}</p>
                    </div>
                    <LuArrowUpRight className="text-ion" size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}