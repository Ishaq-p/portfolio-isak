"use client";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function Footer() {
const stats = [
  { 
    label: "Projects", 
    value: "8+", 
    sub: "ML // Systems" 
  },
  { 
    label: "Research", 
    value: "Active", 
    sub: "JRavi_Lab // Bio" 
  },
  { 
    label: "Hobby", 
    value: "FLIGHT SIM", 
    sub: "Flight Sim // Virtual" 
  },

];

{/* Compact Footer Metrics */}
<div className="lg:col-span-3 grid grid-cols-3 gap-3">
  {stats.map((stat, i) => (
    <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-indigo-500/50 transition-all">
      <span className="block text-[7px] font-black uppercase tracking-widest text-slate-600 mb-1">{stat.label}</span>
      <div className="text-xl font-black text-white tracking-tighter leading-none">{stat.value}</div>
      <div className="text-[6px] font-mono text-indigo-400 uppercase mt-1.5">{stat.sub}</div>
    </div>
  ))}
</div>


  // Path 1: Entry -> Top Branch (Neural) -> Exit
  const pathTop = "M 50,130 L 150,130 L 180,80 L 320,80 L 350,130 L 450,130";
  // Path 2: Entry -> Bottom Branch (SQL) -> Exit
  const pathBottom = "M 50,130 L 150,130 L 180,180 L 320,180 L 350,130 L 450,130";

  return (
    <footer className="bg-[#010204] pt-20 pb-10 text-slate-500 font-mono border-t border-indigo-900/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Identity Section */}
          <div className="lg:col-span-3 space-y-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white block">
              PAKTINYAR<span className="text-indigo-500 animate-pulse">_</span>
            </Link>
            <div className="space-y-4">
              <div className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600">Active Services</div>
              <ul className="space-y-2 text-[10px] font-bold text-slate-400">
                <li className="flex items-center"><span className="w-1 h-1 bg-indigo-500 mr-3"></span> API Architecture</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-emerald-500 mr-3"></span> Database Design</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-fuchsia-500 mr-3"></span> Bio-Neural Modeling</li>
              </ul>
            </div>
          </div>

          {/* RECTIFIED TRACE: Converging Architecture Visual */}
          <div className="lg:col-span-6 relative h-64 bg-white/[0.01] rounded-3xl border border-white/5 flex items-center justify-center">
            <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none opacity-40" viewBox="0 0 500 260">
              <defs>
                <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.5" fill="#1e293b" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotGrid)" />
              
              {/* Converging Paths */}
              <path d={pathTop} stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" fill="none" />
              <path d={pathBottom} stroke="rgba(99, 102, 241, 0.2)" strokeWidth="1" fill="none" />
              
              {/* Neural Branch Packet */}
              <motion.circle r="3" fill="#10b981" style={{ offsetPath: `path('${pathTop}')` }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* SQL Branch Packet */}
              <motion.circle r="3" fill="#d946ef" style={{ offsetPath: `path('${pathBottom}')` }}
                animate={{ offsetDistance: ["0%", "100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }}
              />
            </svg>

            {/* Logical Nodes Styled as Infrastructure */}
            <div className="flex items-center justify-between w-full px-8 z-10 relative">
              <Node label="GATEWAY" sub="API" color="indigo" />
              <div className="space-y-16">
                <Node label="BIO_SEQ" sub="NEURAL" color="emerald" />
                <Node label="PERSIST" sub="SQL" color="fuchsia" />
              </div>
              <Node label="EXIT" sub="200_OK" color="indigo" />
            </div>
          </div>

          {/* Project Metrics */}
            {/* Compact Footer Metrics */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-3">
            {stats.map((stat, i) => (
                <div key={i} className="p-3 bg-white/[0.02] border justify-items-center border-white/5 rounded-xl hover:border-indigo-500/50 transition-all">
                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">{stat.label}</span>
                <div className="text-xl font-black text-white tracking-tighter leading-none">{stat.value}</div>
                <div className="text-[7px] font-mono text-indigo-400 uppercase mt-1.5">{stat.sub}</div>
                </div>
            ))}
            </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-start items-center gap-6 text-[8px] font-black uppercase tracking-[0.5em] text-slate-700">
          <p className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping"></span>
            </span>
            Cluster: paktinyar-prod // VSCode Instance //
          </p>
          <div className="flex space-x-10 text-[9px]">
            <a href="#" className="hover:text-indigo-100 text-indigo-500 transition-colors">GitHub</a>
            <a href="#" className="hover:text-indigo-100 text-indigo-500 transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Node({ label, sub, color }: { label: string, sub: string, color: string }) {
  const colors: any = {
    indigo: "border-indigo-500/30 text-indigo-500",
    emerald: "border-emerald-500/30 text-emerald-500",
    fuchsia: "border-fuchsia-500/30 text-fuchsia-500",
  };
  return (
    <div className="text-center group">
      <div className={`w-11 h-11 bg-slate-950 border ${colors[color]} rounded-xl flex items-center justify-center mb-2 mx-auto shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform`}>
        <div className={`w-1 h-1 rounded-full bg-current animate-pulse`}></div>
      </div>
      <p className="text-[7px] font-black text-white tracking-widest">{label}</p>
      <p className="text-[6px] font-bold text-slate-600 tracking-tighter uppercase">{sub}</p>
    </div>
  );
}