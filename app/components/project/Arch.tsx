import { Project } from "../../types/projects";

export default function Arch (project: Project) {

    return (
        <div className="space-y-12">
            {/* 1. System Visual / Diagram Mockup */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative  bg-[gray] border border-white/5 rounded-3xl overflow-hidden flex items-center justify-center">
                {project.architecture.diagram ? (
                    <img 
                    src={project.architecture.diagram} 
                    alt="System Architecture" 
                    className="w-full h-full object-contain p-5 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                ) : (
                    <div className="text-center space-y-4">
                    <div className="flex justify-center gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-1 h-1 bg-indigo-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em]">Schematic_Data_Missing</p>
                    </div>
                )}
                
                {/* Decorative HUD Elements */}
                <div className="absolute top-4 left-4 border-l border-t border-white/20 w-4 h-4" />
                <div className="absolute bottom-4 right-4 border-r border-b border-white/20 w-4 h-4" />
                </div>
            </div>

            {/* 2. Component Grid with "Node" Styling */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                {project.architecture.components.map((comp, i) => (
                <div 
                    key={i} 
                    className="bg-[#05080a] p-8 hover:bg-white/[0.02] transition-colors group relative"
                >
                    <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-[9px] font-mono text-slate-600 tracking-tighter">
                        NODE_0{i + 1}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 group-hover:bg-indigo-500 group-hover:shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all" />
                    </div>
                    
                    <h4 className="text-white text-lg font-black uppercase tracking-widest mb-2 group-hover:text-indigo-400 transition-colors">
                        {comp.split('(')[0].trim()}
                    </h4>
                    
                    {comp.includes('(') && (
                        <p className="text-sm text-slate-500 font-mono italic leading-tight">
                        {comp.match(/\(([^)]+)\)/)?.[1] || ""}
                        </p>
                    )}
                    
                    <div className="mt-auto pt-6">
                        <span className="text-[8px] font-mono text-indigo-500/30 uppercase">
                        0x{i.toString(16).padStart(2, '0')} // ADDR_STABLE
                        </span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
            
}