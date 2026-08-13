"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { LuArrowUpRight, LuCheck } from "react-icons/lu";
import { motion } from "framer-motion";
import Capabilities from "./components/Capabilities";
import SystemTelemetry from "./components/SystemTelemetry";
import MagneticButton from "./components/MagneticButton";
import OrbitMark from "./components/OrbitMark";
import InteractiveDots from "./components/InteractiveDots";
import TextPupil from "./components/DigitalEyes";
import LineEyes from "./components/LineEyes";

export default function LandingPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    setStatus("sending");

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setStatus("sent");
          form.current?.reset();
        },
        (error) => {
          console.error("EMAIL_SEND_FAILED:", error.text);
          setStatus("error");
        }
      );
  };

  return (
    <div className="bg-paper font-sans overflow-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[100dvh] flex flex-col bg-paper-dim text-ink overflow-hidden selection:bg-ion selection:text-white pt-20 pb-16 md:pb-0">

        {/* Interactive Dots & Ambient Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <InteractiveDots />
          <div className="absolute top-0 right-0 w-[150vw] h-[150vh] md:w-full md:h-full bg-[radial-gradient(ellipse_at_top_right,rgba(46,91,255,0.06),transparent_60%)]" />
        </div>

        {/* Ocean Waves */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none h-[60px] md:h-[110px]">
          <style>{`
            @keyframes ocean-wave {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-50%, 0, 0); }
            }
            .wave-wrapper {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 200%;
              height: 100%;
              display: flex;
            }
            .wave-layer-1 { animation: ocean-wave 24s linear infinite; opacity: 0.25; }
            .wave-layer-2 { animation: ocean-wave 18s linear infinite; opacity: 0.5; }
            .wave-layer-3 { animation: ocean-wave 12s linear infinite; opacity: 1; }
            @media (max-width: 767px) {
              .wave-wrapper { animation: none !important; }
            }
            @media (prefers-reduced-motion: reduce) {
              .wave-wrapper { animation-play-state: paused !important; }
            }
          `}</style>

          <div className="wave-wrapper wave-layer-1">
            <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,30 Q150,90 300,30 T600,30 T900,30 T1200,30 V120 H0 Z" fill="var(--paper)" />
            </svg>
            <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,30 Q150,90 300,30 T600,30 T900,30 T1200,30 V120 H0 Z" fill="var(--paper)" />
            </svg>
          </div>

          <div className="wave-wrapper wave-layer-2">
            <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,50 Q150,10 300,50 T600,50 T900,50 T1200,50 V120 H0 Z" fill="var(--paper)" />
            </svg>
            <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,50 Q150,10 300,50 T600,50 T900,50 T1200,50 V120 H0 Z" fill="var(--paper)" />
            </svg>
          </div>

          <div className="wave-wrapper wave-layer-3">
            <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,70 Q150,110 300,70 T600,70 T900,70 T1200,70 V120 H0 Z" fill="var(--paper)" />
            </svg>
            <svg className="w-1/2 h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,70 Q150,110 300,70 T600,70 T900,70 T1200,70 V120 H0 Z" fill="var(--paper)" />
            </svg>
          </div>
        </div>

        <div className="hidden md:block absolute top-0 right-0 md:-top-[10%] md:-right-[10%] opacity-30 mix-blend-screen pointer-events-none z-0">
          <OrbitMark size="xl" tone="ion" className="scale-[2.5] md:scale-[4] blur-[1px] opacity-40" />
        </div>

        <div className="relative z-10 w-full flex-1 flex flex-col lg:flex-row items-start justify-center pt-[8vh] sm:pt-[12vh] md:pt-0 md:items-center md:justify-between px-6 md:px-16 lg:px-24 max-w-[1600px] mx-auto gap-8 lg:gap-12">

          <div className="w-full lg:w-[55%] flex flex-col justify-center">

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-10 flex justify-start"
            >
              <LineEyes />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-[6rem] leading-[0.95] font-medium tracking-tight mb-4 md:mb-8 text-ink text-balance"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Architecting <br />
              systems that <span className="text-ion whitespace-nowrap">
                don&apos;t break.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col items-start gap-6 md:gap-8 pt-2 md:pt-4 max-w-xl pr-4"
            >
              <p className="text-base sm:text-lg md:text-xl font-normal text-graphite leading-relaxed">
                <span className="text-ink font-medium">I don&apos;t build portfolios.</span> I architect backend infrastructure and applied ML systems that survive when real traffic hits.
              </p>
              <MagneticButton href="#contact-section" />
            </motion.div>
          </div>

          <div className="hidden lg:flex relative w-full lg:w-1/2 h-full items-center justify-center">
            <SystemTelemetry />
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────────────────────────── */}
      <div className="w-full flex items-center justify-center overflow-hidden py-12 md:py-0 md:h-[100dvh]">
        <Capabilities />
      </div>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact-section" className="bg-paper relative flex flex-col justify-center items-center px-4 md:px-0 pt-16 pb-0 mb-0">
        <div className="w-full max-w-6xl mx-auto flex flex-col bg-white rounded-t-3xl rounded-b-none border border-b-0 border-ink/15 shadow-sm p-6 sm:p-10 lg:p-20 pb-20 sm:pb-24 lg:pb-32 relative">
          <div className="relative z-10 w-full flex flex-col lg:flex-row gap-8 lg:gap-24">
            <div className="w-full lg:w-1/3 flex flex-col justify-between">
              <div>
                <h2
                  className="text-3xl sm:text-4xl md:text-[3.5rem] font-medium text-ink mb-4 md:mb-6 tracking-tight leading-[0.9]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Let&rsquo;s build.
                </h2>
                <p className="text-graphite text-[13px] md:text-[15px] leading-relaxed mb-6 lg:mb-0">
                  Whether you need scalable backend architecture, applied machine learning systems, or a resilient pipeline—I am ready to deploy.
                </p>
              </div>

              <div className="flex flex-col space-y-3 md:space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-graphite-2">Direct Telemetry</span>
                <div className="flex gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-none border border-ink/10 hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-300">
                    <FaLinkedinIn className="text-base md:text-lg" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-none border border-ink/10 hover:bg-ink hover:text-paper hover:border-ink transition-colors duration-300">
                    <FaGithub className="text-base md:text-lg" />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <form ref={form} onSubmit={sendEmail} className="space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="space-y-1 md:space-y-2 w-full">
                    <label className="text-[10px] md:text-[11px] font-medium text-graphite-2 uppercase tracking-wide">Your name</label>
                    <input name="user_name" type="text" placeholder="Jane Doe" required className="w-full bg-transparent border-b border-ink/10 px-0 py-2 md:py-3 text-ink text-sm placeholder:text-ink/20 focus:outline-none focus:border-ink transition-colors" />
                  </div>
                  <div className="space-y-1 md:space-y-2 w-full">
                    <label className="text-[10px] md:text-[11px] font-medium text-graphite-2 uppercase tracking-wide">Email address</label>
                    <input name="user_email" type="email" placeholder="jane@company.com" required className="w-full bg-transparent border-b border-ink/10 px-0 py-2 md:py-3 text-ink text-sm placeholder:text-ink/20 focus:outline-none focus:border-ink transition-colors" />
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2 pt-2">
                  <label className="text-[10px] md:text-[11px] font-medium text-graphite-2 uppercase tracking-wide">What are you building?</label>
                  <textarea name="message" rows={3} placeholder="Tell me a little about the project..." required className="w-full bg-transparent border-b border-ink/10 px-0 py-2 md:py-3 text-ink text-sm placeholder:text-ink/20 focus:outline-none focus:border-ink transition-colors resize-none" />
                </div>
                <button type="submit" disabled={status === "sending"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 mt-2 rounded-none border border-ink/15 hover:bg-ink hover:text-paper hover:border-ink text-ink transition-colors duration-300 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium disabled:opacity-60">
                  {status === "sent" ? <><LuCheck /> Transmitted</> : status === "sending" ? "Transmitting…" : <>Initialize Link <LuArrowUpRight /></>}
                </button>
                {status === "error" && <p className="text-[11px] text-red-400 mt-2">Connection failed. Please use direct telemetry (email).</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}