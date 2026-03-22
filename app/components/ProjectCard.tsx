"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight, LuCircleDot } from "react-icons/lu";

export default function ProjectCard({ project }: any) {
  if (!project?.short_card) return null;
  const { short_card } = project;

  const statusColor =
    short_card.status === "Production"
      ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
      : short_card.status === "Ongoing Research"
      ? "text-amber-400 border-amber-500/20 bg-amber-500/5"
      : "text-indigo-400 border-indigo-500/20 bg-indigo-500/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full flex flex-col bg-[#05080a] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(99,102,241,0.25)]"
    >
      {/* Top gradient accent — slides in on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-500 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Ambient glow */}
      <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-indigo-600/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-600/10 transition-all duration-700" />

      <div className="relative z-10 flex flex-col h-full p-6 gap-5">

        {/* ── Row 1: Title + Status ────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-black text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors duration-300">
            {short_card.title}
          </h3>
          <span className={`shrink-0 font-mono text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded border ${statusColor}`}>
            {short_card.status}
          </span>
        </div>

        {/* ── Row 2: Role + Year ───────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {short_card.role}
          </span>
          <span className="h-px w-3 bg-white/10" />
          <span className="font-mono text-[10px] text-white/20 tracking-widest">{short_card.year}</span>
        </div>

        {/* ── Row 3: Tagline ───────────────────────────────────────────── */}
        <p className="text-[13px] text-white/50 leading-relaxed font-medium">
          {short_card.tagline}
        </p>

        {/* ── Row 4: Metrics ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3">
          {/* Primary metric */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-indigo-500/15 transition-colors duration-300">
            <p className="font-mono text-[8px] font-black uppercase tracking-[0.25em] text-white/20 mb-2">
              {short_card.secondary_metric?.label ?? "Cost Eff."}
            </p>
            <p className="text-base font-black text-indigo-400 tracking-tight leading-none">
              {short_card.secondary_metric?.value ?? "—"}
            </p>
          </div>

          {/* Secondary metric */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:border-indigo-500/15 transition-colors duration-300">
            <p className="font-mono text-[8px] font-black uppercase tracking-[0.25em] text-white/20 mb-2">
              {short_card.key_metric?.label ?? "Scale"}
            </p>
            <p className="text-base font-black text-white tracking-tight leading-none">
              {short_card.key_metric?.value}{" "}
              <span className="text-[10px] text-white/30 font-mono">
                {short_card.key_metric?.label?.split(" ")[0]}
              </span>
            </p>
          </div>
        </div>

        {/* ── Row 5: Stack pills ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5">
          {short_card.stack?.slice(0, 4).map((tech: string) => (
            <span
              key={tech}
              className="font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.03] text-white/30 border border-white/[0.06] group-hover:text-white/50 group-hover:border-indigo-500/20 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
          {short_card.stack?.length > 4 && (
            <span className="font-mono text-[9px] text-white/20 px-1 self-center">
              +{short_card.stack.length - 4}
            </span>
          )}
        </div>

        {/* ── Row 6: Domain tags ──────────────────────────────────────── */}
        <div className="flex flex-wrap gap-1.5">
          {short_card.domain?.map((d: string) => (
            <span
              key={d}
              className="font-mono text-[8px] uppercase tracking-widest text-white/20 px-2 py-0.5 rounded-full border border-white/[0.05]"
            >
              {d}
            </span>
          ))}
        </div>

        {/* ── Row 7: CTA ──────────────────────────────────────────────── */}
        <div className="mt-auto pt-5 border-t border-white/[0.05]">
          <Link
            href={`/portfolio/project/${project.id}`}
            className="flex items-center justify-between w-full px-5 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300 group/cta"
          >
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.25em] text-white/50 group-hover/cta:text-white transition-colors duration-200">
              Decode Architecture
            </span>
            <LuArrowUpRight
              size={14}
              className="text-white/30 group-hover/cta:text-white group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-all duration-200"
            />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}