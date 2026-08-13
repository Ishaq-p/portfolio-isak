"use client";
import { useRef } from "react";
import { motion, useAnimationFrame } from "framer-motion";

export default function DNALine({ isActive = false }: { isActive?: boolean }) {
  const time = useRef(0);
  
  // Two paths for the double helix
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  // Constants for the wave
  const width = 96; // matches w-24 (96px)
  const amplitude = 12; // how high/low the wave goes
  const frequency = 0.05; // how many waves fit in the width
  const speed = 0.08; // how fast it scrolls

  // Smoothly transition the amplitude so it doesn't snap
  const currentAmp = useRef(0);

  useAnimationFrame((_, delta) => {
    // Target amplitude is full when active, 0 when not
    const targetAmp = isActive ? amplitude : 0;
    
    // Smoothly interpolate amplitude (lerp)
    currentAmp.current += (targetAmp - currentAmp.current) * (delta * 0.005);
    
    // If we're basically a straight line and not active, we can pause the time
    if (!isActive && currentAmp.current < 0.1) {
      currentAmp.current = 0;
    } else {
      time.current += speed * (delta / 16);
    }

    // Generate path data
    let d1 = `M 0,16 `;
    let d2 = `M 0,16 `;
    
    // We draw the wave point by point
    for (let x = 0; x <= width; x += 2) {
      // Calculate y using sine/cosine
      const y1 = 16 + Math.sin(x * frequency - time.current) * currentAmp.current;
      const y2 = 16 + Math.sin(x * frequency - time.current + Math.PI) * currentAmp.current; // Pi out of phase
      
      d1 += `L ${x},${y1} `;
      d2 += `L ${x},${y2} `;
    }

    if (path1Ref.current) path1Ref.current.setAttribute("d", d1);
    if (path2Ref.current) path2Ref.current.setAttribute("d", d2);
  });

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="origin-left w-16 md:w-24 h-8 -my-[14px]"
    >
      <svg viewBox="0 0 96 32" className="w-full h-full overflow-visible">
        {/* We use a thicker stroke when it's flat to match the 3px height of the original line */}
        <path
          ref={path1Ref}
          d="M 0,16 L 96,16"
          fill="transparent"
          stroke="var(--ion)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          ref={path2Ref}
          d="M 0,16 L 96,16"
          fill="transparent"
          stroke="var(--ion)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
