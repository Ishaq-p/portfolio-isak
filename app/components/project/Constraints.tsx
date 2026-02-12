import { Project } from "../../types/projects";
import { motion, AnimatePresence } from "framer-motion";


export default function Constraints (project: Project) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* 1. The Narrative: Left Side */}
            <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 bg-indigo-500" />
                <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.4em]">Mission_Objective</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {project.problem.description}
                </h3>
            </div>

            <div className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                <p className="text-slate-400 leading-relaxed italic text-lg">
                "The primary challenge involved synchronizing high-velocity data streams with legacy infrastructure constraints, necessitating a total architectural rethink."
                </p>
            </div>
            </div>

            {/* 2. The Hard Constraints: Right Side */}
            <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-red-500/80 uppercase tracking-[0.3em]">Critical_Constraints</span>
                <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-3 bg-red-500/20" />
                ))}
                </div>
            </div>

            <div className="space-y-3">
                {project.problem.constraints.map((c, i) => (
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="group flex items-center gap-4 p-5 bg-[#0a0f14] border border-white/5 rounded-xl hover:border-red-500/30 transition-all cursor-default"
                >
                    <div className="text-[10px] font-mono text-red-900 group-hover:text-red-500 transition-colors">
                    0{i + 1}
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <p className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">
                    {c}
                    </p>
                </motion.div>
                ))}
            </div>

            </div>
        </div>
    );
}