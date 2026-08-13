import { Project } from "../../types/projects";

export default function Arch(project: Project) {
  return (
    <div className="space-y-10">
      {project.architecture.diagram && (
        <div className="relative rounded-[1.75rem] overflow-hidden border border-white/[0.08] bg-white/[0.02]">
          <img
            src={project.architecture.diagram}
            alt="System architecture diagram"
            className="w-full h-full object-contain p-6"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {project.architecture.components.map((comp, i) => {
          const name = comp.split("(")[0].trim();
          const note = comp.includes("(") ? comp.match(/\(([^)]+)\)/)?.[1] : null;
          return (
            <div
              key={i}
              className="group relative p-7 bg-white/[0.025] border border-white/[0.07] rounded-2xl hover:border-ion/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[10px] text-white/25">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-ion-soft/50 group-hover:bg-ion-soft transition-colors" />
              </div>
              <h4
                className="text-white text-lg font-semibold tracking-tight mb-1.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {name}
              </h4>
              {note && <p className="text-[12.5px] text-white/40 leading-snug">{note}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
