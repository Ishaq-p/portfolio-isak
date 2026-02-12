"use client";
import { motion } from "framer-motion";
import { LuMapPin, LuCalendar, LuArrowRight } from "react-icons/lu";
import Link from "next/link";

export default function ExperienceCard({ exp }: { exp: any }) {
  return (
    <motion.div 
      className="relative p-5 bg-[#0a0f14] border-l-2 border-l-indigo-500 border-y border-r border-white/5 rounded-r-xl transition-all hover:bg-white/[0.02]"
    >
      <div className="flex flex-col h-full justify-between gap-4">
        {/* Header: Roles & Dates */}
        <div>
          <div className="flex justify-between items-start mb-1">
            <p className="text-indigo-500 font-mono text-[8px] font-black uppercase tracking-widest">
              {exp.duration.start} // {exp.duration.end}
            </p>
            <span className="text-xs font-mono text-white/10 font-black">0{exp.index}</span>
          </div>
          <h3 className="text-lg font-black text-white leading-none mb-2 tracking-tight">
            {exp.role}
          </h3>
          <div className="inline-block px-2 py-0.5 bg-white text-black text-[9px] font-black uppercase tracking-tighter skew-x-[-10deg]">
            {exp.organization}
          </div>
        </div>

        {/* Technical Metadata Row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex gap-2">
             <span className="text-[7px] text-indigo-400 font-mono border border-indigo-500/20 px-1 uppercase">
               {exp.type}
             </span>
             <span className="text-[7px] text-emerald-400 font-mono border border-emerald-500/20 px-1 uppercase">
               {exp.level}
             </span>
          </div>

          {exp.has_details_page && (
            <Link href={exp.links.details} className="text-[8px] font-black text-white hover:text-indigo-400 uppercase tracking-widest flex items-center gap-1">
              DECODE <LuArrowRight className="text-[10px]" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}