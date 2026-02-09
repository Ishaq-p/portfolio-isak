"use client";
import { useEffect, useState, use } from "react";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState(false);
  const { id } = use(params);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((json) => {
        const match = json.find((p: any) => p.id === id);
        if (!match) setError(true);
        setProject(match);
      })
      .catch(() => setError(true));
  }, [id]);

  if (error) return <div className="h-screen bg-[#05080a] flex items-center justify-center font-mono text-red-500">[FATAL_ERROR] // NODE_NOT_FOUND</div>;
  if (!project) return <div className="h-screen bg-[#05080a] flex items-center justify-center font-mono text-indigo-500 animate-pulse">[INITIALIZING]...</div>;

  return (
    <main className="min-h-screen bg-[#05080a] text-slate-300 font-sans selection:bg-indigo-500/30">
      <nav className="p-6 border-b border-white/5 flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-indigo-400 transition-colors">← SYSTEM_ROOT</a>
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-mono text-emerald-500 animate-pulse">● {project.short_card?.status || "EXPERIMENTAL"}</span>
          {project.links?.demo && <a href={project.links.demo} target="_blank" className="px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Live_Environment</a>}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-24">
          <div className="flex items-center gap-4 mb-6">
             <span className="text-indigo-500 font-mono text-[10px] font-black uppercase tracking-[0.4em]">Project_ID: {project.id}</span>
             <span className="h-px w-12 bg-white/10"></span>
             <span className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.4em]">{project.short_card?.role || "LEAD_ENGINEER"}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.85]">{project.title || "UNTITLED_NODE"}</h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">{project.summary}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-7 space-y-24">
            
            {/* 01. Problem Analysis: Handles string OR object */}
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-8 flex items-center gap-4">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> 01_Problem_Analysis
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">{project.problem?.description}</p>
              <div className="space-y-4">
                {project.problem?.constraints?.map((c: any, i: number) => (
                  <div key={i} className="flex flex-col p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs font-mono">
                    <span className="text-indigo-500/50 mb-1 uppercase tracking-tighter">
                      {typeof c === 'object' ? `[!] ${c.area}` : '[!] constraint'}
                    </span>
                    <span className="text-slate-400 italic">{typeof c === 'object' ? c.details : c}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 02. Contributions: Upgraded to handle {area, details} */}
            <section>
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-8 flex items-center gap-4">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> 02_Contributions
              </h2>
              <div className="space-y-8">
                {project.your_contributions?.map((c: any, i: number) => (
                  <div key={i} className="group p-6 bg-white/[0.01] border-l-2 border-white/5 hover:border-indigo-500 transition-all">
                    {typeof c === 'object' ? (
                      <>
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">{c.area}</p>
                        <p className="text-slate-300 leading-relaxed font-medium">{c.details}</p>
                      </>
                    ) : (
                      <p className="text-slate-300 leading-relaxed font-medium">{c}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-12 space-y-8">
              {/* Engineering Decision Log */}
              <div className="p-8 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-3xl space-y-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Engineering_Decision_Log</h3>
                {project.engineering_decisions?.map((ed: any, i: number) => (
                  <div key={i} className="space-y-3">
                    <p className="text-white text-xs font-bold font-mono uppercase tracking-tight">{ed.decision}</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic uppercase tracking-wider">RATIONALE: {ed.reason}</p>
                  </div>
                ))}
              </div>

              {/* Limitations Section (Already Fixed) */}
              {project.limitations?.length > 0 && (
                <div className="p-8 bg-red-500/[0.02] border border-red-500/10 rounded-3xl space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">System_Limitations</h3>
                  <ul className="space-y-6">
                    {project.limitations.map((l: any, i: number) => (
                      <li key={i} className="text-[10px] font-mono text-slate-500 leading-relaxed flex flex-col gap-1">
                        <div className="flex gap-3 items-center">
                          <span className="text-red-900 font-black">X</span>
                          <span className="text-white font-bold uppercase tracking-widest text-[9px]">{l.area || "GENERAL"}</span>
                        </div>
                        <p className="pl-6 text-slate-500 italic lowercase tracking-tight">{l.details}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* 04. Roadmap: Upgraded to handle {area, details} */}
        <footer className="mt-40 pt-16 border-t border-white/5 bg-gradient-to-t from-indigo-500/[0.02] to-transparent">
          <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-600 mb-12 text-center">System_Evolution_Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {(project.future_work || []).map((work: any, i: number) => (
               <div key={i} className="relative p-10 rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
                 <span className="absolute -right-4 -top-4 text-7xl font-black text-white/5">0{i+1}</span>
                 {typeof work === 'object' ? (
                   <div className="relative z-10 space-y-2">
                     <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">{work.area}</p>
                     <p className="text-xs font-mono text-slate-400 leading-loose uppercase tracking-widest">{work.details}</p>
                   </div>
                 ) : (
                   <p className="relative z-10 text-xs font-mono text-slate-400 leading-loose uppercase tracking-widest">{work}</p>
                 )}
               </div>
             ))}
          </div>
        </footer>
      </div>
    </main>
  );
}