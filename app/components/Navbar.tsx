"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/60 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight text-slate-900">
          PAKTINYAR<span className="text-indigo-600">.</span>
        </Link>
        <div className="hidden md:flex items-center space-x-10 text-sm font-semibold uppercase tracking-wider text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link href="/portfolio" className="hover:text-indigo-600 transition-colors">Portfolio</Link>
          <Link href="/ishaqCV_1-full.pdf" className="hover:text-indigo-600 transition-colors">Resume</Link>
          {/* <a href="#contact-section" className="hover:text-indigo-600 transition-colors">Contact</a> */}
          {/* Auth buttons can be injected here */}
        </div>
      </div>
    </nav>
  );
}