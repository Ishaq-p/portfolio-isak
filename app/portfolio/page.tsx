"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import { LuBinary, LuActivity, LuDna, LuServer } from "react-icons/lu";
import ProjectCard from "../components/ProjectCard";
import FilterJumble from "../components/FilterJumble";
import ExperienceCard from "../components/ExperienceCard";
import SocialImpact from "../components/SocialImpact";
import ConnectionProtocol from "../components/ConnectionProtocol";

export default function Portfolio() {
  const [data, setData] = useState<any>(null);
  const [projects, setprojects] = useState<any>(null);

// Inside your Portfolio component
const [activeFilter, setActiveFilter] = useState("ALL");

const filteredProjects = projects?.filter((p: any) => 
  activeFilter === "ALL" || p.short_card.domain.includes(activeFilter)
);

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
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600">Technical_Impact_Archive</h2>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Production Systems & <br /> Applied Research.
            </p>
          </div>


            {/* Filter Jumble */}   
          <FilterJumble 
            projects={projects} 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
          />
        </header>

        {/* CONDENSED 3-COLUMN GRID [cite: 2025-11-29, 2026-02-08] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredProjects?.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 4. EXPERIENCE: Distributed Systems & Research */}
      <section className="py-32 bg-[#020406] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500 mb-20">Work_History</h2>
          <div className="space-y-24 grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.experience.map((exp: any) => (
              <ExperienceCard key={exp.organization} exp={exp} />
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