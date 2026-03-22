"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../../types/projects";
import Arch from "../../../components/project/Arch";
import Constraints from "../../../components/project/Constraints";
import {
  LuArrowLeft, LuExternalLink, LuCircleDot,
  LuTriangle,        // ← was LuAlertTriangle
  LuRocket, LuWrench,
  LuFlaskConical, LuActivity,    // ← was LuBarChart
  LuLayers, LuCode, LuChevronRight  // ← was LuCode2
} from "react-icons/lu";

const TABS = [
  { id: "architecture",  label: "Architecture", short: "Arch",    icon: LuLayers       },
  { id: "problem",       label: "Problem",       short: "Prob",    icon: LuFlaskConical },
  { id: "contributions", label: "Contributions", short: "Contrib", icon: LuCode         }, // ← LuCode2 → LuCode
  { id: "engineering",   label: "Decisions",     short: "Dec",     icon: LuWrench       },
  { id: "results",       label: "Results",       short: "Results", icon: LuActivity    }, // ← LuBarChart → LuAreaChart
  { id: "limitations",   label: "Limitations",   short: "Limits",  icon: LuTriangle     }, // ← LuAlertTriangle → LuTriangle
  { id: "roadmap",       label: "Roadmap",       short: "Road",    icon: LuRocket       },
  { id: "stack",         label: "Stack",         short: "Stack",   icon: LuCode         }, // ← LuCode2 → LuCode
];

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError]     = useState(false);
  const [activeTab, setActiveTab] = useState("architecture");
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

  if (error) return (
    <div className="h-screen bg-[#05080a] flex items-center justify-center font-mono text-[11px] text-red-400/60 uppercase tracking-widest">
      Project not found
    </div>
  );
  if (!project) return (
    <div className="h-screen bg-[#05080a] flex items-center justify-center font-mono text-[11px] text-indigo-400/40 uppercase tracking-widest animate-pulse">
      Loading...
    </div>
  );

  const tabsWithCount = TABS.map((t) => ({
    ...t,
    count:
      t.id === "contributions" ? project.your_contributions.length
      : t.id === "engineering"  ? project.engineering_decisions.length
      : t.id === "results"      ? project.results.metrics.length
      : t.id === "limitations"  ? project.limitations.length
      : t.id === "roadmap"      ? project.future_work.length
      : null,
  }));

  return (
    <main className="min-h-screen bg-[#05080a] text-slate-300 font-sans selection:bg-indigo-500/30">

      {/* ── Fixed background texture ────────────────────────────────── */}
      <div className="fixed inset-0 -z-10 opacity-[0.12] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-violet-500/[0.03]" />

      {/* ── Top nav ─────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#05080a]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/portfolio#projects"
            scroll={false}
            className="group flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white transition-colors duration-200"
          >
            <LuArrowLeft size={11} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Projects
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest">
                {project.short_card.status}
              </span>
            </div>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[9px] font-black uppercase tracking-widest rounded-lg transition-all duration-200"
              >
                Live
                <LuExternalLink size={10} />
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-16 pb-16 border-b border-white/[0.06]"
        >
          {/* Meta tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {project.short_card.role}
            </span>
            {project.short_card.domain.map((d: string) => (
              <span key={d} className="font-mono text-[9px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/30">
                {d}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            {project.title}
          </h1>

          {/* Summary */}
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed font-medium mb-10">
            {project.summary}
          </p>

          {/* Key metrics strip */}
          {project.results?.metrics?.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {project.results.metrics.map((m, i) => (
                <div key={i} className="px-5 py-3 bg-white/[0.03] border border-white/[0.07] rounded-xl">
                  <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/25 mb-1">{m.name}</p>
                  <p className="font-black text-white text-lg tracking-tight leading-none">{m.value}</p>
                </div>
              ))}
            </div>
          )}
        </motion.header>

        {/* ── Tab bar ─────────────────────────────────────────────────── */}
        <div className="sticky top-14 z-40 bg-[#05080a]/95 backdrop-blur-md border-b border-white/[0.06] -mx-6">
          <div className="relative">
            {/* Scroll container */}
            <div
              id="tab-scroll"
              className="flex gap-1 overflow-x-auto px-6"
              style={{ scrollbarWidth: "none" }}
            >
              {tabsWithCount.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 px-4 py-4 font-mono text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all duration-200 ${
                      isActive ? "text-white" : "text-white/25 hover:text-white/60"
                    }`}
                  >
                    <Icon size={11} className={isActive ? "text-indigo-400" : "text-white/20"} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.short}</span>
                    {tab.count !== null && (
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-black ${
                        isActive ? "bg-indigo-500/20 text-indigo-400" : "bg-white/[0.04] text-white/20"
                      }`}>
                        {tab.count}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="tabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500"
                        initial={false}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right fade + chevron — hints there are more tabs */}
            <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
              <div className="w-16 h-full bg-gradient-to-l from-[#05080a] to-transparent" />
              <button
                onClick={() => {
                  const el = document.getElementById("tab-scroll");
                  if (el) el.scrollBy({ left: 160, behavior: "smooth" });
                }}
                className="pointer-events-auto shrink-0 mr-3 p-1.5 rounded-lg bg-slate-50 border border-white/[0.08] hover:bg-indigo-500/20 hover:border-indigo-500/30 transition-all duration-200"
              >
                <LuChevronRight size={14} className="text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Tab content ─────────────────────────────────────────────── */}
        <div className="py-12 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >

              {/* ── Architecture ──────────────────────────────────────── */}
              {activeTab === "architecture" && <Arch {...project} />}

              {/* ── Problem ───────────────────────────────────────────── */}
              {activeTab === "problem" && <Constraints {...project} />}

              {/* ── Contributions ─────────────────────────────────────── */}
              {activeTab === "contributions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.your_contributions.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="group relative p-7 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-indigo-500/25 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute right-5 top-4 font-mono text-[56px] font-black text-white/[0.03] leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-start gap-3 relative z-10">
                        <LuCircleDot size={11} className="text-indigo-500/50 mt-1 shrink-0" />
                        <p className="text-[14px] text-white/60 leading-relaxed font-medium group-hover:text-white/80 transition-colors duration-300">
                          {c}
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500" />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ── Engineering decisions ─────────────────────────────── */}
              {activeTab === "engineering" && (
                <div className="space-y-3">
                  {project.engineering_decisions.map((ed, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="group grid grid-cols-1 md:grid-cols-12 gap-4 p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-indigo-500/20 hover:bg-white/[0.03] transition-all duration-300"
                    >
                      <div className="md:col-span-5 flex items-start gap-3">
                        <LuChevronRight size={12} className="text-indigo-500 mt-1 shrink-0" />
                        <p className="text-white font-black text-[15px] tracking-tight leading-snug">
                          {ed.decision}
                        </p>
                      </div>
                      <div className="md:col-span-7 md:border-l md:border-white/[0.06] md:pl-6">
                        <p className="font-mono text-[9px] font-black uppercase tracking-widest text-indigo-400/60 mb-2">
                          Rationale
                        </p>
                        <p className="text-[13px] text-white/45 leading-relaxed font-medium">
                          {ed.reason}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ── Results ───────────────────────────────────────────── */}
              {activeTab === "results" && (
                <div className="space-y-6">
                  {/* Evaluation quote */}
                  <div className="p-8 md:p-10 bg-indigo-500/[0.04] border border-indigo-500/15 rounded-2xl">
                    <p className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400/60 mb-4">
                      Post-mortem evaluation
                    </p>
                    <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-medium">
                      {project.results.evaluation}
                    </p>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {project.results.metrics.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="p-7 border border-white/[0.06] bg-white/[0.02] rounded-2xl hover:border-indigo-500/20 transition-all duration-300"
                      >
                        <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-white/25 mb-3">
                          {m.name}
                        </p>
                        <p className="text-4xl font-black text-white tracking-tighter leading-none">
                          {m.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Limitations ───────────────────────────────────────── */}
              {activeTab === "limitations" && (
                <div className="space-y-3">
                  {project.limitations.map((l, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-4 p-6 bg-amber-500/[0.03] border border-amber-500/10 rounded-2xl hover:border-amber-500/20 hover:bg-amber-500/[0.05] transition-all duration-300"
                    >
                      <LuTriangle  size={14} className="text-amber-500/60 mt-0.5 shrink-0" />
                      <p className="text-[14px] text-white/60 leading-relaxed font-medium">{l}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ── Roadmap ───────────────────────────────────────────── */}
              {activeTab === "roadmap" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.future_work.map((work, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="group relative p-7 bg-indigo-600/[0.03] border border-white/[0.06] rounded-2xl hover:border-indigo-500/25 hover:bg-indigo-500/[0.05] transition-all duration-300 overflow-hidden"
                    >
                      <span className="absolute -bottom-3 -right-2 text-[80px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
                        {i + 1}
                      </span>
                      <LuRocket size={13} className="text-indigo-500/40 mb-4 group-hover:text-indigo-400 transition-colors duration-300" />
                      <p className="text-[14px] text-white/55 font-medium leading-relaxed relative z-10 group-hover:text-white/75 transition-colors duration-300">
                        {work}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* ── Stack ─────────────────────────────────────────────── */}
              {activeTab === "stack" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(project.stack).map(([category, tools]) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl"
                    >
                      <h4 className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-5">
                        {category}
                      </h4>
                      <ul className="space-y-2.5">
                        {(tools as string[]).map((t) => (
                          <li key={t} className="flex items-center gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-indigo-500/40 shrink-0" />
                            <span className="font-mono text-[12px] text-white/50">
                              {t}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}