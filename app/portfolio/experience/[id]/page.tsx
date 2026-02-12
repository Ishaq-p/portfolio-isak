"use client";
import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuBinary, LuActivity, LuTerminal, LuCpu, LuArrowLeft, LuExternalLink } from "react-icons/lu";
import Link from "next/link";

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const [role, setRole] = useState<any>(null);
  const { id } = use(params);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then((json) => {
        const match = json.experience.find((e: any) => e.id === id);
        setRole(match);
      });
  }, [id]);

  if (!role) return null;

  return (
    <main className="relative min-h-screen bg-[#020406] text-slate-300 overflow-hidden selection:bg-indigo-500/40">
      
      {/* 1. KINETIC BACKGROUND: The Audit Grid */}
      <div className="fixed inset-0 -z-10 opacity-20 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* TOP NAVIGATION */}
        <nav className="flex justify-between items-center mb-20">
          <Link href="/portfolio#experiences" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 hover:text-white transition-all">
            <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" /> BACK_TO_SYSTEM_ROOT
          </Link>
          <div className="h-px flex-grow mx-8 bg-white/5" />
          <span className="font-mono text-[9px] text-indigo-500/60 font-bold uppercase tracking-widest">
            {role.id}_ARCHIVE
          </span>
        </nav>

        {/* HERO SECTION: Brutalist Identity */}
        <header className="mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-indigo-500 font-mono text-[10px] font-black uppercase tracking-[0.4em]">DEPLOYMENT_NODE // {role.level}</span>
              <span className="h-px w-12 bg-indigo-500/30"></span>
              <span className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.4em]">{role.type}</span>
            </div>
            
            <h1 className="text-[10vw] font-black text-white tracking-tighter leading-[0.75] uppercase mb-12">
              {role.role.split(' ').map((word: string, i: number) => (
                <span key={i} className={i % 2 === 0 ? "text-white" : "text-indigo-600 block md:inline"}>{word} </span>
              ))}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] mb-2">Organization</p>
                <p className="text-2xl font-bold text-slate-200">{role.organization}</p>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div>
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.4em] mb-2">Operational_Window</p>
                <p className="text-2xl font-bold text-slate-200 uppercase">{role.duration.start} — {role.duration.end}</p>
              </div>
            </div>
          </motion.div>
        </header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          {/* LEFT COLUMN: THE CORE DOSSIER */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 01_EXECUTIVE_SUMMARY: High Contrast Card */}
            <section className="bg-white rounded-[2rem] p-10 text-slate-900 shadow-2xl">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-6 flex items-center gap-3">
                <LuTerminal className="text-sm" /> 01_MISSION_LOG
              </h2>
              <p className="text-3xl md:text-4xl font-black tracking-tighter leading-[1.1] mb-8">
                {role.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {role.domain.map((d: string) => (
                  <span key={d} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-[9px] font-black uppercase tracking-widest text-slate-600">
                    {d}
                  </span>
                ))}
              </div>
            </section>

            {/* 02_IMPACT_FEED: Vertical Feed logic */}
            <section className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 px-4">
                02_EXECUTION_RESULTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.key_impact.map((impact: string, i: number) => (
                  <div key={i} className="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/[0.07] transition-all">
                    <span className="text-[9px] font-mono text-indigo-500 mb-4 block">SEGMENT_0{i+1}</span>
                    <p className="text-slate-200 font-medium leading-relaxed">{impact}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: THE TECH STACK RACK */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-12 p-8 bg-[#0a0f14] border border-white/5 rounded-[2rem] shadow-2xl">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8 flex items-center gap-3">
                <LuCpu /> INFRASTRUCTURE_SPEC
              </h3>
              
              <div className="space-y-3">
                {role.stack.map((s: string) => (
                  <div key={s} className="group flex items-center justify-between p-4 bg-white/[0.02] hover:bg-indigo-500/10 border border-white/5 rounded-xl transition-all">
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-tighter group-hover:text-white">
                      <span className="text-indigo-500 mr-2 opacity-40">#</span>{s}
                    </span>
                    <LuBinary className="text-white/10 group-hover:text-indigo-400 transition-colors" />
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <a href={role.links.organization} className="w-full flex items-center justify-center gap-4 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-xl transition-all shadow-lg shadow-indigo-600/20">
                  ORG_UPLINK <LuExternalLink />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}