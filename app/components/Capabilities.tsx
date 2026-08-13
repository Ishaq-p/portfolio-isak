"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LuServer, LuDna, LuDatabase, LuWorkflow } from "react-icons/lu";

const capabilities = [
  {
    title: "Backend Architecture",
    desc: "Distributed API gateways and high-concurrency production clusters.",
    tech: "Next.js · Nest.js · Python · Java",
    metric: { label: "Latency", value: "14ms" },
    icon: LuServer,
    accent: "ion",
  },
  {
    title: "Bio-Neural ML",
    desc: "Sequence-to-function mapping and protein classification pipelines.",
    tech: "PyTorch · ATGC · CNN · PLM · LLM",
    metric: { label: "Accuracy", value: "98%" },
    icon: LuDna,
    accent: "culture",
  },
  {
    title: "Hybrid Data Systems",
    desc: "Centralized RDBMS architecture replacing legacy distributed spreadsheets.",
    tech: "Postgres · Redis · ORM · DBMS · GraphQL",
    metric: { label: "Users", value: "1.8k+" },
    icon: LuDatabase,
    accent: "ion",
  },
  {
    title: "Automation Ops",
    desc: "Replacing manual workflows with autonomous decision-support systems.",
    tech: "Git · Docker · AWS · VPS · Bash",
    metric: { label: "Efficiency", value: "+60%" },
    icon: LuWorkflow,
    accent: "culture",
  },
];

export default function Capabilities() {
  return (
    <section className="h-full w-full flex flex-col justify-center pt-4 pb-4 md:pt-0 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full px-4 md:px-6">
        <div className="flex flex-col gap-2 md:gap-4 mb-8 md:mb-12">
          <p className="label-eyebrow text-ion text-[11px] md:text-xs uppercase tracking-widest">Core Competencies</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink text-balance leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              System capabilities.
            </h2>
            <p className="text-graphite text-xs md:text-md max-w-sm leading-relaxed mt-2 sm:mt-0">
              Four areas where I spend most of my working hours — from raw sequence data to production traffic.
            </p>
          </div>
        </div>
      </div>

      {/* Strict w-full on container, exactly 85% width on mobile child to show next card peeking */}
      <div className="w-full flex overflow-x-auto pb-8 px-4 md:px-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-6xl mx-auto">
        {capabilities.map((cap, i) => (
          <div key={cap.title} className="w-[88%] sm:w-[340px] md:w-auto shrink-0 snap-center">
            <TiltCard cap={cap} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TiltCard({ cap, index }: { cap: (typeof capabilities)[number]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable 3D tilt calculations on small viewports to save memory/prevent glitches
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = cap.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-[340px] md:h-[400px] w-full rounded-[1.5rem] md:rounded-[1.75rem] bg-white border border-ink/10 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(46,91,255,0.1)] hover:border-ion/30 transition-all duration-700 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 hidden md:block"
        style={{ background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(46, 91, 255, 0.04), transparent 40%)` }}
      />
      <div className="absolute inset-x-6 md:inset-x-8 top-[85px] md:top-[100px] border-t border-ink/5 z-0" />
      <div className="absolute inset-x-6 md:inset-x-8 bottom-[75px] md:bottom-[80px] border-t border-ink/5 z-0" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        <div className="space-y-4 md:space-y-6">
          <div className="flex justify-between items-start gap-2">
            <div className="shrink-0 flex items-center justify-center w-11 h-11 md:w-12 md:h-12 border border-ink/10 text-lg md:text-xl transition-colors duration-500 group-hover:border-ion/30 group-hover:text-ion" style={{ color: "var(--ink)", backgroundColor: "rgba(15,23,42,0.02)" }}>
              <Icon />
            </div>
            <div className="flex flex-col items-end text-right shrink-0">
              <span className="font-mono text-[9px] uppercase tracking-widest text-graphite-2 font-medium mb-1.5">{cap.metric.label}</span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="font-serif text-lg md:text-xl text-ink font-medium tracking-tight leading-none">{cap.metric.value}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-[1.35rem] md:text-[1.65rem] text-ink mb-2 md:mb-3 tracking-tight font-serif leading-tight break-words" style={{ fontFamily: "var(--font-serif)" }}>
              {cap.title}
            </h3>
            <p className="text-graphite text-[14px] md:text-[15px] leading-relaxed break-words whitespace-normal">{cap.desc}</p>
          </div>
        </div>

        <div className="pt-4 md:pt-5">
          <div className="flex flex-wrap gap-2 mt-2">
            {cap.tech.split("·").map((t) => {
              const cleaned = t.trim();
              if (!cleaned) return null;
              return (
                <span key={cleaned} className="px-2.5 py-1 bg-ink/[0.02] font-mono text-[9.5px] md:text-[10px] text-graphite uppercase tracking-widest border border-ink/10 group-hover:border-ion/20 transition-colors rounded-none whitespace-nowrap">
                  {cleaned}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}