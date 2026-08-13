"use client";
import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import {
  LuCpu, LuArrowLeft, LuExternalLink, LuMapPin,
  LuCircleDot, LuLayers,
} from "react-icons/lu";
import Link from "next/link";
import OrbitMark from "../../../components/OrbitMark";

export default function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const [role, setRole] = useState<any>(null);
  const { id } = use(params);

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((r) => r.json())
      .then((json) => setRole(json.experience.find((e: any) => e.id === id)));
  }, [id]);

  if (!role) return (
    <div className="min-h-screen bg-ink flex items-center justify-center gap-3 text-white/40">
      <OrbitMark size="sm" tone="paper" />
      <span className="text-[13px]">Loading…</span>
    </div>
  );

  const isPresent = role.duration.end === "Present";

  return (
    <main className="relative min-h-screen bg-ink text-white/70 selection:bg-ion selection:text-white">
      <div className="fixed inset-0 -z-10 opacity-[0.5] bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-6 mb-16">
          <Link
            href="/portfolio#experiences"
            className="group flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-widest text-white/35 hover:text-white transition-colors duration-200"
          >
            <LuArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Experience
          </Link>
          <div className="h-px flex-grow bg-white/[0.06]" />
        </nav>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 pb-14 border-b border-white/[0.05]"
        >
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-ion/10 border border-ion/25 text-ion-soft shadow-[0_0_15px_rgba(74,84,241,0.1)]">
              {role.type}
            </span>
            {isPresent && (
              <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full bg-culture/12 border border-culture/25 text-culture-soft shadow-[0_0_15px_rgba(31,158,99,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-culture-soft animate-pulse" />
                Active
              </span>
            )}
          </div>

          <h1
            className="text-4xl sm:text-6xl font-medium tracking-tight leading-[0.98] py-2 -my-2 mb-10 text-balance text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/30"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {role.role}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            {[
              { label: "Organization", value: role.organization },
              { label: "Duration", value: `${role.duration.start} – ${role.duration.end}` },
              { label: "Location", value: role.location, icon: LuMapPin }
            ].map((stat, i) => (
              <div key={i} className="px-6 py-5 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-2xl flex-1 relative overflow-hidden group hover:border-white/[0.15] transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-ion/10 blur-[40px] rounded-full pointer-events-none group-hover:bg-ion/20 transition-colors duration-500" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 relative z-10">{stat.label}</p>
                <p className="font-medium text-white text-[17px] tracking-tight relative z-10 flex items-center gap-2">
                  {stat.icon && <stat.icon size={15} className="text-white/40" />}
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-8 md:p-10 bg-gradient-to-br from-ion/[0.08] to-transparent border border-ion/20 rounded-[1.75rem] relative overflow-hidden shadow-[0_0_40px_rgba(74,84,241,0.05)]"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-ion/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <p className="label-eyebrow text-ion-soft mb-5">Overview</p>
                <p
                  className="text-2xl md:text-3xl font-medium tracking-tight leading-[1.15] text-white/90 mb-8 text-balance"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {role.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {role.domain.map((d: string) => (
                    <span
                      key={d}
                      className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-full text-[10px] font-semibold uppercase tracking-widest text-white/50"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <LuLayers size={13} className="text-ion-soft" />
                <p className="label-eyebrow text-ion-soft">Key impact</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.key_impact.map((impact: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.25 + i * 0.06 }}
                    className="group flex items-start gap-3 p-6 bg-gradient-to-r from-ion/[0.03] to-transparent border-l-2 border-l-ion-soft/40 border-y border-r border-white/[0.05] rounded-r-2xl hover:border-l-ion-soft hover:bg-ion/[0.05] transition-all duration-300"
                  >
                    <LuCircleDot size={12} className="text-ion-soft/60 mt-1.5 shrink-0 group-hover:text-ion-soft transition-colors" />
                    <p className="text-[14px] text-white/70 leading-relaxed font-light">{impact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-12 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="p-7 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05] rounded-2xl relative overflow-hidden group hover:border-white/[0.1] transition-all"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ion-soft/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-inner shrink-0">
                    <LuCpu size={14} className="text-ion-soft" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-ion-soft">Tech stack</p>
                </div>
                <div className="flex flex-wrap gap-2.5 relative z-10">
                  {role.stack.map((s: string) => (
                    <div
                      key={s}
                      className="flex items-center px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-[12.5px] text-white/70 font-light">{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

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
                    className="group flex items-center justify-between w-full px-6 py-4 bg-ion hover:bg-ion-soft rounded-2xl transition-all duration-300"
                  >
                    <span className="text-[12px] font-semibold text-white">Visit organization</span>
                    <LuExternalLink
                      size={14}
                      className="text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </a>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
