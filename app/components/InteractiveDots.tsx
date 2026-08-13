"use client";
import React, { useRef, useEffect } from "react";

export default function InteractiveDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    
    // Dot settings
    const spacing = 32;
    const baseRadius = 1.2;
    const maxPullDistance = 250; 
    const pullStrength = 0.4; 
    const returnSpeed = 0.08; 

    let dots: { ox: number; oy: number; x: number; y: number }[] = [];
    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      dots = [];
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({ ox: x, oy: y, x: x, y: y });
        }
      }
    };

    let animationFrameId: number | null = null;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(11, 14, 19, 0.12)"; // ink color at 12% opacity

      const isMobile = window.innerWidth < 768;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        if (!isMobile) {
          const dx = mouse.x - dot.ox;
          const dy = mouse.y - dot.oy;
          const distance = Math.sqrt(dx * dx + dy * dy);

          let targetX = dot.ox;
          let targetY = dot.oy;

          if (distance < maxPullDistance) {
            const force = Math.pow((maxPullDistance - distance) / maxPullDistance, 1.5);
            targetX = dot.ox + dx * force * pullStrength;
            targetY = dot.oy + dy * force * pullStrength;
          }

          dot.x += (targetX - dot.x) * returnSpeed;
          dot.y += (targetY - dot.y) * returnSpeed;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, baseRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      if (!isMobile) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        animationFrameId = null;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      init();
      if (window.innerWidth < 768) {
        animate(); // Draw static frame on mobile resize
      } else if (!animationFrameId) {
        animate(); // Restart animation loop if crossing breakpoint to desktop
      }
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
}
