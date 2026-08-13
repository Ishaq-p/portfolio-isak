"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import type { IconType } from "react-icons";

export interface ArcRailItem {
  id: string;
  label: string;
  icon: IconType;
  accent: string; // hex, used for active badge fill + label pill
}

interface ArcRailProps {
  items: ArcRailItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
  theme?: "light" | "dark";
}

const ITEM_GAP = 84; // px between item centers along the arc
const ARC_DEPTH = 34; // how far items bow left/right from the spine
const RAIL_IDLE_MS = 2000; // rail auto-collapses after this long without interaction

/**
 * Curved, drag-scrollable section rail. Items sit on an arc; the one nearest
 * the vertical center is "active" — pulled out, scaled up, accent-highlighted.
 * Distance from center drives scale/opacity/x-offset for the depth-of-field feel.
 * The entire rail collapses after RAIL_IDLE_MS of inactivity — reappearing on
 * hover or section change. Adapts colors based on the `theme` prop.
 */
export default function ArcRail({ items, activeIndex, onSelect, theme = "light" }: ArcRailProps) {
  const railHeight = 560; // visible arc viewport height
  const centerY = railHeight / 2;

  // offset is in px: how far the "track" has scrolled. offset 0 => item[0] centered.
  const offset = useMotionValue(activeIndex * ITEM_GAP);
  const [renderOffset, setRenderOffset] = useState(activeIndex * ITEM_GAP);
  const dragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wakeRail = useCallback(() => {
    setIsVisible(true);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIsVisible(false), RAIL_IDLE_MS);
  }, []);

  useEffect(() => {
    wakeRail();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [wakeRail]);

  // re-arm the idle timer whenever the active section changes (e.g. normal page scroll)
  useEffect(() => {
    wakeRail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // keep offset in sync when parent-driven activeIndex changes (e.g. from scroll-snap sections)
  useEffect(() => {
    if (dragging.current) return;
    const target = activeIndex * ITEM_GAP;
    const controls = { cancelled: false };
    const start = offset.get();
    const startTime = performance.now();
    const duration = 380;
    function step(now: number) {
      if (controls.cancelled) return;
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      offset.set(start + (target - start) * eased);
      setRenderOffset(offset.get());
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return () => {
      controls.cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const commitNearest = useCallback(() => {
    const raw = offset.get() / ITEM_GAP;
    const nearest = Math.round(Math.max(0, Math.min(items.length - 1, raw)));
    onSelect(nearest);
  }, [items.length, offset, onSelect]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    wakeRail();
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    wakeRail();
    const dy = e.movementY;
    const next = Math.max(0, Math.min((items.length - 1) * ITEM_GAP, offset.get() + dy));
    offset.set(next);
    setRenderOffset(next);
  };
  const handlePointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    commitNearest();
  };

  const wheelLock = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    wakeRail();
    
    if (wheelLock.current) return;
    if (Math.abs(e.deltaY) < 15) return; // ignore micro-scrolls
    
    wheelLock.current = true;
    const dir = e.deltaY > 0 ? 1 : -1;
    const nextIndex = Math.max(0, Math.min(items.length - 1, activeIndex + dir));
    
    if (nextIndex !== activeIndex) {
      onSelect(nextIndex);
    }
    
    // Lock wheel scrolling briefly to prevent double jumps
    setTimeout(() => {
      wheelLock.current = false;
    }, 700);
  };

  return (
    <motion.div
      ref={containerRef}
      className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[60] hidden sm:block select-none touch-none"
      style={{ height: railHeight, width: 220 }}
      animate={{
        x: isVisible ? 0 : 180,
        opacity: isVisible ? 1 : 0.35,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 28,
        mass: 0.8
      }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onMouseEnter={wakeRail}
      onTouchStart={wakeRail}
    >
      {/* guide arc */}
      <svg
        className="absolute right-0 top-0 pointer-events-none drop-shadow-sm"
        width={ARC_DEPTH + 12}
        height={railHeight}
        aria-hidden="true"
      >
        <path
          d={`M ${ARC_DEPTH} 0 Q ${ARC_DEPTH - ARC_DEPTH} ${centerY} ${ARC_DEPTH} ${railHeight}`}
          fill="none"
          stroke={theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(11,14,19,0.08)"}
          strokeWidth={2}
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
      </svg>

      {items.map((item, i) => {
        const itemCenter = i * ITEM_GAP - renderOffset + centerY;
        const dist = itemCenter - centerY;
        const absDist = Math.abs(dist);
        const isActive = i === activeIndex && absDist < ITEM_GAP * 0.5;

        // depth-of-field curves
        const norm = Math.min(1, absDist / (ITEM_GAP * 2.2));
        const scale = 1 - norm * 0.32;
        const opacity = absDist > ITEM_GAP * 3.2 ? 0 : 1 - norm * 0.78;
        // arc bow: items further from center sit further right (recede), active pulls left
        const bow = Math.sin((absDist / (ITEM_GAP * 3)) * (Math.PI / 2)) * ARC_DEPTH;
        const pullLeft = isActive ? -34 : 0;
        const Icon = item.icon;

        if (itemCenter < -60 || itemCenter > railHeight + 60) return null;

        return (
          <div
            key={item.id}
            className="absolute right-0 flex items-center justify-end gap-3 cursor-pointer group"
            style={{
              top: itemCenter,
              transform: `translate(${bow + pullLeft}px, -50%) scale(${scale})`,
              opacity,
              transition: dragging.current ? "none" : "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
            onClick={() => onSelect(i)}
          >
            <motion.span
              className="whitespace-nowrap font-medium text-[13px] shadow-sm"
              animate={{
                color: isActive
                  ? (theme === "dark" ? "#FFFFFF" : "#0B0E13")
                  : (theme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(11,14,19,0.4)"),
                opacity: isVisible || isActive ? 1 : 0,
              }}
              transition={{ opacity: { duration: 0.4 } }}
              style={{
                paddingInline: isActive ? 14 : 0,
                paddingBlock: isActive ? 7 : 0,
                borderRadius: 999,
                border: isActive
                  ? (theme === "dark" ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(11,14,19,0.08)")
                  : "1px solid transparent",
                background: isActive
                  ? (theme === "dark" 
                      ? "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.08))" 
                      : "#FFFFFF")
                  : "transparent",
                backdropFilter: isActive && theme === "dark" ? "blur(12px)" : "none",
                boxShadow: isActive && theme === "light" ? "0 4px 12px rgba(0,0,0,0.04)" : "none",
                pointerEvents: isVisible || isActive ? "auto" : "none",
              }}
            >
              {item.label}
            </motion.span>

            <motion.div
              className="shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              animate={{
                width: isActive ? 46 : 36,
                height: isActive ? 46 : 36,
                backgroundColor: isActive
                  ? `${item.accent}33`
                  : (theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(11,14,19,0.03)"),
                boxShadow: isActive 
                  ? `0 0 0 2px ${item.accent}77, 0 8px 20px -4px ${item.accent}55` 
                  : (theme === "dark" ? "inset 0 0 0 1px rgba(255,255,255,0.15)" : "0 0 0 0px transparent"),
              }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <Icon
                size={isActive ? 18 : 16}
                className="transition-colors duration-300 group-hover:text-ink dark:group-hover:text-white"
                color={isActive
                  ? item.accent
                  : (theme === "dark" ? "rgba(255,255,255,0.7)" : "#A1A5A9")}
              />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}