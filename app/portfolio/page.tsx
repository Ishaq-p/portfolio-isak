"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuChevronLeft,
  LuChevronRight,
  LuArrowUpRight,
  LuLanguages,
  LuHeart,
  LuSparkles,
  LuLayers,
  LuFolderGit2,
  LuBriefcase,
  LuGraduationCap,
  LuMessageCircle,
} from "react-icons/lu";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import ProjectCard from "../components/ProjectCard";
import FilterJumble from "../components/FilterJumble";
import ExperienceCard from "../components/ExperienceCard";
import SideNav from "../components/SideNav";
import OrbitMark from "../components/OrbitMark";
import TabScroll, { TabSection } from "../components/TabScroll";
import SkillsTerminal from "../components/SkillsTerminal";
import type { ArcRailItem } from "../components/ArcRail";
import SkillsConstellation from "../components/SkillsConstellation";
import SkillsBubbles from "../components/SkillsBubbles";
import CustomScrollbar from "../components/CustomScrollbar";
import { useDragScroll } from "../hooks/useDragScroll";

const TAB_ITEMS: ArcRailItem[] = [
  { id: "hero", label: "Intro", icon: LuSparkles, accent: "#4A54F1" },
  { id: "competencies", label: "Competencies", icon: LuLayers, accent: "#4A54F1" },
  { id: "projects", label: "Projects", icon: LuFolderGit2, accent: "#4A54F1" },
  { id: "experience", label: "Experience", icon: LuBriefcase, accent: "#4A54F1" },
  { id: "education", label: "Education", icon: LuGraduationCap, accent: "#4A54F1" },
  { id: "impact", label: "Beyond", icon: LuHeart, accent: "#1F9E63" },
  { id: "contact", label: "Contact", icon: LuMessageCircle, accent: "#4A54F1" },
];

const LEVEL_WIDTH: Record<string, string> = {
  Native: "100%",
  Fluent: "88%",
  Intermediate: "60%",
  Beginner: "28%",
};

// Uniform card height shared by Project + Experience horizontal scrollers so
// cards never clip regardless of individual content length.
const CARD_HEIGHT = "min(460px, 60vh)";

