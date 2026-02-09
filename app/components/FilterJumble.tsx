"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuFilter, LuChevronDown } from "react-icons/lu";

interface FilterProps {
  projects: any[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterJumble({ projects, activeFilter, setActiveFilter }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false); // Collapsed by default [cite: 2025-11-29]

  const domains = projects?.flatMap(p => p.short_card.domain) || [];
  const uniqueDomains = ["ALL", ...Array.from(new Set(domains))];

  return (
    <div className="flex flex-col items-start lg:items-end gap-4 ">
      {/* Toggle Switch: The [SYSTEM_PROTOCOL] Gate [cite: 2025-11-28] */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg group hover:border-indigo-400 transition-all"
      >
        <LuFilter className={`text-xs ${isOpen ? 'text-indigo-600' : 'text-slate-400'}`} />
        <span className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-600">
          {isOpen ? "CLOSE_FILTERS" : "OPEN_SYSTEM_FILTERS"}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <LuChevronDown className="text-slate-400" />
        </motion.div>
      </button>

      {/* Retractable Jumble [cite: 2026-02-08] */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap justify-start lg:justify-end gap-2 max-w-7xl py-2">
              {uniqueDomains.map((domain) => {
                const isActive = activeFilter === domain;
                return (
                  <button
                    key={domain}
                    onClick={() => setActiveFilter(domain)}
                    className={`
                      px-4 py-2 rounded-full border text-[10px] font-mono font-black uppercase tracking-widest transition-all
                      ${isActive 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/10" 
                        : "bg-white border-slate-100 text-slate-400 hover:border-indigo-300"}
                    `}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}