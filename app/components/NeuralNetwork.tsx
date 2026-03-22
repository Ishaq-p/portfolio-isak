"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";

// ─── Static animation configs (avoids Math.random() in render) ──────────────
const WEIGHT_CONFIGS = Array.from({ length: 25 }, (_, i) => ({
  duration: 1 + (i % 5) * 0.4 + ((i * 7) % 3) * 0.3, // deterministic spread 1.0 – 3.1s
  delay:    (i * 0.17) % 1.5,
}));

// ─── Node layout: relative percentages (0–100) resolved against real size ───
const LAYER_Y_PCT = [
  [15, 50, 85],          // layer 1 — 3 nodes
  [8, 29, 50, 71, 92],   // layer 2 — 5 nodes
  [30, 70],              // layer 3 — 2 nodes
];
const LAYER_X_PCT = [18, 50, 82]; // three columns

export default function NeuralNetwork() {
  // ── Container size tracking for dynamic SVG coords ────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 440, h: 280 }); // sensible default

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── Resolved pixel positions ───────────────────────────────────────────────
  const nodes = useMemo(
    () =>
      LAYER_Y_PCT.map((ys, li) =>
        ys.map((yp) => ({
          x: (LAYER_X_PCT[li] / 100) * size.w,
          y: (yp / 100) * size.h,
        }))
      ),
    [size]
  );

  // Flatten connections with stable config indices
  const connections = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; cfgIdx: number }[] = [];
    let idx = 0;
    for (let l = 0; l < nodes.length - 1; l++) {
      for (const a of nodes[l]) {
        for (const b of nodes[l + 1]) {
          result.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, cfgIdx: idx % WEIGHT_CONFIGS.length });
          idx++;
        }
      }
    }
    return result;
  }, [nodes]);

  // ── Training simulation ───────────────────────────────────────────────────
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss]   = useState(0.8421);

  useEffect(() => {
    const t = setInterval(() => {
      setEpoch((p) => p + 1);
      setLoss((p)  => Math.max(0.0001, +(p - 0.002).toFixed(4)));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  // ── Console logs ──────────────────────────────────────────────────────────
  const [logs, setLogs]   = useState<string[]>([]);
  const scrollRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const ts     = new Date().toLocaleTimeString("en-GB", { hour12: false });
      const logLoss = (Math.random() * 0.1).toFixed(4);
      const acc    = (0.90 + Math.random() * 0.09).toFixed(4);
      const valAcc = (0.88 + Math.random() * 0.08).toFixed(4);
      const f1     = (0.87 + Math.random() * 0.09).toFixed(4);
      const line   = `[${ts}] EPOCH_UPDT: loss=${logLoss} acc=${acc} val_acc=${valAcc} f1=${f1} // model-train-03`;
      setLogs((prev) => [...prev.slice(-4), line]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal on new log entry
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <div className="hidden lg:flex lg:col-span-5">
      <div className="bg-[#020406] p-8 pb-0 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden h-[500px] flex flex-col font-mono w-full">

        {/* Terminal Header */}
        <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4 shrink-0">
          <div className="text-[10px] space-y-1">
            <p className="text-emerald-500 font-black tracking-widest">LIVE_TRAINING_INSTANCE</p>
            <p className="text-slate-500">SRC: model-train-03 // MODE: Backprop</p>
          </div>
          <div className="text-right text-[10px] text-indigo-400">
            <p>EPOCH: {epoch}</p>
            <p>LOSS: {loss.toFixed(4)}</p>
          </div>
        </div>

        {/* Dynamic Neural Graph */}
        <div ref={containerRef} className="relative flex-grow min-h-0">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${size.w} ${size.h}`}
            preserveAspectRatio="none"
          >
            {connections.map((c, i) => (
              <WeightPath key={i} {...c} cfg={WEIGHT_CONFIGS[c.cfgIdx]} />
            ))}
          </svg>

          {/* Nodes — positioned absolutely via percentage */}
          {nodes.map((layer, li) =>
            layer.map((node, ni) => (
              <div
                key={`${li}-${ni}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${LAYER_X_PCT[li]}%`,
                  top:  `${LAYER_Y_PCT[li][ni]}%`,
                }}
              >
                <Neuron
                  active={li === 0}
                  delay={ni * 0.15}
                  color={li === nodes.length - 1 ? "emerald" : "indigo"}
                />
              </div>
            ))
          )}
        </div>

        {/* Console Log Terminal */}
        <div className="mt-1 rounded-2xl flex flex-col h-20 overflow-hidden relative shrink-0">
          <div
            ref={scrollRef}
            className="p-4 overflow-y-auto scrollbar-hide flex flex-col space-y-1 select-none h-full"
          >
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => (
                <motion.p
                  key={log + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[8px] leading-relaxed"
                >
                  <span className="text-emerald-500 mr-2">➜</span>
                  <span className="text-indigo-400">~</span>
                  <span className="text-slate-300 ml-2">{log}</span>
                </motion.p>
              ))}
            </AnimatePresence>

            {/* Blinking Cursor */}
            <div className="flex items-center">
              <span className="text-emerald-500 mr-2">➜</span>
              <span className="text-indigo-400">~</span>
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="ml-2 w-1.5 h-3 bg-slate-400"
              />
            </div>
          </div>

          {/* CRT scanline overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,0,0.02))] bg-[length:100%_2px,3px_100%]" />
        </div>

      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface WeightPathProps {
  x1: number; y1: number;
  x2: number; y2: number;
  cfg: { duration: number; delay: number };
}

function WeightPath({ x1, y1, x2, y2, cfg }: WeightPathProps) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(99,102,241,0.2)"
      initial={{ strokeWidth: 0.5 }}
      animate={{
        strokeWidth:   [0.5, 2, 0.5],
        strokeOpacity: [0.1, 0.5, 0.1],
        stroke: [
          "rgba(99,102,241,0.2)",
          "rgba(16,185,129,0.4)",
          "rgba(99,102,241,0.2)",
        ],
      }}
      transition={{
        duration: cfg.duration,
        delay:    cfg.delay,
        repeat:   Infinity,
        ease:     "easeInOut",
      }}
    />
  );
}

interface NeuronProps {
  active?: boolean;
  delay?:  number;
  color?:  "indigo" | "emerald";
}

function Neuron({ active = false, delay = 0, color = "indigo" }: NeuronProps) {
  const base = color === "indigo" ? "#6366f1" : "#10b981";
  const bg   = color === "indigo" ? "bg-indigo-500" : "bg-emerald-500";
  return (
    <motion.div
      animate={{
        boxShadow: active
          ? [`0 0 0px ${base}`, `0 0 15px ${base}`, `0 0 0px ${base}`]
          : "none",
        scale: active ? [1, 1.2, 1] : 1,
      }}
      transition={{ repeat: Infinity, duration: 2, delay }}
      className={`w-3 h-3 rounded-full border border-white/20 ${active ? bg : "bg-slate-800"}`}
    />
  );
}