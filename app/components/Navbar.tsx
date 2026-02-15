"use client";
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LuMenu, LuX, LuChevronDown, LuFileDown } from 'react-icons/lu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const resumes = [
    { label: "EN_PROTOCOL", lang: "English", path: "/ishaqCV_1-full.pdf" },
    { label: "TR_PROTOKOLÜ", lang: "Türkçe", path: "/ishaqCV_1-full_turkish.pdf" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/60 px-6 md:px-8 py-4 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* BRAND IDENTITY */}
        <Link href="/" className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
          PAKTINYAR<span className="text-indigo-600">.</span>
        </Link>

        {/* DESKTOP UI (Standard Operation) */}
        <div className="hidden md:flex items-center space-x-10 text-sm font-semibold uppercase tracking-wider text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/portfolio" className="hover:text-indigo-600 transition-colors">Portfolio</Link>
          
          <div className="relative" onMouseEnter={() => setResumeOpen(true)} onMouseLeave={() => setResumeOpen(false)}>
            <span className="hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer">
              Resume <LuChevronDown className="text-[10px]" />
            </span>
            <AnimatePresence>
              {resumeOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl p-2">
                   {resumes.map(res => (
                    <Link key={res.label} href={res.path} target="_blank" className="flex flex-col px-3 py-2 hover:bg-indigo-50 rounded-lg group">
                      <span className="text-[10px] font-black text-slate-900 group-hover:text-indigo-600">{res.label}</span>
                      <span className="text-[9px] font-mono text-slate-400 italic lowercase">// {res.lang}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE TRIGGER (Hamburger) */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-slate-900">
          {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </div>

      {/* MOBILE COMMAND OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="md:hidden overflow-hidden bg-white/95 border-t border-slate-100"
          >
            <div className="flex flex-col p-6 space-y-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase text-slate-600">Home</Link>
              <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase text-slate-600">Portfolio</Link>
              
              {/* MOBILE RESUME ACCORDION */}
              <div className="space-y-4">
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Resume_Protocols</p>
                <div className="grid grid-cols-1 gap-2">
                  {resumes.map(res => (
                    <Link key={res.label} href={res.path} target="_blank" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <p className="text-xs font-black text-slate-900">{res.label}</p>
                        <p className="text-[10px] text-slate-500 font-mono italic lowercase">// {res.lang}</p>
                      </div>
                      <LuFileDown className="text-indigo-600" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}