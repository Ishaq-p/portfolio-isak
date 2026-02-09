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
      
      {/* 2. SCANNER BAR: Visual Polish */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="fixed left-0 right-0 h-[2px] bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-50 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* TOP NAVIGATION */}
        <nav className="flex justify-between items-center mb-20">
          <Link href="/portfolio" className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 hover:text-white transition-all">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-7 space-y-24">
            {/* 01_MISSION_LOG */}
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-8 flex items-center gap-4">
                <LuTerminal /> 01_MISSION_LOG
              </h2>
              <p className="text-2xl md:text-3xl font-medium text-slate-100 leading-tight mb-8">
                {role.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                {role.domain.map((d: string) => (
                  <span key={d} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {d}
                  </span>
                ))}
              </div>
            </section>

            {/* 02_IMPACT_METRICS */}
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-12 flex items-center gap-4">
                <LuActivity /> 02_EXECUTION_RESULTS
              </h2>
              <div className="space-y-4">
                {role.key_impact.map((impact: string, i: number) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all flex gap-8 items-start"
                  >
                    <span className="text-3xl font-black text-indigo-600/30">0{i+1}</span>
                    <p className="text-lg text-slate-300 font-medium pt-1">{impact}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* 03_SYSTEM_TECH */}
          <aside className="lg:col-span-5 space-y-12">
            <div className="sticky top-32 p-10 bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem] space-y-12 backdrop-blur-xl">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-8 flex items-center gap-3">
                  <LuCpu /> Infrastructure_Stack
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {role.stack.map((s: string) => (
                    <div key={s} className="p-4 bg-black/40 border border-white/5 rounded-2xl font-mono text-[11px] text-slate-400 uppercase tracking-tighter">
                      <span className="text-indigo-500 mr-2">#</span>{s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <a 
                  href={role.links.organization} 
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl shadow-white/5"
                >
                  ORG_INTERFACE <LuExternalLink />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}