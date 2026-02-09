"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function NeuralNetwork() {

    // Real-time metric jitter to simulate training variance
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(0.842);

  // Define the skeleton architecture: 3 nodes -> 5 nodes -> 2 nodes
  const layer1 = [60, 160, 260];
  const layer2 = [20, 90, 160, 230, 300];
  const layer3 = [110, 210];

  useEffect(() => {
    const timer = setInterval(() => {
      setEpoch((prev) => prev + 1);
      setLoss((prev) => Math.max(0.001, prev - 0.002));
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  const [metrics, setMetrics] = useState({
    loss: 0.8421,
    acc: 0.6542,
    valAcc: 0.6120,
    f1: 0.5891
  });

  // Simulation of a Bioinformatics Neural Training Loop
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
      const loss = (Math.random() * 0.1).toFixed(4);
      const acc = (0.90 + Math.random() * 0.09).toFixed(4);
      const valAcc = (0.88 + Math.random() * 0.08).toFixed(4);
      const f1 = (0.87 + Math.random() * 0.09).toFixed(4);

      const newLog = `[${timestamp}] EPOCH_UPDT: loss=${loss} acc=${acc} val_acc=${valAcc} f1=${f1} // model-train-03`;
      
      setLogs(prev => [...prev.slice(-15), newLog]); // Keep last 15 lines for performance
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="lg:col-span-5">
      <div className="bg-[#020406] p-8 pb-0 rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden h-[500px] flex flex-col font-mono">
        
        {/* Terminal Header */}
        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
          <div className="text-[10px] space-y-1">
            <p className="text-emerald-500 font-black tracking-widest">LIVE_TRAINING_INSTANCE</p>
            <p className="text-slate-500">SRC: model-train-03 // MODE: Backprop</p>
          </div>
          <div className="text-right text-[10px] text-indigo-400">
            <p>EPOCH: {epoch}</p>
            <p>LOSS: {loss.toFixed(4)}</p>
          </div>
        </div>

        {/* The Skeleton Graph */}
        <div className="relative flex-grow flex justify-between items-center px-10">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Layer 1 to Layer 2 Weights */}
            {layer1.map((y1) => layer2.map((y2, i) => (
              <WeightPath key={`l1-${y1}-${i}`} x1={80} y1={y1} x2={220} y2={y2} />
            )))}
            {/* Layer 2 to Layer 3 Weights */}
            {layer2.map((y2) => layer3.map((y3, i) => (
              <WeightPath key={`l2-${y2}-${i}`} x1={220} y1={y2} x2={360} y2={y3} />
            )))}
          </svg>

          {/* Nodes - Pure Circles */}
          <div className="flex flex-col justify-between h-full py-10 z-10">
            {layer1.map((y, i) => <Neuron key={i} active />)}
          </div>
          <div className="flex flex-col justify-between h-full z-10">
            {layer2.map((y, i) => <Neuron key={i} delay={i * 0.1} />)}
          </div>
          <div className="flex flex-col justify-between h-full py-20 z-10">
            {layer3.map((y, i) => <Neuron key={i} color="emerald" />)}
          </div>
        </div>

        {/* Console Log */}
        {/* VERTICAL BASH TERMINAL */}
        <div className="mt-1 bg-black/80 bg-[transparent] rounded-2xl  flex flex-col h-20 overflow-hidden relative">
          {/* Terminal Header Bar */}
          {/* <div className="bg-white/5 px-4 py-1.5 border-b border-white/5 flex items-center justify-between">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-[8px] text-slate-500 uppercase tracking-widest font-black">bash — bitatlim-prod — 80x24</span>
          </div> */}

          {/* Scrolling Content */}
          <div 
            ref={scrollRef}
            className="p-4 overflow-y-auto scrollbar-hide flex flex-col space-y-1 select-none"
          >
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => (
                <motion.p
                  key={log + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[8px] leading-relaxed "
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

          {/* Scanline Overlay for "CRT" feel */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,0,0.02))] bg-[length:100%_2px,3px_100%]"></div>
        </div>

      </div>
    </div>
  );
}

function WeightPath({ x1, y1, x2, y2 }: any) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(99, 102, 241, 0.2)"
      initial={{ strokeWidth: 0.5 }}
      animate={{ 
        strokeWidth: [0.5, 2, 0.5],
        strokeOpacity: [0.1, 0.5, 0.1],
        stroke: ["rgba(99,102,241,0.2)", "rgba(16,185,129,0.4)", "rgba(99,102,241,0.2)"] 
      }}
      transition={{ 
        duration: Math.random() * 2 + 1, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

function Neuron({ active = false, delay = 0, color = "indigo" }: any) {
  const baseColor = color === "indigo" ? "bg-indigo-500" : "bg-emerald-500";
  return (
    <motion.div
      animate={{ 
        boxShadow: active ? [`0 0 0px #6366f1`, `0 0 15px #6366f1`, `0 0 0px #6366f1`] : "none",
        scale: active ? [1, 1.2, 1] : 1
      }}
      transition={{ repeat: Infinity, duration: 2, delay }}
      className={`w-3 h-3 rounded-full border border-white/20 ${active ? baseColor : 'bg-slate-800'}`}
    />
  );
}