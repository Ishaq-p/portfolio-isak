import { LuArrowUpRight } from "react-icons/lu";

export default function ConnectionProtocol({ data }: { data: any }) {
  const links = [
    { label: "Email", value: data.contact.email, href: `mailto:${data.contact.email}` },
    { label: "GitHub", value: data.contact.github, href: `https://${data.contact.github}` },
    { label: "LinkedIn", value: data.contact.linkedin, href: `https://${data.contact.linkedin}` },
  ];

  return (
    <section className="w-full bg-ion text-white py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
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
              className="group flex items-center justify-between gap-8 py-3 border-b border-white/20 hover:border-white/60 transition-colors"
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
    </section>
  );
}
