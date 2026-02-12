"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../../types/projects"; 
import Arch from "../../../components/project/Arch";
import Constraints from "../../../components/project/Constraints";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("architecture");
  const { id } = use(params);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((json: Project[]) => {
        const match = json.find((p) => p.id === id);
        if (!match) setError(true);
        else setProject(match);
      })
      .catch(() => setError(true));
  }, [id]);

  if (error) return <div className="h-screen bg-[#05080a] flex items-center justify-center font-mono text-red-500">[FATAL_ERROR] // NODE_NOT_FOUND</div>;
  if (!project) return <div className="h-screen bg-[#05080a] flex items-center justify-center font-mono text-indigo-500 animate-pulse">[INITIALIZING]...</div>;

  const tabs = [
    { id: "architecture",  label: "01_Architecture",    count: "SYS" },
    { id: "problem",       label: "02_Problem_Def",     count: "DEF" },
    { id: "contributions", label: "04_Contributions",   count: project.your_contributions.length.toString() },
    { id: "engineering",   label: "05_Decisions",       count: project.engineering_decisions.length.toString() },
    { id: "results",       label: "06_Results",         count: project.results.metrics.length.toString() },
    { id: "limitations",   label: "09_Limitations",     count: project.limitations.length.toString() },
    { id: "roadmap",       label: "10_Evolution",       count: project.future_work.length.toString() },
    { id: "stack",         label: "11_Toolchain",       count: "STACK" }
  ];

  return (
    <main className="min-h-screen bg-[#05080a] text-slate-300 font-sans selection:bg-indigo-500/30">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center max-w-7xl mx-auto">
        {/* <a href="/portfolio#projects" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-indigo-400 transition-colors">← SYSTEM_ROOT</a> */}
        <Link 
          href="/portfolio#projects" 
          scroll={false} 
          className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-indigo-400 transition-colors"
        >
          ← SYSTEM_ROOT
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-mono text-emerald-500 animate-pulse">● {project.short_card.status}</span>
          {project.links.demo && <a href={project.links.demo} target="_blank" className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Live_Environment</a>}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <span className="text-indigo-500 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Project_ID: {project.id}</span>
             <span className="h-px w-12 bg-white/10"></span>
             <span className="px-1  text-indigo-600 bg-slate-100 font-mono text-sm font-bold uppercase tracking-[0.4em]">{project.short_card.role}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.85]">{project.title}</h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">{project.summary}</p>
        </header>

        <div className="w-full bg-[#141e29] border-y border-white/10 mb-16 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-200 group ${
                  activeTab === tab.id 
                    ? "text-white bg-white/[0.03]" 
                    : "text-slate-600 hover:text-slate-300 hover:bg-white/[0.01]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Active Status Dot */}
                  <div className={`w-1 h-1 rounded-full transition-all ${
                    activeTab === tab.id ? "bg-indigo-500 shadow-[0_0_8px_#6366f1]" : "bg-transparent"
                  }`} />
                  
                  <span>{tab.label}</span>

                  <span className={`font-mono text-[8px] ${
                    activeTab === tab.id ? "text-indigo-400" : "opacity-20"
                  }`}>
                    ({tab.count})
                  </span>
                </div>

                {/* Sharp Underline Indicator */}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500" 
                    initial={false}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
            {activeTab === "architecture" && (
              <Arch {...project} />
            )}

            {activeTab === "problem" && (
              <Constraints {...project} />  
            )}

              {activeTab === "contributions" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.your_contributions.map((c, i) => (
                    <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-colors">
                      <span className="text-indigo-500 font-mono text-sm">#CONTRIB_{i+1}</span>
                      <p className="mt-4 text-slate-100 leading-relaxed text-lg">{c}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "engineering" && (
                <div className="space-y-4">
                  {project.engineering_decisions.map((ed, i) => (
                    <div key={i} className="p-6 bg-white/[0.01] border-l-2 border-indigo-500/30">
                      <p className="text-white font-bold uppercase text-lg tracking-tight">{ed.decision}</p>
                      <p className="text-sm text-slate-500 font-mono mt-2 uppercase"><strong>Rationale:</strong> {ed.reason}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "results" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="max-w-full p-10 bg-indigo-500/[0.02] border border-indigo-500/10 rounded-3xl">
                    <h3 className="text-indigo-400 font-mono text-xs uppercase tracking-[0.3em] mb-6">Final_Post_Mortem</h3>
                    <p className="text-2xl text-slate-300 leading-relaxed italic">"{project.results.evaluation}"</p>
                  </div>
                  {project.results.metrics.map((m, i) => (
                    <div key={i} className="p-8 border border-white/5 rounded-3xl flex flex-col justify-between aspect-square md:aspect-video">
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{m.name}</span>
                      <span className="text-5xl font-black text-white tracking-tighter">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "limitations" && (
                <div className="grid grid-cols-1  gap-4">
                  {project.limitations.map((l, i) => (
                    <div key={i} className="p-6 border border-white/5 bg-white/[0.01] rounded-xl flex gap-4">
                      <span className="text-red-900 font-black text-lg">!</span>
                      <p className="text-lg text-slate-200 font-mono uppercase tracking-tight">{l}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "roadmap" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.future_work.map((work, i) => (
                    <div key={i} className="p-8 bg-indigo-600/[0.03] border border-white/5 rounded-3xl relative overflow-hidden">
                      <span className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.02]">{i+1}</span>
                      <p className="text-sm text-slate-300 font-medium uppercase tracking-wider leading-loose">{work}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "stack" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  {Object.entries(project.stack).map(([category, tools]) => (
                    <div key={category} className="space-y-4">
                      <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{category}</h4>
                      <ul className="space-y-2">
                        {tools.map((t) => (
                          <li key={t} className="text-xs text-slate-400 font-mono border-l border-white/10 pl-3">{t}</li>
                        ))}
                      </ul>
                    </div>
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