"use client";
import { motion } from "framer-motion";
import { LuMapPin, LuArrowUpRight, LuCircleDot } from "react-icons/lu";
import Link from "next/link";

export default function ExperienceCard({ exp }: { exp: any }) {
  const isPresent = exp.duration.end === "Present";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: exp.index * 0.07 }}
      className="group relative flex flex-col bg-[#0a0f14] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.2)]"
    >
      {/* Top accent bar — animates in on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col h-full p-6 gap-5">

        {/* ── Row 1: Index + Live badge + Date ───────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] font-black text-white/10 tracking-widest">
              {String(exp.index).padStart(2, "0")}
            </span>
            {isPresent && (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[8px] font-black text-emerald-400 uppercase tracking-widest">
                  Active
                </span>
              </span>
            )}
          </div>
          <p className="font-mono text-[9px] text-white/30 tracking-widest">
            {exp.duration.start} — {exp.duration.end}
          </p>
        </div>

        {/* ── Row 2: Role + Org ────────────────────────────────────────── */}
        <div className="space-y-2">
          <h3 className="text-xl font-black text-white tracking-tight leading-none">
            {exp.role}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[13px] font-bold text-indigo-400">
              {exp.organization}
            </span>
            <span className="text-white/10 text-xs hidden sm:inline">·</span>
            <span className="flex items-center gap-1 text-[11px] text-white/30 font-mono">
              <LuMapPin size={10} />
              {exp.location}
            </span>
          </div>
        </div>

        {/* ── Row 3: Summary ──────────────────────────────────────────── */}
        <p className="text-[12px] text-white/40 leading-relaxed font-medium line-clamp-2">
          {exp.summary}
        </p>

        {/* ── Row 4: Key Impact ───────────────────────────────────────── */}
        <ul className="space-y-2">
          {exp.key_impact.slice(0, 2).map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-2.5">
              <LuCircleDot size={10} className="text-indigo-500/60 mt-[3px] shrink-0" />
              <span className="text-[11px] text-white/50 leading-snug font-medium">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* ── Row 5: Stack pills ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5">
          {exp.stack.map((tech: string) => (
            <span
              key={tech}
              className="font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.04] text-white/40 border border-white/[0.06] group-hover:border-indigo-500/20 group-hover:text-white/60 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── Row 6: Footer meta + CTA ───────────────────────────────── */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] mt-auto">
          <div className="flex gap-2">
            <span className="text-[8px] font-black font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-indigo-500/20 text-indigo-400/70">
              {exp.type}
            </span>
            <span className={`text-[8px] font-black font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
              exp.level === "Core"
                ? "border-violet-500/20 text-violet-400/70"
                : "border-white/10 text-white/20"
            }`}>
              {exp.level}
            </span>
          </div>

          {exp.has_details_page ? (
            <Link
              href={exp.links.details}
              className="flex items-center gap-1.5 text-[9px] font-black font-mono uppercase tracking-widest text-white/30 hover:text-indigo-400 transition-colors duration-200 group/link"
            >
              View Case
              <LuArrowUpRight
                size={11}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
          ) : (
            <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
              No details page
            </span>
          )}
        </div>

      </div>
    </motion.div>
  );
}