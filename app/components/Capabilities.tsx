"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LuServer, LuDna, LuDatabase, LuWorkflow } from "react-icons/lu";

export default function Capabilities() {
  const capabilities = [
    { 
      title: "Backend Architecture", 
      desc: "Distributed API gateways and high-concurrency production clusters.", 
      tech: "Next.js // Go // Python", 
      metrics: "LATENCY: 14ms", 
      icon: <LuServer />, 
      color: "#6366f1" 
    },
    { 
      title: "Bio-Neural ML", 
      desc: "Sequence-to-function mapping and protein classification pipelines.", 
      tech: "PyTorch // ATGC // CNN",
      metrics: "ACCURACY: 98%",
      icon: <LuDna />, 
      color: "#10b981" 
    },
    { 
      title: "Hybrid Data Systems", 
      desc: "Centralized RDBMS architecture replacing legacy distributed spreadsheets.", 
      tech: "Postgres // SQL // Redis", 
      metrics: "USERS: 1,800+", 
      icon: <LuDatabase />, 
      color: "#d946ef" 
    },
    { 
      title: "Automation Ops", 
      desc: "Replacing manual workflows with autonomous decision-support systems.", 
      tech: "Git // Docker // AWS", 
      metrics: "EFFICIENCY: +60%", 
      icon: <LuWorkflow />, 
      color: "#6366f1" 
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row items-center space-x-3 mb-4 gap-2">
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter">System Capabilities</h2>
            <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-sm font-mono text-[10px] font-black uppercase tracking-widest">
               Core Competencies
             </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((cap, i) => (
            <TiltCard key={i} cap={cap} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ cap }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-[400px] w-full rounded-[2.5rem] bg-slate-900"
    >
      {/* Animated Border Trace */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 overflow-hidden">
         <motion.div 
           className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ background: `radial-gradient(circle at center, ${cap.color}22 0%, transparent 70%)` }}
         />
      </div>

      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 grid place-content-between rounded-[2rem] bg-white p-8 shadow-lg"
      >
        <div>
          <div className="flex justify-between items-start mb-8">
            <div style={{ color: cap.color }} className="text-3xl">
              {cap.icon}
            </div>
            <span className="text-[9px] font-mono font-black text-slate-400 tracking-widest uppercase">
              {cap.metrics}
            </span>
          </div>
          
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
            {cap.title}
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            {cap.desc}
          </p>
        </div>

        <div className="pt-6 border-t border-slate-50">
          <p className="text-[10px] font-mono font-bold text-slate-400 tracking-tighter uppercase">
            {cap.tech}
          </p>
        </div>
      </div>
    </motion.div>
  );
}