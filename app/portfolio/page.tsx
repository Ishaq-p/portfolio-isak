"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ProjectCard from "../components/ProjectCard";
import FilterJumble from "../components/FilterJumble";
import ExperienceCard from "../components/ExperienceCard";
import SocialImpact from "../components/SocialImpact";
import ConnectionProtocol from "../components/ConnectionProtocol";

// ─── Moved outside component — never changes, no need to recreate on render ──
const ELECTRONS = [
  { rotate: 0,   duration: 2.2, delay: 0,   speed: 0.8, size: 2   },
  { rotate: 30,  duration: 3.8, delay: 0.2, speed: 0.8, size: 2.5 },
  { rotate: 60,  duration: 5.1, delay: 0.4, speed: 0.8, size: 1.5 },
  { rotate: 90,  duration: 2.9, delay: 0.6, speed: 0.8, size: 2   },
  { rotate: 120, duration: 4.4, delay: 0.8, speed: 0.8, size: 2.2 },
  { rotate: 150, duration: 3.1, delay: 1,   speed: 0.8, size: 1.8 },
];

export default function Portfolio() {
  const [data, setData]       = useState<any>(null);
  const [projects, setProjects] = useState<any>(null); // fixed casing
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = projects?.filter((p: any) =>
    activeFilter === "ALL" || p.short_card.domain.includes(activeFilter)
  );

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollProgress((scrollLeft / (scrollWidth - clientWidth)) * 100);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  // ── Data fetching ────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((r) => r.json())
      .then(setData)
      .catch((e) => console.error("PF_LOAD_ERROR:", e));
  }, []);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((r) => r.json())
      .then(setProjects)
      .catch((e) => console.error("PF_LOAD_ERROR:", e));
  }, []);

  // ── Merged hash-scroll effect — runs once both data sources are ready ────
  useEffect(() => {
    if (!data || !projects) return;
    const hash = window.location.hash;
    if (hash === "#projects" || hash === "#experiences") {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, projects]);

  if (!data || !projects) {
    return (
      <div className="bg-white h-[90vh] flex items-center justify-center font-mono text-[10px]">
        INITIALIZING_SYSTEM_ARCHIVE...
      </div>
    );
  }

  return (
    <main className="bg-white text-slate-900 font-sans selection:bg-indigo-100">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative w-full flex flex-col md:flex-row min-h-[90vh] items-center justify-center md:justify-between px-6 md:px-16 lg:px-24 gap-12 overflow-hidden bg-white pt-16 md:pt-0">

        {/* LEFT */}
        <div className="relative z-10 w-full md:w-[60%] order-2 md:order-1">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex flex-wrap items-center gap-2">
              <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-sm">
                BACKEND · ML · DB
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              {data.hero.name}
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-500 max-w-xl leading-relaxed">
              <span className="text-slate-900 font-bold">{data.hero.title}. </span>
              {data.hero.value_prop}
            </p>
          </motion.div>
        </div>

        {/* RIGHT: Atomic animation — desktop only */}
        <div className="hidden md:flex relative w-full md:w-[35%] items-center justify-center order-1 md:order-2">
          <div className="relative w-72 h-72 flex items-center justify-center">
            <div className="absolute w-5 h-5 bg-indigo-600 rounded-full z-20" />
            {ELECTRONS.map((e, i) => (
              <div
                key={i}
                className="absolute w-full h-full flex items-center justify-center"
                style={{ transform: `rotate(${e.rotate}deg)` }}
              >
                <div className="absolute w-full h-[45%] border border-slate-100 rounded-[100%] opacity-50" />
                <motion.div
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ duration: e.duration * e.speed, repeat: Infinity, ease: "linear", delay: e.delay * e.speed }}
                  style={{ width: e.size * 4, height: e.size * 4, offsetPath: "ellipse(144px 65px at 50% 50%)" }}
                  className="absolute rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                />
              </div>
            ))}
            <div className="absolute w-56 h-56 bg-indigo-50/20 blur-[100px] rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* ── 2. CORE STACK ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">
                Engineering_Stack_Hash
              </h2>
              <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                Core Competencies.
              </p>
            </div>
            <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-4 border-l-2 border-slate-100 pl-6 h-fit py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-8 md:gap-12 mb-16">
            {data.skills.map((skill: any) => (
              <div key={skill.category}>
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 md:mb-8">
                  {skill.category}
                </h3>
                <ul className="space-y-2 md:space-y-3 font-mono text-[12px] md:text-[13px] font-bold text-slate-700">
                  {skill.items.map((item: string) => (
                    <li key={item} className="leading-tight">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200/40">
            <p className="font-mono text-[10px] md:text-[11px] text-slate-400 tracking-tight leading-relaxed">
              <span className="text-slate-600 font-bold uppercase mr-2 tracking-widest">[focus]</span>
              <span className="bg-indigo-50 text-indigo-600 px-1 rounded-sm">
                Backend systems & applied machine learning, built and deployed in production.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. PROJECTS ──────────────────────────────────────────────────── */}
      <section id="projects" className="py-12 md:py-20 max-w-7xl mx-auto px-6 overflow-hidden">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">
              View_B // System_Slider
            </h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Production Systems & <br className="hidden sm:block" /> Applied Research.
            </p>
          </div>
          <FilterJumble projects={projects} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </header>

        {/* Scroll container — no relative wrapper, no overlapping buttons */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 lg:gap-6 pb-2 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth items-stretch"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProjects?.map((project: any) => (
            <div
              key={project.id}
              className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[31%] snap-start h-[inherit]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Progress bar + nav buttons — all in the same row, outside the scroll container */}
        <div className="flex items-center gap-4 mt-5">
          <button
            onClick={() => scroll("left")}
            className="shrink-0 p-3 bg-white border border-slate-200 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm active:scale-95"
          >
            <LuChevronLeft size={16} />
          </button>

          <div className="h-[2px] bg-slate-100 flex-1 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full"
              style={{ width: `${Math.max(8, scrollProgress)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest shrink-0">
            {Math.round(scrollProgress)}%
          </span>

          <button
            onClick={() => scroll("right")}
            className="shrink-0 p-3 bg-white border border-slate-200 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm active:scale-95"
          >
            <LuChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* ── 4. EXPERIENCE ────────────────────────────────────────────────── */}
      <section id="experiences" className="py-20 bg-[#020406] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-indigo-500 mb-12">
            Work_History
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.experience.map((exp: any, index: number) => (
              <ExperienceCard key={exp.organization} exp={{ ...exp, index: index + 1 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. EDUCATION ─────────────────────────────────────────────────── */}
      <section id="education" className="py-20 md:py-32 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">

          {/* Section label */}
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-12">
            Academic_Record
          </p>

          {data.education.map((edu: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group mb-10 last:mb-0"
            >
              {/* Card */}
              <div className="relative rounded-3xl border border-slate-100 bg-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/60 transition-all duration-500 overflow-hidden p-8 md:p-12">

                {/* Large ghosted index number */}
                <span
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-[120px] md:text-[160px] font-black text-slate-100 leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-indigo-50"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">

                  {/* LEFT: degree + institution */}
                  <div className="space-y-3 max-w-2xl">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.95]">
                      {edu.degree}
                    </h3>
                    <p className="text-xl md:text-2xl font-bold text-slate-500">
                      {edu.institution}
                    </p>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {edu.field && (
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                          {edu.field}
                        </span>
                      )}
                      {edu.honors && (
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                          {edu.honors}
                        </span>
                      )}
                      {edu.gpa && (
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: year badge */}
                  <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
                    <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">
                      Graduated
                    </span>
                    <span className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
                      {edu.year ?? edu.graduation_year ?? edu.end_year}
                    </span>
                  </div>
                </div>

                {/* Accent line that animates in on hover */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. SOCIAL IMPACT ─────────────────────────────────────────────── */}
      <section>
        <SocialImpact data={data.social_impact} />
      </section>

      {/* ── 7. FOOTER / CONTACT ──────────────────────────────────────────── */}
      <section>
        {/* Education removed from ConnectionProtocol — it now has its own section */}
        <ConnectionProtocol data={{ contact: data.contact }} />
      </section>

    </main>
  );
}