"use client";
import Link from "next/link";
import OrbitMark from "./OrbitMark";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { usePathname } from "next/navigation";

const stats = [
  { label: "Projects shipped", value: "8+" },
  { label: "Research", value: "Active" },
  { label: "Verbal Languages", value: "5" },
];

export default function Footer() {
    const pathname = usePathname();
    
    // Define which routes should use the light theme. 
    // Add any other light pages to this array.
    const isPort = ["/portfolio"].includes(pathname);

    if (isPort) {
      return 
    }
  
  return (
    <footer className="relative z-30 bg-[#0B0E13] text-[#F6F6F3]/50 pt-24 pb-10 selection:bg-[#4A54F1] selection:text-[#F6F6F3]">
      {/* Belly-Up Curve Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10 -translate-y-full">
        <svg 
          className="relative block w-full h-[40px] md:h-[80px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* A smooth quadratic bezier curve that forms a dome (belly up) */}
          <path d="M0,120 Q600,0 1200,120 Z" fill="#0B0E13" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-[#F6F6F3]/10">
          {/* Identity */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <OrbitMark size="sm" tone="ion" />
              <span
                className="text-lg font-black text-[#F6F6F3] uppercase tracking-widest"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Paktinyar
              </span>
            </Link>
            <p className="text-sm font-light leading-relaxed max-w-sm text-[#F6F6F3]/60">
              Software engineer and bioinformatics researcher based in Istanbul. 
              Building backend systems and applied ML, one careful decision at a time.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none flex items-center justify-center hover:bg-[#F6F6F3] hover:text-[#0B0E13] text-[#F6F6F3] transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-[15px]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none flex items-center justify-center hover:bg-[#F6F6F3] hover:text-[#0B0E13] text-[#F6F6F3] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-[15px]" />
              </a>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-6 md:gap-12">
            {/* Nav */}
            <div className="md:col-span-3 space-y-4 md:space-y-5 mt-2">
              <p className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-[#4A54F1]">Navigate</p>
              <div className="flex flex-col gap-3 md:gap-4 text-[13px] md:text-sm font-light text-[#F6F6F3]/60">
                <Link href="/" className="hover:text-[#F6F6F3] transition-colors w-fit">Home</Link>
                <Link href="/portfolio" className="hover:text-[#F6F6F3] transition-colors w-fit">Work</Link>
                <Link href="/portfolio#experiences" className="hover:text-[#F6F6F3] transition-colors w-fit">Experience</Link>
                <a href="#contact-section" className="hover:text-[#F6F6F3] transition-colors w-fit">Contact</a>
              </div>
            </div>

            {/* Stats - Brutalist Wireframe */}
            <div className="md:col-span-4 mt-2">
              <p className="font-mono text-[11px] md:text-xs uppercase tracking-widest text-[#4A54F1] mb-4 md:mb-5">Telemetry</p>
              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-px md:bg-[#F6F6F3]/20">
                {[
                  { label: "Projects", mdLabel: "Projects shipped", value: "8+" },
                  { label: "Research", mdLabel: "Research", value: "Active" },
                  { label: "Languages", mdLabel: "Verbal Languages", value: "5" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`py-2.5 md:p-5 bg-transparent md:bg-[#0B0E13] flex flex-row md:flex-col justify-between items-center md:items-start border-b border-[#F6F6F3]/5 md:border-0 last:border-0 ${i === 2 ? "md:col-span-2 md:flex-row md:items-center" : "md:aspect-square"}`}
                  >
                    <div className="text-[10px] md:text-[10px] font-mono text-[#F6F6F3]/40 uppercase tracking-wider">
                      <span className="md:hidden">{s.label}</span>
                      <span className="hidden md:inline">{s.mdLabel}</span>
                    </div>
                    <div className="text-[14px] md:text-3xl font-black text-[#F6F6F3]" style={{ fontFamily: "var(--font-display)" }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[#F6F6F3]/30 uppercase">
            © {new Date().getFullYear()} ISHAQ PAKTINYAR. SYS_ONLINE.
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-[#F6F6F3]/40 uppercase">
            <span className="w-2 h-2 rounded-none bg-[#4A54F1] animate-pulse" />
            Accepting Load
          </div>
        </div>
      </div>
    </footer>
  );
}