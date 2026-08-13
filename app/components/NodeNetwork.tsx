"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function NodeNetwork() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-[450px] h-[450px] flex items-center justify-center cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CanvasRenderer isHovered={isHovered} />
    </div>
  );
}

function CanvasRenderer({ isHovered }: { isHovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targets = useRef({ scale: 1, speed: 0.002 });

  useEffect(() => {
    if (isHovered) {
      targets.current.scale = 1.3;
      targets.current.speed = 0.008;
    } else {
      targets.current.scale = 1;
      targets.current.speed = 0.002;
    }
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 450;
    let height = 450;
    
    // Hardcode DPR to 1 for maximum fill-rate performance.
    // Line rendering on 2x DPI canvas is incredibly expensive.
    const dpr = 1; 
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const numNodes = 50; // Ultra-lightweight node count
    const radius = 130;
    const radiusDoubleInv = 1 / (radius * 2);
    
    const nodes = Array.from({ length: numNodes }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      return {
        x: 0, y: 0, z: 0,
        phi, theta,
        dPhi: (Math.random() - 0.5) * 0.015,
        dTheta: (Math.random() - 0.5) * 0.015,
        px: 0, py: 0, z2: 0, scale: 0,
        highlight: i % 7 === 0
      };
    });

    // We will batch canvas drawing operations by opacity buckets.
    // This reduces ctx.beginPath() and ctx.stroke() calls from ~1000 down to exactly 10 per frame!
    const lineBuckets: number[][] = Array.from({ length: 11 }, () => []);

    let currentScale = 1;
    let rotationY = 0;
    const rotationX = 0.3; 
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    let currentSpeed = 0.002;

    let animationFrameId: number;
    let lastTime = performance.now();
    const fps = 40;
    const interval = 1000 / fps;

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      const dt = time - lastTime;
      if (dt < interval) return; // Drop frame to maintain 40 FPS target
      lastTime = time - (dt % interval);

      ctx.clearRect(0, 0, width, height);

      currentScale += (targets.current.scale - currentScale) * 0.05;
      currentSpeed += (targets.current.speed - currentSpeed) * 0.05;
      rotationY += currentSpeed;

      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const speedMult = currentSpeed / 0.002;

      for (let i = 0; i < numNodes; i++) {
        const node = nodes[i];
        
        node.phi += node.dPhi * speedMult;
        node.theta += node.dTheta * speedMult;
        
        if (node.phi < 0) { node.phi = -node.phi; node.dPhi *= -1; }
        if (node.phi > Math.PI) { node.phi = Math.PI - (node.phi - Math.PI); node.dPhi *= -1; }

        node.x = radius * Math.cos(node.theta) * Math.sin(node.phi);
        node.y = radius * Math.sin(node.theta) * Math.sin(node.phi);
        node.z = radius * Math.cos(node.phi);

        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.x * sinY + node.z * cosY;
        let y1 = node.y;

        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        
        const scale = 300 / (300 + z2); 
        node.px = (width / 2) + x1 * scale * currentScale;
        node.py = (height / 2) + y2 * scale * currentScale;
        node.z2 = z2;
        node.scale = scale;
      }

      nodes.sort((a, b) => b.z2 - a.z2);

      const maxDist = 95 * currentScale;
      const maxDistSq = maxDist * maxDist;

      // Group lines into buckets based on opacity level (0.1 to 1.0)
      for (let i = 0; i < numNodes; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < numNodes; j++) {
          const n2 = nodes[j];
          
          const dx = n1.px - n2.px;
          if (dx * dx > maxDistSq) continue;
          
          const dy = n1.py - n2.py;
          if (dy * dy > maxDistSq) continue;
          
          const dz = n1.z2 - n2.z2;
          const distSq = dx * dx + dy * dy + dz * dz;
          
          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const baseOpacity = (1 - dist / maxDist) * 0.3;
            const depthFade1 = 1 - (n1.z2 + radius) * radiusDoubleInv;
            const depthFade2 = 1 - (n2.z2 + radius) * radiusDoubleInv;
            const depthFade = depthFade1 < depthFade2 ? depthFade1 : depthFade2;
            
            const finalOpacity = baseOpacity * (depthFade < 0.1 ? 0.1 : depthFade);
            
            // Bucket index 1 to 10
            let bucketIdx = Math.floor(finalOpacity * 10 * 3.33); // scale up slightly for better visibility
            if (bucketIdx < 1) bucketIdx = 1;
            if (bucketIdx > 10) bucketIdx = 10;
            
            lineBuckets[bucketIdx].push(n1.px, n1.py, n2.px, n2.py);
          }
        }
      }

      // Draw all lines using batched pathing (MASSIVE performance boost)
      ctx.lineWidth = 1;
      for (let i = 1; i <= 10; i++) {
        const bucket = lineBuckets[i];
        if (bucket.length === 0) continue;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(15, 23, 42, ${i / 10})`;
        for (let j = 0; j < bucket.length; j += 4) {
          ctx.moveTo(bucket[j], bucket[j+1]);
          ctx.lineTo(bucket[j+2], bucket[j+3]);
        }
        ctx.stroke();
        
        // Clear bucket for next frame
        bucket.length = 0;
      }

      // Draw Nodes
      for (let i = 0; i < numNodes; i++) {
        const n = nodes[i];
        let opacity = 1 - (n.z2 + radius) * radiusDoubleInv;
        if (opacity < 0.1) opacity = 0.1;
        
        ctx.beginPath();
        ctx.arc(n.px, n.py, (n.scale * 2.2 * currentScale), 0, Math.PI * 2);
        
        if (n.highlight) {
          ctx.fillStyle = `rgba(46, 91, 255, ${opacity * 1.5})`;
        } else {
          ctx.fillStyle = `rgba(15, 23, 42, ${opacity * 0.8})`;
        }
        ctx.fill();
      }

      // Draw Outer Orbital Rings
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, (radius + 35) * currentScale, ((radius + 35) * 0.25) * currentScale, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.05)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2, (radius + 20) * currentScale, ((radius + 20) * 0.9) * currentScale, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.02)";
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="w-[450px] h-[450px]" style={{ width: 450, height: 450 }} />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.5, scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-ion/5 rounded-full blur-3xl pointer-events-none" 
      />
    </>
  );
}
