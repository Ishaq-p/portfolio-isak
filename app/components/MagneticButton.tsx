"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

export default function MagneticButton({ 
  href, 
  text = "Initialize", 
  className = "" 
}: { 
  href: string; 
  text?: string; 
  className?: string; 
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`flex items-center justify-center gap-2 px-7 py-4 rounded-none border border-ink/15 hover:bg-ink hover:text-paper hover:border-ink text-ink transition-colors duration-300 group shrink-0 ${className}`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] font-medium pointer-events-none">
        {text}
      </span>
      <LuArrowRight className="group-hover:translate-x-1 transition-transform pointer-events-none" />
    </motion.a>
  );
}
