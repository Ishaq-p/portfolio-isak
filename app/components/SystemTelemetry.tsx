"use client";
import { motion } from "framer-motion";

export default function SystemTelemetry() {
  return (
    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center select-none pointer-events-none mix-blend-multiply opacity-90">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Background Engineering Grid */}
        <defs>
          <pattern id="sys-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink/[0.04]" />
          </pattern>
          <pattern id="sys-grid-large" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-ink/[0.06]" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#sys-grid)" />
        <rect width="400" height="400" fill="url(#sys-grid-large)" />

        {/* ── STATIC ARCHITECTURE PATHS ── */}
        <g stroke="currentColor" className="text-ink/15" strokeWidth="1" fill="none">
          {/* Main vertical trunk */}
          <path d="M 200 40 L 200 360" />
          
          {/* Service Branches (Left) */}
          <path d="M 200 120 L 80 120 L 80 160" />
          <path d="M 200 240 L 100 240 L 100 280" />
          
          {/* Service Branches (Right) */}
          <path d="M 200 160 L 320 160 L 320 200" />
          <path d="M 200 280 L 280 280 L 280 320" />
        </g>

        {/* ── DATA PACKET ANIMATIONS ── */}
        {/* These use strokeDasharray to simulate packets flowing. Since it's CSS animation, it costs 0% CPU. */}
        <g strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Packet 1: Main Trunk (Ion Blue) */}
          <motion.path
            d="M 200 40 L 200 360"
            className="stroke-ion"
            strokeDasharray="10 400"
            animate={{ strokeDashoffset: [410, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Packet 2: Branch Left 1 (Emerald) */}
          <motion.path
            d="M 200 120 L 80 120 L 80 160"
            className="stroke-emerald-500"
            strokeDasharray="8 250"
            animate={{ strokeDashoffset: [258, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />

          {/* Packet 3: Branch Right 1 (Ion Blue) */}
          <motion.path
            d="M 200 160 L 320 160 L 320 200"
            className="stroke-ion"
            strokeDasharray="12 300"
            animate={{ strokeDashoffset: [312, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1 }}
          />

          {/* Packet 4: Branch Left 2 (Ion Blue) */}
          <motion.path
            d="M 200 240 L 100 240 L 100 280"
            className="stroke-ion"
            strokeDasharray="6 200"
            animate={{ strokeDashoffset: [206, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
          />

          {/* Packet 5: Branch Right 2 (Emerald) */}
          <motion.path
            d="M 200 280 L 280 280 L 280 320"
            className="stroke-emerald-500"
            strokeDasharray="10 200"
            animate={{ strokeDashoffset: [210, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />
        </g>

        {/* ── ARCHITECTURAL NODES ── */}
        {/* Top Gateway Node */}
        <g transform="translate(185, 25)">
          <rect width="30" height="30" className="fill-paper stroke-ink/20" strokeWidth="1" />
          <rect x="5" y="5" width="20" height="20" className="fill-ion/10 stroke-ion" strokeWidth="1" />
        </g>

        {/* Left Service Node 1 */}
        <g transform="translate(65, 160)">
          <rect width="30" height="40" className="fill-paper stroke-ink/20" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" className="fill-emerald-500" />
          <path d="M 10 25 L 20 25 M 10 30 L 15 30" stroke="currentColor" className="text-ink/30" strokeWidth="1" />
        </g>

        {/* Right Service Node 1 */}
        <g transform="translate(305, 200)">
          <polygon points="15,0 30,15 15,30 0,15" className="fill-paper stroke-ink/20" strokeWidth="1" />
          <circle cx="15" cy="15" r="4" className="fill-ion" />
        </g>

        {/* Left Service Node 2 */}
        <g transform="translate(80, 280)">
          <rect width="40" height="30" className="fill-paper stroke-ink/20" strokeWidth="1" />
          <rect x="5" y="5" width="30" height="8" className="fill-ion/10 stroke-ion" strokeWidth="1" />
          <rect x="5" y="17" width="10" height="8" className="fill-ink/5 stroke-ink/20" strokeWidth="1" />
        </g>

        {/* Right Service Node 2 */}
        <g transform="translate(265, 320)">
          <circle cx="15" cy="15" r="15" className="fill-paper stroke-ink/20" strokeWidth="1" />
          <circle cx="15" cy="15" r="6" className="fill-emerald-500" />
        </g>

        {/* Bottom Aggregator Node */}
        <g transform="translate(170, 360)">
          <rect width="60" height="20" className="fill-paper stroke-ink/20" strokeWidth="1" />
          <circle cx="10" cy="10" r="3" className="fill-ion animate-pulse" />
          <circle cx="20" cy="10" r="3" className="fill-ion animate-pulse" style={{ animationDelay: "200ms" }} />
          <circle cx="30" cy="10" r="3" className="fill-ion animate-pulse" style={{ animationDelay: "400ms" }} />
        </g>

        {/* ── TELEMETRY READOUTS (TEXT) ── */}
        <g fill="currentColor" className="text-ink/60 text-[7px] font-mono tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          <text x="225" y="45">API_GATEWAY_v2.4</text>
          <text x="225" y="55" className="text-ion/80">LATENCY: 14ms</text>
          
          <text x="35" y="150">AUTH_SERVICE</text>
          
          <text x="300" y="245">NEURAL_ROUTER</text>
          <text x="300" y="255" className="text-emerald-500/80">ACC: 98.4%</text>

          <text x="50" y="325">USER_DB_CLUSTER</text>

          <text x="145" y="395">CORE_AGGREGATOR_PIPELINE</text>
        </g>

      </svg>
    </div>
  );
}
