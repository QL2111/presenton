import * as z from "zod";

export const Schema = z.object({
  title: z.string().default("Plan de Développement").meta({ description: "Titre de la roadmap" }),
  steps: z.array(
    z.object({
      phase: z.string().min(3).max(30),
      detail: z.string().min(10).max(100),
    })
  ).min(3).max(5).default([
    { phase: "Phase 1", detail: "Analyse et conception initiale" },
    { phase: "Phase 2", detail: "Développement du MVP" },
    { phase: "Phase 3", detail: "Tests et déploiement" },
  ]).meta({
    description: "Étapes clés du plan",
  }),
});

type SchemaType = z.infer<typeof Schema>;

export default function TimelineSlide({ data }: { data: SchemaType }) {
  return (
    <div className="aspect-video max-w-[1280px] w-full bg-slate-50 p-12">
      <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">{data.title}</h2>
      
      <div className="relative flex justify-between items-start mt-20 px-10">
        {/* Ligne de connexion */}
        <div className="absolute top-8 left-0 w-full h-1 bg-gray-300 -z-0"></div>

        {data.steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center w-64">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6 border-4 border-white">
              {idx + 1}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{step.phase}</h3>
            <p className="text-center text-gray-600">{step.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}