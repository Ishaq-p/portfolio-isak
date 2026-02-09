"use client";
import { motion } from "framer-motion";
import { LuMapPin, LuCalendar, LuArrowRight } from "react-icons/lu";

export default function ExperienceCard({ exp }: { exp: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="m-0  p-8 bg-white/[0.07] border border-white/5 rounded-3xl hover:border-indigo-500/30 transition-all"
    >
      {/* Sidebar: Temporal & Type Metadata [cite: 2026-02-08] */}
      <div className="md:col-span-4 space-y-4 h-full flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-indigo-400 font-mono w-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <LuCalendar className="text-xs" />
            {exp.duration.start} — {exp.duration.end}
          </p>
          <h3 className="text-2xl font-black text-white leading-tight">{exp.role}</h3>
          <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-black italic">
            <span className="py-0 text-slate-900 bg-slate-500 ">{exp.organization}</span> // {exp.location}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[8px] font-black uppercase rounded-sm">
            {exp.type}
          </span>
          <span className={`px-2 py-0.5 border text-[8px] font-black uppercase rounded-sm ${
            exp.level === "Core" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"
          }`}>
            {exp.level}_Node
          </span>
        </div>

        {exp.has_details_page && (
          <a href={exp.links.details} className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white hover:text-indigo-400 transition-colors pt-4">
            DECODE_FULL_STORY <LuArrowRight />
          </a>
        )}
      </div>

    </motion.div>
  );
}