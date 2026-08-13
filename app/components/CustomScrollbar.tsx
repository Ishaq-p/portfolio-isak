"use client";
import { useEffect, useRef, useState } from "react";

interface CustomScrollbarProps {
  scrollRef: React.RefObject<HTMLElement | null>;
  className?: string;
  theme?: "light" | "dark";
}

export default function CustomScrollbar({ scrollRef, className = "", theme = "light" }: CustomScrollbarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(100);

  // Sync from scroll container to scrollbar
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      
      // Update thumb width based on visible ratio
      const ratio = clientWidth / scrollWidth;
      const tWidth = Math.max(ratio * 100, 10); // Minimum 10%
      setThumbWidth(tWidth);

      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      setProgress(scrollLeft / maxScroll);
    };

    // Initial run and event bindings
    updateScroll();
    
    // We use a small timeout to ensure initial layout is calculated, since data loading can delay accurate scrollWidth
    setTimeout(updateScroll, 100);

    container.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);

    return () => {
      container.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [scrollRef]);

  // Handle Dragging
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const container = scrollRef.current;
    if (!track || !container) return;

    // We don't want snap while dragging scrollbar
    const originalSnap = container.style.scrollSnapType;
    container.style.scrollSnapType = "none";
    document.body.style.userSelect = "none";

    const updateScrollFromMouse = (clientX: number) => {
      const rect = track.getBoundingClientRect();
      const trackWidth = rect.width;
      const tWidthPx = (thumbWidth / 100) * trackWidth;
      
      // Calculate where the mouse is in the track, centering the thumb on the cursor
      const usableTrack = trackWidth - tWidthPx;
      const x = clientX - rect.left - (tWidthPx / 2);
      
      let newProgress = x / usableTrack;
      newProgress = Math.max(0, Math.min(1, newProgress));

      const { scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      container.scrollLeft = newProgress * maxScroll;
    };

    updateScrollFromMouse(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        updateScrollFromMouse(moveEvent.clientX);
      });
    };

    const onMouseUp = () => {
      container.style.scrollSnapType = originalSnap;
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const trackBg = theme === "dark" ? "bg-white/10" : "bg-ink/10";
  const thumbBg = theme === "dark" ? "bg-white" : "bg-ink";

  return (
    <div className={`w-full py-4 flex items-center justify-center ${className}`}>
      <div 
        ref={trackRef}
        className={`relative w-64 md:w-[400px] lg:w-[500px] h-[3px] rounded-full cursor-pointer hover:scale-y-[1.5] transition-transform ${trackBg}`}
        onMouseDown={handleDrag}
      >
        <div 
          className={`absolute top-0 bottom-0 rounded-full ${thumbBg} shadow-sm transition-all duration-75 ease-out`}
          style={{
            width: `${thumbWidth}%`,
            left: `${progress * (100 - thumbWidth)}%`
          }}
        />
      </div>
    </div>
  );
}
