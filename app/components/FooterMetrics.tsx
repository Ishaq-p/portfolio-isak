"use client";
const stats = [
  { label: "Experience", value: "3+ Years", sub: "ML // Systems Architecture" },
  { label: "Research", value: "Active", sub: "JRavi Lab // Bio-Neural" },
  { label: "Projects", value: "Real-life", sub: "bitatlim-prod // Production" },
  { 
    label: "Extracurricular", 
    value: "Good at flying planes in a simulation", 
    sub: "Basically a pilot if we ignore the 'virtual' part" 
  }
];

export default function FooterMetrics() {
  return (
    <section className="w-full py-12 px-6">
      {/* Mobile: 1 Column
          Tablet (md): 2 Columns
          Desktop (xl): 4 Columns 
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="group relative flex flex-col justify-between p-6 bg-[#05080a] border border-white/5 rounded-2xl hover:border-indigo-500/40 transition-all min-h-[180px] w-full"
          >
            {/* Header / Label */}
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-indigo-400 transition-colors">
                  {stat.label}
                </span>
                <span className="text-[8px] font-mono text-indigo-500/30">ID: 0{i+1}</span>
              </div>
              
              {/* Dynamic Font Size for Computer Screens */}
              <div className={`font-black text-white tracking-tighter leading-tight transition-all group-hover:translate-x-1 ${
                stat.value.length > 20 ? 'text-lg xl:text-xl' : 'text-2xl xl:text-3xl'
              }`}>
                {stat.value}
              </div>
            </div>
            
            {/* Metadata Footer */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[80%]">
                {stat.sub}
              </div>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${i === 3 ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
            </div>

            {/* Subtle Glow for Sarcastic Card */}
            {i === 3 && (
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}