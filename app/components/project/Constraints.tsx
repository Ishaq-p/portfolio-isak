import { Project } from "../../types/projects";
import { motion } from "framer-motion";

export default function Constraints(project: Project) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
      {/* Narrative */}
      <div className="lg:col-span-7 space-y-6">
        <p className="label-eyebrow text-ion-soft">The problem</p>
        <h3
          className="text-3xl md:text-4xl font-medium text-white leading-tight text-balance"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {project.problem.description}
        </h3>
      </div>

      {/* Constraints */}
      <div className="lg:col-span-5 space-y-5">
        <p className="label-eyebrow text-white/35">Hard constraints</p>
        <div className="space-y-3">
          {project.problem.constraints.map((c, i) => (
            <motion.div
              initial={{ x: 16, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              key={i}
              className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/[0.07] rounded-xl hover:border-ion/25 transition-colors"
            >
              <span className="font-mono text-[11px] text-white/25 pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[13.5px] text-white/65 leading-relaxed">{c}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
