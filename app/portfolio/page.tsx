"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { LuBinary, LuActivity, LuDna, LuServer, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ProjectCard from "../components/ProjectCard";
import FilterJumble from "../components/FilterJumble";
import ExperienceCard from "../components/ExperienceCard";
import SocialImpact from "../components/SocialImpact";
import ConnectionProtocol from "../components/ConnectionProtocol";

export default function Portfolio() {
  const [data, setData] = useState<any>(null);
  const [projects, setprojects] = useState<any>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // [cite: 2026-02-10]
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = projects?.filter((p: any) => 
    activeFilter === "ALL" || p.short_card.domain.includes(activeFilter)
  );

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };
  // Slider Navigation Logic [cite: 2026-02-10]
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };


// Elliptical electron paths with varying rotations
const electrons = [
    { rotate: 0,   duration: 2.2, delay: 0,   speed: 0.8, size: 2 },   // High speed inner
    { rotate: 30,  duration: 3.8, delay: 0.2, speed: 0.8, size: 2.5 }, // Mid speed
    { rotate: 60,  duration: 5.1, delay: 0.4, speed: 0.8, size: 1.5 }, // Slow outer
    { rotate: 90,  duration: 2.9, delay: 0.6, speed: 0.8, size: 2 }, // Mid speed
    { rotate: 120, duration: 4.4, delay: 0.8, speed: 0.8, size: 2.2 },// Slow outer
    { rotate: 150, duration: 3.1, delay: 1,   speed: 0.8, size: 1.8 },  // High speed mid
  ];

  useEffect(() => {
    fetch("/data/portfolio.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("PF_LOAD_ERROR:", err));
  }, []);
  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((json) => setprojects(json))
      .catch((err) => console.error("PF_LOAD_ERROR:", err));

      
  }, []);
  useEffect(() => {
    // Check if the URL contains a hash on mount
    if (window.location.hash === "#projects") {
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [projects]);
  useEffect(() => {
    // Check if the URL contains a hash on mount
    if (window.location.hash === "#experiences") {
      const element = document.getElementById("experiences");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [data]);

    // Wait for BOTH data sources to be populated
    if (!data || !projects) {
    return (
        <div className="bg-white h-[90vh] flex items-center justify-center font-mono text-[10px]">
        INITIALIZING_SYSTEM_ARCHIVE...
        </div>
    );
    }
  return (
    <main className="bg-white text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* 1. HERO: Research & Engineering Focus */}
      <section className="relative w-full flex flex-col md:flex-row min-h-[90vh] items-center justify-center md:justify-between px-6 md:px-16 lg:px-24 overflow-hidden bg-white">
        
        {/* LEFT: High-Impact Content */}
        <div className="relative z-10 w-full md:w-[60%] order-2 md:order-1 mt-0 ">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex flex-wrap items-center gap-2">
              <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-sm">
                BACKEND · ML · DB
              </span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              {data.hero.name}
            </h1>

            <p className="text-lg md:text-xl font-medium text-slate-500 max-w-xl leading-relaxed">
              <span className="text-slate-900 font-bold">{data.hero.title}. </span> 
              {data.hero.value_prop}
            </p>
          </motion.div>
        </div>

        {/* RIGHT: Atomic Electron Animation */}
        <div className="hidden md:flex relative w-full md:w-[35%] items-center justify-center order-1 md:order-2">
          <div className="relative w-72 h-72 flex items-center justify-center scale-75 md:scale-100">
            
            {/* Central Nucleus (Research Core) */}
            <div className={`absolute w-5 h-5 bg-indigo-600 rounded-full z-20 transition-all duration-5001`}></div>
            
            {electrons.map((e, i) => (
              <div 
                key={i} 
                className="absolute w-full h-full flex items-center justify-center"
                style={{ transform: `rotate(${e.rotate}deg)` }}
              >
                {/* Elliptical Path Trace */}
                <div className="absolute w-full h-[45%] border border-slate-100 rounded-[100%] opacity-50"></div>
                
                {/* Individual Velocity Electron */}
                <motion.div
                  className="absolute w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{
                    duration: e.duration * e.speed, // Applies multiplier to unique duration
                    repeat: Infinity,
                    ease: "linear",
                    delay: e.delay * e.speed
                  }}
                  style={{ 
                      width: e.size * 4,
                      height: e.size * 4,
                      offsetPath: `ellipse(144px 65px at 50% 50%)` 
                  }}
                />
              </div>
            ))}

            {/* Core Atmosphere */}
            <div className="absolute w-56 h-56 bg-indigo-50/20 blur-[100px] rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* 2. CORE STACK: Fluid Responsive Grid */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">
            Engineering_Stack_Hash
          </h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            Core Competencies.
          </p>
        </div>
        
        {/* Data Focus Indicator [cite: 2025-11-29] */}
        <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-4 border-l-2 border-slate-100 pl-6 h-fit py-2">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]"></span> 
          </span>
        </div>
      </header>
          {/* Mobile: 1 Column (gap-10)
              Small Tablet: 2 Columns (gap-12)
              Desktop: 5 Columns (gap-12)
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-8 md:gap-12 mb-16">
            {data.skills.map((skill: any) => (
              <div key={skill.category}>
                {/* Reduced bottom margin on mobile to prevent massive gaps */}
                <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 md:mb-8">
                  {skill.category}
                </h3>
                <ul className="space-y-2 md:space-y-3 font-mono text-[12px] md:text-[13px] font-bold text-slate-700">
                  {skill.items.map((item: string) => (
                    <li key={item} className="leading-tight">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Responsive Note Footer */}
          <div className="pt-8 border-t border-slate-200/40">
            <p className="font-mono text-[10px] md:text-[11px] text-slate-400 tracking-tight leading-relaxed">
              <span className="text-slate-600 font-bold uppercase mr-2 tracking-widest">[focus]</span>
              <span className="bg-indigo-50 text-indigo-600 px-1 rounded-sm">
              Backend systems & applied machine learning, built and deployed in production.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 3. PROJECTS: Lab Research & Production Platforms */}
      <section id="projects" className="py-12 md:py-18 max-w-7xl mx-auto px-6 overflow-hidden">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">View_B // System_Slider</h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Production Systems & <br /> Applied Research.
            </p>
          </div>
          <FilterJumble projects={projects} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        </header>

        <div className="relative group">
          {/* Scrollable Container with Peek Effect [cite: 2025-11-28] */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll} // [cite: 2026-02-10]
            className="flex gap-4 lg:gap-6 justify-between overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar scroll-smooth items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredProjects?.map((project: any) => (
              <div 
                key={project.id} 
                className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[31%] snap-start h-[inherit]"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Functional Navigation Buttons [cite: 2026-02-10] */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => scroll("left")}
              className="p-4 bg-white shadow-2xl rounded-full pointer-events-auto hover:bg-indigo-600 hover:text-white transition-all border border-slate-100"
            >
              <LuChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="p-4 bg-white shadow-2xl rounded-full pointer-events-auto hover:bg-indigo-600 hover:text-white transition-all border border-slate-100"
            >
              <LuChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dynamic Node Tracker [cite: 2025-11-28] */}
        <div className="flex items-center gap-6 mt-4">
          <div className="h-[2px] bg-slate-100 flex-1 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-indigo-500" 
              style={{ width: `${Math.max(10, scrollProgress)}%` }} // Minimum 10% for visibility
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest">
            SYSTEM_SYNC: {Math.round(scrollProgress)}%
          </span>
        </div>
      </section>

      {/* 4. EXPERIENCE: Dense System Grid */}
      <section id="experiences" className="py-20 bg-[#020406] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-indigo-500 mb-12">
            Work_History
          </h2>
          {/* Reduced gap and removed space-y-24 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {data.experience.map((exp: any, index: number) => (
              <ExperienceCard key={exp.organization} exp={{...exp, index: index + 1}} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <SocialImpact data={data.social_impact}/>
      </section>

      {/* 5. FOOTER: Connection Ready */}
      <section>
        <ConnectionProtocol data={{ education: data.education, contact: data.contact }} />
      </section>
    </main>
  );
}