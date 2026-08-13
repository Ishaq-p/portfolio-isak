"use client";
import { motion } from "framer-motion";
import { LuMapPin, LuArrowUpRight } from "react-icons/lu";
import Link from "next/link";

export default function ExperienceCard({ exp }: { exp: any }) {
  const isPresent = exp.duration.end === "Present";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (exp.index || 0) * 0.06, type: "spring", stiffness: 200, damping: 25 }}
      className="group relative h-full w-full flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-[24px] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 hover:bg-white/[0.05]"
    >
      <div className="relative z-10 flex flex-col h-full p-6 md:p-7 gap-5">
        
        {/* Header row */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ion-soft">
              {isPresent ? "Active" : "Complete"}
            </span>
            
            {exp.has_details_page && (
              <Link
                href={exp.links?.details || "#"}
                className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center bg-white/5 shadow-sm hover:bg-white hover:text-ink hover:border-white transition-all duration-300 hover:shadow-md group/cta z-20"
                title="View Details"
              >
                <LuArrowUpRight
                  size={13}
                  className="text-white/60 group-hover/cta:text-ink group-hover/cta:translate-x-[1px] group-hover/cta:-translate-y-[1px] transition-all duration-300"
                />
              </Link>
            )}
          </div>
          
          <h3
            className="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight truncate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {exp.role}
          </h3>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1">
            <span className="text-[12px] font-mono tracking-widest uppercase text-white/50 truncate">
              {exp.organization}
            </span>
            <span className="text-white/15 text-xs hidden sm:inline">·</span>
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/40 shrink-0">
              <LuMapPin size={10} />
              {exp.location}
            </span>
            <span className="text-white/15 text-xs hidden sm:inline">·</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 shrink-0">
               {exp.duration.start} – {exp.duration.end}
            </span>
          </div>
        </div>

        {/* Tagline / Summary */}
        <p className="text-[14.5px] text-white/70 leading-relaxed line-clamp-2 shrink-0 max-w-[95%]">
          {exp.summary}
        </p>

        {/* Key Impact (Metrics/Bullets) */}
        <ul className="space-y-2.5 shrink-0 min-h-[52px] mt-2">
          {exp.key_impact?.slice(0, 2).map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-ion-soft mt-[8px] shrink-0" />
              <span className="text-[13px] text-white/60 leading-relaxed line-clamp-2">{point}</span>
            </li>
          ))}
        </ul>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mt-auto shrink-0 z-10 pt-4">
          {exp.stack?.slice(0, 4).map((tech: string, i: number) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] uppercase tracking-widest text-white/60 font-medium shadow-sm">
              {tech}
            </span>
          ))}
        </div>
        
      </div>
    </motion.div>
  );
}