export default function Portfolio() {
  const [data, setData] = useState<any>(null);
  const [projects, setProjects] = useState<any>(null);
  const projectScrollRef = useRef<HTMLDivElement>(null);
  const expScrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("ALL");

  const projectDragScroll = useDragScroll();
  const expDragScroll = useDragScroll();

  const filteredProjects = projects?.filter(
    (p: any) => activeFilter === "ALL" || p.short_card.domain.includes(activeFilter)
  );


  useEffect(() => {
    fetch("/data/portfolio.json").then((r) => r.json()).then(setData).catch((e) => console.error("PF_LOAD_ERROR:", e));
  }, []);

  useEffect(() => {
    fetch("/data/projects.json").then((r) => r.json()).then(setProjects).catch((e) => console.error("PF_LOAD_ERROR:", e));
  }, []);

  useEffect(() => {
    if (!data || !projects) return;
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(`[data-tab-section="${hash.slice(1)}"]`);
      el?.scrollIntoView({ block: "start" });
    }
  }, [data, projects]);

  if (!data || !projects) {
    return (
      <div className="bg-paper h-dvh flex items-center justify-center gap-3 text-graphite">
        <OrbitMark size="sm" tone="ion" />
        <span className="text-sm font-medium">Loading archive…</span>
      </div>
    );
  }

  const links = [
    { label: "Email", value: data.contact.email, href: `mailto:${data.contact.email}` },
    { label: "GitHub", value: data.contact.github, href: `https://${data.contact.github}` },
    { label: "LinkedIn", value: data.contact.linkedin, href: `https://${data.contact.linkedin}` },
  ];

  return (
    <main className="bg-paper text-ink selection:bg-ion selection:text-white">
      <SideNav />
      {/* Content offset: clears the left rail on md+, clears the top mobile bar below md */}
      <div className="md:pl-[62px] lg:pl-[72px] pt-[60px] md:pt-0">
        <TabScroll items={TAB_ITEMS}>
          {/* ── 1. HERO ─────────────────────────────────────────────────── */}
          <TabSection id="hero" className="items-center justify-center px-6 md:px-16 lg:px-20 overflow-y-auto scrollbar-hide pt-24 md:pt-0">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 h-fit md:h-auto pb-20 md:pb-0">
              <div className="relative z-10 w-full md:w-[58%] order-2 md:order-1">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <p className="label-eyebrow text-ion mb-6">Backend · ML · Bioinformatics</p>
                  <h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight mb-6 leading-[0.95]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {data.hero.name}
                  </h1>
                  <p className="text-lg md:text-xl font-normal text-graphite max-w-xl leading-relaxed">
                    <span className="text-ink font-medium">{data.hero.title}. </span>
                    {data.hero.value_prop}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="hidden md:flex relative w-full md:w-[32%] items-center justify-center order-1 md:order-2"
              >
                <OrbitMark size="lg" tone="ion" className="!w-56 !h-56" />
              </motion.div>
            </div>
          </TabSection>

          {/* ── 2. CORE STACK (COMPARISON) ───────────────────────────────────────────── */}
          <TabSection id="stack" data-theme="dark" className="bg-ink text-white justify-center overflow-y-auto scrollbar-hide pt-24 md:pt-0">
            <div className="max-w-5xl mx-auto px-6 md:px-10 w-full flex flex-col gap-10 md:gap-32 h-fit md:h-auto pb-20 md:pb-0">
              <div>
                <SkillsBubbles skills={data.skills} />
              </div>
            </div>
          </TabSection>

          {/* ── 3. PROJECTS ─────────────────────────────────────────────── */}
          <TabSection id="projects" className="justify-start md:justify-center px-6 md:px-10 overflow-y-auto overflow-x-hidden scrollbar-hide pt-8 md:pt-0">
            <div className="max-w-6xl mx-auto w-full h-fit md:h-auto pb-4 md:pb-0">
              <header className="flex justify-center mb-4 w-full">
                <FilterJumble projects={projects} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
              </header>

              <div
                ref={projectScrollRef}
                {...projectDragScroll}
                className="flex gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth items-stretch scrollbar-hide py-8 px-4 -mx-4"
                style={{ height: `calc(${CARD_HEIGHT} + 4rem)` }}
              >
                {filteredProjects?.map((project: any) => (
                  <div key={project.id} className="min-w-[85vw] md:min-w-[46vw] lg:min-w-[calc(45%-1rem)] snap-start h-full">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              <CustomScrollbar scrollRef={projectScrollRef} theme="light" className="mt-4" />
            </div>
          </TabSection>

          {/* ── 4. EXPERIENCE ───────────────────────────────────────────── */}
          <TabSection id="experiences" data-theme="dark" className="bg-ink text-white justify-start md:justify-center px-6 md:px-10 overflow-y-auto overflow-x-hidden scrollbar-hide pt-8 md:pt-0">
            <div className="max-w-6xl mx-auto w-full h-fit md:h-auto pb-4 md:pb-0">
              <p className="label-eyebrow text-ion-soft mb-3">Where I&rsquo;ve worked</p>
              <p
                className="text-4xl md:text-5xl font-medium tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Experience.
              </p>

              <div
                ref={expScrollRef}
                {...expDragScroll}
                className="flex gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth items-stretch scrollbar-hide py-5 px-4 -mx-4"
                style={{ height: `calc(${CARD_HEIGHT} + 4rem)` }}
              >
                {data.experience.map((exp: any, index: number) => (
                  <div key={exp.organization} className="min-w-[85vw] md:min-w-[46vw] lg:min-w-[calc(45%-1rem)] snap-start h-full">
                    <ExperienceCard exp={{ ...exp, index: index + 1 }} />
                  </div>
                ))}
              </div>

              <CustomScrollbar scrollRef={expScrollRef} theme="dark" className="mt-0 md:mt-4" />
            </div>
          </TabSection>

          {/* ── 5. EDUCATION + CERTS ──────────────────────────────────────── */}
          <TabSection id="education" className="justify-center px-6 md:px-10 overflow-y-auto scrollbar-hide pt-24 md:pt-0">
            <div className="max-w-5xl mx-auto flex flex-col gap-3 w-full h-fit md:h-auto pb-20 md:pb-0">
              <p className="label-eyebrow text-ion mb-6">Education &amp; Certs</p>

              <div className="space-y-3 overflow-y-auto scrollbar-hide" style={{ maxHeight: "min(38vh, 340px)" }}>
                {data.education.map((edu: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative group"
                  >
                    <div className="relative rounded-[1.75rem] border border-ink/10 bg-paper-dim/60 hover:bg-white hover:border-ion/25 transition-all duration-500 overflow-hidden p-6 md:p-8">
                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <div className="space-y-2 max-w-2xl flex items-start gap-5">
                          <span className="font-mono text-[11px] text-graphite-2 pt-2 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="space-y-1.5">
                            <h3
                              className="text-xl sm:text-2xl font-medium tracking-tight text-ink leading-[1.05]"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {edu.degree}
                            </h3>
                            <p className="text-[15px] font-medium text-graphite">{edu.institution}</p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {edu.field && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide bg-ion/10 text-ion px-2.5 py-1 rounded-full">
                                  {edu.field}
                                </span>
                              )}
                              {edu.honors && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide bg-culture/10 text-culture px-2.5 py-1 rounded-full">
                                  {edu.honors}
                                </span>
                              )}
                              {edu.gpa && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide bg-ink/[0.05] text-graphite px-2.5 py-1 rounded-full">
                                  GPA {edu.gpa}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 flex md:flex-col items-center md:items-end gap-2 md:gap-0.5 pl-11 md:pl-0">
                          <span className="label-eyebrow text-graphite-2">Graduated</span>
                          <span
                            className="text-2xl font-medium tracking-tight text-ink"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {edu.year ?? edu.graduation_year ?? edu.end_year}
                          </span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-ion transition-all duration-700 ease-out" />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
                {data.certifications.map((cert: any, i: number) => (
                  <motion.a
                    key={cert.id}
                    href={cert.credential_url || undefined}
                    target={cert.credential_url ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="group flex flex-col gap-2.5 rounded-xl border border-ink/10 bg-white hover:border-ion/30 hover:shadow-md hover:shadow-ion/5 transition-all duration-300 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="text-[13.5px] font-semibold text-ink leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {cert.title}
                      </h3>
                      <span className="font-mono text-[10px] text-graphite-2 shrink-0">{cert.year}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-semibold uppercase tracking-wide bg-ion/10 text-ion px-2 py-0.5 rounded-full">
                        {cert.issuer}
                      </span>
                      {cert.platform && (
                        <span className="text-[9px] font-semibold uppercase tracking-wide bg-ink/[0.05] text-graphite px-2 py-0.5 rounded-full">
                          {cert.platform}
                        </span>
                      )}
                      {cert.band_score && (
                        <span className="text-[9px] font-semibold uppercase tracking-wide bg-culture/10 text-culture px-2 py-0.5 rounded-full">
                          Band {cert.band_score}
                        </span>
                      )}
                    </div>

                    {cert.credential_url && (
                      <span className="text-[10px] font-semibold text-ion group-hover:text-ion-dim transition-colors w-fit">
                        Verify →
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </TabSection>

          {/* ── 6. SOCIAL IMPACT ──────────────────────────────────────────── */}
          <TabSection id="impact" data-theme="dark" className="bg-ink text-white justify-start md:justify-center px-6 md:px-10 overflow-y-auto scrollbar-hide pt-10 md:pt-0">
            <div className="max-w-6xl mx-auto w-full h-fit md:h-auto pb-20 md:pb-0">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-4 lg:py-8">
                <div className="lg:col-span-4 space-y-4 lg:space-y-8">
                  <div className="flex flex-col gap-1 lg:gap-3">
                    <p className="label-eyebrow text-ion-soft text-[10px] lg:text-xs">Human Interoperability</p>
                    <h2
                      className="text-3xl sm:text-5xl font-medium tracking-tight leading-none text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Languages.
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-0">
                    {data.social_impact.languages.map((lang: any, i: number) => {
                      const levelScore =
                        lang.level === "Native" ? 4 :
                          lang.level === "Fluent" ? 3 :
                            lang.level === "Intermediate" ? 2 : 1;

                      return (
                        <motion.div
                          key={lang.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.05 }}
                          className="flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:p-0 py-2 lg:py-4 lg:border-b border-white/[0.05] last:border-0 hover:lg:px-2 transition-all duration-300 bg-white/[0.02] lg:bg-transparent rounded-[16px] lg:rounded-none border border-white/[0.04] lg:border-none"
                        >
                          <span className="text-[13px] lg:text-[15.5px] font-medium text-white/95 font-sans mb-1 lg:mb-0">{lang.name}</span>
                          <div className="flex items-center gap-2 lg:gap-4">
                            <span className="text-[9px] lg:text-[10px] font-mono text-white/40 uppercase tracking-widest">{lang.level}</span>
                            <div className="flex gap-1 lg:gap-1.5">
                              {[1, 2, 3, 4].map(dot => (
                                <div
                                  key={dot}
                                  className={`w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full ${dot <= levelScore ? 'bg-ion-soft shadow-[0_0_8px_rgba(123,130,247,0.7)]' : 'bg-white/10'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4 lg:space-y-8 lg:pr-16 xl:pr-24">
                  <div className="flex flex-col gap-1 lg:gap-3">
                    <p className="label-eyebrow text-ion-soft text-[10px] lg:text-xs">Beyond the stack</p>
                    <h2
                      className="text-3xl sm:text-5xl font-medium tracking-tight leading-none text-white"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Community.
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-2 lg:gap-4">
                    {data.social_impact.community.map((node: any, i: number) => (
                      <motion.div
                        key={node.organization}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        className="group flex flex-col p-3 lg:p-6 rounded-[16px] lg:rounded-[24px] bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15 transition-all duration-300"
                      >
                        <span className="inline-flex w-fit font-mono text-[9px] lg:text-[10px] text-ion-soft uppercase tracking-widest bg-ion/10 px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full mb-2 lg:mb-4">
                          {node.year || "Active"}
                        </span>
                        <div className="flex flex-col gap-0.5 lg:gap-1">
                          <div className="text-[12.5px] lg:text-[16px] font-semibold text-white/95 group-hover:text-white transition-colors font-sans leading-tight line-clamp-2">
                            {node.organization}
                          </div>
                          <div className="text-[10.5px] lg:text-[13.5px] font-medium text-white/50 group-hover:text-white/70 transition-colors line-clamp-1">{node.role}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabSection>

          {/* ── 7. CONTACT + FOOTER (merged) ────────────────────────────── */}
          <TabSection id="contact" data-theme="dark" noFlex className="bg-ink text-white/70 h-full justify-center overflow-y-auto scrollbar-hide">
            <div className="w-full h-full flex bg-ion text-white py-14 md:py-16 mt-0">
              <div className="max-w-6xl w-full px-6 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div className="space-y-3">
                  <p className="label-eyebrow text-white/60">Let&rsquo;s talk</p>
                  <h2
                    className="text-3xl sm:text-4xl font-medium tracking-tight text-balance"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Have something worth building?
                  </h2>
                </div>

                <div className="flex flex-col gap-1 w-full md:w-auto">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-8 py-2.5 border-b border-white/20 hover:border-white/60 transition-colors"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                        {link.label}
                      </span>
                      <span className="flex items-center gap-2 text-sm font-medium">
                        {link.value}
                        <LuArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <footer className="w-full h-fit pt-12 pb-8 border-t border-white/10 selection:bg-ion selection:text-white">
              <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid md:grid-cols-12 gap-10 border-b border-white/10">
                  <div className="md:col-span-5 space-y-5">
                    <Link href="/" className="flex items-center gap-2.5 w-fit group">
                      <OrbitMark size="sm" tone="ion" />
                      <span
                        className="text-lg font-black text-white uppercase tracking-widest"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Paktinyar
                      </span>
                    </Link>
                    <p className="text-[13px] font-light leading-relaxed max-w-sm text-white/60">
                      Software engineer and bioinformatics researcher based in Istanbul.
                      Building backend systems and applied ML, one careful decision at a time.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center hover:bg-white hover:text-ink text-white transition-colors"
                        aria-label="GitHub"
                      >
                        <FaGithub className="text-[14px]" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center hover:bg-white hover:text-ink text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedinIn className="text-[14px]" />
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-6 md:gap-10">
                    <div className="md:col-span-3 space-y-4 mt-1">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-ion-soft">Navigate</p>
                      <div className="flex flex-col gap-3 text-[13px] font-light text-white/60">
                        <Link href="/" className="hover:text-white transition-colors w-fit">Home</Link>
                        <Link href="/portfolio#projects" className="hover:text-white transition-colors w-fit">Work</Link>
                        <Link href="/portfolio#experience" className="hover:text-white transition-colors w-fit">Experience</Link>
                      </div>
                    </div>

                    <div className="md:col-span-4 mt-1">
                      <p className="font-mono text-[11px] uppercase tracking-widest text-ion-soft mb-4">Telemetry</p>
                      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-px md:bg-white/20">
                        {[
                          { label: "Projects", mdLabel: "Projects shipped", value: "8+" },
                          { label: "Research", mdLabel: "Research", value: "Active" },
                          { label: "Languages", mdLabel: "Verbal Languages", value: "5" },
                        ].map((s, i) => (
                          <div
                            key={s.label}
                            className={`py-2.5 md:p-4 bg-transparent md:bg-ink flex flex-row md:flex-col justify-between items-center md:items-start border-b border-white/[0.05] md:border-0 last:border-0 ${i === 2 ? "md:col-span-2 md:flex-row md:items-center" : "md:aspect-square"}`}
                          >
                            <div className="text-[10px] md:text-[9px] font-mono text-white/50 uppercase tracking-wider">
                              <span className="md:hidden">{s.label}</span>
                              <span className="hidden md:inline">{s.mdLabel}</span>
                            </div>
                            <div className="text-[14px] md:text-2xl font-black text-white" style={{ fontFamily: "var(--font-display)" }}>
                              {s.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[11px] font-mono text-white/30 uppercase">
                    © {new Date().getFullYear()} ISHAQ PAKTINYAR. SYS_ONLINE.
                  </p>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase">
                    <span className="w-2 h-2 rounded-full bg-ion animate-pulse" />
                    Accepting Load
                  </div>
                </div>
              </div>
            </footer>
          </TabSection>
        </TabScroll>
      </div>
    </main>
  );
}