"use client";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";

type Tone = "ink" | "paper" | "ion";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<Size, number> = {
  xs: 22,
  sm: 40,
  md: 96,
  lg: 220,
  xl: 340,
};

type OrbitConfig = {
  tilt: number;
  rx: number;
  ry: number;
  duration: number;
  overdrive: number;
  reverse: boolean;
};

const ORBITS: OrbitConfig[] = [
  { tilt: -18, rx: 1, ry: 0.42, duration: 7, overdrive: 2.0, reverse: false },
  { tilt: 42,  rx: 1, ry: 0.42, duration: 9, overdrive: 2.5, reverse: true  },
  { tilt: 102, rx: 1, ry: 0.42, duration: 11, overdrive: 3.0, reverse: false },
];

interface OrbitMarkProps {
  size?: Size;
  tone?: Tone;
  className?: string;
  static?: boolean;
}

function Electron({
  o,
  px,
  c,
  animate,
  isHovered,
  index,
}: {
  o: OrbitConfig;
  px: number;
  c: { electron: string };
  animate: boolean;
  isHovered: boolean;
  index: number;
}) {
  const electronSize = Math.max(3, px * 0.045);
  const radiusX = (px * o.rx) / 2;
  const radiusY = (px * o.ry) / 2;

  const startAngle = (index * (Math.PI * 2)) / 3;
  const angle = useRef(startAngle);

  const x = useMotionValue(Math.cos(startAngle) * radiusX);
  const y = useMotionValue(Math.sin(startAngle) * radiusY);

  useAnimationFrame((_, delta) => {
    if (!animate) return;

    const currentDuration = isHovered ? o.overdrive : o.duration;
    const speed = (Math.PI * 2) / (currentDuration * 1000);
    const step = speed * delta;

    angle.current += o.reverse ? -step : step;

    x.set(Math.cos(angle.current) * radiusX);
    y.set(Math.sin(angle.current) * radiusY);
  });

  return (
    <motion.div
      className="absolute rounded-full z-20"
      style={{
        width: `${electronSize}px`,
        height: `${electronSize}px`,
        backgroundColor: c.electron,
        boxShadow: `0 0 ${px * 0.08}px ${c.electron}`,
        left: `calc(50% - ${electronSize / 2}px)`,
        top: `calc(50% - ${electronSize / 2}px)`,
        x, 
        y, 
      }}
    />
  );
}

export default function OrbitMark({
  size = "md",
  tone = "ion",
  className = "",
  static: isStatic = false,
}: OrbitMarkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const px = SIZES[size];

  const colors: Record<Tone, { ring: string; nucleus: string; electron: string; glow: string }> = {
    ink:   { ring: "rgba(11,14,19,0.16)",  nucleus: "#0B0E13", electron: "#4A54F1", glow: "rgba(74,84,241,0.25)" },
    paper: { ring: "rgba(246,246,243,0.22)", nucleus: "#F6F6F3", electron: "#7B82F7", glow: "rgba(123,130,247,0.35)" },
    ion:   { ring: "rgba(74,84,241,0.18)", nucleus: "#4A54F1", electron: "#1F9E63", glow: "rgba(74,84,241,0.3)" },
  };
  const c = colors[tone];
  
  const animate = !isStatic;

  return (
    <motion.div
      className={`relative shrink-0 flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: `${px}px`, height: `${px}px` }}
      aria-hidden="true"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}   
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ backgroundColor: c.glow, filter: `blur(${px * 0.35}px)` }}
        animate={{ opacity: isHovered ? 0.9 : 0.6, scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {ORBITS.map((o, i) => (
        <div
          key={i}
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `rotate(${o.tilt}deg)` }}
        >
          {/* Ring */}
          <div
            className="absolute transition-colors duration-300" 
            style={{
              width: `${px * o.rx}px`,
              height: `${px * o.ry}px`,
              top: "50%",

              left: "50%",
              transform: "translate(-50%, -50%)",
              borderRadius: "50%", // Forces a true ellipse
              border: `${Math.max(1, px * 0.006)}px solid ${isHovered ? c.glow : c.ring}`,
            }}
          />
          <Electron o={o} px={px} c={c} animate={animate} isHovered={isHovered} index={i} />
        </div>
      ))}

      <motion.div
        className="absolute rounded-full z-10"
        style={{
          width: `${px * 0.155}px`,
          height: `${px * 0.155}px`,
          backgroundColor: c.nucleus,
          boxShadow: tone === "paper" ? `0 0 ${px * 0.12}px rgba(246,246,243,0.5)` : `0 0 ${px * 0.12}px ${c.glow}`,
        }}
        animate={{ scale: isHovered ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      />
    </motion.div>
  );
}