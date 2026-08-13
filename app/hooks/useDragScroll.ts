import { useRef } from "react";

export function useDragScroll() {
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);
  const originalSnap = useRef<string>("");

  // Physics tracking for flick momentum
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);

  return {
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => {
      const slider = e.currentTarget;
      isDown.current = true;
      dragDistance.current = 0;

      originalSnap.current = window.getComputedStyle(slider).getPropertyValue("scroll-snap-type");
      slider.style.scrollSnapType = "none";
      slider.style.scrollBehavior = "auto"; 
      slider.style.cursor = "grabbing";
      document.body.style.userSelect = "none";

      startX.current = e.pageX - slider.offsetLeft;
      scrollLeft.current = slider.scrollLeft;

      lastX.current = e.pageX;
      lastTime.current = performance.now();
      velocity.current = 0;
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      if (!isDown.current) return;
      const slider = e.currentTarget;
      isDown.current = false;
      slider.style.cursor = "grab";
      slider.style.scrollSnapType = originalSnap.current;
      slider.style.scrollBehavior = "smooth";
      document.body.style.userSelect = "";
    },
    onMouseUp: (e: React.MouseEvent<HTMLElement>) => {
      if (!isDown.current) return;
      const slider = e.currentTarget;
      isDown.current = false;
      slider.style.cursor = "grab";
      slider.style.scrollSnapType = originalSnap.current;
      slider.style.scrollBehavior = "smooth";
      document.body.style.userSelect = "";

      // Apply flick momentum if swipe was fast enough
      if (Math.abs(velocity.current) > 0.2) {
        // Negate velocity because dragging right (positive) means scrolling left (negative)
        const amplitude = -velocity.current * 400; 
        slider.scrollBy({ left: amplitude, behavior: "smooth" });
      }
    },
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      if (!isDown.current) return;
      e.preventDefault();
      
      const slider = e.currentTarget;

      // Track velocity
      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const v = (e.pageX - lastX.current) / dt;
        velocity.current = velocity.current * 0.2 + v * 0.8; // Smooth velocity
      }
      lastX.current = e.pageX;
      lastTime.current = now;

      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX.current) * 1.0; 
      dragDistance.current = Math.abs(walk);
      
      requestAnimationFrame(() => {
        slider.scrollLeft = scrollLeft.current - walk;
      });
    },
    onClickCapture: (e: React.MouseEvent<HTMLElement>) => {
      if (dragDistance.current > 5) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    style: { cursor: "grab" },
  };
}
