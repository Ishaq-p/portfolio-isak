"use client";
import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  items: string[];
}

/**
 * OPTION C — Layered Stack
 * Skills rendered as literal horizontal "layers" stacked vertically —
 * playing on the word "stack" itself. Each band's width reflects relative
 * skill-count depth, hover expands to reveal the item list. Reads like an
 * architecture/infra diagram rather than a skills list.
 */
export default function SkillsStack({ skills, title }: { skills: SkillGroup[]; title: string }) {
  const maxItems = Math.max(...skills.map((s) => s.items.length));

  return (
    <div className="w-full">
      <div className="mb-10">
        <p className="label-eyebrow text-ion-soft mb-4">Stack</p>
        <p
          className="text-4xl md:text-5xl font-medium tracking-tight leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </p>
      </div>

      <div className="space-y-1.5">
        {skills.map((skill, i) => {
          const widthPct = 40 + (skill.items.length / maxItems) * 60;
          return (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, scaleX: 0.9 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              style={{ transformOrigin: "left" }}
              className="group relative"
            >
              <div
                className="relative flex items-center justify-between gap-4 px-6 py-4 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-ion-soft/40 transition-all duration-300 cursor-default overflow-hidden"
                style={{ width: `${widthPct}%`, minWidth: "min(100%, 280px)" }}
              >
                {/* depth-fill bar underneath, subtle */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-ion/10 to-transparent"
                  style={{ width: "100%" }}
                  aria-hidden="true"
                />

                <div className="relative z-10 flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-white/25 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] font-semibold text-white whitespace-nowrap">
                    {skill.category}
                  </span>
                </div>

                <span className="relative z-10 font-mono text-[10px] text-white/30 shrink-0">
                  {skill.items.length} tools
                </span>
              </div>

              {/* expand-on-hover item list, pushes layout below the bar */}
              <div className="max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300 ease-out">
                <p className="pt-2.5 pb-1 pl-6 text-[12px] text-white/45 font-medium">
                  {skill.items.join("  ·  ")}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}