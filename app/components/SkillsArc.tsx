"use client";
import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  items: string[];
}

/**
 * OPTION A — Arc Timeline
 * A dashed spine curves down the left side of the section; each skill
 * category sits on a numbered node, connected by a short stem to a pill
 * label. Direct structural nod to the reference image, restyled into the
 * ion/ink/mono system — no orange, no cartoon badges.
 */
export default function SkillsArc({ skills, title }: { skills: SkillGroup[]; title: string }) {
  const rowHeight = 92;
  const svgHeight = rowHeight * skills.length + 40;
  const nodeX = 40;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left anchor title */}
        <div className="lg:col-span-4">
          <p className="label-eyebrow text-ion-soft mb-4">Stack</p>
          <p
            className="text-4xl md:text-5xl font-medium tracking-tight leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {title}
          </p>
        </div>

        {/* Arc spine + nodes */}
        <div className="lg:col-span-8 relative" style={{ height: svgHeight }}>
          <svg
            className="absolute left-0 top-0 pointer-events-none"
            width={nodeX + 4}
            height={svgHeight}
            aria-hidden="true"
          >
            <path
              d={`M ${nodeX} 20 C 0 20, 0 ${svgHeight - 20}, ${nodeX} ${svgHeight - 20}`}
              fill="none"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={1.5}
              strokeDasharray="3 5"
            />
          </svg>

          {skills.map((skill, i) => {
            const cy = 20 + (svgHeight - 40) * (i / (skills.length - 1 || 1));
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="absolute left-0 flex items-center gap-4"
                style={{ top: cy, transform: "translateY(-50%)" }}
              >
                {/* node dot on spine */}
                <span className="absolute left-[34px] w-2.5 h-2.5 rounded-full bg-ion-soft ring-4 ring-ink" style={{ transform: "translateX(-50%)" }} />

                {/* numbered badge */}
                <span
                  className="relative ml-14 shrink-0 w-9 h-9 rounded-full border border-ion-soft/40 bg-ion/10 flex items-center justify-center font-mono text-[11px] font-semibold text-ion-soft"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* pill: category + items */}
                <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 flex items-baseline gap-3 hover:border-ion-soft/40 hover:bg-white/[0.05] transition-colors duration-300">
                  <span className="text-[13.5px] font-semibold text-white whitespace-nowrap">{skill.category}</span>
                  <span className="text-[11.5px] text-white/40 whitespace-nowrap hidden sm:inline">
                    {skill.items.slice(0, 3).join(" · ")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}