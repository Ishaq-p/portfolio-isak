"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useDragScroll } from "../hooks/useDragScroll";

interface FilterProps {
  projects: any[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export default function FilterJumble({ projects, activeFilter, setActiveFilter }: FilterProps) {
  const domains = projects?.flatMap((p) => p.short_card.domain) || [];
  const uniqueDomains = ["All", ...Array.from(new Set(domains))];

  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Enable drag-to-scroll via React event handlers
  const dragScrollProps = useDragScroll();

  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftGradient(scrollLeft > 5);
    setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [projects]);

  return (
    <div className="relative w-full max-w-full flex justify-center">
      
      {/* Scroll indicator gradients (light theme) */}
      {showLeftGradient && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-paper to-transparent z-20 pointer-events-none" />
      )}
      {showRightGradient && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-paper to-transparent z-20 pointer-events-none" />
      )}

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        {...dragScrollProps}
        className="flex items-center gap-1.5 p-1.5 rounded-full border border-ink/[0.08] bg-white shadow-sm overflow-x-auto scrollbar-hide snap-x"
      >
        {uniqueDomains.map((domain) => {
          const isActive = activeFilter === domain || (domain === "All" && activeFilter === "ALL");
          const value = domain === "All" ? "ALL" : domain;
          return (
            <button
              key={domain}
              onClick={() => {
                setActiveFilter(value);
                const btn = document.getElementById(`filter-btn-${domain}`);
                btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }}
              id={`filter-btn-${domain}`}
              className={`relative px-5 py-2.5 rounded-full text-[11px] font-mono tracking-widest uppercase transition-colors z-10 shrink-0 snap-center group ${isActive ? "text-white" : "text-graphite hover:text-ink"}`}
            >
              {isActive ? (
                <motion.div
                  layoutId="activeProjectFilter"
                  className="absolute inset-0 bg-ink rounded-full -z-10 shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              ) : (
                <div className="absolute inset-0 bg-paper rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
              {domain}
            </button>
          );
        })}
      </div>
    </div>
  );
}
