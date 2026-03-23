"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";

export default function ProjectCard({ project }: any) {
  if (!project?.short_card) return null;
  const { short_card } = project;

  const statusConfig: Record<string, { dot: string; text: string; bg: string }> = {
    Production:        { dot: "bg-emerald-400", text: "text-emerald-300", bg: "bg-emerald-500/10 border-emerald-500/20" },
    "Ongoing Research":{ dot: "bg-amber-400",   text: "text-amber-300",   bg: "bg-amber-500/10 border-amber-500/20" },
    Thesis:            { dot: "bg-indigo-400",   text: "text-indigo-300",  bg: "bg-indigo-500/10 border-indigo-500/20" },
    "Academic Project":{ dot: "bg-violet-400",  text: "text-violet-300",  bg: "bg-violet-500/10 border-violet-500/20" },
  };
  const status = statusConfig[short_card.status] ?? statusConfig["Thesis"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative h-full w-full flex flex-col bg-[#07090d] border border-white/[0.07] rounded-2xl overflow-hidden
                 hover:border-indigo-500/40 transition-all duration-500
                 hover:shadow-[0_8px_60px_-12px_rgba(99,102,241,0.3)]"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Subtle ambient glow */}
      <div className="absolute -right-20 -bottom-20 w-56 h-56 bg-indigo-600/[0.06] blur-[90px] rounded-full pointer-events-none group-hover:bg-indigo-600/[0.12] transition-all duration-700" />

      <div className="relative z-10 flex flex-col h-full p-7 gap-6">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white tracking-tight leading-tight group-hover:text-indigo-200 transition-colors duration-300">
              {short_card.title}
            </h3>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {short_card.role}  ·  {short_card.year}
            </p>
          </div>
          <span className={`shrink-0 flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full border ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {short_card.status}
          </span>
        </div>

        {/* ── Tagline ─────────────────────────────────────────────────── */}
        <p className="text-sm text-white/55 leading-relaxed">
          {short_card.tagline}
        </p>

        {/* ── Metrics ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-indigo-500/20 transition-colors duration-300 space-y-1.5">
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/25">
              {short_card.key_metric?.label}
            </p>
            <p className={`font-black text-white leading-none tracking-tight ${
              short_card.key_metric?.value?.length > 6 ? "text-lg" : "text-2xl"
            }`}>
              {short_card.key_metric?.value}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-indigo-500/20 transition-colors duration-300 space-y-1.5">
            <p className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/25">
              {short_card.secondary_metric?.label}
            </p>
            <p className="text-2xl font-black text-indigo-400 leading-none tracking-tight">
              {short_card.secondary_metric?.value}
            </p>
          </div>
        </div>

        {/* ── Stack ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {short_card.stack?.slice(0, 4).map((tech: string) => (
            <span
              key={tech}
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md
                         bg-white/[0.04] text-white/40 border border-white/[0.07]
                         group-hover:text-white/60 group-hover:border-indigo-500/25 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {short_card.stack?.length > 4 && (
            <span className="font-mono text-[10px] text-white/20 self-center pl-1">
              +{short_card.stack.length - 4} more
            </span>
          )}
        </div>

        {/* ── Domain tags ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5">
          {short_card.domain?.map((d: string) => (
            <span
              key={d}
              className="font-mono text-[9px] uppercase tracking-widest text-white/20 px-2.5 py-1 rounded-full border border-white/[0.06]"
            >
              {d}
            </span>
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <div className="mt-auto pt-5 border-t border-white/[0.06]">
          <Link
            href={`/portfolio/project/${project.id}`}
            className="flex items-center justify-between w-full px-5 py-4 rounded-xl
                       bg-white/[0.04] border border-white/[0.08]
                       hover:bg-indigo-600 hover:border-indigo-500
                       transition-all duration-300 group/cta"
          >
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.2em] text-white/50 group-hover/cta:text-white transition-colors duration-200">
              Decode Architecture
            </span>
            <LuArrowUpRight
              size={15}
              className="text-white/30 group-hover/cta:text-white group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-all duration-200"
            />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}