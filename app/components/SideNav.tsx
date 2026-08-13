"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronDown, LuArrowUpRight, LuMenu, LuX, LuMail, LuHouse, LuBriefcase, LuFileText } from "react-icons/lu";
import OrbitMark from "./OrbitMark";

const resumes = [
  { label: "English", sub: "CV — EN", path: "/ishaq_cv.pdf" },
  { label: "Türkçe", sub: "CV — TR", path: "/ishaq_cv-turkish.pdf" },
];

/**
 * Left-side vertical navbar, used only on /portfolio in place of the global
 * top Navbar. Fixed to the left edge, full-height, thin rail with the
 * OrbitMark/wordmark at top and links stacked vertically.
 */
export default function SideNav() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: fixed left rail */}
      <nav
        aria-label="Primary"
        className="hidden md:flex fixed left-0 top-0 h-dvh w-[62px] lg:w-[72px] z-50 flex-col items-center justify-between py-7 border-r border-ink/10 bg-paper/90 backdrop-blur-md"
      >
        <Link href="/" className="flex flex-col items-center gap-2 group">
          <OrbitMark size="sm" tone="ion" />
        </Link>

        <div className="flex flex-col items-center gap-7">
          <Link
            href="/"
            title="Home"
            className="flex flex-col items-center gap-1 text-graphite hover:text-ink transition-colors"
          >
            <LuHouse size={20} />
            {/* <span className="[writing-mode:vertical-rl] [text-orientation:upright] uppercase text-[10px] font-medium tracking-[0.2em] pt-2">
              Home
            </span> */}
          </Link>
          <Link
            href="/portfolio"
            title="Work"
            className="flex flex-col items-center gap-1 text-ion transition-colors"
          >
            <LuBriefcase size={20} />
            {/* <span className="[writing-mode:vertical-rl] [text-orientation:upright] uppercase text-[10px] font-semibold tracking-[0.2em] pt-2">
              Work
            </span> */}
          </Link>

          <div
            className="relative flex flex-col items-center"
            onMouseEnter={() => setResumeOpen(true)}
            onMouseLeave={() => setResumeOpen(false)}
          >
            <span 
              title="Résumé"
              className="flex flex-col items-center gap-1 text-graphite hover:text-ink transition-colors cursor-pointer"
            >
              <LuFileText size={20} />
              {/* <span className="[writing-mode:vertical-rl] [text-orientation:upright] uppercase text-[10px] font-medium tracking-[0.2em] pt-2">
                Résumé
              </span> */}
              <LuChevronDown className="text-[11px] mt-1" />
            </span>
            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-full top-0 pl-3 w-44"
                >
                  <div className="bg-paper border border-ink/10 rounded-xl p-1.5 shadow-xl shadow-black/10">
                    {resumes.map((res) => (
                      <Link
                        key={res.label}
                        href={res.path}
                        target="_blank"
                        className="flex items-center justify-between px-3.5 py-2.5 hover:bg-ink/[0.04] rounded-lg group/item transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="text-[12px] font-medium text-ink">{res.label}</span>
                          <span className="text-[10px] text-graphite-2">{res.sub}</span>
                        </div>
                        <LuArrowUpRight
                          size={12}
                          className="text-graphite-2 group-hover/item:text-ion group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all"
                        />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <a
          href="/#contact-section"
          title="Contact"
          className="flex flex-col items-center gap-2 px-2 py-4 rounded-full border border-ink/15 hover:bg-ink hover:text-paper hover:border-ink text-ink transition-colors duration-300"
        >
          <LuMail size={16} />
          {/* <span className="[writing-mode:vertical-rl] [text-orientation:upright] uppercase text-[10px] font-medium tracking-[0.2em]">
            Contact
          </span> */}
        </a>
      </nav>

      {/* Mobile: top bar with menu toggle (left-rail doesn't fit narrow viewports) */}
      <nav className="md:hidden fixed top-0 left-0 w-full z-50 flex items-center justify-between px-5 py-4 bg-paper/90 backdrop-blur-md border-b border-ink/10">
        <Link href="/" className="flex items-center gap-2">
          <OrbitMark size="xs" tone="ion" />
          <span className="text-[15px] font-semibold tracking-tight text-ink" style={{ fontFamily: "var(--font-display)" }}>
            Paktinyar
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 -mr-2 text-ink"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[60px] left-0 w-full z-40 overflow-hidden bg-paper border-b border-ink/10"
          >
            <div className="flex flex-col pt-6 pb-6 px-6 gap-5">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-ink">
                Home
              </Link>
              <Link href="/portfolio" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-ion">
                Work
              </Link>
              <a href="#contact-section" onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-ink">
                Initialize
              </a>
              <div className="pt-4 border-t border-ink/10 space-y-2">
                <p className="font-mono text-xs text-graphite-2 mb-3 uppercase">Résumé</p>
                {resumes.map((res) => (
                  <Link
                    key={res.label}
                    href={res.path}
                    target="_blank"
                    className="flex items-center justify-between p-3.5 bg-ink/[0.03] rounded-lg border border-ink/10"
                  >
                    <div>
                      <p className="text-[13px] font-medium text-ink">{res.label}</p>
                      <p className="text-[11px] text-graphite-2">{res.sub}</p>
                    </div>
                    <LuArrowUpRight className="text-ion" size={14} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}