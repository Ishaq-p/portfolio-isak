
export default function ConnectionProtocol({ data }: { data: any }) {
  return (
    <section className="w-full bg-indigo-600 text-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Education & Status Node */}
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-2xl font-black tracking-tighter uppercase">
            Initialize_Connection
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-90">
              <span className="bg-slate-00 text-indigo-50">{data.education.degree}</span> // {data.education.institution}
            </p>
          </div>
        </div>

        {/* Social Link Mesh */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { label: "Email", href: `mailto:${data.contact.email}` },
            { label: "GitHub", href: `https://${data.contact.github}` },
            { label: "LinkedIn", href: `https://${data.contact.linkedin}` }
          ].map((link) => (
            <a 
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-[10px] font-black uppercase tracking-[0.3em] py-2"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}