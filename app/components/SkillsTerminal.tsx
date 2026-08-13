"use client";
import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  items: string[];
}

/**
 * OPTION B — Terminal Readout
 * Renders skills as a fake CLI session output: a command line, then a
 * categorized listing typed out line by line. Leans hard into the mono/
 * telemetry identity already established in the footer (SYS_ONLINE,
 * "Accepting Load"). No icons, no cards — pure typographic system feel.
 */
export default function SkillsTerminal({ skills, title }: { skills: SkillGroup[]; title: string }) {
  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="label-eyebrow text-ion-soft mb-4">Stack</p>
        <p
          className="text-4xl md:text-5xl font-medium tracking-tight leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-[11px] text-white/30">paktinyar@stack — zsh</span>
        </div>

        <div className="p-6 md:p-8 font-mono text-[13px] leading-loose">
          <p className="text-white/40">
            <span className="text-ion-soft">➜</span> ~ cat stack.log
          </p>

          <div className="mt-3 space-y-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <p className="text-white/30">
                  [<span className="text-ion-soft">{String(i + 1).padStart(2, "0")}</span>] {skill.category.toUpperCase()}
                </p>
                <p className="pl-6 text-white/75">
                  {skill.items.map((item, j) => (
                    <span key={item}>
                      <span className="text-white/20">├─ </span>
                      {item}
                      {j < skill.items.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-6 text-white/40 flex items-center gap-2">
            <span className="text-ion-soft">➜</span> ~
            <span className="inline-block w-[7px] h-[15px] bg-ion-soft/70 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
}