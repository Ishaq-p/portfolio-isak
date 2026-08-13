"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";

const STATUS_LABEL: Record<string, string> = {
  Production: "Production",
  "Ongoing Research": "Research",
  Thesis: "Thesis",
  "Academic Project": "Academic",
};

export default function ProjectCard({ project }: any) {
  if (!project?.short_card) return null;
  const { short_card } = project;
  const statusLabel = STATUS_LABEL[short_card.status] ?? short_card.status;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 25 }}
      className="group relative h-full w-full flex flex-col bg-white border border-ink/[0.06] rounded-[24px] overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1.5"
    >
      <div className="relative z-10 flex flex-col h-full p-6 md:p-7 gap-5">
        
        {/* Header row */}
        <div className="flex flex-col gap-2 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <span className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ion">
              {statusLabel}
            </span>
            <Link
              href={`/portfolio/project/${project.id}`}
              className="w-7 h-7 rounded-full border border-ink/10 flex items-center justify-center bg-paper shadow-sm hover:bg-ink hover:text-white hover:border-ink transition-all duration-300 hover:shadow-md group/cta z-20"
              title="Explore Architecture"
            >
              <LuArrowUpRight
                size={13}
                className="text-graphite group-hover/cta:text-white group-hover/cta:translate-x-[1px] group-hover/cta:-translate-y-[1px] transition-all duration-300"
              />
            </Link>
          </div>
          <h3
            className="text-2xl md:text-3xl font-semibold text-ink tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {short_card.title}
          </h3>
          <p className="text-[12px] font-mono tracking-widest uppercase text-graphite">
            {short_card.role} · {short_card.year}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-[14.5px] text-graphite leading-relaxed shrink-0 max-w-[95%]">
          {short_card.tagline}
        </p>

        {/* Metrics — Clean Light Dashboard Widgets */}
        <div className="flex gap-8 py-2 shrink-0 mt-2">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-graphite/70">
              {short_card.key_metric?.label}
            </p>
            <p 
              className="text-2xl font-medium text-ink tracking-tight" 
              style={{ fontFamily: "var(--font-display)" }}
            >
              {short_card.key_metric?.value}
            </p>
          </div>
          <div className="w-[1px] h-full bg-ink/[0.06]" />
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-graphite/70">
              {short_card.secondary_metric?.label}
            </p>
            <p 
              className="text-2xl font-medium text-ion tracking-tight" 
              style={{ fontFamily: "var(--font-display)" }}
            >
              {short_card.secondary_metric?.value}
            </p>
          </div>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mt-auto shrink-0 z-10 pt-4">
          {short_card.stack?.slice(0, 4).map((tech: string, i: number) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-paper border border-ink/[0.05] font-mono text-[9px] uppercase tracking-widest text-graphite font-medium shadow-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}