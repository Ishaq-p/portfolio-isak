"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import ArcRail, { ArcRailItem } from "./ArcRail";

interface TabScrollProps {
  items: ArcRailItem[];
  children: ReactNode;
}

/**
 * Full-viewport snap-scroll shell paired with a curved drag-scroll rail (ArcRail).
 * Each direct child should be a <TabSection id="...">, in the same order as `items`.
 */
export default function TabScroll({ items, children }: TabScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const suppressObserver = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.querySelectorAll("[data-tab-section]")) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserver.current) return;
        let best: { index: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (!best || entry.intersectionRatio > best.ratio) {
              best = { index, ratio: entry.intersectionRatio };
            }
          }
        }
        if (best) {
          setActiveIndex(best.index);
          const theme = sections[best.index].getAttribute("data-theme") || "light";
          setActiveTheme(theme as "light" | "dark");
        }
      },
      { root: container, threshold: [0.4, 0.6, 0.8] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [children]);

  const handleSelect = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const sections = Array.from(container.querySelectorAll("[data-tab-section]")) as HTMLElement[];
    const el = sections[index];
    if (!el) return;

    suppressObserver.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(index);
    const theme = el.getAttribute("data-theme") || "light";
    setActiveTheme(theme as "light" | "dark");

    window.clearTimeout((handleSelect as any)._t);
    (handleSelect as any)._t = window.setTimeout(() => {
      suppressObserver.current = false;
    }, 500);
  };

  return (
    <>
      <ArcRail items={items} activeIndex={activeIndex} onSelect={handleSelect} theme={activeTheme} />
      <div
        ref={containerRef}
        className="h-[calc(100dvh-60px)] md:h-dvh overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth scrollbar-hide"
      >
        {children}
      </div>
    </>
  );
}

export function TabSection({
  id,
  className = "",
  "data-theme": dataTheme,
  children,
  noFlex = false
}: {
  id: string;
  className?: string;
  "data-theme"?: "light" | "dark";
  children: ReactNode;
  noFlex?: boolean;
}) {
  return (
    <section
      data-tab-section={id}
      data-theme={dataTheme}
      className={`relative h-[calc(100dvh-60px)] md:h-dvh w-full snap-start ${!noFlex && "flex flex-col"} ${className}`}
    >
      {children}
    </section>
  );
}