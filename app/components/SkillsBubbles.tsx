"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillGroup {
  category: string;
  items: string[];
}

function getCategoryColor(category: string, index: number) {
  const cat = category.toUpperCase();
  if (cat.includes("LANGUAGE")) return "#3B82F6"; // Blue
  if (cat.includes("ML") || cat.includes("AI")) return "#10B981"; // Emerald
  if (cat.includes("BACKEND")) return "#8B5CF6"; // Purple
  if (cat.includes("FRONTEND")) return "#F59E0B"; // Amber
  if (cat.includes("TOOL") || cat.includes("INFRA")) return "#F43F5E"; // Rose
  
  const FALLBACKS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#F43F5E"];
  return FALLBACKS[index % FALLBACKS.length];
}

function SkillCard({ item, category, color, index }: { item: string; category: string; color: string, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return; // Disable expensive tracking on mobile
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${localX}px`);
    ref.current.style.setProperty("--mouse-y", `${localY}px`);
  };

  return (
    // Removed layout prop to eliminate massive layout thrashing on mobile CPU
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        opacity: { duration: 0.2 },
        scale: { duration: 0.2, type: "spring", stiffness: 400, damping: 30 }
      }}
      style={{ perspective: 1000 }}
      className="z-10 hover:z-30"
    >
      <motion.div
        ref={ref}
        style={{ 
          backgroundColor: `color-mix(in srgb, ${color} 8%, rgba(255,255,255,0.02))`,
          borderColor: `color-mix(in srgb, ${color} 15%, rgba(255,255,255,0.06))`
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={(e) => {
           e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${color} 8%, rgba(255,255,255,0.02))`;
        }}
        onMouseEnter={(e) => {
           if (window.innerWidth >= 768) {
             e.currentTarget.style.backgroundColor = `color-mix(in srgb, ${color} 15%, rgba(255,255,255,0.04))`;
           }
        }}
        // Removed backdrop-blur completely. It kills mobile GPUs and is useless since the background is solid black anyway.
        className="group relative flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-6 md:py-3 rounded-full border cursor-pointer transition-colors duration-300 md:duration-500 shadow-[0_0_0_0_transparent] hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.8)]"
      >
        {/* Ambient background glow & dynamic glare on hover (Desktop Only) */}
        <div 
          className="hidden md:block pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(120px circle at var(--mouse-x, 0) var(--mouse-y, 0), color-mix(in srgb, ${color} 25%, transparent), transparent 100%),
              radial-gradient(80px circle at var(--mouse-x, 0) 0%, rgba(255,255,255,0.08), transparent 100%)
            `
          }}
        />
        
        {/* Spotlight border trace (Desktop Only) */}
        <div 
          className="hidden md:block pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 transform-gpu"
          style={{
            background: `radial-gradient(80px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${color}, transparent 100%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px"
          }}
        />

        {/* 3D Parallax Inner Content */}
        <div 
          className="relative z-20 flex items-center gap-2 md:gap-3 transition-transform duration-300 transform-gpu md:group-hover:-translate-y-[1px]"
          style={{ transform: "translateZ(30px)" }}
        >
          <div 
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 scale-100 md:group-hover:scale-125"
            style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
          />
          <span className="font-mono text-[10px] md:text-[13px] uppercase tracking-[0.08em] text-white/70 md:group-hover:text-white transition-colors duration-300">
            {item}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsBubbles({ skills, title }: { skills: SkillGroup[]; title?: string }) {
  const [activeCategory, setActiveCategory] = useState<string | null>("ALL");

  const categories = useMemo(() => skills.map((s) => s.category), [skills]);

  const filteredSkills = useMemo(() => {
    if (!activeCategory || activeCategory === "ALL") {
      return skills.flatMap((s) => 
        s.items.map((item) => ({ item, category: s.category }))
      );
    }
    const group = skills.find((s) => s.category === activeCategory);
    return group ? group.items.map(item => ({ item, category: group.category })) : [];
  }, [skills, activeCategory]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-6 md:gap-8 mb-8 md:mb-12 w-full max-w-4xl">
        {title && (
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white" style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </h2>
        )}

        <div className="flex md:flex-wrap items-center gap-1.5 md:gap-2 p-1.5 rounded-full border border-white/[0.06] bg-white/[0.015] backdrop-blur-xl shadow-lg relative z-20 w-full max-w-[95vw] md:max-w-none overflow-x-auto md:overflow-visible scrollbar-hide snap-x md:justify-center">
          <button
            onClick={() => setActiveCategory("ALL")}
            className="relative px-4 py-2 md:px-5 md:py-2.5 text-[10px] md:text-[11px] font-mono tracking-widest uppercase transition-colors z-10 rounded-full hover:text-white group shrink-0 snap-center"
            style={{ color: activeCategory === "ALL" ? "#fff" : "rgba(255,255,255,0.4)" }}
          >
            {activeCategory === "ALL" ? (
              <motion.div
                layoutId="activeTabBubbles"
                className="absolute inset-0 bg-white/10 rounded-full -z-10 shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            ) : (
              <div className="absolute inset-0 bg-white/[0.03] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            ALL
          </button>
          
          {skills.map((skill, i) => {
            const isActive = activeCategory === skill.category;
            const color = getCategoryColor(skill.category, i);
            return (
              <button
                key={skill.category}
                onClick={() => setActiveCategory(skill.category)}
                className="relative px-4 py-2 md:px-5 md:py-2.5 text-[10px] md:text-[11px] font-mono tracking-widest uppercase transition-colors z-10 flex items-center gap-2 md:gap-2.5 rounded-full group hover:text-white shrink-0 snap-center"
                style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                {isActive ? (
                  <motion.div
                    layoutId="activeTabBubbles"
                    className="absolute inset-0 rounded-full -z-10 shadow-sm"
                    style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, rgba(255,255,255,0.05))` }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/[0.03] rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                <div 
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300" 
                  style={{ 
                    backgroundColor: color,
                    opacity: isActive ? 1 : 0.3,
                    boxShadow: isActive ? `0 0 8px ${color}` : 'none'
                  }} 
                />
                {skill.category}
              </button>
            );
          })}
        </div>
      </div>

      <div 
        className="flex flex-wrap justify-center items-center gap-2 md:gap-4 w-full max-w-4xl relative z-10 min-h-[300px] md:min-h-[400px] content-start px-2"
      >
        {/* Switched to mode='wait' to prevent reflow chaos from absolute positioning exiting elements */}
        <AnimatePresence mode="wait">
          {filteredSkills.map(({ item, category }, idx) => {
            const ci = categories.indexOf(category);
            const color = getCategoryColor(category, ci);
            return (
              <SkillCard 
                key={`${category}-${item}`} 
                item={item} 
                category={category} 
                color={color}
                index={idx}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}