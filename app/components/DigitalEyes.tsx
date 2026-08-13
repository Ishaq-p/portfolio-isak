"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TextPupil({ 
  className = "", 
  top = "50%", 
  left = "50%", 
  maxMove = 8 
}: { 
  className?: string;
  top?: string;
  left?: string;
  maxMove?: number;
}) {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const pupilRef = useRef<HTMLDivElement>(null);

  const [isAwake, setIsAwake] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // Wake and Sleep Logic
  useEffect(() => {
    let sleepTimer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable tracking on mobile
      
      setMousePos({ x: e.clientX, y: e.clientY });
      
      setIsAwake(true);
      
      clearTimeout(sleepTimer);
      sleepTimer = setTimeout(() => {
        setIsAwake(false);
      }, 3000); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(sleepTimer);
    };
  }, []);

  // Random Blink Logic
  useEffect(() => {
    if (!isAwake) return;

    let blinkTimer: NodeJS.Timeout;
    
    const scheduleBlink = () => {
      const nextBlink = Math.random() * 3000 + 2000; // Random between 2s and 5s
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 150); // Blink closed for 150ms
      }, nextBlink);
    };

    scheduleBlink();

    return () => clearTimeout(blinkTimer);
  }, [isAwake]);

  const calculateOffset = () => {
    if (!pupilRef.current || !isAwake) return { x: 0, y: 0 };
    
    const rect = pupilRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;

    const x = Math.max(-maxMove, Math.min(maxMove, dx * 0.04));
    const y = Math.max(-maxMove, Math.min(maxMove, dy * 0.04));

    return { x, y };
  };

  const offset = calculateOffset();
  const isClosed = !isAwake || isBlinking;

  return (
    <div 
      ref={pupilRef}
      className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 pointer-events-none z-10 hidden md:flex items-center justify-center ${className}`}
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      <motion.div 
        className="w-full h-full bg-ink rounded-full shadow-sm"
        animate={{ 
          x: offset.x, 
          y: offset.y,
          scaleY: isClosed ? 0 : 1
        }}
        transition={{ 
          type: "spring", 
          stiffness: isClosed ? 600 : 400, 
          damping: isClosed ? 40 : 30, 
          mass: 0.5 
        }}
      />
    </div>
  );
}
