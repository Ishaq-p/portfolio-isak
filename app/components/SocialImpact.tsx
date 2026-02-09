"use client";
import { motion } from "framer-motion";
import { LuLanguages, LuHeart } from "react-icons/lu";

export default function SocialImpact({ data }: { data: any }) {
  const languageScale: Record<string, string> = {
    Native: "100%",
    Fluent: "95%",
    Beginner: "25%",
  };

  return (
    <section className="py-24 bg-white border-t border-slate-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-16 space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">
            Social_&_Linguistic_Infrastructure
          </h2>
          <p className="text-4xl font-black tracking-tighter leading-none">Human Interoperability.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 1. LINGUISTIC CAPABILITIES */}
          <div className="lg:col-span-4 space-y-10">
            <h3 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <LuLanguages className="text-indigo-600" /> Spoken_Protocols
            </h3>
            
            <div className="space-y-6">
              {data.languages.map((lang: any) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase tracking-tighter text-slate-800">{lang.name}</span>
                    <span className="text-[8px] font-mono text-indigo-600 font-bold uppercase">{lang.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: languageScale[lang.level] || "50%" }}
                      className="h-full bg-indigo-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. COMMUNITY ENGAGEMENT */}
          <div className="lg:col-span-8 space-y-10">
            <h3 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <LuHeart className="text-indigo-600" /> Impact_Deployments
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.community.map((node: any, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-indigo-200 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-indigo-600 font-mono text-[8px] font-black uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-sm">
                      {node.year || "Active"}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-slate-900 mb-2 leading-tight uppercase tracking-tighter">
                    {node.organization}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium italic border-l-2 border-slate-200 pl-3">
                    {node.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}