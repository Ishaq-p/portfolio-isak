"use client";
import { motion, AnimatePresence } from "framer-motion";

export interface TabRailItem {
  id: string;
  index: string; // "01", "02" ...
  label: string;
  tone: "light" | "dark"; // dot fill against paper vs ink section backgrounds isn't relevant — rail is always fixed over everything
}

interface TabRailProps {
  items: TabRailItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function TabRail({ items, activeId, onSelect }: TabRailProps) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-[60] hidden sm:flex flex-col items-end gap-4"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <div key={item.id} className="group/dot relative flex items-center justify-end">
            <AnimatePresence>
              {/* Label disclosure — shown on hover of this dot, or persistently for the active one on md+ */}
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="pointer-events-none absolute right-full mr-3 opacity-0 group-hover/dot:opacity-100 group-hover/dot:pointer-events-auto transition-opacity duration-200"
              >
                <button
                  onClick={() => onSelect(item.id)}
                  className="pointer-events-auto flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 shadow-lg shadow-black/20"
                >
                  <span className="font-mono text-[9px] tracking-[0.15em] text-ion-soft">{item.index}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/85">
                    {item.label}
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => onSelect(item.id)}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive}
              className="relative flex items-center justify-center w-6 h-6"
            >
              <motion.span
                className="rounded-full border"
                animate={{
                  width: isActive ? 9 : 6,
                  height: isActive ? 9 : 6,
                  backgroundColor: isActive ? "#4A54F1" : "rgba(11,14,19,0)",
                  borderColor: isActive ? "#4A54F1" : "rgba(11,14,19,0.35)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </button>
          </div>
        );
      })}

      {/* vertical connecting thread — systems-diagram touch */}
      <div
        aria-hidden="true"
        className="absolute right-[11px] top-3 bottom-3 w-px bg-ink/10 -z-10"
      />
    </nav>
  );
}