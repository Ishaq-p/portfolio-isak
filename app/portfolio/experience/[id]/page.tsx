"use client";
import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import {
  LuBinary, LuTerminal, LuCpu, LuArrowLeft,
  LuExternalLink, LuMapPin, LuCalendar, LuCircleDot,
  LuBraces, LuLayers
} from "react-icons/lu";
import Link from "next/link";

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const [role, setRole] = useState<any>(null);
  const { id } = use(params);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((r) => r.json())
      .then((json) => {
        const match = json.experience.find((e: any) => e.id === id);
        setRole(match);
      });
  }, [id]);

  if (!role) return (
    <div className="min-h-screen bg-[#020406] flex items-center justify-center font-mono text-[10px] text-white/20 uppercase tracking-widest">
      Loading archive...
    </div>
  );

  const isPresent = role.duration.end === "Present";

  return (
    <main className="relative min-h-screen bg-[#020406] text-slate-300 overflow-hidden selection:bg-indigo-500/40">

      {/* ── Background ───────────────────────────────────────────────── */}
      <div className="fixed inset-0 -z-10 opacity-[0.15] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5" />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* ── Nav ──────────────────────────────────────────────────────── */}
        <nav className="flex items-center gap-6 mb-16">
          <Link
            href="/portfolio#experiences"
            className="group flex items-center gap-2.5 text-[9px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white transition-colors duration-200"
          >
            <LuArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Work History
          </Link>
          <div className="h-px flex-grow bg-white/[0.05]" />
          <span className="font-mono text-[9px] text-indigo-500/50 uppercase tracking-widest hidden sm:block">
            {role.id}
          </span>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 pb-16 border-b border-white/[0.06]"
        >
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              {role.type}
            </span>
            <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/30">
              {role.level}
            </span>
            {isPresent && (
              <span className="flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            )}
          </div>

          {/* Role title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-10">
            {role.role}
          </h1>

          {/* Identity strip */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <div className="space-y-1">
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Organization</p>
              <p className="text-xl font-bold text-indigo-400">{role.organization}</p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/[0.08]" />
            <div className="space-y-1">
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Duration</p>
              <p className="text-xl font-bold text-white/70 font-mono">
                {role.duration.start} — {role.duration.end}
              </p>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/[0.08]" />
            <div className="space-y-1">
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.4em] text-white/20">Location</p>
              <p className="text-xl font-bold text-white/70 flex items-center gap-2">
                <LuMapPin size={14} className="text-white/30" />
                {role.location}
              </p>
            </div>
          </div>
        </motion.header>

        {/* ── Content grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT: Main dossier ──────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">

            {/* Summary card */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 md:p-10 text-slate-900 shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-5">
                <LuTerminal size={12} className="text-indigo-600" />
                <h2 className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-indigo-600">
                  Overview
                </h2>
              </div>
              <p className="text-2xl md:text-3xl font-black tracking-tight leading-[1.15] text-slate-900 mb-8">
                {role.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {role.domain.map((d: string) => (
                  <span
                    key={d}
                    className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Key impact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <LuLayers size={12} className="text-indigo-500" />
                <h2 className="font-mono text-[9px] font-black uppercase tracking-[0.5em] text-indigo-500">
                  Key Impact
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {role.key_impact.map((impact: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.07 }}
                    className="group relative p-6 bg-[#0a0f14] border border-white/[0.06] rounded-2xl hover:border-indigo-500/25 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
                  >
                    {/* ghosted number */}
                    <span className="absolute right-4 top-3 font-mono text-[48px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-start gap-3 relative z-10">
                      <LuCircleDot size={10} className="text-indigo-500/60 mt-1 shrink-0" />
                      <p className="text-[13px] text-white/60 leading-relaxed font-medium group-hover:text-white/80 transition-colors duration-300">
                        {impact}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out" />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* ── RIGHT: Sidebar ──────────────────────────────────────────── */}
          <aside className="lg:col-span-4">
            <div className="sticky top-12 space-y-4">

              {/* Stack rack */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-7 bg-[#0a0f14] border border-white/[0.06] rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-6">
                  <LuCpu size={11} className="text-indigo-400" />
                  <h3 className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400">
                    Tech Stack
                  </h3>
                </div>
                <div className="space-y-2">
                  {role.stack.map((s: string) => (
                    <div
                      key={s}
                      className="group flex items-center justify-between px-4 py-3 bg-white/[0.02] hover:bg-indigo-500/10 border border-white/[0.05] hover:border-indigo-500/20 rounded-xl transition-all duration-200"
                    >
                      <span className="font-mono text-[11px] text-white/40 group-hover:text-white/80 transition-colors duration-200">
                        <span className="text-indigo-500/40 mr-2">#</span>
                        {s}
                      </span>
                      <LuBraces size={10} className="text-white/10 group-hover:text-indigo-400 transition-colors duration-200" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Org link */}
              {role.links?.organization && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <a
                    href={role.links.organization}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between w-full px-6 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-600/20"
                  >
                    <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-white">
                      Visit Organization
                    </span>
                    <LuExternalLink
                      size={13}
                      className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </a>
                </motion.div>
              )}

              {/* Meta footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="px-4 py-3 border border-white/[0.04] rounded-xl"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/20">Entry ID</span>
                    <span className="font-mono text-[8px] text-white/20">{role.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/20">Stack depth</span>
                    <span className="font-mono text-[8px] text-white/20">{role.stack.length} tools</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/20">Impact nodes</span>
                    <span className="font-mono text-[8px] text-white/20">{role.key_impact.length}</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}