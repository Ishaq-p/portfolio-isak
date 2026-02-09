"use client";
import React from 'react';
import Link from 'next/link';
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
// import NeuralVisualizer from './components/NeuralNetwork';
import Capabilities from './components/Capabilities';
import dynamic from 'next/dynamic';

// Disable Server-Side Rendering for this specific component [cite: 2026-02-08]
const NeuralVisualizer = dynamic(() => import('./components/NeuralNetwork'), { 
  ssr: false,
  loading: () => <div className="h-[500px] bg-[#020406] rounded-[3rem] animate-pulse" /> 
});


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">


      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-7 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-400 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
              Now Live: AI Integration
            </span>
            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Digital solutions <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">for the next era.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
              We build tools that bridge the gap between complex engineering and intuitive user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold shadow-2xl shadow-indigo-200 hover:bg-indigo-600 transition-all active:scale-95">
                Let's collaborate
              </button>
              <Link href="/portfolio" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-slate-50 transition-all">
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Abstract Tech Stack Card */}
          <NeuralVisualizer />

        </div>
      </section>

      <Capabilities />

      <section id="contact-section" className="py-16 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#020406] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-white/5">
            
            {/* LEFT: Submission Terminal - Tightened padding */}
            <div className="lg:w-3/5 p-10 lg:p-14 relative">
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-white mb-8 tracking-tighter">Let's collaborate.</h2>

                {/* Reduced space-y from 8 to 6 */}
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest ml-4">CLIENT_ID</label>
                      <input type="text" placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest ml-4">MAIL_ENDPOINT</label>
                      <input type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest ml-4">REQ_PAYLOAD</label>
                    <textarea rows={3} placeholder="Project overview..." className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none text-sm"></textarea>
                  </div>
                  <button className="group relative px-10 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 transition-all active:scale-95">
                    <span className="relative z-10">Push Message</span>
                  </button>
                </form>
              </div>
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
            </div>

            {/* RIGHT: Status Hub - Condensed Hub elements */}
            <div className="lg:w-2/5 bg-[#05080a] border-l border-white/5 p-10 lg:p-14 text-white flex flex-col items-center justify-around relative overflow-hidden">
              
              <div className="relative z-10 w-full flex flex-col items-center">
                {/* Reduced bottom margin from 16 to 8 */}
                <div className="mb-8 flex flex-col items-center space-y-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Connection Status</span>
                  <div className="px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">Nodes Accepting</span>
                  </div>
                </div>

                {/* Centered Protocol Access - Scaled down nodes */}
                <div className="w-full flex flex-col items-center space-y-6">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">External Access</span>
                  <div className="flex space-x-4">
                    <a href="https://linkedin.com" className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center group hover:border-indigo-500 transition-all">
                      <FaLinkedinIn className="text-xl text-slate-500 group-hover:text-white transition-all" />
                    </a>
                    <a href="https://github.com" className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center group hover:border-indigo-500 transition-all">
                      <FaGithub className="text-xl text-slate-500 group-hover:text-white transition-all" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Technical Meta Footer - Compacted */}
              <div className="relative z-10 w-full pt-8 border-t border-white/5 flex flex-col items-center space-y-1">
                <div className="flex space-x-3 opacity-30 text-[7px] font-mono uppercase tracking-[0.2em]">
                    <span>Env: bitatlim-prod</span>
                    <span>//</span>
                    <span>Stack: Next.js</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-600/5 blur-[100px] rounded-full"></div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}