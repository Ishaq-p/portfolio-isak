"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project }: any) {
  if (!project?.short_card) return null;
  const { short_card } = project;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full flex flex-col justify-between p-6 bg-[#05080a] border border-white/5 rounded-2xl hover:border-indigo-500/40 transition-all duration-500"
    >
      {/* TIER 1: IDENTITY & STATUS */}
      <div className="">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-white tracking-tighter leading-tight group-hover:text-indigo-400 transition-colors">
            {short_card.title}
          </h3>
          <span className="text-[7px] font-black px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-sm border border-indigo-500/20 uppercase tracking-widest">
            {short_card.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/20 font-mono text-[9px] font-black uppercase">
            {short_card.role}
          </span>
          <span className="h-px w-4 bg-white/10"></span>
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{short_card.year}</span>
        </div>
      </div>

      {/* TIER 2: VALUE PROPOSITION (Understanding the "What") */}
      <div className="flex-col">
        <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
          {short_card.tagline}
        </p>

        {/* Impact Grid: Quantifiable results */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl w-full">
            <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2">CostEff</p>
            <p className="text-sm font-black text-indigo-400 tracking-tighter leading-none">
              {short_card.secondary_metric?.value || "0%"}
            </p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <p className="text-[7px] font-black text-slate-600 uppercase tracking-[0.2em] mb-2">SysScope</p>
            <p className="text-sm font-black text-white tracking-tighter leading-none">
              {short_card.key_metric?.value} <span className="text-[10px] text-slate-500">{short_card.key_metric?.label?.split(' ')[0]}</span>
            </p>
          </div>
                  <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
          {short_card.stack?.slice(0, 4).map((tech: string) => (
            <span 
              key={tech} 
              className="px-2 py-1 bg-white/5 text-[9px] font-mono text-slate-500 rounded border border-white/5 uppercase"
            >
              {tech}
            </span>
          ))}
          
          {/* Truncation Indicator [cite: 2025-11-29] */}
          {short_card.stack?.length > 4 && (
            <span className="text-slate-600 font-black tracking-widest px-1">
              ...
            </span>
          )}
        </div>
        </div>
      </div>

      {/* TIER 3: TOOLCHAIN & ACCESS (Understanding the "How") */}
      <div className="pt-6 border-t border-white/5 space-y-6">
        <Link 
          href={`/portfolio/project/${project.id}`} 
          className="flex items-center justify-center w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:bg-indigo-600 hover:text-white transition-all transform hover:translate-y-[-2px]"
        >
          DECODE_ARCHITECTURE →
        </Link>
      </div>

      {/* Subtle background glow for depth */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />
    </motion.div>
  );
}