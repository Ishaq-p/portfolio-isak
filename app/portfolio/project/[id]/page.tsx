"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../../types/projects";
import Arch from "../../../components/project/Arch";
import Constraints from "../../../components/project/Constraints";
import OrbitMark from "../../../components/OrbitMark";
import {
  LuArrowLeft, LuExternalLink, LuCircleDot,
  LuTriangle, LuRocket, LuWrench,
  LuFlaskConical, LuActivity,
  LuLayers, LuCode, LuChevronRight,
} from "react-icons/lu";

const SECTIONS = [
  { id: "architecture",  label: "Architecture",  icon: LuLayers },
  { id: "problem",       label: "Problem",       icon: LuFlaskConical },
  { id: "contributions", label: "Contributions", icon: LuCode },
  { id: "engineering",   label: "Decisions",     icon: LuWrench },
  { id: "results",       label: "Results",       icon: LuActivity },
  { id: "limitations",   label: "Limitations",   icon: LuTriangle },
  { id: "roadmap",       label: "Roadmap",       icon: LuRocket },
  { id: "stack",         label: "Stack",         icon: LuCode },
];

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(false);
  const [activeSection, setActiveSection] = useState("architecture");
  const { id } = use(params);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((json: Project[]) => {
        const match = json.find((p) => p.id === id);
        if (!match) setError(true);
        else setProject(match);
      })
      .catch(() => setError(true));
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let best = activeSection;
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            best = entry.target.id;
            bestRatio = entry.intersectionRatio;
          }
        });
        if (bestRatio > 0) setActiveSection(best);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5, 0.8, 1] }
    );
    
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [project, activeSection]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 140; // Offset for header + mobile sticky
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (error) return (
    <div className="h-screen bg-ink flex items-center justify-center text-[13px] text-white/40">
      Project not found.
    </div>
  );
  if (!project) return (
    <div className="h-screen bg-ink flex items-center justify-center gap-3 text-white/40">
      <OrbitMark size="sm" tone="paper" />
      <span className="text-[13px]">Loading…</span>
    </div>
  );

  const sectionsWithContent = SECTIONS.filter((s) => {
    if (s.id === "contributions") return project.your_contributions?.length > 0;
    if (s.id === "engineering") return project.engineering_decisions?.length > 0;
    if (s.id === "results") return project.results?.metrics?.length > 0 || project.results?.evaluation;
    if (s.id === "limitations") return project.limitations?.length > 0;
    if (s.id === "roadmap") return project.future_work?.length > 0;
    if (s.id === "architecture") return project.architecture?.components?.length > 0 || project.architecture?.diagram;
    if (s.id === "problem") return project.problem?.problem_space || project.problem?.constraints?.length > 0;
    if (s.id === "stack") return Object.keys(project.stack || {}).length > 0;
    return false;
  }).map((s) => ({
    ...s,
    count:
      s.id === "contributions" ? project.your_contributions.length
      : s.id === "engineering"  ? project.engineering_decisions.length
      : s.id === "results"      ? project.results.metrics.length
      : s.id === "limitations"  ? project.limitations.length
      : s.id === "roadmap"      ? project.future_work.length
      : null,
  }));

  return (
    <main className="min-h-screen bg-ink text-white/70 selection:bg-ion selection:text-white pb-32">
      <div className="fixed inset-0 -z-10 opacity-[0.5] bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:26px_26px]" />

      <nav className="fixed top-0 inset-x-0 z-50 bg-ink/90 backdrop-blur-md border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/portfolio#projects"
            scroll={false}
            className="group flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-white/35 hover:text-white transition-colors duration-200"
          >
            <LuArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Projects
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-culture-soft animate-pulse" />
              <span className="text-[10px] text-culture-soft font-semibold uppercase tracking-widest">
                {project.short_card.status}
              </span>
            </div>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 bg-ion hover:bg-ion-soft text-white text-[11px] font-semibold rounded-lg transition-colors duration-200"
              >
                Live <LuExternalLink size={11} />
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-24 md:pt-32">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-16 border-b border-white/[0.05] max-w-5xl"
        >
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-ion/10 border border-ion/25 text-ion-soft shadow-[0_0_15px_rgba(74,84,241,0.1)]">
              {project.short_card.role}
            </span>
            {project.short_card.domain.map((d: string) => (
              <span key={d} className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/40">
                {d}
              </span>
            ))}
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[0.98] py-2 -my-2 mb-8 text-balance text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed mb-12 font-light">
            {project.summary}
          </p>

          {project.results?.metrics?.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {project.results.metrics.map((m, i) => (
                <div key={i} className="px-6 py-5 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-2xl flex-1 min-w-[140px] max-w-[200px] relative overflow-hidden group hover:border-white/[0.15] transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-ion/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-ion/20 transition-colors duration-500" />
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2 relative z-10">{m.name}</p>
                  <p className="font-semibold text-white text-3xl tracking-tight relative z-10" style={{ fontFamily: "var(--font-display)" }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 md:mt-16 relative">
          
          {/* Mobile TOC - Sticky Horizontal Row */}
          <div className="sticky top-[56px] z-40 bg-ink/90 backdrop-blur-md lg:hidden -mx-6 px-6 py-4 border-b border-white/[0.05] flex gap-2 overflow-x-auto scrollbar-hide">
            {sectionsWithContent.map((s) => {
              const isActive = activeSection === s.id;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all duration-300 whitespace-nowrap shrink-0 relative overflow-hidden ${isActive ? "text-ion-soft border-ion/20" : "text-white/40 border border-white/[0.05]"}`}
                >
                  {isActive && <div className="absolute inset-0 bg-ion/10" />}
                  <Icon size={12} className={`relative z-10 ${isActive ? "text-ion-soft" : "text-white/30"}`} />
                  <span className="relative z-10">{s.label}</span>
                  {s.count !== null && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold relative z-10 ${isActive ? "bg-ion/20 text-ion-soft" : "bg-white/[0.05] text-white/25"}`}>
                      {s.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* PC TOC - Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-3 relative">
            <div className="sticky top-32 flex flex-col gap-1.5 pr-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-5 pl-4">Case Study</p>
              {sectionsWithContent.map((s) => {
                const isActive = activeSection === s.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`group relative flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-medium transition-colors duration-300 text-left overflow-hidden ${isActive ? "text-ion-soft" : "text-white/40 hover:text-white/70"}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-toc-bg"
                        className="absolute inset-0 bg-gradient-to-r from-ion/[0.08] to-transparent border-l-2 border-l-ion-soft rounded-r-xl"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <div className="flex items-center gap-3 relative z-10">
                      <Icon size={14} className={isActive ? "text-ion-soft" : "text-white/30 group-hover:text-white/50"} />
                      {s.label}
                    </div>
                    {s.count !== null && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors duration-300 relative z-10 ${isActive ? "bg-ion/20 text-ion-soft" : "bg-white/[0.05] text-white/25 group-hover:bg-white/10 group-hover:text-white/40"}`}>
                        {s.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONTENT SECTIONS */}
          <div className="lg:col-span-9 space-y-24 md:space-y-32">
            {sectionsWithContent.map(s => {
              const Icon = s.icon;
              return (
                <section key={s.id} id={s.id} className="scroll-mt-40 max-w-4xl">
                  <h3 className="text-3xl font-medium tracking-tight mb-10 flex items-center gap-4" style={{ fontFamily: "var(--font-display)" }}>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-inner shrink-0">
                      <Icon className="text-ion-soft" size={18} />
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{s.label}</span>
                  </h3>
                  
                  {s.id === "architecture" && <Arch {...project} />}
                  {s.id === "problem" && <Constraints {...project} />}
                  
                  {s.id === "contributions" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.your_contributions.map((c, i) => (
                        <div
                          key={i}
                          className="group flex items-start gap-3 p-6 bg-gradient-to-r from-ion/[0.03] to-transparent border-l-2 border-l-ion-soft/40 border-y border-r border-white/[0.05] rounded-r-2xl hover:border-l-ion-soft hover:bg-ion/[0.05] transition-all duration-300"
                        >
                          <LuCircleDot size={12} className="text-ion-soft/60 mt-1 shrink-0 group-hover:text-ion-soft transition-colors" />
                          <p className="text-[14px] text-white/70 leading-relaxed font-light">{c}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {s.id === "engineering" && (
                    <div className="space-y-4">
                      {project.engineering_decisions.map((ed, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-12 gap-5 p-6 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] rounded-2xl hover:border-white/[0.1] transition-all duration-300 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="md:col-span-5 flex items-start gap-3 relative z-10">
                            <div className="mt-1 w-5 h-5 rounded-md bg-white/[0.05] flex items-center justify-center shrink-0">
                              <LuChevronRight size={12} className="text-white/60" />
                            </div>
                            <p className="text-white font-medium text-[15px] tracking-tight leading-snug">
                              {ed.decision}
                            </p>
                          </div>
                          <div className="md:col-span-7 md:border-l md:border-white/[0.07] md:pl-7 relative z-10">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-ion-soft/70 mb-2">
                              Rationale
                            </p>
                            <p className="text-[13.5px] text-white/50 leading-relaxed font-light">{ed.reason}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {s.id === "results" && (
                    <div className="space-y-6">
                      <div className="p-8 md:p-10 bg-gradient-to-br from-ion/[0.08] to-transparent border border-ion/20 rounded-2xl relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-ion/20 blur-[80px] rounded-full pointer-events-none" />
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-ion-soft mb-4 relative z-10">
                          Post-mortem evaluation
                        </p>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed relative z-10" style={{ fontFamily: "var(--font-display)" }}>
                          {project.results.evaluation}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {project.results.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="p-7 border border-white/[0.05] bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl hover:border-ion/30 transition-colors group"
                          >
                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-3 group-hover:text-ion-soft transition-colors">{m.name}</p>
                            <p className="text-4xl font-medium text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {s.id === "limitations" && (
                    <div className="space-y-4">
                      {project.limitations.map((l, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-6 bg-gradient-to-r from-amber-500/[0.03] to-transparent border-l-2 border-l-amber-500/40 border-y border-r border-white/[0.05] rounded-r-2xl"
                        >
                          <LuTriangle size={14} className="text-amber-500/70 mt-0.5 shrink-0" />
                          <p className="text-[14px] text-white/60 leading-relaxed font-light">{l}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {s.id === "roadmap" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {project.future_work.map((work, i) => (
                        <div
                          key={i}
                          className="p-7 bg-gradient-to-br from-ion/[0.06] to-transparent border border-ion/[0.15] rounded-2xl hover:border-ion/40 transition-all duration-300 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-ion/10 blur-[50px] group-hover:bg-ion/20 transition-colors" />
                          <LuRocket size={18} className="text-ion-soft mb-5 relative z-10" />
                          <p className="text-[14px] text-white/70 leading-relaxed font-light relative z-10">{work}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {s.id === "stack" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                      {Object.entries(project.stack).map(([category, tools]) => (
                        <div key={category} className="p-7 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] rounded-2xl relative overflow-hidden group hover:border-white/[0.1] transition-all">
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ion-soft/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <h4 className="text-[10px] font-semibold uppercase tracking-widest text-ion-soft mb-6 relative z-10">
                            {category}
                          </h4>
                          <ul className="space-y-3 relative z-10">
                            {(tools as string[]).map((t) => (
                              <li key={t} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-ion-soft/40 shrink-0" />
                                <span className="text-[13px] text-white/70 font-light">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
