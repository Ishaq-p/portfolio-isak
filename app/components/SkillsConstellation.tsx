"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillGroup {
  category: string;
  items: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Backend: "#4A54F1", // var(--ion)
  Frontend: "#7B82F7", // var(--ion-soft)
  ML: "#1F9E63", // var(--culture)
  Infra: "#48C98B", // var(--culture-soft)
  Tools: "#8A8F93", // var(--graphite-2)
};
const FALLBACK_COLORS = ["#4A54F1", "#7B82F7", "#1F9E63", "#48C98B", "#8A8F93"];

function colorFor(category: string, index: number) {
  return CATEGORY_COLORS[category] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

export default function SkillsConstellation({ skills, title }: { skills: SkillGroup[]; title?: string }) {
  const width = 900;
  const height = 650;
  const cx = width / 2;
  const cy = height / 2;
  const hubRadius = 140;

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Calculate coordinates for the systems graph
  const layout = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
      const hubX = cx + Math.cos(angle) * hubRadius;
      const hubY = cy + Math.sin(angle) * Math.max(hubRadius * 0.8, 100);

      const leaves = skill.items.map((item, j) => {
        const spread = 0.8; // radians of arc
        const leafAngle = angle - spread / 2 + (spread * j) / Math.max(1, skill.items.length - 1);
        const leafRadius = hubRadius + 140 + (j % 2 === 0 ? 0 : 30); // stagger radius
        const x = cx + Math.cos(leafAngle) * leafRadius;
        const y = cy + Math.sin(leafAngle) * Math.max(leafRadius * 0.8, 120);
        return { item, x, y };
      });

      return { skill, hubX, hubY, leaves, angle, color: colorFor(skill.category, i) };
    });
  }, [skills]);

  return (
    <div className="w-full flex flex-col items-center">
      {title && (
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-8" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h2>
      )}

      <div className="relative w-full max-w-[1000px] overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.01] flex justify-center" style={{ minHeight: height }}>
        
        {/* Connection Lines Layer (SVG) */}
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Subtle background rings */}
          <circle cx={cx} cy={cy} r={hubRadius} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth={1} />
          <circle cx={cx} cy={cy} r={hubRadius + 140} fill="none" stroke="rgba(255,255,255,0.01)" strokeWidth={1} strokeDasharray="4 4" />

          {layout.map(({ skill, hubX, hubY, leaves, color }) => {
            const isCategoryHovered = hoveredNode === skill.category;
            
            return (
              <g key={skill.category}>
                {/* Spoke: Core to Hub */}
                <motion.line 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  x1={cx} y1={cy} x2={hubX} y2={hubY} 
                  stroke={isCategoryHovered ? color : "rgba(255,255,255,0.08)"} 
                  strokeWidth={isCategoryHovered ? 2 : 1} 
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />

                {/* Leaves: Hub to Skills */}
                {leaves.map((leaf, j) => {
                  const isLeafHovered = hoveredNode === leaf.item;
                  const isHighlighted = isCategoryHovered || isLeafHovered;

                  return (
                    <motion.line
                      key={leaf.item}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 + j * 0.1, ease: "easeOut" }}
                      x1={hubX}
                      y1={hubY}
                      x2={leaf.x}
                      y2={leaf.y}
                      stroke={isHighlighted ? color : "rgba(255,255,255,0.05)"}
                      strokeWidth={isHighlighted ? 1.5 : 1}
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer (HTML) */}
        <div className="absolute inset-0 pointer-events-none" style={{ width, height, left: "50%", transform: "translateX(-50%)" }}>
          
          {/* Core Node */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-black/40 backdrop-blur-md z-10"
            style={{ left: cx - 32, top: cy - 32, boxShadow: "0 0 40px rgba(74, 84, 241, 0.2)" }}
          >
            <div className="w-4 h-4 rounded-full bg-ion animate-pulse" style={{ boxShadow: "0 0 20px var(--ion)" }} />
          </motion.div>

          {/* Category Hubs */}
          {layout.map(({ skill, hubX, hubY, color }, i) => (
            <motion.div
              key={skill.category}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", damping: 20 }}
              onMouseEnter={() => setHoveredNode(skill.category)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute pointer-events-auto cursor-default flex items-center justify-center rounded-full border bg-black/50 backdrop-blur-md z-20 group transition-all duration-300"
              style={{
                left: hubX - 50, 
                top: hubY - 20,
                width: 100,
                height: 40,
                borderColor: hoveredNode === skill.category ? color : "rgba(255,255,255,0.1)",
                boxShadow: hoveredNode === skill.category ? `0 0 20px ${color}40` : "none"
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                {skill.category}
              </span>
            </motion.div>
          ))}

          {/* Skill Leaves */}
          {layout.map(({ skill, leaves, color }) => (
            leaves.map((leaf, j) => {
              const isHighlighted = hoveredNode === skill.category || hoveredNode === leaf.item;
              
              return (
                <motion.div
                  key={leaf.item}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + j * 0.05, type: "spring", damping: 25 }}
                  onMouseEnter={() => setHoveredNode(leaf.item)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className="absolute pointer-events-auto cursor-default flex items-center gap-2 px-3 py-1.5 rounded-full border bg-black/30 backdrop-blur-md z-30 transition-all duration-300 hover:scale-110"
                  style={{
                    left: leaf.x, // Centers handled via translate
                    top: leaf.y,
                    transform: "translate(-50%, -50%)",
                    borderColor: isHighlighted ? color : "rgba(255,255,255,0.05)",
                    boxShadow: isHighlighted ? `0 0 15px ${color}30` : "none"
                  }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300" 
                    style={{ backgroundColor: color, opacity: isHighlighted ? 1 : 0.3, boxShadow: isHighlighted ? `0 0 8px ${color}` : "none" }} 
                  />
                  <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-white/60 transition-colors" style={{ color: isHighlighted ? "#fff" : "rgba(255,255,255,0.6)" }}>
                    {leaf.item}
                  </span>
                </motion.div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
}