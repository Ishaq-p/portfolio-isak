"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";

export default function LineEyes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAwake, setIsAwake] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    let sleepTimer: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsAwake(true);

      clearTimeout(sleepTimer);
      sleepTimer = setTimeout(() => {
        setIsAwake(false);
      }, 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(sleepTimer);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!isAwake) return;
    let blinkTimer: NodeJS.Timeout;

    const scheduleBlink = () => {
      const nextBlink = Math.random() * 4000 + 1000;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 120);
      }, nextBlink);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimer);
  }, [isAwake]);

  const pupilX = useSpring(0, { stiffness: 400, damping: 25 });
  const pupilY = useSpring(0, { stiffness: 400, damping: 25 });

  useAnimationFrame(() => {
    if (!containerRef.current || !isAwake) {
      pupilX.set(0);
      pupilY.set(0);
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = mouseX.get() - centerX;
    const dy = mouseY.get() - centerY;

    const maxMoveX = 14; // Wide tracking horizontally
    const maxMoveY = 4;  // Tight tracking vertically inside the pill

    pupilX.set(Math.max(-maxMoveX, Math.min(maxMoveX, dx * 0.05)));
    pupilY.set(Math.max(-maxMoveY, Math.min(maxMoveY, dy * 0.05)));
  });

  const isClosed = !isAwake || isBlinking;

  return (
    <div
      className="relative flex items-center justify-center w-16 md:w-24 h-8 -my-[14px] origin-left"
      ref={containerRef}
    >
      {/* The Line that stretches into glasses */}
      <motion.div
        initial={{ height: 3, borderRadius: 2 }}
        animate={{
          height: isClosed ? 3 : 24,
          borderRadius: isClosed ? 2 : 12,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute top-1/2 left-0 w-full bg-ion -translate-y-1/2 z-20 flex items-center justify-center overflow-hidden"
      >
        {/* The Black Dots (Pupils) */}
        <motion.div
          className="absolute flex gap-5"
          style={{ x: pupilX, y: pupilY }}
          animate={{ opacity: isClosed ? 0 : 1 }}
          transition={{ duration: 0.1 }}
        >
          <div className="w-[6px] h-[6px] bg-ink rounded-full" />
          <div className="w-[6px] h-[6px] bg-ink rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
