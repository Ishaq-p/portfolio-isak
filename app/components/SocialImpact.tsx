"use client";
import { motion } from "framer-motion";
import { LuLanguages, LuHeart } from "react-icons/lu";

const LEVEL_WIDTH: Record<string, string> = {
  Native: "100%",
  Fluent: "88%",
  Intermediate: "60%",
  Beginner: "28%",
};

export default function SocialImpact({ data }: { data: any }) {
  return (
    <section className="py-24 md:py-28 bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16 space-y-4">
          <p className="label-eyebrow text-ion-soft">Beyond the stack</p>
          <h2
            className="text-4xl sm:text-5xl font-medium tracking-tight leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Human interoperability.
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Languages */}
          <div className="lg:col-span-4 space-y-9">
            <h3 className="flex items-center gap-2.5 label-eyebrow text-white/35">
              <LuLanguages className="text-ion-soft" /> Languages
            </h3>

            <div className="space-y-6">
              {data.languages.map((lang: any) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[15px] font-medium text-white/85">{lang.name}</span>
                    <span className="text-[10px] font-mono text-white/35 uppercase tracking-wider">
                      {lang.level}
                    </span>
                  </div>
                  <div className="h-[3px] w-full bg-white/[0.08] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: LEVEL_WIDTH[lang.level] || "50%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="h-full bg-ion-soft"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="lg:col-span-8 space-y-9">
            <h3 className="flex items-center gap-2.5 label-eyebrow text-white/35">
              <LuHeart className="text-ion-soft" /> Community &amp; volunteering
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.community.map((node: any, i: number) => (
                <motion.div
                  key={node.organization}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="group relative p-6 bg-white/[0.03] border border-white/[0.07] rounded-2xl hover:border-ion/40 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <span className="inline-block text-ion-soft font-mono text-[9px] font-semibold uppercase tracking-widest bg-ion/10 px-2 py-0.5 rounded-full mb-4">
                    {node.year || "Active"}
                  </span>
                  <h4 className="text-[15px] font-semibold text-white mb-1.5 leading-snug">
                    {node.organization}
                  </h4>
                  <p className="text-[12px] text-white/40 font-medium">{node.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
